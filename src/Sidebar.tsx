import {
  HomeIcon,
  CalendarIcon,
  RocketIcon,
  ExitIcon,
} from "@radix-ui/react-icons";

interface Sidebar {
  onSidebarItemClick: (
    component: "Home" | "HomeForUsers" | "Day" | "Calendar" | "Event" | "Logout"
  ) => void;
}

function Sidebar({ onSidebarItemClick }: Sidebar) {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    onSidebarItemClick("Home");
  };

  return (
    <div className="sidebar">
      <ul>
        <li
          className="sidebarlogo"
          style={{ marginTop: "12px", fontSize: "20px", fontWeight: "bold" }}
        >
          T4SK3R
        </li>
        <li className="sidebartext">
          <a
            onClick={() => onSidebarItemClick("HomeForUsers")}
            className="homeee"
          >
            <HomeIcon style={{ scale: "1.7" }} />
          </a>
        </li>
        <li className="sidebartext">
          <a
            onClick={() => onSidebarItemClick("Calendar")}
            className="calendarrr"
          >
            <CalendarIcon style={{ scale: "1.7" }} />
          </a>
        </li>
        <li className="sidebartext">
          <a onClick={() => onSidebarItemClick("Event")} className="eventtt">
            <RocketIcon style={{ scale: "1.7" }} />
          </a>
        </li>
        <li className="sidebartext sidebarlogout">
          <a onClick={handleLogout} className="logouttt">
            <ExitIcon style={{ scale: "1.7" }} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
