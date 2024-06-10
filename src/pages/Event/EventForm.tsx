import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

interface Event {
  id: string;
  name: string;
  timeStart: Date;
  timeEnd: Date;
}

interface EventFormProps {
  onSave: (id: string, name: string, timeStart: Date, timeEnd: Date) => void;
  onCancel: () => void;
  initialEvent: Event | null;
}

const EventForm: React.FC<EventFormProps> = ({
  onSave,
  onCancel,
  initialEvent,
}) => {
  const id = initialEvent?.id || "";
  const [name, setName] = useState(initialEvent?.name || "");
  const [timeStart, setTimeStart] = useState(
    initialEvent?.timeStart || new Date()
  );
  const [timeEnd, setTimeEnd] = useState(initialEvent?.timeEnd || new Date());

  const handleSave = () => {
    if (name.trim() === "") {
      alert("Event name is required");
      return;
    }
    onSave(id, name, timeStart, timeEnd);
    setName("");
    setTimeStart(new Date());
    setTimeEnd(new Date());
  };

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Nazwa Wydarzenia"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control-margin"
        required
      />
      <FormControl
        type="datetime-local"
        value={timeStart.toISOString().slice(0, 16)}
        onChange={(e) => setTimeStart(new Date(e.target.value))}
        className="form-control-margin"
      />
      <FormControl
        type="datetime-local"
        value={timeEnd.toISOString().slice(0, 16)}
        onChange={(e) => setTimeEnd(new Date(e.target.value))}
        className="form-control-margin"
      />
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EventForm;
