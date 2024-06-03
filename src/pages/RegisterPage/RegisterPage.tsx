import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/Authentication/Register",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Registration was successful");
        setIsRegistered(true);
      } else {
        console.error("Error during registration");
      }
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  if (isRegistered) {
    return <p>Udało Ci się pomyślnie zarejestrować!</p>;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Login</Form.Label>
            <Form.Control
              id="username"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              aria-describedby="passwordHelpBlock"
              placeholder="Password's username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{marginBottom:'8px'}}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </Form.Text>
          </Form.Group>
          <br />
          <button type="submit">
            Register
          </button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
