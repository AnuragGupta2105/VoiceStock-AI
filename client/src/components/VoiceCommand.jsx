import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import "../styles/voiceCommand.css";

import { parseCommand } from "../utils/commandParser";
import { startVoiceRecognition } from "../utils/speechRecognition";
import { speak } from "../utils/speak";
import { findProduct } from "../utils/productLookup";

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
    "Welcome! I'm ready for your shopping commands."
  );

  const [isListening, setIsListening] = useState(false);

  // ==========================
  // Update Assistant Message
  // ==========================

  const updateMessage = (text) => {
    setMessage(text);

    speak(text);

    if (setHistory) {
      setHistory((prev) => [
        {
          text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev.slice(0, 9),
      ]);
    }
  };

  // ==========================
  // Voice Recognition
  // ==========================

  const handleVoice = () => {
    setIsListening(true);

    speak("Listening");

    startVoiceRecognition((text) => {
      setCommand(text);

      setIsListening(false);

      speak("Processing your request");

      processCommand(text);
    });
  };

  // ==========================
  // Send Button
  // ==========================

  const handleSend = () => {
    processCommand(command);
  };

  // ==========================
  // Process Commands
  // ==========================

  const processCommand = async (inputCommand) => {
    if (!inputCommand.trim()) return;

    const result = parseCommand(inputCommand);

    let msg = "";

    // ==========================
    // ADD ITEM
    // ==========================

    if (result.action === "ADD") {
      try {
        const product = findProduct(result.item);

        if (!product) {
          msg = `Sorry. ${result.item} is not available in our catalog.`;
        } else {
          const existing = shoppingList.find(
            (item) =>
              item.name.toLowerCase() ===
              product.name.toLowerCase()
          );

          if (existing) {
            await updateShoppingItem(existing._id, {
              quantity:
                existing.quantity +
                (result.quantity || 1),
            });

            msg = `${product.name} quantity updated successfully.`;
          } else {
            await addShoppingItem({
              name: product.name,
              brand: product.brand,
              category: product.category,
              price: product.price,
              quantity: result.quantity || 1,
              status: "Added",
            });

            msg = `${product.name} added successfully.`;
          }

          setLastItem(product.name);

          await loadShoppingItems();
        }
      } catch (err) {
        console.log(err);

        msg =
          "Sorry, I could not add the item.";
      }
    }

    // ==========================
    // REMOVE ITEM
    // ==========================

    else if (result.action === "REMOVE") {
      const data = removeItem(
        shoppingList,
        result
      );

      setShoppingList(data.updated);

      msg = data.message;
    }

    // ==========================
    // SEARCH ITEM
    // ==========================

    else if (result.action === "SEARCH") {
      const data = searchItem(
        shoppingList,
        result
      );

      msg = data.message;
    }

    // ==========================
    // UNKNOWN
    // ==========================

    else {
      msg =
        "Sorry. I couldn't understand your command.";
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
          Speak naturally or type your shopping
          request.
        </p>
      </div>

      <div className="voice-card">
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

        {/* Voice Button */}

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

        {/* Assistant Response */}

        <div className="assistant-console">
          <h4>📢 Assistant Response</h4>

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
              isListening
                ? "listening"
                : ""
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
            <button
              onClick={() =>
                processCommand("Add Milk")
              }
            >
              🥛 Milk
            </button>

            <button
              onClick={() =>
                processCommand("Add Bread")
              }
            >
              🍞 Bread
            </button>

            <button
              onClick={() =>
                processCommand("Add Eggs")
              }
            >
              🥚 Eggs
            </button>

            <button
              onClick={() =>
                processCommand("Add Apples")
              }
            >
              🍎 Apples
            </button>

            <button
              onClick={() =>
                processCommand("Add Coffee")
              }
            >
              ☕ Coffee
            </button>

            <button
              onClick={() =>
                processCommand("Add Cookies")
              }
            >
              🍪 Cookies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VoiceCommand;