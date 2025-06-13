const Location = require('../models/Location');

// GET all
exports.getLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};

// GET by ID
exports.getLocationById = async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (!location) return res.status(404).json({ error: 'No encontrado' });
  res.json(location);
};

// POST new
exports.createLocation = async (req, res) => {
  const newLocation = new Location(req.body);
  await newLocation.save();
  res.status(201).json(newLocation);
};

// PUT update
exports.updateLocation = async (req, res) => {
  const updated = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(updated);
};

// DELETE
exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
