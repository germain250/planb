const ParkingRecord = require('../models/ParkingRecord');

exports.getReports = async (req, res, next) => {
  try {
    const records = await ParkingRecord.find().populate('car parkingSlot');
    res.json(records);
  } catch (error) {
    next(error);
  }
};