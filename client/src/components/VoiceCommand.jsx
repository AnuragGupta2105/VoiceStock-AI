import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { findProduct } from "../utils/productLookup";
import "../styles/voiceCommand.css";

import { parseCommand } from "../utils/commandParser";
import { startVoiceRecognition } from "../utils/speechRecognition";
import { speak } from "../utils/speak";

import {
  removeItem,
  searchItem,
} from "../utils/shoppingActions";

import {
  addShoppingItem,
  updateShoppingItem,
} from "../api/shoppingApi";

function VoiceCommand({
  shoppingList,
  setShoppingList,
  setLastItem,
  setHistory,
  loadShoppingItems,
}) {

  const [command, setCommand] = useState("");

  const [message, setMessage] = useState(
    "Waiting for your command..."
  );

  const [isListening, setIsListening] =
    useState(false);

  // ---------------- Update Message ----------------

const updateMessage = (text) => {

  console.log("Adding history:", text);

  setMessage(text);

  speak(text);

  if (setHistory) {

    setHistory(prev => {

      const updated = [
        {
          text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev.slice(0, 9),
      ];

      console.log("Updated history:", updated);

      return updated;
    });

  }

};

  // ---------------- Voice ----------------

  const handleVoice = () => {

    setIsListening(true);

    startVoiceRecognition((text) => {

      setCommand(text);

      setIsListening(false);

      processCommand(text);

    });

  };

  // ---------------- Send ----------------

  const handleSend = () => {

    processCommand(command);

  };

  // ---------------- Main Logic ----------------

 const processCommand = async (inputCommand) => {

    if (!inputCommand.trim()) return;

    const result = parseCommand(inputCommand);

    let msg = "";

    // ---------- ADD ----------

// ---------- ADD ----------

if (result.action === "ADD") {

  try {

    const product = findProduct(result.item);

    if (!product) {

      msg = `"${result.item}" is not available in our product catalog.`;

    } else {

      // Check if already exists in shopping list
      const existing = shoppingList.find(
        item =>
          item.name.toLowerCase() ===
          product.name.toLowerCase()
      );

      if (existing) {

        // Increase quantity instead of creating duplicate

        await updateShoppingItem(existing._id, {

          quantity:
            existing.quantity + (result.quantity || 1),

        });

        msg = `${product.name} quantity updated.`;

      } else {

        // Add new product

        await addShoppingItem({

          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          quantity: result.quantity || 1,
          status: "Added",

        });

        msg = `${product.name} added to your shopping list.`;

      }

      setLastItem(product.name);

      await loadShoppingItems();

    }

  } catch (err) {

    console.error(err);

    msg = "Unable to add item.";

  }

}

    // ---------- REMOVE ----------

    else if (result.action === "REMOVE") {

      const data = removeItem(
        shoppingList,
        result
      );

      setShoppingList(data.updated);

      msg = data.message;

    }

    // ---------- SEARCH ----------

    else if (result.action === "SEARCH") {

      const data = searchItem(
        shoppingList,
        result
      );

      msg = data.message;

    }

    // ---------- UNKNOWN ----------

    else {

      msg =
        "Sorry, I couldn't understand that command.";

    }

    updateMessage(msg);

    setCommand("");

  };

  return (

    <section
      id="voice-shopping"
      className="voice-command"
    >

      <div className="section-header">

        <h2>🎤 Voice Shopping Assistant</h2>

        <p>

          Speak naturally or type your shopping request.

        </p>

      </div>

      <div className="voice-card">

        {/* Header */}

        <div className="voice-header">

          <div>

            <h3>Voice Command Center</h3>

            <p>

              Example:
              <strong>
                {" "}
                "Add two bottles of milk"
              </strong>

            </p>

          </div>

          <span className="voice-status">

            {isListening
              ? "🎙 Listening..."
              : "🟢 AI Ready"}

          </span>

        </div>

        {/* Listening Animation */}

       <div className="voice-circle">

  <button
    className={`voice-main-btn ${
      isListening ? "active" : ""
    }`}
    onClick={handleVoice}
  >

    <FaMicrophone />

  </button>

  <p>

    {isListening
      ? "Listening..."
      : "Tap to Speak"}

  </p>

</div>

        {/* Last Action */}

        <div className="assistant-console">

          <h4>📢 Last Action</h4>

          <p>{message}</p>

        </div>

        {/* Input */}

        <div className="voice-command-box">

          <input
            value={command}
            onChange={(e) =>
              setCommand(e.target.value)
            }
            placeholder='Example: "Add 2 bottles of milk"'
          />

          <button
            className={`mic-btn ${
              isListening ? "listening" : ""
            }`}
            onClick={handleVoice}
          >

            <FaMicrophone />

          </button>

          <button
            className="send-btn"
            onClick={handleSend}
          >

            <FaPaperPlane />

          </button>

        </div>

        {/* Quick Commands */}

       <div className="suggestions">

<h4>⚡ Popular Commands</h4>

<div className="suggestion-grid">

<button onClick={() => processCommand("Add Milk")}>

🥛

Milk

</button>

<button onClick={() => processCommand("Buy Bread")}>

🍞

Bread

</button>

<button onClick={() => processCommand("Need Eggs")}>

🥚

Eggs

</button>

<button onClick={() => processCommand("Find Apples")}>

🍎

Apples

</button>

<button onClick={() => processCommand("Add Coffee")}>

☕

Coffee

</button>

<button onClick={() => processCommand("Add Cookies")}>

🍪

Cookies

</button>

</div>

</div>

      </div>

    </section>

  );

}

export default VoiceCommand;