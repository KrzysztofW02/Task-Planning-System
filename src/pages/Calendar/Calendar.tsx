import "./Calendar.css";
import React from "react";
import pl from "date-fns/locale/pl";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { Task } from "../Day/Type";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
registerLocale("pl", pl);

interface CalendarComponentProps {
  onMenuClick: (dayName: string) => void;
  days: Record<string, Task[]>;
}

function CalendarComponent({ onMenuClick, days }: CalendarComponentProps) {
  const handleDayClick = async (date: Date) => {
    const formattedDate = date.toLocaleDateString();
    onMenuClick(formattedDate);
  };

  const highlightWithTasks = (date: Date) => {
    const formattedDate = date.toLocaleDateString();
    return days[formattedDate] ? "day-with-tasks" : null;
  };

  return (
    <div className="calendar-container">
      <DatePicker
        locale="pl"
        inline
        onChange={handleDayClick}
        dayClassName={highlightWithTasks}
        calendarClassName="custom-calendar"
      />
    </div>
  );
}

export default CalendarComponent;
