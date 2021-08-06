import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function LogIn({ setUser, setDataUserName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const userData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // `http://localhost:4000/login`
      // https://reacteur-marvel-by-tommy.herokuapp.com/login
      const response = await axios.post(
        `http://localhost:4000/login`,
        userData
      );

      console.log(response.data);
      setDataUserName(response.data.resUser.username);
      setUser(response.data.resUser.token);
      history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="form-header">
          <Link className="loginpage">Se connecter</Link>
          <Link to="/signup">S'enregistrer</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adresse mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <input type="submit" value="Valider" />
        </form>
      </div>
    </div>
  );
}
