import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-brand-pink p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <span>PSSMS</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 sm:mt-0">
          {isAuthenticated ? (
            <>
              <Link to="/parking-slots" className="text-white hover:text-pink-200 py-2 sm:py-0">Parking Slots</Link>
              <Link to="/cars" className="text-white hover:text-pink-200 py-2 sm:py-0">Cars</Link>
              <Link to="/parking-records" className="text-white hover:text-pink-200 py-2 sm:py-0">Parking Records</Link>
              <Link to="/payments" className="text-white hover:text-pink-200 py-2 sm:py-0">Payments</Link>
              <Link to="/reports" className="text-white hover:text-pink-200 py-2 sm:py-0">Reports</Link>
              <button onClick={handleLogout} className="text-white hover:text-pink-200 py-2 sm:py-0">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-pink-200 py-2 sm:py-0">Login</Link>
              <Link to="/register" className="text-white hover:text-pink-200 py-2 sm:py-0">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;