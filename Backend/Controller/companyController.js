const Company = require('../Models/companyModel');


// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the company name already exists
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company name already exists' });
    }

    // Create a new company
    const company = new Company(req.body);
    await company.save();

    // Return success message and company info
    res.status(201).json({
      message: 'Company created successfully',
          // Return the company ID
      company, // You can also return the company object if needed
    });
  } catch (err) {
    res.status(400).json({ message: 'Error creating company', error: err });
  }
};




// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching companies', error: err });
  }
};




// Edit a company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Company updated successfully', company });
  } catch (err) {
    res.status(400).json({ message: 'Error updating company', error: err });
  }
};



// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting company', error: err });
  }
};




// get company by id 

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching company', error: err });
  }
};



