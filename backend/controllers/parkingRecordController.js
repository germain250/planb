const ParkingRecord = require('../models/ParkingRecord');
const ParkingSlot = require('../models/ParkingSlot');

exports.createParkingRecord = async (req, res, next) => {
  try {
    const { car, parkingSlot, entryTime } = req.body;
    const slot = await ParkingSlot.findById(parkingSlot);
    if (!slot || slot.slotStatus === 'occupied') {
      return res.status(400).json({ message: 'Slot is unavailable' });
    }

    const record = new ParkingRecord({ car, parkingSlot, entryTime });
    slot.slotStatus = 'occupied';
    await slot.save();
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

exports.getParkingRecords = async (req, res, next) => {
  try {
    const records = await ParkingRecord.find().populate('car parkingSlot');
    res.json(records);
  } catch (error) {
    next(error);
  }
};

exports.getParkingRecordById = async (req, res, next) => {
  try {
    const record = await ParkingRecord.findById(req.params.id).populate('car parkingSlot');
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    next(error);
  }
};

exports.updateParkingRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { exitTime } = req.body;
    const record = await ParkingRecord.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    if (exitTime) {
      record.exitTime = exitTime;
      const slot = await ParkingSlot.findById(record.parkingSlot);
      slot.slotStatus = 'available';
      await slot.save();
    }
    await record.save();
    res.json(record);
  } catch (error) {
    next(error);
  }
};

exports.deleteParkingRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await ParkingRecord.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    if (!record.exitTime) {
      const slot = await ParkingSlot.findById(record.parkingSlot);
      slot.slotStatus = 'available';
      await slot.save();
    }
    await record.deleteOne();
    res.json({ message: 'Record deleted' });
  } catch (error) {
    next(error);
  }
};