// Calendar.tsx
import React from "react";
import DatePicker from "react-datepicker";
import { Task } from "../Day/Type";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

interface CalendarComponentProps {
  onMenuClick: (dayName: string) => void;
  days: Record<string, Task[]>;
}

function CalendarComponent({ onMenuClick, days }: CalendarComponentProps) {
  const handleDayClick = async (date: Date) => {
    const formattedDate = date.toLocaleDateString();
    onMenuClick(formattedDate);

    /*try {
      const response = await axios.post("http://localhost:8082/", {
        date: formattedDate,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }*/
  };

  const highlightWithTasks = (date: Date) => {
    const formattedDate = date.toLocaleDateString();
    return days[formattedDate] ? "day-with-tasks" : null;
  };

  return (
    <div
      className="calendar-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <DatePicker
        inline
        onChange={handleDayClick}
        dayClassName={highlightWithTasks}
        calendarClassName="custom-calendar"
      />
    </div>
  );
}

export default CalendarComponent;
