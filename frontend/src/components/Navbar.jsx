import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="bg-brand-pink w-64 h-screen p-4 shadow-lg fixed top-0 left-0 z-50 flex flex-col">
      {/* Logo/Title */}
      <Link
        to="/"
        className="text-white text-2xl font-bold flex items-center mb-6"
      >
        <span>PSSMS</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-2 flex-grow">
        {isAuthenticated ? (
          <>
            <Link
              to="/parking-slots"
              className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20"
            >
              Parking Slots
            </Link>
            <Link
              to="/cars"
              className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20"
            >
              Cars
            </Link>
            <Link
              to="/parking-records"
              className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20"
            >
              Parking Records
            </Link>
            {/* <Link to="/payments" className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20">
              Payments
            </Link> */}
            <Link
              to="/reports"
              className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20"
            >
              Reports
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Logout Button (Authenticated Users Only) */}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="text-white hover:text-pink-200 py-2 px-4 rounded hover:bg-brand-pink/20 mt-auto"
        >
          Logout
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
