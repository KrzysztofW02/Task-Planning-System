import "./LoginPage.css";
import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

interface LoginPageProps {
  onRegisterClick: () => void;
  onLoginSuccess: (username: string, token: string) => void;
}

function LoginPage({ onRegisterClick, onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/Authentication/Login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Login successful");
        console.log("Response data:", response.data);

        const token = response.data;
        if (token) {
          localStorage.setItem("authToken", token);
          setIsLoggedIn(true);
          onLoginSuccess(username, token);
        } else {
          console.error("Token not found in the response");
        }
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  if (isLoggedIn) {
    return <p>Udało się zalogować!</p>;
  }

  return (
    <div className="login-container">
      <div className="login-form" style={{minWidth:'330px'}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Zaloguj się</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nazwa użytkownika"
              aria-describedby="basic-addon2"
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Hasło"
              style={{ marginBottom: "8px" }}
            />

          </Form.Group>
          <br />
          <div className="buttonsloginpage">
            <button type="submit" style={{marginRight:'40px'}}>Zaloguj się</button>
            <button type="button" onClick={onRegisterClick}>
              Zarejestruj się
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
