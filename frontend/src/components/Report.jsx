import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Report() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('entryTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports
    .filter(report => 
      report.car.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
      report.parkingSlot.slotNumber.toLowerCase().includes(search.toLowerCase())
    )
    .filter(report => filterStatus === 'all' || 
      (filterStatus === 'active' && !report.exitTime) || 
      (filterStatus === 'completed' && report.exitTime)
    )
    .sort((a, b) => {
      const fieldA = a[sortField] || a.car[sortField] || a.parkingSlot[sortField] || '';
      const fieldB = b[sortField] || b.car[sortField] || b.parkingSlot[sortField] || '';
      if (sortOrder === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      }
      return fieldA < fieldB ? 1 : -1;
    });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-brand-pink mb-4">Parking Reports</h2>
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
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report._id} className="hover:bg-pink-50">
                <td className="border p-3">{report.car.plateNumber}</td>
                <td className="border p-3">{report.parkingSlot.slotNumber}</td>
                <td className="border p-3">{new Date(report.entryTime).toLocaleString()}</td>
                <td className="border p-3">{report.exitTime ? new Date(report.exitTime).toLocaleString() : 'N/A'}</td>
                <td className="border p-3">{report.duration ? report.duration.toFixed(2) : 'N/A'}</td>
                <td className="border p-3">${report.fee || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;