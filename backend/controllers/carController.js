const Car = require('../models/Car');

exports.createCar = async (req, res, next) => {
  try {
    const { plateNumber, driverName, phoneNumber } = req.body;
    const existingCar = await Car.findOne({ plateNumber });
    if (existingCar) {
      return res.status(400).json({ message: 'Plate number already exists' });
    }
    const car = new Car({ plateNumber, driverName, phoneNumber });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};

exports.getCars = async (req, res, next) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    next(error);
  }
};