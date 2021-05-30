let mongoose = require('mongoose');

let CollectorSchema = mongoose.Schema({
  collectorId: String,
  collectorFirstName: String,
  collectorLastName: String,
  collectorPhoneNumber: Number,
  collectorIdNumber: Number,
  collectorEmail: String,
  collectorPassword: String,
  collectorAccountNumber: Number,
  collectorBranchCode: Number,
  collectorBankName: String,
  collectorStreetAddress: String,
  collectorCity: String,
  collectorAreaCode: Number,
  collectorProvince: String,
  collectorCountry: String,
});

module.exports = CollectorSchema;
