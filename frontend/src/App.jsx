import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ParkingSlots from './pages/ParkingSlots';
import Cars from './pages/Cars';
import ParkingRecords from './pages/ParkingRecords';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-pink-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/parking-slots" element={<ProtectedRoute><ParkingSlots /></ProtectedRoute>} />
            <Route path="/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
            <Route path="/parking-records" element={<ProtectedRoute><ParkingRecords /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;