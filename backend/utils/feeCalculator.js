const calculateFee = (duration) => {
  const ratePerHour = 5; // $5 per hour
  return Math.ceil(duration) * ratePerHour;
};

module.exports = { calculateFee };