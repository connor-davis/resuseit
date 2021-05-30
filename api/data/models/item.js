let mongoose = require('mongoose');

module.exports = mongoose.model('Item', require('../schemas/item'));
