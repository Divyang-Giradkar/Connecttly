import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import Navbar from "./Navbar";
import '../styling/OverdueTask.css';

const OverdueTask = () => {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const fetchOverdueTasks = async () => {
      try {
        const response = await fetch('https://connecttly.onrender.com/api/commuction/communications/overdue');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        // Filter out tasks with invalid or missing `nextCommunicationDate`
        const filteredTasks = data.filter((task) => task.nextCommunicationDate);
        setOverdueTasks(filteredTasks);
        setError(""); // Clear any previous errors
      } catch (err) {
        console.error("Failed to fetch overdue tasks:", err);
        setError("Failed to fetch overdue tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOverdueTasks();
  }, []);

  return (
    <div className="overdue-task-container">
      <Navbar />
      <div className="overdue-content-wrapper">
        <UserSidebar />
        <div className="overdue-main-content">
          <div className="overdue-title-wrapper">
            <h1 className="overdue-title" style={{ color: "red", fontWeight: "bold" }}>
              Overdue Tasks
            </h1>
          </div>
          {loading ? (
            <p>Loading overdue tasks...</p>
          ) : error ? (
            <p className="overdue-error-message">{error}</p>
          ) : overdueTasks.length > 0 ? (
            <ul className="overdue-task-list">
              {overdueTasks.map((task) => (
                <li
                  key={task._id}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid red",
                    borderRadius: "4px",
                    backgroundColor: "#ffe5e5",
                  }}
                >
                  <p>
                    <strong>Company Name:</strong> {task.name || "N/A"}
                  </p>
                  <p>
                    <strong>Next Communication Date:</strong>{" "}
                    {task.nextCommunicationDate
                      ? new Date(task.nextCommunicationDate).toLocaleDateString()
                      : "Invalid Date"}
                  </p>
                  <p>
                    <strong>Comments:</strong> {task.comments || "No comments provided."}
                  </p>
                  <hr style={{ borderColor: "red" }} />
                  <button
                    style={{ padding: "5px", borderRadius: "5px" }}
                    onClick={() => navigate(`/communicationlog/${task._id}`)} // Navigating to the CommunicationLog component with companyId
                  >
                    Complete Task
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No overdue tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverdueTask;
