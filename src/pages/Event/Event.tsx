import React from "react";
import { Button } from "react-bootstrap";

interface EventProps {
  event: string;
  id: string;
  onDeleteEvent: (id: string) => void;
  onJoinEvent: (id: string) => void;
  onClick: () => void;
}

const Event: React.FC<EventProps> = ({
  event,
  id,
  onDeleteEvent,
  onJoinEvent,
  onClick,
}) => {
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
          Usun
        </Button>
        <Button
          variant="outline-primary"
          onClick={(e) => {
            e.stopPropagation();
            onJoinEvent(id);
          }}
        >
          Dolacz
        </Button>
      </div>
    </div>
  );
};

export default Event;
