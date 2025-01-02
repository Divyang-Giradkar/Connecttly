import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import '../styling/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [companyCount, setCompanyCount] = useState(0);
    const [tasksDue, setTasksDue] = useState([]);
    const [message, setMessage] = useState("");
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch('https://connecttly.onrender.com/api/companies/companies');
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                const uniqueCompanyCount = new Set(data.map(company => company._id)).size;
                setCompanyCount(uniqueCompanyCount);

                const today = new Date().toISOString().split("T")[0];
                const dueToday = data.filter(company => {
                    const nextDate = company.nextCommunicationDate
                        ? new Date(company.nextCommunicationDate).toISOString().split("T")[0]
                        : null;
                    return nextDate === today;
                });

                setTasksDue(dueToday);
                setMessage(dueToday.length > 0 ? "" : "No tasks are due today.");
            } catch (err) {
                console.error(err);
            }
        };

        fetchCompanyData();
    }, []);

    useEffect(() => {
        const fetchOverdueTasks = async () => {
            try {
                const response = await fetch('https://connecttly.onrender.com/api/commuction/communications/overdue');
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                setOverdueTasks(data.filter(task => task.nextCommunicationDate));
            } catch (err) {
                console.error(err);
                setError("Failed to fetch overdue tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchOverdueTasks();
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <UserSidebar />
                <main className="dashboard-main-content">
                    <h1 className="dashboard-header">Dashboard</h1>
                    <div className="dashboard-card-container">
                        {/* Companies Registered Card */}
                        <div className="dashboard-card short-width">
                            <h2>No of Companies Registered</h2>
                            <div className="dashboard-card-number">{companyCount}</div>
                            <p>No of companies registered</p>
                            <button className="dashboard-view-all-btn" onClick={() => navigate('/companylist')}>View All Companies</button>
                        </div>

                        {/* Overdue Tasks Card */}
                        <div className="dashboard-card" >
                            <h2 style={{color:"red"}}>Overdue Tasks</h2>
                            {loading ? (
                                <p>Loading overdue tasks...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <div className="dashboard-task-list">
                                    <ul>
                                        {overdueTasks.map(task => (
                                            <li key={task._id}>
                                                <p style={{color:"red", background:'#F2F2F2'}}><strong style={{color:"red", background:'#F2F2F2'}}>Company:</strong> {task.name}</p>
                                                <p><strong style={{color:"red", background:'#F2F2F2'}}>Date:</strong> {new Date(task.nextCommunicationDate).toLocaleDateString()}</p>
                                                <p><strong style={{color:"red", background:'#F2F2F2'}}>Comments:</strong> {task.comments || "No comments"}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                                
                            <button className="dashboard-quick-fix-btn" onClick={() => navigate('/overdue')}>Quick Fix</button>
                        </div>

                        {/* Tasks Due Today Card */}
                        <div className="dashboard-card">
                            <h2>Tasks Due Today</h2>
                            {tasksDue.length > 0 ? (
                                <div className="dashboard-task-list">
                                    <ul>
                                        {tasksDue.map(task => (
                                            <li key={task._id}>
                                                <p><strong>Company:</strong> {task.name}</p>
                                                <p><strong>Comments:</strong> {task.comments || "No comments"}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>{message}</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
