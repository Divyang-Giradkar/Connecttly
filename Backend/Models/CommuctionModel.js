const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  communicationType: { type: String, required: true }, // E.g., "LinkedIn Post", "Email"
  communicationDate: { type: Date, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Communication', communicationSchema);
