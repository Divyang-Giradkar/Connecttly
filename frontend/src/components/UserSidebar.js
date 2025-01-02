import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import '../styling/UserSidebar.css'; 

const Sidebar = () => {
  const location = useLocation(); 
  const role = localStorage.getItem('role'); // Get role from localStorage

  const renderUserLinks = () => (
    <>
      <Link
        to="/dashboard"
        className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
      >
        Home
      </Link>
      <Link
        to="/calender"
        className={`sidebar-item ${location.pathname === '/calender' ? 'active' : ''}`}
      >
        Calendar
      </Link>
      <Link
        to="/pastlist"
        className={`sidebar-item ${location.pathname === '/pastlist' ? 'active' : ''}`}
      >
        Communication Log
      </Link>
      <Link
        to="/overdue"
        className={`sidebar-item ${location.pathname === '/overdue' ? 'active' : ''}`}
      >
        Overdue Due
      </Link>
    </>
  );

  const renderAdminLinks = () => (
    <>
      <Link
        to="/admin-dashboard"
        className={`sidebar-item ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}
      >
        Admin Dashboard
      </Link>
      <Link
        to="/companylist"
        className={`sidebar-item ${location.pathname === '/companylist' ? 'active' : ''}`}
      >
        Company Setting
      </Link>
      <Link
        to="/calender"
        className={`sidebar-item ${location.pathname === '/calender' ? 'active' : ''}`}
      >
        Calander
      </Link>
      <Link
        to="/pastlist"
        className={`sidebar-item ${location.pathname === '/pastlist' ? 'active' : ''}`}
      >
        Past Commuction
      </Link>
      <Link
        to="/overdue"
        className={`sidebar-item ${location.pathname === '/overdue' ? 'active' : ''}`}
      >
        Overdue Tasks
      </Link>
    </>
  );

  return (
    <aside className="sidebar">
      {role === 'admin' ? renderAdminLinks() : renderUserLinks()}
    </aside>
  );
};

export default Sidebar;
