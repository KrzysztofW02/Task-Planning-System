import "./RegisterPage.css"
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";

interface RegisterPageProps{
  onLoginClick: () => void;
}

function RegisterPage({onLoginClick}: RegisterPageProps) {
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
              placeholder="Nazwa użytkownika"
              aria-describedby="basic-addon2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label htmlFor="password">Hasło</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "8px" }}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Twoje hasło musi mieć od 8 do 20 znaków, posiadiać znak specjalny
              i liczbę oraz nie może zawierać spacji i emoji
            </Form.Text>
          </Form.Group>
          <br />
          <div className="buttonregister">
            <button type="submit">Zarejestruj się</button>
            <button onClick={onLoginClick}>Powrót</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
