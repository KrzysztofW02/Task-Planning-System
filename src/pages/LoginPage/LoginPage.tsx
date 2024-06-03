import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface LoginPageProps {
  onRegisterClick: () => void;
  onLoginSuccess: (username: string) => void;
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
        setIsLoggedIn(true);
        onLoginSuccess(username);
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
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Password's username"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </Form.Text>
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Login
          </Button>
          <button type="button" onClick={onRegisterClick}>
            Register
          </button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
