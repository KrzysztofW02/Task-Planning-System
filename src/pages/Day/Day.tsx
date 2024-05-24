import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

interface Task {
  task: string;
  category: string;
  timeStart: Date;
  timeEnd: Date;
  description: string;
}

interface BackendTask {
  taskName: string;
  taskDescription: string;
  taskStart: Date;
  taskEnd: Date;
  category: string;
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/UserTask/Get?UserName=string"
        );
        if (response.status === 200) {
          console.log("Response data:", response.data);
          const tasks: Task[] = response.data.map((task: BackendTask) => ({
            task: task.taskName,
            category: task.category,
            timeStart: new Date(task.taskStart),
            timeEnd: new Date(task.taskEnd),
            description: task.taskDescription,
          }));
          console.log("Mapped tasks:", tasks);
          updateTasks(tasks);
        } else {
          console.error("Error fetching tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
    //updateTasks w nawiasie?
  }, []);

  const handleAddOrEditTask = async (
    task: string,
    category: string,
    timeStart: Date,
    timeEnd: Date,
    description: string
  ) => {
    const newBackendTask: BackendTask = {
      taskName: task,
      taskDescription: description,
      taskStart: timeStart,
      taskEnd: timeEnd,
      category: description,
    };

    try {
      const response = await axios.post(
        "http://localhost:8082/UserTask/",
        newBackendTask
      );

      if (response.status === 200) {
        const newTask: Task = {
          task,
          category,
          timeStart,
          timeEnd,
          description,
        };
        if (selectedTask) {
          const taskIndex = tasks.findIndex(
            (t) => t.task === selectedTask.task
          );
          const newTasks = [...tasks];
          newTasks[taskIndex] = newTask;
          updateTasks(newTasks);
        } else {
          const newTasks = [...tasks, newTask];
          updateTasks(newTasks);
        }
      } else {
        // Handle error
        console.error("Error adding or editing task");
      }
    } catch (error) {
      // Handle error
      console.error("Error adding or editing task", error);
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

 //?!?!?!?!?!??!
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
      <div className="container datedaygrid">
        <div className="date">{dayName}</div>
        <div className="day-grid-container">
          <div className="menu">
            <div className="menu-header">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setSelectedTask(null);
                  setIsModalOpen(true);
                }}
              >
                Dodaj nowe zadanie
              </Button>
              <Button
                variant="outline-dark"
                onClick={onBackToCalendar}
              >
                Powrót
              </Button>
            </div>
            <div className="menu-items">
              {tasks.length === 0 ? (
                <p className="centered-caption">
                  Nie przypisałeś(aś) żadnych zadań
                </p>
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
