import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styling/CompanyList.css';
import Navbar from "./Navbar";
import UserSidebar from "./UserSidebar";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [role] = useState(localStorage.getItem("role")); // Fetch user role
  const [editModalData, setEditModalData] = useState(null); // For the edit modal

  
  // get data of all copmanies  

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://connecttly.onrender.com/api/companies/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCompanies();
  }, []);

  //  handle to delete company 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://connecttly.onrender.com/api/companies/company/${id}`);
      setCompanies((prev) => prev.filter((company) => company._id !== id));
      alert("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Error deleting company. Please try again.");
    }
  };

  // handle to edit companies details 

  const handleEditSave = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://connecttly.onrender.com/api/companies/company/${editModalData._id}`,
        updatedData
      );
      const updatedCompany = response.data.company;

      setCompanies((prev) =>
        prev.map((company) => (company._id === updatedCompany._id ? updatedCompany : company))
      );
      alert("Company updated successfully");
      setEditModalData(null); // Close modal
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Error updating company. Please try again.");
    }
  };

  // to change date format in date/month/year

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // use to comapre date with today to give color highlight

  const getDateStatus = (dateString) => {
    if (!dateString) return "";

    const today = new Date().setHours(0, 0, 0, 0);
    const date = new Date(dateString).setHours(0, 0, 0, 0);

    if (date < today) return "past";
    if (date === today) return "today";
    return "future";
  };



  return (
    <div>
      <Navbar />
      <div className="companylist-container">
        <UserSidebar />
       
       {/* edit form available only when we cick on edit buttom */}
      {editModalData && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Company</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedData = {
                  name: e.target.name.value,
                  location: e.target.location.value,
                  linkedInProfile: e.target.linkedInProfile.value,
                  emails: e.target.emails.value.split(","),
                };
                handleEditSave(updatedData);
              }}
            >
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  defaultValue={editModalData.name}
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  defaultValue={editModalData.location}
                  required
                />
              </label>
              <label>
                LinkedIn Profile:
                <input
                  type="url"
                  name="linkedInProfile"
                  defaultValue={editModalData.linkedInProfile}
                />
              </label>
              <label>
                Emails (comma-separated):
                <input
                  type="text"
                  name="emails"
                  defaultValue={editModalData.emails?.join(", ")}
                />
              </label>
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditModalData(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      
        <div className="companylist-content">
          <h1>Company List</h1>
          <div className="companylist-grid">
            {companies.map((company) => (
              <div key={company._id} className="companylist-card">
                <h1>{company.name}</h1>
                <p>
                  <strong>Location:</strong> {company.location}
                </p>
                <p>
                  <strong>Last Communication:</strong> {company.comments || "N/A"}
                </p>
                <p>
                  <strong>Emails:</strong> {company.emails?.join(", ") || "N/A"}
                </p>
                <p>
                  <strong>Phone Numbers:</strong>{" "}
                  {company.phoneNumbers?.join(", ") || "N/A"}
                </p>
                <p className={`date ${getDateStatus(company.nextCommunicationDate)}`}>
                  <strong>Next Communication Date:</strong>{" "}
                  {formatDate(company.nextCommunicationDate)}
                </p>
                {role === "admin" && (
                  <div className="admin-actions">
                    <button onClick={() => setEditModalData(company)}>Edit</button>
                    <button onClick={() => handleDelete(company._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CompanyList;
