import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";

interface Task {
  task: string;
  category: string;
  time: string;
  description: string;
}

interface TaskFormProps {
  onSave: (
    task: string,
    category: string,
    time: string,
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
  const [time, setTime] = useState(initialTask?.time || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );

  const handleSave = () => {
    if (task.trim() === "") {
      alert("Task field is required");
      return;
    }
    onSave(task, category, time, description);
    setTask("");
    setCategory("");
    setTime("");
    setDescription("");
  };

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="form-control-margin"
        required
      />
      <FormControl
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="form-control-margin"
      />
      <FormControl
        type="text"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="form-control-margin"
      />
      <FormControl
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control-margin"
      />
      <div className="button-container">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;
