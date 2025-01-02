import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styling/Communicationlog.css'; 
import Navbar from './Navbar';
import Sidebar from './UserSidebar';

const CommunicationLog = () => {
  const { companyId } = useParams(); // Extract companyId from URL
  const [companyName, setCompanyName] = useState('');
  const [notes, setNotes] = useState('');
  const [communicationType, setCommunicationType] = useState('Email');
  const [successMessage, setSuccessMessage] = useState('');

  

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/companies/company/${companyId}`);
        if (!response.ok) throw new Error('Failed to fetch company details.');
        const data = await response.json();
        setCompanyName(data.name);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCompanyName();
  }, [companyId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/commuction/communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId, // Use the extracted companyId
          communicationType,
          notes,
        }),
      });

      if (!response.ok) throw new Error('Failed to log communication.');

      const data = await response.json();
      setSuccessMessage(data.nextCommunicationDate);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <div style={{display:'flex', flex:'1',gap:'250px'}}>
      <Sidebar style={{width:'20%'}}/>
      <div className="container-commuctionlog">
      <h1 className="heading-commuctionlog">
        Log Communication for <span className="company-name-commuctionlog">{companyName}</span>
      </h1>
      
      <div className="form-group-commuctionlog">
        <label className="label-commuctionlog">Communication Type</label>
        <select
          value={communicationType}
          onChange={(e) => setCommunicationType(e.target.value)}
          className="select-commuctionlog"
        >
          <option value="Email">Email</option>
          <option value="Call">Call</option>
          <option value="Meeting">Meeting</option>
        </select>
      </div>
        
      <div className="form-group-commuctionlog">
        <label className="label">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea-commuctionlog"
          placeholder="Add your notes here"
        />
      </div>
        
      <div className="flex justify-center mt-4">
        <button onClick={handleSubmit} className="button-commuctionlog">
          Update Task
        </button>
      </div>

      {successMessage && (
        <div className="success-message-commuctionlog">
         next shedule date is  {successMessage} for company {companyName}
        </div>
      )}
    </div>
      </div>
      
    </div>
    
  );
};

export default CommunicationLog;
