import React from "react";
import { Button } from "react-bootstrap";

interface TaskProps {
  task: string;
  index: number;
  onDeleteTask: (index: number) => void;
  onClick: () => void;
}

const Task: React.FC<TaskProps> = ({ task, index, onDeleteTask, onClick }) => (
  <div className="menu-item" onClick={onClick}>
    <span>{task}</span>
    <div>
      <Button
        variant="outline-danger"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteTask(index);
        }}
      >
        X
      </Button>
    </div>
  </div>
);

export default Task;
