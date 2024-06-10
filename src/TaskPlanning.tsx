import { useState, useEffect } from "react";
import axios from "axios";
import DayComponent from "./pages/Day/Day";
import CalendarComponent from "./pages/Calendar/Calendar";
import Sidebar from "./Sidebar";
import HomeComponent from "./pages/Home/Home";
import EventComponent from "./pages/Event/EventComponent";
import LogoutComponent from "./pages/LogoutPage/LogoutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomeForUsersComponent from "./pages/Home/HomeForUsers";

declare global {
  interface Window {
    onLoginClickScope: () => void;
  }
}

type Task = {
  id: string;
  task: string;
  category: string;
  timeStart: Date;
  timeEnd: Date;
  description: string;
};

type Event = {
  id: string;
  name: string;
  timeStart: Date;
  timeEnd: Date;
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
    | "Logout"
  >("Home");
  const [dayName, setDayName] = useState<string>("");
  const [days, setDays] = useState<Record<string, Task[]>>({});
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      setIsLoggedIn(false);
      setDisplayedComponent("Home");
    }
  }, []);

  const handleDeleteTask = async (id: string) => {
    console.log("Deleting task with id:", id);

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8082/UserTask?taskId=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const updatedTasks = (days[dayName] || []).filter(
          (task) => task.id !== id
        );
        console.log("Updated tasks after deletion:", updatedTasks);
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
    console.log("Updating tasks for day:", dayName, newTasks);
    setDays((prevDays) => ({
      ...prevDays,
      [dayName]: newTasks,
    }));
  };

  const handleDeleteEvent = async (id: string) => {
    console.log("Deleting event with id:", id);

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8081/GlobalTasks?taskId=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const updatedEvents = events.filter((event) => event.id !== id);
        console.log("Updated events after deletion:", updatedEvents);
        setEvents(updatedEvents);
      } else {
        console.error("Error deleting event");
      }
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  const updateEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
  };

  const handleJoinEvent = async (id: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/GlobalTasks/AddParticipant?username=${username}&globalTaskId=${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log("Successfully joined the event");
      } else {
        console.error("Error joining event");
      }
    } catch (error) {
      console.error("Error joining event", error);
    }
  };

  const handleMenuItemClick = (dayName: string) => {
    console.log("Clicked menu item:", dayName);
    setDayName(dayName);
    setDisplayedComponent("Day");
  };

  const handleCalendarClick = () => {
    console.log("Clicked Calendar item");
    setDisplayedComponent("Calendar");
  };

  const handleEventClick = () => {
    setDisplayedComponent("Event");
  };

  const handleSidebarItemClick = (
    component: "Home" | "HomeForUsers" | "Day" | "Calendar" | "Event" | "Logout"
  ) => {
    if (component === "Home") {
      setIsLoggedIn(false);
      localStorage.removeItem("authToken");
    }
    setDisplayedComponent(component);
  };

  const handleLoginClick = () => {
    console.log("Clicked Login item");
    setDisplayedComponent("LoginPage");
  };

  const handleRegisterClick = () => {
    console.log("Clicked Register item");
    setDisplayedComponent("RegisterPage");
  };

  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    setDisplayedComponent("HomeForUsers");
  };

  window.onLoginClickScope = () => handleLoginClick();

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
            <RegisterPage onLoginClick={handleLoginClick}></RegisterPage>
          )}
          {displayedComponent === "Logout" && <LogoutComponent />}
          {displayedComponent === "Event" && (
            <EventComponent
              events={events}
              updateEvents={updateEvents}
              onDeleteEvent={handleDeleteEvent}
              username={username}
              onJoinEvent={handleJoinEvent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskPlanning;
