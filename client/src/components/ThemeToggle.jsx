import { FaMoon, FaSun } from "react-icons/fa";

function ThemeToggle({ darkMode, setDarkMode }) {

  const toggleTheme = () => {

    const next = !darkMode;

    setDarkMode(next);

    localStorage.setItem(
      "theme",
      next ? "dark" : "light"
    );

  };

  return (

    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >

      {darkMode ? <FaSun /> : <FaMoon />}

    </button>

  );

}

export default ThemeToggle;