import { useState } from "react";
import axios from "axios";
import DayComponent from "./pages/Day/Day";
import CalendarComponent from "./pages/Calendar/Calendar";
import Sidebar from "./Sidebar";
import HomeComponent from "./pages/Home/Home";

type Task = {
  task: string;
  category: string;
  timeStart: Date;
  timeEnd: Date;
  description: string;
};

function TaskPlanning() {
  const [displayedComponent, setDisplayedComponent] = useState<
    "Home" | "Day" | "Calendar"
  >("Home");
  const [dayName, setDayName] = useState<string>("");
  const [days, setDays] = useState<Record<string, Task[]>>({});

  const handleDeleteTask = async (index: number) => {
    const taskToDelete = days[dayName][index];

    try {
      const response = await axios.delete(
        `http://localhost:8082/UserTask/Delete?taskName=${taskToDelete.task}`
      );

      if (response.status === 200) {
        const updatedTasks = (days[dayName] || []).filter(
          (_, i) => i !== index
        );
        setDays((prevDays) => ({
          ...prevDays,
          [dayName]: updatedTasks,
        }));
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
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

  //small warning, everything added here is global
  return (
    <div className="AppBG">
      <div className="row justify-content-start AppBG2">
        <div className="col-sm-1 sidebarcontainer">
          <Sidebar onSidebarItemClick={handleSidebarItemClick} />
        </div>

        <div className="col-sm-10 contentcontainer">
          {displayedComponent === "Home" && <HomeComponent></HomeComponent>}
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
