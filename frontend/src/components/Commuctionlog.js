import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styling/Communicationlog.css'; 
import Navbar from './Navbar';
import Sidebar from './UserSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommunicationLog = () => {
  const { companyId } = useParams(); // Extract companyId from URL
  const [companyName, setCompanyName] = useState('');
  const [notes, setNotes] = useState('');
  const [communicationType, setCommunicationType] = useState('Email');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch company details
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const response = await fetch(`https://connecttly.onrender.com/api/companies/company/${companyId}`);
        if (!response.ok) throw new Error('Failed to fetch company details.');
        const data = await response.json();
        setCompanyName(data.name);
      } catch (error) {
        console.error(error.message);
        toast.error('Failed to fetch company details.');
      }
    };

    fetchCompanyName();
  }, [companyId]);

  // Log communication
  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://connecttly.onrender.com/api/commuction/communication', {
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
      toast.success('Communication logged successfully!');
      
      // Reset fields
      setNotes('');
      setCommunicationType('Email');
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to log communication. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer /> {/* Toast container to display notifications */}
      <div style={{ display: 'flex', flex: '1', gap: '250px' }}>
        <Sidebar style={{ width: '20%' }} />
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
            <button 
              onClick={handleSubmit} 
              className="button-commuctionlog" 
              disabled={loading} // Disable button during loading
            >
              {loading ? 'Updating...' : 'Update Task'} {/* Show loading text */}
            </button>
          </div>

          {successMessage && (
            <div className="success-message-commuctionlog">
              Next scheduled date is {successMessage} for company {companyName}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationLog;
