let mongoose = require('mongoose');

let CollectorSchema = mongoose.Schema({
  collectorId: String,
  collectorFirstName: String,
  collectorLastName: String,
  collectorEmail: String,
  collectorPhoneNumber: Number,
  collectorIdNumber: Number,
  collectorAccountNumber: Number,
  collectorBranchCode: Number,
  collectorBankName: String,
  collectorStreetAddress: String,
  collectorCity: String,
  collectorPostalCode: Number,
  collectorProvince: String,
  collectorCountry: String,
});

module.exports = CollectorSchema;
