import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './UserSidebar';
import '../styling/Calendar.css';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesResponse = await axios.get('http://localhost:5000/api/companies/companies');
        const companies = companiesResponse.data;

        const eventPromises = companies.map(async (company) => {
          const communicationsResponse = await axios.get(`http://localhost:5000/api/commuction/communications/company/${company._id}`);
          const communications = communicationsResponse.data;

          const communicationEvents = communications.map((comm) => ({
            title: `${company.name} - ${comm.communicationType}`,
            date: comm.communicationDate,
            extendedProps: {
              notes: comm.notes,
            },
          }));

          const nextCommunicationDate = company.nextCommunicationDate;
          if (nextCommunicationDate) {
            const nextDate = new Date(nextCommunicationDate);
            const today = new Date();
            const highlightColor =
              nextDate < today
                ? 'red'
                : nextDate.toDateString() === today.toDateString()
                ? 'yellow'
                : 'green';

            communicationEvents.push({
              title: `${company.name} - Next Communication`,
              date: nextCommunicationDate,
              backgroundColor: highlightColor,
              borderColor: highlightColor,
            });
          }

          return communicationEvents;
        });

        const allEvents = (await Promise.all(eventPromises)).flat();
        setEvents(allEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleEventClick = (info) => {
    const isOverdue = info.event.backgroundColor === 'red';
    if (isOverdue) {
      navigate('/overdue', { state: { eventDetails: info.event.extendedProps } });
    } else {
      alert(`Notes: ${info.event.extendedProps.notes}`);
    }
  };

  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  console.log(currentDate); // Verify if the current date is correct

  return (
    <div className="calendar-container">
      <Navbar />
      <div className="calendar-layout">
        <Sidebar />
        <div className="calendar-content">
          <div className="calendar-legend">
            <h4>Event Highlight Legend</h4>
            <ul>
              <li><span className="red-circle"></span> Overdue - Red</li>
              <li><span className="green-circle"></span> Upcoming - Green</li>
              <li><span className="blue-circle"></span> Past Events - Blue</li>
            </ul>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            height="auto"
            dayCellDidMount={(info) => {
              // Log the current date cell to check the date
              console.log(info.dateStr, currentDate); // Log to check if the dates match
              
              // Compare the date of the cell with the current date
              if (info.dateStr === currentDate) {
                const cell = info.el;
                
                // Apply styling to highlight today's date
                cell.style.backgroundColor = '#ffcc00'; // Yellow background for today
                cell.style.color = 'white'; // White text color
                cell.style.fontWeight = 'bold'; // Bold text for today's date
                cell.style.border = '2px solid #ff9900'; // Border to distinguish today
                
                // Optional: Add "Today" label to the cell
                const indicator = document.createElement('span');
                indicator.innerText = 'Today';
                indicator.style.position = 'absolute';
                indicator.style.top = '5px';
                indicator.style.left = '5px';
                indicator.style.fontSize = '12px';
                indicator.style.backgroundColor = '#ff9900';
                indicator.style.color = 'white';
                indicator.style.padding = '2px 5px';
                indicator.style.borderRadius = '3px';
                cell.appendChild(indicator);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
