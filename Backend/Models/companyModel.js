const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique : true },
  location: { type: String },
  linkedInProfile: { type: String },
  emails: [{ type: String }],
  phoneNumbers: [{ type: String }],
  comments: { type: String },
  communicationPeriodicity: { type: String, required: true }, // e.g., "2 weeks"
  nextCommunicationDate: { type: Date },
});

module.exports = mongoose.model('Company', companySchema);
