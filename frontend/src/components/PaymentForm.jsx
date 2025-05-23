import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PaymentForm({ onPaymentCreated }) {
  const [parkingRecords, setParkingRecords] = useState([]);
  const [formData, setFormData] = useState({
    parkingRecord: '',
    amountPaid: '',
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get('/parking-records');
        setParkingRecords(response.data.filter(record => record.fee && !record.exitTime));
      } catch (error) {
        console.error('Error fetching parking records:', error);
      }
    };
    fetchRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/payments', formData);
      onPaymentCreated(response.data);
      setFormData({ parkingRecord: '', amountPaid: '' });
      alert('Payment recorded successfully');
    } catch (error) {
      alert('Error recording payment: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-brand-pink mb-4">Record Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.parkingRecord}
          onChange={(e) => setFormData({ ...formData, parkingRecord: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        >
          <option value="">Select Parking Record</option>
          {parkingRecords.map(record => (
            <option key={record._id} value={record._id}>
              {record.car.plateNumber} - ${record.fee}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={formData.amountPaid}
          onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
          placeholder="Amount Paid"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <button
          type="submit"
          className="w-full bg-brand-pink text-white p-3 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Record Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;