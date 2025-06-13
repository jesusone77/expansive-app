const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', LocationSchema);
