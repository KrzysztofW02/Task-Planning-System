import React from "react";
import { Button } from "react-bootstrap";

interface TaskProps {
  task: string;
  id: string;
  onDeleteTask: (id: string) => void;
  onClick: () => void;
}

const Task: React.FC<TaskProps> = ({ task, id, onDeleteTask, onClick }) => {
  console.log("Rendering Task component with id:", id);

  return (
    <div className="menu-item" onClick={onClick}>
      <span>{task}</span>
      <div>
        <Button
          className="rmvbtnn"
          variant="outline-danger"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Button clicked for task id:", id);
            onDeleteTask(id);
          }}
        >
          Usun
        </Button>
      </div>
    </div>
  );
};

export default Task;
