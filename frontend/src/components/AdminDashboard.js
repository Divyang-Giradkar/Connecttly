import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './UserSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styling/Admin.css';

const AdminDashboard = () => {
  const [companyData, setCompanyData] = useState({
    companyName: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    dateOfCommunication: '',
    comments: '',
    communicationPeriod: '1 week',
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit data to backend and create a company
  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const postData = {
        name: companyData.companyName,
        location: companyData.location,
        linkedInProfile: companyData.linkedInProfile,
        emails: companyData.emails.split(',').map((email) => email.trim()), // Split emails by comma
        phoneNumbers: companyData.phoneNumbers.split(',').map((phone) => phone.trim()), // Split phone numbers by comma
        comments: companyData.comments,
        communicationPeriodicity: companyData.communicationPeriod,
        nextCommunicationDate: companyData.dateOfCommunication,
      };

      const response = await axios.post(
        'https://connecttly.onrender.com/api/companies/company',
        postData
      );

      // Show success notification
      toast.success(response.data.message || 'Company created successfully!');

      // Reset form fields
      setCompanyData({
        companyName: '',
        location: '',
        linkedInProfile: '',
        emails: '',
        phoneNumbers: '',
        dateOfCommunication: '',
        comments: '',
        communicationPeriod: '1 week',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show error notification
      toast.error('Failed to submit data. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer /> {/* Toast container to display notifications */}
      <div style={{ display: 'flex', gap: '50px' }}>
        <Sidebar />
        <div>
          <form onSubmit={handleCompanySubmit} className="adminform">
            <h2>Add Details of Company</h2>
            {loading ? (
              <p>Loading...</p> // Display loading message
            ) : (
              <>
                <div className="companyDataField-admin">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={companyData.companyName}
                    onChange={handleChange}
                    placeholder="Enter Company Name"
                  />
                </div>
                <div className="companyDataField-admin">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={companyData.location}
                    onChange={handleChange}
                    placeholder="Enter Location"
                  />
                </div>
                <div className="companyDataField-admin">
                  <label htmlFor="linkedInProfile">LinkedIn Profile</label>
                  <input
                    type="text"
                    id="linkedInProfile"
                    name="linkedInProfile"
                    value={companyData.linkedInProfile}
                    onChange={handleChange}
                    placeholder="Enter LinkedIn Profile"
                  />
                </div>
                <div className="companyDataField-admin">
                  <label htmlFor="emails">Emails </label>
                  <input
                    type="text"
                    id="emails"
                    name="emails"
                    value={companyData.emails}
                    onChange={handleChange}
                    placeholder="Enter Emails"
                  />
                </div>
                <div className="companyDataField-admin">
                  <label htmlFor="phoneNumbers">Phone Numbers </label>
                  <input
                    type="text"
                    id="phoneNumbers"
                    name="phoneNumbers"
                    value={companyData.phoneNumbers}
                    onChange={handleChange}
                    placeholder="Enter Phone Numbers"
                  />
                </div>
                <div className="companyDataField-admin">
                  <label htmlFor="dateOfCommunication">Date of Communication</label>
                  <input
                    type="date"
                    id="dateOfCommunication"
                    name="dateOfCommunication"
                    value={companyData.dateOfCommunication}
                    onChange={handleChange}
                  />
                </div>
                <div className="companyDataField-admin">
                  <label htmlFor="comments">Comments</label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={companyData.comments}
                    onChange={handleChange}
                    placeholder="Enter Comments"
                  />
                </div>
                <div className="companyDataField-admin">
                  <label htmlFor="communicationPeriod">Communication Period</label>
                  <select
                    id="communicationPeriod"
                    name="communicationPeriod"
                    value={companyData.communicationPeriod}
                    onChange={handleChange}
                  >
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="3 weeks">3 weeks</option>
                  </select>
                </div>
                <button type="submit" disabled={loading}>
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
