import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace with your actual login logic
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to AriStay</h1>
          <p className="mt-2 text-gray-600">Đăng nhập để quản lý công việc của bạn</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" 
              className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow"
              required 
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu" 
              className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors">
              Đăng nhập
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600">
          Chưa có tài khoản?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:underline">Đăng ký</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
