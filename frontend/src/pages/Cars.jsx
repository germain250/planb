import React, { useState, useEffect } from 'react';
import CarForm from '../components/CarForm';
import api from '../services/api';

function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleCarCreated = (newCar) => {
    setCars([...cars, newCar]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-brand-pink mb-6">Cars</h1>
      <CarForm onCarCreated={handleCarCreated} />
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Registered Cars</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100">
              <th className="border p-3 text-left">Plate Number</th>
              <th className="border p-3 text-left">Driver Name</th>
              <th className="border p-3 text-left">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car._id} className="hover:bg-pink-50">
                <td className="border p-3">{car.plateNumber}</td>
                <td className="border p-3">{car.driverName}</td>
                <td className="border p-3">{car.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cars;