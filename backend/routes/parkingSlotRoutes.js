const express = require('express');
const router = express.Router();
const parkingSlotController = require('../controllers/parkingSlotController');
const auth = require('../middleware/auth');

router.post('/', auth, parkingSlotController.createParkingSlot);
router.get('/', auth, parkingSlotController.getParkingSlots);

module.exports = router;