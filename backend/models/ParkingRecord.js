const mongoose = require('mongoose');
const { calculateFee } = require('../utils/feeCalculator');

const parkingRecordSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  parkingSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  duration: { type: Number },
  fee: { type: Number },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Calculate duration and fee before saving
parkingRecordSchema.pre('save', function(next) {
  if (this.exitTime && this.entryTime) {
    const diff = this.exitTime - this.entryTime;
    this.duration = diff / (1000 * 60 * 60); // Convert ms to hours
    this.fee = calculateFee(this.duration);
  }
  next();
});

module.exports = mongoose.model('ParkingRecord', parkingRecordSchema);