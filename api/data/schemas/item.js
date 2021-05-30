let mongoose = require('mongoose');

let ItemSchema = mongoose.Schema({
  itemId: String,
  itemDescription: String,
  itemMaterial: String,
  itemValue: Number,
});

module.exports = ItemSchema;
