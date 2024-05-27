import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import handleRegisterClick from '../../TaskPlanning';

function LoginPage() {
  return (
    <div className="login-container">
    <div className="login-form">
    <>
    <Form.Label htmlFor="inputPassword5">Login</Form.Label>
     <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        </>
        <br/>
        <>
    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
    <Form.Control
      type="password"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder="Password's username"

    />
    <Form.Text id="passwordHelpBlock" muted>
      Your password must be 8-20 characters long, contain letters and numbers,
      and must not contain spaces, special characters, or emoji.
    </Form.Text>
    <br/>
    <Button variant="primary" type="submit">Login</Button>
    <button onClick={() => handleRegisterClick()}>Register</button>
  </>
  </div>
  </div>
  );
}

export default LoginPage;
