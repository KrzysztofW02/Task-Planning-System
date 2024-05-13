interface Sidebar {
  onSidebarItemClick: (component: "Home" | "Day" | "Calendar") => void;

}

function Sidebar({onSidebarItemClick}: Sidebar) {
  return (
    <div className="sidebar">
      <ul>
        <li
          className="sidebartext"
          style={{ marginTop: "12px", fontSize: "20px", fontWeight: "bold"}}
        >
          T4SK3R
        </li>
        <li className="sidebartext">
          <a onClick={()=>onSidebarItemClick("Home")}>Home</a>
        </li>
        <li className="sidebartext">
          <a onClick={()=> onSidebarItemClick("Calendar")}>Kalendarz</a>
        </li>
        <li className="sidebartext">
          <a>Wydarzenia</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
