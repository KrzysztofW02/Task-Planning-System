import { useState } from "react";
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
  const [displayedComponent, setDisplayedComponent] = useState< "Home" | "Day" | "Calendar">("Home");
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

  const handleSidebarItemClick = (component: "Home" | "Day" | "Calendar") => {
    setDisplayedComponent(component);
  };

  return (
    <div
      className="container"
      style={{ marginLeft: "0px", marginRight: "0px" }}
    >
      <div className="row justify-content-start">
        <div className="col-sm-1" style={{ paddingLeft: "0px" }}>
          <Sidebar onSidebarItemClick={handleSidebarItemClick} />
        </div>

        <div className="col-sm-10 contentcontainer">
          {displayedComponent === "Home" && <div className="btns"></div>}

          {displayedComponent === "Day" && (
            <DayComponent
              dayName={dayName}
              tasks={days[dayName] || []}
              updateTasks={(newTasks) => updateTasksForDay(dayName, newTasks)}
              onDeleteTask={handleDeleteTask}
              onBackToCalendar={handleCalendarClick}
            />
          )}
          {displayedComponent === "Calendar" && (
            <CalendarComponent onMenuClick={handleMenuItemClick} days={days} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskPlanning;
