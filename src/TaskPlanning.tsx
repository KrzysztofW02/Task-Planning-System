import React, { useState } from "react";
import DayComponent from "./pages/Day/Day";
import CalendarComponent from "./pages/Calendar/Calendar";
import Sidebar from "./Sidebar";

type Task = {
  task: string;
  category: string;
  time: string;
  description: string;
};

function TaskPlanning() {
  const [displayedComponent, setDisplayedComponent] = useState<
    "Home" | "Day" | "Calendar"
  >("Home");
  const [dayName, setDayName] = useState<string>("");
  const [days, setDays] = useState<Record<string, Task[]>>({});

  const handleDeleteTask = (index: number) => {
    const updatedTasks = (days[dayName] || []).filter((_, i) => i !== index);
    setDays((prevDays) => ({
      ...prevDays,
      [dayName]: updatedTasks,
    }));
  };

  const updateTasksForDay = (dayName: string, newTasks: Task[]) => {
    setDays((prevDays) => ({
      ...prevDays,
      [dayName]: newTasks,
    }));
  };

  const handleMenuItemClick = (dayName: string) => {
    console.log("Kliknięto element menu:", dayName);
    setDayName(dayName);
    setDisplayedComponent("Day");
  };

  return (
    <div>
      <Sidebar />
      {displayedComponent === "Home" && (
        <button onClick={() => handleMenuItemClick("Test")}>Test</button>
      )}
      {displayedComponent === "Day" && (
        <DayComponent
          dayName={dayName}
          tasks={days[dayName] || []}
          updateTasks={(newTasks) => updateTasksForDay(dayName, newTasks)}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default TaskPlanning;
