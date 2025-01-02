import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import CompanyList from './components/CompanyList';
import PastCommuctionList from './components/PastCommuctionList';
import OverdueTask from './components/OverdueTask';
import Commuctionlog from './components/Commuctionlog';
import CalendarApp from './components/Calander';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/companylist" element={<CompanyList/>} />
        <Route path="/pastlist" element={<PastCommuctionList/>} />
        <Route path="/overdue" element={<OverdueTask/>} />
        <Route path="/communicationlog/:companyId" element={<Commuctionlog />} />
        <Route path="/calender" element={<CalendarApp/>} />
        


      </Routes>
    </Router>
  );
};

export default App;
