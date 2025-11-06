import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">PalmMind Chat</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{auth.user?.name}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
