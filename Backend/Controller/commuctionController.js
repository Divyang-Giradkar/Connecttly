const Communication = require('../Models/CommuctionModel');
const Company = require('../Models/companyModel');

// test mode 

const moment = require('moment'); // To help with date manipulation

exports.logCommunication = async (req, res) => {
  try {
    const { companyId, communicationType, notes } = req.body;

    // Set communicationDate to today's date if not provided in the request
    const communicationDate = moment().toDate();

    // Create a new communication log without requiring communicationDate in the request
    const communication = new Communication({
      companyId,
      communicationType,
      communicationDate, // Use today's date for communicationDate
      notes,
    });
    await communication.save();

    // Find the company to get its communicationPeriodicity
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Parse the communicationPeriodicity value to calculate the next communication date
    const today = moment(); // Get today's date
    let nextCommunicationDate;

    if (company.communicationPeriodicity.includes('week')) {
      // Assuming communicationPeriodicity is in the format "X weeks"
      const weeks = parseInt(company.communicationPeriodicity.split(' ')[0], 10);
      nextCommunicationDate = today.add(weeks, 'weeks').toDate();
    } else if (company.communicationPeriodicity.includes('month')) {
      // Assuming communicationPeriodicity is in the format "X month" or "X months"
      const months = parseInt(company.communicationPeriodicity.split(' ')[0], 10);
      nextCommunicationDate = today.add(months, 'months').toDate();
    } else {
      // Handle other formats if necessary
      return res.status(400).json({ message: 'Invalid communication periodicity' });
    }

    // Update the company with the new nextCommunicationDate
    company.nextCommunicationDate = nextCommunicationDate;
    await company.save();

    // Return the response with communication details and the updated nextCommunicationDate
    res.status(201).json({
      message: 'Communication logged successfully',
      communication,
      nextCommunicationDate,
    });
  } catch (err) {
    res.status(400).json({ message: 'Error logging communication', error: err });
  }
};



//test mode ebd 


// // Log a new communication
// exports.logCommunication = async (req, res) => {
//   try {
//     const { companyId, communicationType, communicationDate, notes } = req.body;
//     const communication = new Communication({ companyId, communicationType, communicationDate, notes });
//     await communication.save();

//     // Update next communication date in company
//     const company = await Company.findById(companyId);
//     company.nextCommunicationDate = new Date(communicationDate);
//     await company.save();

//     res.status(201).json({ message: 'Communication logged successfully', communication });
//   } catch (err) {
//     res.status(400).json({ message: 'Error logging communication', error: err });
//   }
// };

// Get communications for a specific company
exports.getCommunicationsByCompany = async (req, res) => {
  try {
    const communications = await Communication.find({ companyId: req.params.companyId });
    res.status(200).json(communications);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching communications', error: err });
  }
};

// Get all overdue communications
exports.getOverdueCommunications = async (req, res) => {
  try {
    const companies = await Company.find();
    const overdueCompanies = [];

    for (const company of companies) {
      if (new Date(company.nextCommunicationDate) < new Date()) {
        overdueCompanies.push(company);
      }
    }

    res.status(200).json(overdueCompanies);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching overdue communications', error: err });
  }
};




// Get all communications for all companies
exports.getAllCommunications = async (req, res) => {
  try {
    // Fetch all communications, including company info
    const communications = await Communication.find()
      .populate('companyId', 'name')  // Optional: Populate company name
      .select('_id communicationDate notes companyId');  // Select specific fields (ID, date, and notes)

    res.status(200).json(communications);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching communications', error: err });
  }
};
