import "./Day.css";
import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";

interface Task {
  task: string;
  category: string;
  timeStart: Date;
  timeEnd: Date;
  description: string;
}

interface TaskFormProps {
  onSave: (
    task: string,
    category: string,
    timeStart: Date,
    timeEnd: Date,
    description: string
  ) => void;
  onCancel: () => void;
  initialTask: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSave,
  onCancel,
  initialTask,
}) => {
  const [task, setTask] = useState(initialTask?.task || "");
  const [category, setCategory] = useState(initialTask?.category || "");
  const [timeStart, setTimeStart] = useState(
    initialTask?.timeStart || new Date()
  );
  const [timeEnd, setTimeEnd] = useState(initialTask?.timeEnd || new Date());
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );

  const handleSave = () => {
    if (task.trim() === "") {
      alert("Task field is required");
      return;
    }
    onSave(task, category, timeStart, timeEnd, description);
    setTask("");
    setCategory("");
    setTimeStart(new Date());
    setTimeEnd(new Date());
    setDescription("");
  };

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Zadanie"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="form-control-margin"
        required
      />
      <FormControl
        type="text"
        placeholder="Kategoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="form-control-margin"
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
      <FormControl
        type="text"
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control-margin"
      />
      <div className="button-container">
        <button onClick={handleSave}>Zapisz</button>
        <button onClick={onCancel}>
          Anuluj
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
