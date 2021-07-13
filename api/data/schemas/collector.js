let mongoose = require('mongoose');

let CollectorSchema = mongoose.Schema({
  collectorId: String,
  collectorFirstName: String,
  collectorLastName: String,
  collectorEmail: String,
  collectorPhoneNumber: String,
  collectorIdNumber: String,
  collectorAccountNumber: String,
  collectorBranchCode: String,
  collectorBankName: String,
  collectorStreetAddress: String,
  collectorCity: String,
  collectorPostalCode: String,
  collectorProvince: String,
  collectorCountry: String,
});

module.exports = CollectorSchema;
