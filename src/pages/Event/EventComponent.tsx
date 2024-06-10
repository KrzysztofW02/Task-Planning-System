import React, { useState, useEffect } from "react";
import Event from "./Event";
import EventForm from "./EventForm";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

interface Event {
  id: string;
  name: string;
  timeStart: Date;
  timeEnd: Date;
}

interface BackendEvent {
  _id: string;
  taskName: string;
  taskStart: string;
  taskEnd: string;
}

interface EventComponentProps {
  events: Event[];
  updateEvents: (newEvents: Event[]) => void;
  onDeleteEvent: (id: string) => void;
  username: string;
  onJoinEvent: (id: string) => void;
}

const EventComponent: React.FC<EventComponentProps> = ({
  events,
  updateEvents,
  onDeleteEvent,
  onJoinEvent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8081/GlobalTasks/`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.status === 200) {
        const events: Event[] = response.data.map((event: BackendEvent) => ({
          id: event._id,
          name: event.taskName,
          timeStart: new Date(event.taskStart),
          timeEnd: new Date(event.taskEnd),
        }));
        updateEvents(events);
      } else {
        console.error("Error fetching events");
      }
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddOrEditEvent = async (
    id: string,
    name: string,
    timeStart: Date,
    timeEnd: Date
  ) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      if (id) {
        await axios.delete(`http://localhost:8081/GlobalTasks?taskId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const newBackendEvent: Partial<BackendEvent> = {
        taskName: name,
        taskStart: timeStart.toISOString(),
        taskEnd: timeEnd.toISOString(),
      };

      const response = await axios.post(
        "http://localhost:8081/GlobalTasks/",
        newBackendEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        fetchEvents();
      } else {
        console.error("Error adding or editing event");
      }
    } catch (error) {
      console.error("Error adding or editing event", error);
    }

    setIsModalOpen(false);
  };

  const handleClearEvents = () => {
    updateEvents([]);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "50%",
      borderRadius: "20px",
      backgroundColor: "#000000aa",
    },
  };

  return (
    <>
      <div className="container datedaygrid">
        <div className="menu">
          <div className="menu-header">
            <button
              onClick={() => {
                setSelectedEvent(null);
                setIsModalOpen(true);
              }}
            >
              Add New Event
            </button>
          </div>
          <div className="menu-items">
            {events.length === 0 ? (
              <p className="centered-caption">No events assigned</p>
            ) : (
              events.map((event, index) => (
                <Event
                  key={event.id || index}
                  event={event.name}
                  id={event.id}
                  onDeleteEvent={onDeleteEvent}
                  onClick={() => handleEventClick(event)}
                  onJoinEvent={onJoinEvent}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <EventForm
          onSave={handleAddOrEditEvent}
          onCancel={() => setIsModalOpen(false)}
          initialEvent={selectedEvent}
        />
      </Modal>
    </>
  );
};

export default EventComponent;
