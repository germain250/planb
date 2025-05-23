import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ParkingRecordForm({ onRecordCreated }) {
  const [cars, setCars] = useState([]);
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    car: '',
    parkingSlot: '',
    entryTime: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, slotsRes] = await Promise.all([
          api.get('/cars'),
          api.get('/parking-slots'),
        ]);
        setCars(carsRes.data);
        setSlots(slotsRes.data.filter(slot => slot.slotStatus === 'available'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/parking-records', {
        ...formData,
        entryTime: new Date(formData.entryTime).toISOString(),
      });
      onRecordCreated(response.data);
      setFormData({ car: '', parkingSlot: '', entryTime: '' });
      alert('Parking record created successfully');
    } catch (error) {
      alert('Error creating parking record: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-brand-pink mb-4">Create Parking Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.car}
          onChange={(e) => setFormData({ ...formData, car: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        >
          <option value="">Select Car</option>
          {cars.map(car => (
            <option key={car._id} value={car._id}>{car.plateNumber}</option>
          ))}
        </select>
        <select
          value={formData.parkingSlot}
          onChange={(e) => setFormData({ ...formData, parkingSlot: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        >
          <option value="">Select Slot</option>
          {slots.map(slot => (
            <option key={slot._id} value={slot._id}>{slot.slotNumber}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={formData.entryTime}
          onChange={(e) => setFormData({ ...formData, entryTime: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <button
          type="submit"
          className="w-full bg-brand-pink text-white p-3 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Create Record
        </button>
      </form>
    </div>
  );
}

export default ParkingRecordForm;