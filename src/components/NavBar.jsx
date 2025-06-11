import { Link } from "react-router-dom";
import "../css/NavBar.css";
import { useEffect, useState } from "react";

function NavBar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1 className="neon-text">CineNest</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">
          <h1 className="explosive-text">Home</h1>
        </Link>
        <Link to="/favourites">
          <h1 className="explosive-text">Favourites</h1>
        </Link>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
