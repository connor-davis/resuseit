let mongoose = require('mongoose');

let CollectionSchema = mongoose.Schema({
  collectionId: String,
  collectionDescription: String,
  collectionDate: Date,
  collectionMass: Number,

  // Collector Data

  collectorId: String,
  collectorEarnings: Number,

  // Product Data

  productId: String,
  productValue: Number,
});

module.exports = CollectionSchema;
