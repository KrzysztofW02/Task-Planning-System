import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Modal from "react-modal";
import axios from "axios";

interface Task {
  task: string;
  category: string;
  timeStart: Date;
  timeEnd: Date;
  description: string;
}

interface DayComponentProps {
  dayName: string;
  tasks: Task[];
  updateTasks: (newTasks: Task[]) => void;
  onDeleteTask: (index: number) => void;
  onBackToCalendar: () => void;
}

const DayComponent: React.FC<DayComponentProps> = ({
  dayName,
  tasks,
  updateTasks,
  onDeleteTask,
  onBackToCalendar,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddOrEditTask = async (
    task: string,
    category: string,
    timeStart: Date,
    timeEnd: Date,
    description: string
  ) => {
    if (selectedTask) {
      const taskIndex = tasks.findIndex((t) => t.task === selectedTask.task);
      const newTasks = [...tasks];
      newTasks[taskIndex] = { task, category, timeStart, timeEnd, description };
      updateTasks(newTasks);
    } else {
      const newTask = { task, category, timeStart, timeEnd, description };
      const newTasks = [...tasks, newTask];
      updateTasks(newTasks);
    }

    try {
      const response = await axios.post("http://localhost:8082/UserTask/", {
        TaskName: task,
        Category: category,
        TimeStart: timeStart,
        TimeEnd: timeEnd,
        Description: description,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsModalOpen(false);
  };

  const handleClearTasks = () => {
    updateTasks([]);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "50%",
      borderRadius: "20px",
    },
  };

  return (
    <>
      <div className="day-name">{dayName}</div>
      <div className="day-grid-container">
        <div className="menu">
          <div className="menu-header">
            <Button
              variant="outline-success"
              onClick={() => {
                setSelectedTask(null);
                setIsModalOpen(true);
              }}
              style={{ alignSelf: "center" }}
            >
              Add New Task
            </Button>
            <Button
              variant="outline-primary"
              onClick={onBackToCalendar}
              style={{ marginLeft: "15px" }}
            >
              Back To Calendar
            </Button>
          </div>
          <div className="menu-items">
            {tasks.length === 0 ? (
              <p className="centered-caption">You haven't assigned any tasks</p>
            ) : (
              tasks.map((task, index) => (
                <Task
                  task={task.task}
                  index={index}
                  onDeleteTask={onDeleteTask}
                  onClick={() => handleTaskClick(task)}
                />
              ))
            )}
          </div>
          {tasks.length > 1 && (
            <Button
              className="clear-button"
              variant="primary"
              onClick={handleClearTasks}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <TaskForm
          onSave={handleAddOrEditTask}
          onCancel={() => setIsModalOpen(false)}
          initialTask={selectedTask}
        />
      </Modal>
    </>
  );
};

export default DayComponent;
