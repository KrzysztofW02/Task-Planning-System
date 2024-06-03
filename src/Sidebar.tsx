import { HomeIcon, CalendarIcon, RocketIcon, ExitIcon } from "@radix-ui/react-icons";

interface Sidebar {
  onSidebarItemClick: (
    component: "HomeForUsers" | "Day" | "Calendar" | "Event" | "Logout"
  ) => void;
}

function Sidebar({ onSidebarItemClick }: Sidebar) {
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
          <a onClick={() => onSidebarItemClick("HomeForUsers")}>
            <HomeIcon style={{ scale: "1.7" }} />
          </a>
        </li>
        <li className="sidebartext">
          <a onClick={() => onSidebarItemClick("Calendar")}>
            <CalendarIcon style={{ scale: "1.7" }} />
          </a>
        </li>
        <li className="sidebartext">
          <a onClick={() => onSidebarItemClick("Event")}>
            <RocketIcon style={{ scale: "1.7" }} />
          </a>
        </li>
        <li className="sidebartext sidebarlogout">
          <a onClick={()=> onSidebarItemClick("Logout")}></a>
          <ExitIcon style={{ scale: "1.7", }}></ExitIcon>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
