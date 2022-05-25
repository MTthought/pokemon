import { Link } from "react-router-dom";

const Header = ({ children }) => (
  <header className="Header">
    <div
      onClick={() => {
        localStorage.removeItem("currentPage");
        localStorage.removeItem("search");
        localStorage.removeItem("sortBy");
        window.location.reload();
      }}
    >
      <Link to="/">
        <img src="/pokeapi_logo.png" alt="PokéAPI" className="Logo" />
      </Link>
    </div>

    {children}
  </header>
);

export default Header;
