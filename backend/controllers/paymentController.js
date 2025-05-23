const Payment = require('../models/Payment');
const ParkingRecord = require('../models/ParkingRecord');

exports.createPayment = async (req, res, next) => {
  try {
    const { parkingRecord, amountPaid } = req.body;
    const record = await ParkingRecord.findById(parkingRecord);
    if (!record) {
      return res.status(404).json({ message: 'Parking record not found' });
    }
    const payment = new Payment({ parkingRecord, amountPaid });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate({
      path: 'parkingRecord',
      populate: { path: 'car' },
    });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};