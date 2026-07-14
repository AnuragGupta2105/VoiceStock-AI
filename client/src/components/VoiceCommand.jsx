import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

import "../styles/voiceCommand.css";
import getRecommendation from "../utils/getRecommendation";
import { parseCommand } from "../utils/commandParser";
import { findProduct } from "../utils/productLookup";
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
  "👋 Hello! I can understand English, Hindi and Hinglish. Try saying 'Add Milk' or 'Mujhe doodh chahiye'."
);

  const [isListening, setIsListening] =
    useState(false);

  // =====================================
  // Update Assistant Message
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
    startVoiceRecognition((voiceText) => {

      setIsListening(false);

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

  let msg = "";

  try {

    // =====================================
    // ADD PRODUCT
    // =====================================

  if (result.action === "ADD") {

  const product = findProduct(result.item);

  if (!product) {

    msg = `Sorry, I couldn't find "${result.item}".`;

  } else {

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

      const recommendation =
        getRecommendation(product.name);

      msg =
        result.quantity > 1
          ? `Added ${result.quantity} ${product.name}. Total quantity is now ${newQty}.`
          : `${product.name} quantity updated successfully.`;

      if (recommendation) {
        msg += ` ${recommendation}`;
      }

    } else {

      await addShoppingItem({

        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        quantity: result.quantity || 1,
        status: "Added",

      });

      const recommendation =
        getRecommendation(product.name);

      msg =
        result.quantity > 1
          ? `${result.quantity} ${product.name} added to your shopping list.`
          : `${product.name} has been added to your shopping list.`;

      if (recommendation) {
        msg += ` ${recommendation}`;
      }

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

      const data = searchItem(

        shoppingList,

        result

      );

      msg = data.message;

      if (result.brand) {

        msg += ` Brand: ${result.brand}.`;

      }

      if (result.price) {

        msg += ` Showing products under ₹${result.price}.`;

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

    console.log(err);

    msg =
"Oops! Something went wrong. Please try again.";

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

<h2>🎤 AI Voice Shopping Assistant</h2>

<p>

Speak naturally in English, Hindi or Hinglish.

</p>

</div>

<div className="voice-card">

{/* ================= HEADER ================= */}

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

{/* ================= VOICE BUTTON ================= */}

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

{/* ================= RESPONSE ================= */}

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

onChange={(e)=>

setCommand(e.target.value)

}

placeholder='Examples: Add Milk | Mujhe doodh chahiye | Find Coffee'

onKeyDown={(e)=>{

if(e.key==="Enter"){

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
onClick={()=>
processCommand("Add Milk")
}
>

🥛 Milk

</button>

<button
onClick={()=>
processCommand("Buy Bread")
}
>

🍞 Bread

</button>

<button
onClick={()=>
processCommand("Need Eggs")
}
>

🥚 Eggs

</button>

<button
onClick={()=>
processCommand("Mujhe doodh chahiye")
}
>

🥛 Doodh

</button>

<button
onClick={()=>
processCommand("Coffee dhoondo")
}
>

☕

Coffee

</button>

<button
onClick={()=>
processCommand("2 Apples")
}
>

🍎 Apples

</button>

<button
onClick={()=>
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

</div>

</div>

</section>

);
}

export default VoiceCommand;