import "./Home.css";
import Card from "react-bootstrap/Card";

interface HomeForUsersComponentProps {
  onCalendarClick: () => void;
  onEventsClick: () => void;
  username: string;
}

function HomeForUsersComponent({
  onCalendarClick,
  onEventsClick,
  username,
}: HomeForUsersComponentProps) {
  return (
    <div className="container homeContainer">
      <div className="row1">
        <div className="col1">
          <div className="text">
            <h1 className="hello1">Witaj {username}!</h1>
            <br></br>
          </div>
        </div>
      </div>

      <div className="rowU2">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Kalendarz</Card.Title>
            <Card.Text>Sprawdź swój Kalendarz</Card.Text>
            <button onClick={onCalendarClick}>
              Idź do kalendarza
            </button>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Wydarzenia</Card.Title>
            <Card.Text>Sprawdź swoje wydarzenia</Card.Text>
            <button onClick={onEventsClick}>
              Idź do wydarzeń
            </button>
          </Card.Body>
        </Card>
      </div>

    </div>
  );
}

export default HomeForUsersComponent;
