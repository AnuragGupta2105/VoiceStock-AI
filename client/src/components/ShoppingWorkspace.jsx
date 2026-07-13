import ShoppingList from "./ShoppingList";
import RecommendationPanel from "./RecommendationPanel";
import ActivityHistory from "./ActivityHistory";

import "../styles/shoppingWorkspace.css";

function ShoppingWorkspace({
  shoppingList,
  setShoppingList,
  loadShoppingItems,
  lastItem,
  history,
  setHistory,
}) {

  return (

    <section className="shopping-workspace">

      <div className="workspace-left">

        <ShoppingList
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
          loadShoppingItems={loadShoppingItems}
          setHistory={setHistory}
        />

      </div>

      <div className="workspace-right">

        <RecommendationPanel
          shoppingList={shoppingList}
          lastItem={lastItem}
        />

        <ActivityHistory
          history={history}
        />

      </div>

    </section>

  );

}

export default ShoppingWorkspace;