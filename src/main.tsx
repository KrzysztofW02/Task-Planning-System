import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import "./index.css";
import TaskPlanning from "./TaskPlanning.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //react odrazu używa <tutaj> TaskPlanning zamiat domyślnego App
  <React.StrictMode>
    <TaskPlanning/>
  </React.StrictMode>
);
