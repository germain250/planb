const express = require('express');
const router = express.Router();
const parkingRecordController = require('../controllers/parkingRecordController');
const auth = require('../middleware/auth');

router.post('/', auth, parkingRecordController.createParkingRecord);
router.get('/', auth, parkingRecordController.getParkingRecords);
router.get('/:id', auth, parkingRecordController.getParkingRecordById);
router.put('/:id', auth, parkingRecordController.updateParkingRecord);
router.delete('/:id', auth, parkingRecordController.deleteParkingRecord);

module.exports = router;