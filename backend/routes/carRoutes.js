const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const auth = require('../middleware/auth');

router.post('/', auth, carController.createCar);
router.get('/', auth, carController.getCars);

module.exports = router;