const express = require('express');
const router = express.Router();
const {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locationController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getLocations);
router.get('/:id', getLocationById);

router.post('/', authMiddleware, createLocation);
router.put('/:id', authMiddleware, updateLocation);
router.delete('/:id', authMiddleware, deleteLocation);

module.exports = router;
