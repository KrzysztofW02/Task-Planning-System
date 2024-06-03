import { useState } from "react";
import axios from "axios";
import DayComponent from "./pages/Day/Day";
import CalendarComponent from "./pages/Calendar/Calendar";
import Sidebar from "./Sidebar";
import HomeComponent from "./pages/Home/Home";
import EventComponent from "./pages/Event/Event";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomeForUsersComponent from "./pages/Home/HomeForUsers";

type Task = {
  task: string;
  category: string;
  timeStart: Date;
  timeEnd: Date;
  description: string;
};

function TaskPlanning() {
  const [displayedComponent, setDisplayedComponent] = useState<
    | "Home"
    | "Day"
    | "Calendar"
    | "Event"
    | "LoginPage"
    | "RegisterPage"
    | "HomeForUsers"
  >("Home");
  const [dayName, setDayName] = useState<string>("");
  const [days, setDays] = useState<Record<string, Task[]>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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

  const handleEventClick = () => {
    setDisplayedComponent("Event");
  };

  const handleSidebarItemClick = (
    component: "HomeForUsers" | "Day" | "Calendar" | "Event"
  ) => {
    setDisplayedComponent(component);
  };

  const handleLoginClick = () => {
    console.log("Kliknięto element Login");
    setDisplayedComponent("LoginPage");
  };

  const handleRegisterClick = () => {
    console.log("Kliknięto element Register");
    setDisplayedComponent("RegisterPage");
  };

  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    setDisplayedComponent("HomeForUsers");
  };

  return (
    <div className="AppBG">
      <div className="row justify-content-start AppBG2">
        {isLoggedIn && (
          <div className="col-sm-1 sidebarcontainer">
            <Sidebar onSidebarItemClick={handleSidebarItemClick} />
          </div>
        )}

        <div className="col-sm-10 contentcontainer">
          {displayedComponent === "Home" && (
            <HomeComponent
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />
          )}
          {displayedComponent === "HomeForUsers" && (
            <HomeForUsersComponent
              username={username}
              onCalendarClick={handleCalendarClick}
              onEventsClick={handleEventClick}
            />
          )}

          {displayedComponent === "Day" && (
            <DayComponent
              dayName={dayName}
              tasks={days[dayName] || []}
              updateTasks={(newTasks) => updateTasksForDay(dayName, newTasks)}
              onDeleteTask={handleDeleteTask}
              onBackToCalendar={handleCalendarClick}
              username={username}
            />
          )}
          {displayedComponent === "Calendar" && (
            <CalendarComponent onMenuClick={handleMenuItemClick} days={days} />
          )}
          {displayedComponent === "LoginPage" && (
            <LoginPage
              onRegisterClick={handleRegisterClick}
              onLoginSuccess={handleLoginSuccess}
            ></LoginPage>
          )}

          {displayedComponent === "RegisterPage" && (
            <RegisterPage></RegisterPage>
          )}
          {displayedComponent === "Event" && <EventComponent />}
        </div>
      </div>
    </div>
  );
}

export default TaskPlanning;
