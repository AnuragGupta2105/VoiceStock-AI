import "../styles/recommendation.css";

function RecommendationPanel({
  shoppingList,
  lastItem,
}) {

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

  const dairy = shoppingList.filter(
    item => item.category === "Dairy"
  ).length;

  const suggestions = {

    Milk: ["🧈 Butter", "🧀 Cheese", "🥣 Yogurt"],

    Bread: ["🍓 Jam", "🥜 Peanut Butter", "🥛 Milk"],

    Eggs: ["🍞 Bread", "🧂 Salt", "🧈 Butter"],

    Rice: ["🫘 Dal", "🛢 Oil", "🧂 Salt"],

    Apples: ["🍌 Banana", "🍇 Grapes", "🍊 Orange"]

  };

  const recommend =
    suggestions[lastItem] ||
    ["🥛 Milk", "🍞 Bread", "🍎 Apples"];

  return (

    <section className="recommendation">

      <div className="panel-header">

        <h2>🤖 AI Shopping Assistant</h2>

        <p>

          Personalized shopping intelligence.

        </p>

      </div>

      <div className="recommend-card">

        <div className="insight-grid">

          <div className="insight-box">

            <h4>🛒 Cart Value</h4>

            <h2>₹{totalCost}</h2>
            <div className="summary-box">

  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹{totalCost}</span>
  </div>

  <div className="summary-row">
    <span>GST (5%)</span>
    <span>₹{Math.round(totalCost * 0.05)}</span>
  </div>

  <div className="summary-row">
    <span>Delivery</span>
    <span>{totalCost >= 500 ? "FREE" : "₹40"}</span>
  </div>

  <div className="summary-row">
    <span>Total</span>
    <span>
      ₹{
        totalCost >= 500
          ? Math.round(totalCost * 1.05)
          : Math.round(totalCost * 1.05 + 40)
      }
    </span>
  </div>

</div>

          </div>

          <div className="insight-box">

            <h4>📦 Items</h4>

            <h2>{totalItems}</h2>

          </div>

          <div className="insight-box">

            <h4>✅ Purchased</h4>

            <h2>{purchased}</h2>

          </div>

          <div className="insight-box">

            <h4>🥛 Dairy Items</h4>

            <h2>{dairy}</h2>

          </div>

        </div>

        <div className="ai-box">

  <h3>🧠 AI Shopping Insight</h3>

  <p>

    {totalCost === 0 &&
      "🛒 Your cart is empty. Start adding products using voice commands."}

    {totalCost > 0 && totalCost < 500 &&
      "💡 Your cart value is below ₹500. Add a few more essentials to make your shopping worthwhile."}

    {totalCost >= 500 && totalCost < 1000 &&
      "✅ Great! Your shopping cart looks balanced and within a healthy budget."}

    {totalCost >= 1000 && totalCost < 1500 &&
      "⚠️ You're spending more than usual. Consider checking AI budget recommendations."}

    {totalCost >= 1500 &&
      "🚨 High cart value detected. Review your shopping list before checkout to save more."}

  </p>

</div>

        <div className="recommend-section">

          <h3>

            ⭐ Recommended For You

          </h3>

          {recommend.map((item, index) => (

            <div
              key={index}
              className="recommend-item"
            >

              {item}

            </div>

          ))}

        </div>

        <div className="recommend-section">

          <h3>

            🔥 Trending Products

          </h3>

          <div className="recommend-item">

            ☕ Coffee

          </div>

          <div className="recommend-item">

            🍪 Cookies

          </div>

          <div className="recommend-item">

            🧃 Juice

          </div>

        </div>

      </div>

    </section>

  );

}

export default RecommendationPanel;