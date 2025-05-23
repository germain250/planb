import React, { useState, useEffect } from 'react';
import ParkingRecordForm from '../components/ParkingRecordForm';
import api from '../services/api';

function ParkingRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get('/parking-records');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching parking records:', error);
      }
    };
    fetchRecords();
  }, []);

  const handleRecordCreated = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  const handleUpdate = async (id, exitTime) => {
    try {
      const response = await api.put(`/parking-records/${id}`, { exitTime });
      setRecords(records.map(record => 
        record._id === id ? { ...record, ...response.data } : record
      ));
      alert('Record updated successfully');
    } catch (error) {
      alert('Error updating record: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/parking-records/${id}`);
      setRecords(records.filter(record => record._id !== id));
      alert('Record deleted successfully');
    } catch (error) {
      alert('Error deleting record: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-brand-pink mb-6">Parking Records</h1>
      <ParkingRecordForm onRecordCreated={handleRecordCreated} />
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Parking Records</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100">
              <th className="border p-3 text-left">Plate Number</th>
              <th className="border p-3 text-left">Slot Number</th>
              <th className="border p-3 text-left">Entry Time</th>
              <th className="border p-3 text-left">Exit Time</th>
              <th className="border p-3 text-left">Duration (hrs)</th>
              <th className="border p-3 text-left">Fee</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record._id} className="hover:bg-pink-50">
                <td className="border p-3">{record.car.plateNumber}</td>
                <td className="border p-3">{record.parkingSlot.slotNumber}</td>
                <td className="border p-3">{new Date(record.entryTime).toLocaleString()}</td>
                <td className="border p-3">{record.exitTime ? new Date(record.exitTime).toLocaleString() : 'N/A'}</td>
                <td className="border p-3">{record.duration ? record.duration.toFixed(2) : 'N/A'}</td>
                <td className="border p-3">${record.fee || 'N/A'}</td>
                <td className="border p-3">
                  {!record.exitTime && (
                    <button
                      onClick={() => handleUpdate(record._id, new Date().toISOString())}
                      className="bg-brand-pink text-white px-3 py-1 rounded-lg hover:bg-pink-700 transition duration-300 mr-2"
                    >
                      Mark Exit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParkingRecords;