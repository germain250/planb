import React, { useState } from 'react';
import api from '../services/api';

function ParkingSlotForm({ onSlotCreated }) {
  const [slotNumber, setSlotNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/parking-slots', { slotNumber });
      onSlotCreated(response.data);
      setSlotNumber('');
      alert('Parking slot created successfully');
    } catch (error) {
      alert('Error creating parking slot: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-brand-pink mb-4">Create Parking Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={slotNumber}
          onChange={(e) => setSlotNumber(e.target.value)}
          placeholder="Slot Number (e.g., A1)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <button
          type="submit"
          className="w-full bg-brand-pink text-white p-3 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Create Slot
        </button>
      </form>
    </div>
  );
}

export default ParkingSlotForm;