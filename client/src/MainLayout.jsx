import { useEffect, useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShoppingOverview from "./components/ShoppingOverview";
import VoiceCommand from "./components/VoiceCommand";
import ShoppingWorkspace from "./components/ShoppingWorkspace";
import SplashScreen from "./components/SplashScreen";
import Footer from "./components/Footer";
import {
  getShoppingItems
} from "./api/shoppingApi";


function MainLayout() {

 const [shoppingList,setShoppingList]=
useState([]);

  const [lastItem, setLastItem] = useState("");

  const [history, setHistory] = useState([]);
const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [loading, setLoading] = useState(true);

 useEffect(() => {

  loadShoppingItems();

}, []);

const loadShoppingItems = async () => {

  try {

    const items = await getShoppingItems();

    setShoppingList(items);

  } catch (err) {

    console.log(err);

  }

  setLoading(false);

};

  if (loading) {

    return <SplashScreen />;

  }

  return (

    <div className={darkMode ? "app dark" : "app"}>

     <Navbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  shoppingList={shoppingList}
  search={search}
  setSearch={setSearch}
/>

      <Hero />

      <ShoppingOverview
        shoppingList={shoppingList}
      />
<VoiceCommand
  shoppingList={shoppingList}
  setShoppingList={setShoppingList}
  setLastItem={setLastItem}
  setHistory={setHistory}
  loadShoppingItems={loadShoppingItems}
/>

<ShoppingWorkspace
  shoppingList={shoppingList.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )}
  setShoppingList={setShoppingList}
  loadShoppingItems={loadShoppingItems}
  lastItem={lastItem}
  history={history}
  setHistory={setHistory}
/>
      <Footer />

    </div>

  );

}

export default MainLayout;