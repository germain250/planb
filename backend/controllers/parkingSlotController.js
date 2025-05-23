const ParkingSlot = require('../models/ParkingSlot');

exports.createParkingSlot = async (req, res, next) => {
  try {
    const { slotNumber } = req.body;
    const existingSlot = await ParkingSlot.findOne({ slotNumber });
    if (existingSlot) {
      return res.status(400).json({ message: 'Slot number already exists' });
    }
    const slot = new ParkingSlot({ slotNumber });
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    next(error);
  }
};

exports.getParkingSlots = async (req, res, next) => {
  try {
    const slots = await ParkingSlot.find();
    res.json(slots);
  } catch (error) {
    next(error);
  }
};