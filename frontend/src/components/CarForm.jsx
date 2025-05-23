import React, { useState } from 'react';
import api from '../services/api';

function CarForm({ onCarCreated }) {
  const [formData, setFormData] = useState({
    plateNumber: '',
    driverName: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/cars', formData);
      onCarCreated /

(response.data);
      setFormData({ plateNumber: '', driverName: '', phoneNumber: '' });
      alert('Car registered successfully');
    } catch (error) {
      alert('Error registering car: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-brand-pink mb-4">Register Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.plateNumber}
          onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
          placeholder="Plate Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <input
          type="text"
          value={formData.driverName}
          onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
          placeholder="Driver Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <button
          type="submit"
          className="w-full bg-brand-pink text-white p-3 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Register Car
        </button>
      </form>
    </div>
  );
}

export default CarForm;