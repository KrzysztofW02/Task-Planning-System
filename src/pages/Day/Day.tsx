import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

interface Task {
  id: string;
  task: string;
  category: string;
  timeStart: Date;
  timeEnd: Date;
  description: string;
}

interface BackendTask {
  _id: string;
  userName: string;
  taskName: string;
  taskDescription: string;
  taskStart: string;
  taskEnd: string;
  category: string;
}

interface DayComponentProps {
  dayName: string;
  tasks: Task[];
  updateTasks: (newTasks: Task[]) => void;
  onDeleteTask: (id: string) => void;
  onBackToCalendar: () => void;
  username: string;
}

const DayComponent: React.FC<DayComponentProps> = ({
  dayName,
  tasks,
  updateTasks,
  onDeleteTask,
  onBackToCalendar,
  username,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found, please login");
        return;
      }

      try {
        console.log("Fetching tasks for user:", username);
        const response = await axios.get(
          `http://localhost:8082/UserTask/Get?UserName=${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          console.log("Response data:", response.data);
          const tasks: Task[] = response.data.map((task: BackendTask) => {
            const mappedTask = {
              id: task._id,
              task: task.taskName,
              category: task.category,
              timeStart: new Date(task.taskStart),
              timeEnd: new Date(task.taskEnd),
              description: task.taskDescription,
            };
            console.log("Mapped task:", mappedTask);
            return mappedTask;
          });
          updateTasks(tasks);
        } else {
          console.error("Error fetching tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      console.log("Fetching tasks for user:", username);
      const response = await axios.get(
        `http://localhost:8082/UserTask/Get?UserName=${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("Response data:", response.data);
        const tasks: Task[] = response.data.map((task: BackendTask) => {
          const mappedTask = {
            id: task._id,
            task: task.taskName,
            category: task.category,
            timeStart: new Date(task.taskStart),
            timeEnd: new Date(task.taskEnd),
            description: task.taskDescription,
          };
          console.log("Mapped task:", mappedTask);
          return mappedTask;
        });
        updateTasks(tasks);
      } else {
        console.error("Error fetching tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleAddOrEditTask = async (
    id: string,
    task: string,
    category: string,
    timeStart: Date,
    timeEnd: Date,
    description: string
  ) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      if (id) {
        await axios.delete(`http://localhost:8082/UserTask?taskId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const newBackendTask: Partial<BackendTask> = {
        userName: username,
        taskName: task,
        taskDescription: description,
        taskStart: timeStart.toISOString(),
        taskEnd: timeEnd.toISOString(),
        category: category,
      };

      const response = await axios.post(
        `http://localhost:8082/UserTask`,
        newBackendTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        fetchTasks();
      } else {
        console.error("Error adding or editing task");
      }
    } catch (error) {
      console.error("Error adding or editing task", error);
    }

    setIsModalOpen(false);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const parseDayName = (dayName: string): Date | null => {
    const dateParts = dayName.split(".");
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  const filterTasksForDay = (tasks: Task[], dayName: string) => {
    const dayDate = parseDayName(dayName);
    if (!dayDate) {
      console.error("Invalid dayName format:", dayName);
      return [];
    }
    dayDate.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      const startDate = new Date(task.timeStart);
      const endDate = new Date(task.timeEnd);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      return startDate <= dayDate && endDate >= dayDate;
    });
  };

  const filteredTasks = filterTasksForDay(tasks, dayName);

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
      backgroundColor: "#000000aa",
    },
  };

  return (
    <>
      <div className="container datedaygrid">
        <div className="date">{dayName}</div>
        <div className="day-grid-container">
          <div className="menu">
            <div className="menu-header">
              <button
                onClick={() => {
                  setSelectedTask(null);
                  setIsModalOpen(true);
                }}
                className="addtaskbuttonn"
              >
                Dodaj nowe zadanie
              </button>
              <button onClick={onBackToCalendar} className="btndayy">
                Powrót
              </button>
            </div>
            <div className="menu-items">
              {filteredTasks.length === 0 ? (
                <p className="centered-caption">
                  Nie przypisałeś(aś) żadnych zadań
                </p>
              ) : (
                filteredTasks.map((task, index) => (
                  <Task
                    key={task.id || index}
                    task={task.task}
                    id={task.id}
                    onDeleteTask={onDeleteTask}
                    onClick={() => handleTaskClick(task)}
                  />
                ))
              )}
            </div>
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
