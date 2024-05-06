import { useState } from "react";
import DayComponent from "./pages/Day/Day";
import CalendarComponent from "./pages/Calendar/Calendar";

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

  const handleCalendarClick = () => {
    console.log("Kliknięto element Kalendarz");
    setDisplayedComponent("Calendar");
  };

  return (
    <div>
      {displayedComponent === "Home" && (
        <div>
          <button onClick={() => handleMenuItemClick("Test")}>Tasks</button>{" "}
          <br></br>
          <button onClick={() => handleCalendarClick()}>Kalendarz</button>
        </div>
      )}
      {displayedComponent === "Day" && (
        <DayComponent
          dayName={dayName}
          tasks={days[dayName] || []}
          updateTasks={(newTasks) => updateTasksForDay(dayName, newTasks)}
          onDeleteTask={handleDeleteTask}
        />
      )}
      {displayedComponent === "Calendar" && (
        <CalendarComponent
          onMenuClick={handleMenuItemClick}
          days={days}
          setDays={setDays}
          dailyTasks={[]}
        ></CalendarComponent>
      )}
    </div>
  );
}

export default TaskPlanning;
