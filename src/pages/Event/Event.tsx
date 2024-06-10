import React from "react";
import { Button } from "react-bootstrap";

interface EventProps {
  event: string;
  id: string;
  onDeleteEvent: (id: string) => void;
  onClick: () => void;
}

const Event: React.FC<EventProps> = ({ event, id, onDeleteEvent, onClick }) => {
  return (
    <div className="menu-item" onClick={onClick}>
      <span>{event}</span>
      <div>
        <Button
          variant="outline-danger"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteEvent(id);
          }}
        >
          Delete
        </Button>
        <Button
          variant="outline-primary"
          onClick={(e) => {
            e.stopPropagation();
            // Handle join event logic here
          }}
        >
          Join
        </Button>
      </div>
    </div>
  );
};

export default Event;
