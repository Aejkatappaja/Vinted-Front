import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsLetter,
        }
      );
      console.log(response.data.token);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "This email is already in use, please create an account with a valide email."
        );
      }
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please, fill all the inputs");
      }
    }
  };

  return (
    <form action="" className="Sign" onSubmit={handleSignup}>
      <h1>S'inscrire</h1>

      <input
        value={username}
        type="name"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
          console.log(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          console.log(e.target.value);
        }}
      />
      <div>
        <input
          checked={newsLetter}
          type="checkbox"
          name=""
          id=""
          onChange={() => {
            setNewsLetter(!newsLetter);
          }}
        />{" "}
        <span>S'inscrire à notre newsletter</span>
        <div className="littleText">
          <p className="littleSpan">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18ans.
          </p>
        </div>{" "}
      </div>
      <div>
        <button type="submit">S'inscrire</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link
          to="/login"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <p>Tu as déjà un compte ? Connectes-toi !</p>
        </Link>
      </div>
    </form>
  );
};

export default Signup;
