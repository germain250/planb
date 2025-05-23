import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData.username, formData.password);
    if (success) {
      navigate('/');
    } else {
      alert('Registration failed: Username may already exist');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-brand-pink mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink"
          required
        />
        <button
          type="submit"
          className="w-full bg-brand-pink text-white p-3 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-brand-pink hover:underline">Login</Link>
      </p>
    </div>
  );
}

export default Register;