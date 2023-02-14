import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/publish");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <form className="Sign" onSubmit={handleLogin}>
      <h1>Se connecter</h1>

      <input
        value={email}
        type="text"
        placeholder="Adresse email"
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(e.target.value);
        }}
      />
      <input
        value={password}
        type="text"
        placeholder="Mot de passe"
        onChange={(e) => {
          setPassword(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button>Se connecter</button>
      <Link to="/signup">
        <p>Pas encore de compte ? Inscris-toi !</p>
      </Link>
    </form>
  );
};

export default Login;
