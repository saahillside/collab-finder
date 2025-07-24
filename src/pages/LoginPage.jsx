import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // ✅ New import

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Updated to use Axios
      const res = await axios.get(`http://localhost:5000/api/profiles?username=${formData.username}`);
      console.log('API response:', res.data);
      const users = res.data;

      if (users.length === 0) {
        toast.error('Username not found');
        return;
      }

      const user = users[0];

      if (user.password !== formData.password) {
        toast.error('Incorrect password');
        return;
      }

      login(user.username);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
      <Link
        to="/"
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-semibold"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-full max-w-sm space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
