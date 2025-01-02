import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import '../styling/PastCommunicationList.css';

const PastCommunicationList = () => {
  const [companyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/companies/companies");
      if (!response.ok) throw new Error("Failed to fetch companies.");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching companies: " + error.message);
    }
  };

  const fetchCompanyCommunications = async (companyId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/commuction/communications/company/${companyId}`
      );
      if (!response.ok) throw new Error(`Failed to fetch communications for company ${companyId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching communications: " + error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const isPastDate = (dateString) => new Date(dateString) < new Date();
  const isTodayDate = (dateString) =>
    new Date(dateString).toDateString() === new Date().toDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await fetchCompanies();
        const companiesWithCommunications = await Promise.all(
          companies.map(async (company) => {
            const communications = await fetchCompanyCommunications(company._id);
            const sortedCommunications = communications.sort(
              (a, b) => new Date(b.communicationDate) - new Date(a.communicationDate)
            );
            const latestCommunications = sortedCommunications.slice(0, 5);
            return { ...company, communications: latestCommunications };
          })
        );
        setCompanyData(companiesWithCommunications);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container-pastlist">
      <Navbar />
      <div className="content-wrapper-pastlist">
        <UserSidebar />
        <div className="company-list-pastlist">
          <h1 className="title-pastlist">Company Communications</h1>
          <button onClick={() => navigate('/companylist')}>All Companies Details</button>
          <div className="grid-pastlist">
            {companyData.map((company) => (
              <div key={company._id} className="card-pastlist">
                <h3>{company.name}</h3>
                <p
                  className={`next-communication-date ${
                    isPastDate(company.nextCommunicationDate)
                      ? 'red-pastlist'
                      : isTodayDate(company.nextCommunicationDate)
                      ? 'green-pastlist'
                      : ''
                  }`}
                  style={{margin:'1px'}}>
                  Next Communication Date: {formatDate(company.nextCommunicationDate)}
                </p>
                <p style={{margin:'1px'}}><strong>Location:</strong> {company.location}</p>
                <h4 style={{margin:'6px'}}>Communications:-Last 5  communication</h4>
                <div className="communication-list-pastlist">
                  {company.communications.length > 0 ? (
                    company.communications.map((comm, index) => (
                      <div key={index} className="communication-card-pastlist">
                        <p style={{margin:'1px'}}><strong>Type:</strong> {comm.communicationType}</p>
                        <p style={{margin:'1px'}}><strong>Date:</strong> {formatDate(comm.communicationDate)}</p>
                        <p style={{margin:'1px'}}><strong>Notes:</strong> {comm.notes}</p>
                      </div>
                    ))
                  ) : (
                    <p>No communications available.</p>
                  )}
                </div>
               
                  <button onClick={() => navigate(`/communicationlog/${company._id}`)} >
                    Communication Log
                  </button>
              
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastCommunicationList;
