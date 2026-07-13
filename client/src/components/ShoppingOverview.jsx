import "../styles/dashboard.css";

function ShoppingOverview({ shoppingList }) {

  const totalItems = shoppingList.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalCost = shoppingList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const purchased = shoppingList.filter(
    item => item.status === "Purchased"
  ).length;

  const pending = shoppingList.filter(
    item => item.status !== "Purchased"
  ).length;

  const progress =
    shoppingList.length === 0
      ? 0
      : Math.round(
          (purchased / shoppingList.length) * 100
        );

  const budget = 2000;

  const budgetUsed = Math.min(
    Math.round((totalCost / budget) * 100),
    100
  );

  return (

    <section className="dashboard">

      <div className="dashboard-header">

        <div>

          <h2>📊 Shopping Overview</h2>

          <p>

            AI-powered insights for your shopping journey

          </p>

        </div>

      </div>

      {/* KPI CARDS */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h4>Total Items</h4>

          <h2>{totalItems}</h2>

          <small>

            🛒 Products in your cart

          </small>

        </div>

        <div className="dashboard-card">

          <h4>Cart Value</h4>

          <h2>₹{totalCost}</h2>

          <small>

            {totalCost === 0
              ? "🛒 Cart Empty"
              : totalCost < 500
              ? "➕ Add ₹" + (500 - totalCost) + " for free delivery"
              : "✅ Eligible for free delivery"}

          </small>

        </div>

        <div className="dashboard-card">

          <h4>Purchased</h4>

          <h2>{purchased}</h2>

          <small>

            ✔ {pending} Items Remaining

          </small>

        </div>

        <div className="dashboard-card">

          <h4>AI Shopping Score</h4>

          <h2>92%</h2>

          <small>

            ↑ Excellent Shopping Efficiency

          </small>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="dashboard-progress">

        <div className="progress-card">

          <h4>💰 Budget Usage</h4>

          <div className="progress-bar">

            <div

              className="progress-fill"

              style={{

                width:`${budgetUsed}%`

              }}

            ></div>

          </div>

          <span>

            ₹{totalCost} / ₹{budget}

          </span>

        </div>

        <div className="progress-card">

          <h4>🛍 Shopping Progress</h4>

          <div className="progress-bar">

            <div

              className="progress-fill green"

              style={{

                width:`${progress}%`

              }}

            ></div>

          </div>

          <span>

            {progress}% Completed

          </span>

        </div>

      </div>

      {/* AI INSIGHTS */}

      <div className="quick-stats">

        <div className="quick-card">

          <h5>🎤 Voice Commands</h5>

          <h3>24</h3>

          <small>Commands Today</small>

        </div>

        <div className="quick-card">

          <h5>🚚 Delivery</h5>

          <h3>

            {totalCost >= 500

              ? "FREE"

              : "₹40"}

          </h3>

          <small>

            Delivery Charge

          </small>

        </div>

        <div className="quick-card">

          <h5>💸 Savings</h5>

          <h3>₹180</h3>

          <small>

            Smart AI Recommendations

          </small>

        </div>

      </div>

      {/* AI CARD */}

      <div className="ai-dashboard-card">

        <h3>

          🤖 VoiceStock AI Insight

        </h3>

        <p>

          {totalCost < 500

            ? `You're just ₹${500-totalCost} away from FREE delivery. Add fruits or vegetables to maximize savings.`

            : "Your shopping cart is balanced. AI recommends checking dairy products before checkout."}

        </p>

      </div>

    </section>

  );

}

export default ShoppingOverview;