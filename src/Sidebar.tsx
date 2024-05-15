import { HomeIcon, CalendarIcon, RocketIcon } from "@radix-ui/react-icons";

interface Sidebar {
  onSidebarItemClick: (component: "Home" | "Day" | "Calendar") => void;

}

function Sidebar({onSidebarItemClick}: Sidebar) {
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
          <a onClick={() => onSidebarItemClick("Home")}>
            <HomeIcon style={{ scale: "1.7" }}/>
          </a>
        </li>
        <li className="sidebartext">
          <a onClick={() => onSidebarItemClick("Calendar")}>
            <CalendarIcon style={{ scale: "1.7" }} />
          </a>
        </li>
        <li className="sidebartext">
          <a>
            <RocketIcon style={{ scale: "1.7" }} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
