import "./Home.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
    <>
      <div className="container homeContainer">
        <div className="row1">
          <div className="col1">
            <div className="text">
              <h2>Witaj {username}!</h2>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Calendar</Card.Title>
                <Card.Text>Check your calendar</Card.Text>
                <Button variant="primary" onClick={onCalendarClick}>
                  Go to Calendar
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Events</Card.Title>
                <Card.Text>Check your events</Card.Text>
                <Button variant="primary" onClick={onEventsClick}>
                  Go to Events
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeForUsersComponent;
