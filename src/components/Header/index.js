import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "./vinted-logo.jpg";

const Header = ({ handleToken, token, search, setSearch }) => {
  const navigate = useNavigate();
  return (
    <header>
      <section>
        <Link to="/">
          <img src={logo} alt="logo-vinted" />
        </Link>
        <div>
          <span className="glass">
            <FontAwesomeIcon icon="magnifying-glass" />
          </span>
          <input
            value={search}
            type="text"
            placeholder="Rechercher des articles"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
        </div>

        {token ? (
          <button
            className="disconnect"
            onClick={() => {
              handleToken(null);
            }}
          >
            Se Déconnecter
          </button>
        ) : (
          <div className="twice">
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        )}

        <button
          className="sellArticles"
          onClick={() => {
            token ? navigate("/publish") : navigate("/login");
          }}
        >
          Vends tes articles
        </button>
      </section>
    </header>
  );
};
export default Header;
