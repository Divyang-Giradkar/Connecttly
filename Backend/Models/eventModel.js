const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  user:{type : mongoose.Schema.Types.ObjectId, ref:'User'},
  date: { type: Date, required: true },
  note: { type: String },
  contactType: { type: String },


});

module.exports = mongoose.model('Event', EventSchema);
