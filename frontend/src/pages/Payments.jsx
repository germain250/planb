import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import api from '../services/api';

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get('/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  const handlePaymentCreated = (newPayment) => {
    setPayments([...payments, newPayment]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-brand-pink mb-6">Payments</h1>
      <PaymentForm onPaymentCreated={handlePaymentCreated} />
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100">
              <th className="border p-3 text-left">Plate Number</th>
              <th className="border p-3 text-left">Amount Paid</th>
              <th className="border p-3 text-left">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id} className="hover:bg-pink-50">
                <td className="border p-3">{payment.parkingRecord.car.plateNumber}</td>
                <td className="border p-3">${payment.amountPaid}</td>
                <td className="border p-3">{new Date(payment.paymentDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;