import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Home() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('entryTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({ totalSlots: 0, occupiedSlots: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordsRes, slotsRes] = await Promise.all([
          api.get('/parking-records'),
          api.get('/parking-slots'),
        ]);
        setRecords(recordsRes.data);
        const totalSlots = slotsRes.data.length;
        const occupiedSlots = slotsRes.data.filter(slot => slot.slotStatus === 'occupied').length;
        const totalRevenue = recordsRes.data.reduce((sum, record) => sum + (record.fee || 0), 0);
        setStats({ totalSlots, occupiedSlots, totalRevenue });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredRecords = records
    .filter(record => 
      record.car.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
      record.parkingSlot.slotNumber.toLowerCase().includes(search.toLowerCase())
    )
    .filter(record => filterStatus === 'all' || 
      (filterStatus === 'active' && !record.exitTime) || 
      (filterStatus === 'completed' && record.exitTime)
    )
    .sort((a, b) => {
      const fieldA = a[sortField] || a.car[sortField] || a.parkingSlot[sortField] || '';
      const fieldB = b[sortField] || b.car[sortField] || b.parkingSlot[sortField] || '';
      if (sortOrder === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      }
      return fieldA < fieldB ? 1 : -1;
    });

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
      <h1 className="text-3xl font-bold text-brand-pink mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Slots</h3>
          <p className="text-2xl font-bold text-brand-pink">{stats.totalSlots}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Occupied Slots</h3>
          <p className="text-2xl font-bold text-brand-pink">{stats.occupiedSlots}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-2xl font-bold text-brand-pink">${stats.totalRevenue}</p>
        </div>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by plate or slot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
        >
          <option value="entryTime">Entry Time</option>
          <option value="plateNumber">Plate Number</option>
          <option value="slotNumber">Slot Number</option>
          <option value="fee">Fee</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
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
            {filteredRecords.map(record => (
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

export default Home;