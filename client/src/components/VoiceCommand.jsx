import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

import "../styles/voiceCommand.css";

import { parseCommand } from "../utils/commandParser";
import { findProduct } from "../utils/productLookup";
import { startVoiceRecognition } from "../utils/speechRecognition";
import { speak } from "../utils/speak";

import getRecommendation from "../utils/getRecommendation";
import getSeasonalSuggestion from "../utils/getSeasonalSuggestion";
import getSubstitute from "../utils/getSubstitute";

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

    "👋 Welcome! I understand English, Hindi and Hinglish. Try saying 'Add Milk' or 'Mujhe doodh chahiye'."

  );

  const [isListening, setIsListening] = useState(false);

  // =====================================
  // Assistant Message
  // =====================================

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

  // =====================================
  // Refresh Shopping List
  // =====================================

  const refreshShoppingList = async () => {

    try {

      await loadShoppingItems();

    }

    catch (err) {

      console.log(err);

    }

  };

  // =====================================
  // Voice Recognition
  // =====================================

  const handleVoice = () => {

    if (isListening) return;

    setIsListening(true);

    setMessage("🎤 Listening...");

   startVoiceRecognition((voiceText, error) => {

  setIsListening(false);

  if (error) {

    updateMessage(error);

    return;

  }

  if (!voiceText) {

    updateMessage(
      "Sorry, I couldn't hear anything."
    );

    return;

  }

  setCommand(voiceText);

  setMessage(
    `🤖 Understood: "${voiceText}"`
  );

  processCommand(voiceText);

});

  };

  // =====================================
  // Manual Command
  // =====================================

  const handleSend = () => {

    processCommand(command);

  };
    // =====================================
  // Process Voice/Text Command
  // =====================================

  const processCommand = async (inputCommand) => {

    if (!inputCommand.trim()) return;

    const result = parseCommand(inputCommand);
console.log(result);
    let msg = "";

    try {

      // =====================================
      // ADD PRODUCT
      // =====================================

      if (result.action === "ADD") {

        const product = findProduct(result.item);

        if (!product) {

          msg = `Sorry, I couldn't find "${result.item}".`;

        }

        else {

          const existing = shoppingList.find(

            item =>

              item.name.toLowerCase() ===

              product.name.toLowerCase()

          );

          if (existing) {

            const newQty =

              existing.quantity +

              (result.quantity || 1);

            await updateShoppingItem(

              existing._id,

              {

                quantity: newQty,

              }

            );

          }

          else {

            await addShoppingItem({

              name: product.name,

              category: product.category,

              brand: product.brand,

              price: product.price,

              quantity: result.quantity || 1,

              status: "Added",

            });

          }

          msg =
            result.quantity > 1
              ? `${result.quantity} ${product.name} added to your shopping list.`
              : `${product.name} has been added to your shopping list.`;

          const recommendation =
            getRecommendation(product.name);

          if (recommendation) {

            msg += ` ${recommendation}`;

          }

          const seasonal =
            getSeasonalSuggestion();

          if (seasonal) {

            msg += ` ${seasonal}`;

          }

          const substitute =
            getSubstitute(product.name);

          if (substitute) {

            msg += ` ${substitute}`;

          }

          setLastItem(product.name);

          await refreshShoppingList();

        }

      }

      // =====================================
      // REMOVE PRODUCT
      // =====================================

      else if (result.action === "REMOVE") {

        const data = removeItem(

          shoppingList,

          result

        );

        setShoppingList(data.updated);

        msg = data.message;

      }

      // =====================================
      // SEARCH PRODUCT
      // =====================================

      else if (result.action === "SEARCH") {

        const data = searchItem(result);

        if (!data.found) {

          msg =
            "Sorry, I couldn't find any matching products.";

        }

        else {

          const firstFive =

            data.items.slice(0, 5);

          msg =

            `I found ${data.items.length} product${data.items.length > 1 ? "s" : ""}. `;

          firstFive.forEach((item) => {

            msg += `${item.name}`;

            if (item.brand) {

              msg += ` by ${item.brand}`;

            }

            if (item.price) {

              msg += ` for ₹${item.price}`;

            }

            msg += ". ";

          });

          if (data.items.length > 5) {

            msg +=

              `And ${data.items.length - 5} more products are available.`;

          }

        }

      }

      // =====================================
      // UNKNOWN COMMAND
      // =====================================

      else {

        msg =

          "Sorry, I couldn't understand your request.";

      }

    }

catch (err) {

  console.error(err);

  if (!navigator.onLine) {

    msg = "No internet connection. Please check your internet.";

  }

  else if (err.response?.status === 401) {

    msg = "Session expired. Please login again.";

  }

  else if (err.response?.status === 404) {

    msg = "Requested item was not found.";

  }

  else if (err.response?.status === 500) {

    msg = "Server is currently unavailable. Please try again later.";

  }

  else {

    msg =
      err.response?.data?.message ||
      "Something went wrong. Please try again.";

  }

}

    updateMessage(msg);

    setCommand("");

  };
    return (

    <section
      id="voice-shopping"
      className="voice-command"
    >

      {/* ================= HEADER ================= */}

      <div className="section-header">

        <h2>🎤 AI Voice Shopping Assistant</h2>

        <p>

          Speak naturally in English, Hindi or Hinglish.

        </p>

      </div>

      <div className="voice-card">

        {/* ================= TOP BAR ================= */}

        <div className="voice-header">

          <div>

            <h3>Voice Command Center</h3>

            <p>

              Examples:

              <strong>

                {" "}

                "Add Milk", "Mujhe doodh chahiye"

              </strong>

            </p>

          </div>

          <span

            className={`voice-status ${

              isListening ? "active" : ""

            }`}

          >

            {isListening

              ? "🎙 Listening..."

              : "🟢 Ready"}

          </span>

        </div>

        {/* ================= BIG VOICE BUTTON ================= */}

        <div className="voice-circle">

          <button

            className={`voice-main-btn ${

              isListening ? "active" : ""

            }`}

            onClick={handleVoice}

            disabled={isListening}

          >

            <FaMicrophone />

          </button>

          <p>

            {isListening

              ? "Listening..."

              : "Tap To Speak"}

          </p>

        </div>

        {/* ================= ASSISTANT RESPONSE ================= */}

        <div className="assistant-console">

          <h4>

            🤖 Assistant

          </h4>

          <p>

            {message}

          </p>

        </div>

        {/* ================= INPUT ================= */}

        <div className="voice-command-box">

          <input

            value={command}

            onChange={(e) =>

              setCommand(e.target.value)

            }

            placeholder="Examples: Add Milk | Mujhe doodh chahiye | Find Coffee under 300"

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                handleSend();

              }

            }}

          />

          <button

            className={`mic-btn ${

              isListening ? "listening" : ""

            }`}

            onClick={handleVoice}

            disabled={isListening}

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

        {/* ================= QUICK COMMANDS ================= */}

        <div className="suggestions">

          <h4>

            ⚡ Try These Commands

          </h4>

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

                processCommand("Buy Bread")

              }

            >

              🍞 Bread

            </button>

            <button

              onClick={() =>

                processCommand("Need Eggs")

              }

            >

              🥚 Eggs

            </button>

            <button

              onClick={() =>

                processCommand("Mujhe doodh chahiye")

              }

            >

              🥛 Doodh

            </button>

            <button

              onClick={() =>

                processCommand("Coffee dhoondo")

              }

            >

              ☕ Coffee

            </button>

            <button

              onClick={() =>

                processCommand("2 Apples")

              }

            >

              🍎 Apples

            </button>

            <button

              onClick={() =>

                processCommand("Chocolate add karo")

              }

            >

              🍫 Chocolate

            </button>

          </div>

        </div>
                {/* ================= FEATURES ================= */}

        <div className="voice-features">

          <div className="feature">

            🎯 Smart Search

          </div>

          <div className="feature">

            🛒 Shopping AI

          </div>

          <div className="feature">

            🔊 Voice Reply

          </div>

          <div className="feature">

            🌍 English • Hindi • Hinglish

          </div>

        </div>

      </div>

    </section>

  );

}

export default VoiceCommand;