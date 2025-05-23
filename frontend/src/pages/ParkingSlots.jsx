import React, { useState, useEffect } from 'react';
import ParkingSlotForm from '../components/ParkingSlotForm';
import api from '../services/api';

function ParkingSlots() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await api.get('/parking-slots');
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching parking slots:', error);
      }
    };
    fetchSlots();
  }, []);

  const handleSlotCreated = (newSlot) => {
    setSlots([...slots, newSlot]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-brand-pink mb-6">Parking Slots</h1>
      <ParkingSlotForm onSlotCreated={handleSlotCreated} />
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Slots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slots.map(slot => (
            <div
              key={slot._id}
              className={`p-4 rounded-lg shadow-md ${
                slot.slotStatus === 'available' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <p className="font-bold text-gray-800">Slot {slot.slotNumber}</p>
              <p className="text-gray-600">Status: {slot.slotStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParkingSlots;