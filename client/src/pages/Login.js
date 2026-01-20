import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Demo credentials
    const correctEmail = 'user@gmail.com';
    const correctPassword = '123456';

    if (email === correctEmail && password === correctPassword) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid Email or Password');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex justify-center items-center">
      <div className="w-96 bg-card-light dark:bg-card-dark p-10 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/images/logo.jpg" alt="Moon Light Events Logo" className="w-16 h-16" />
        </div>
        
        <h2 className="text-center text-2xl font-bold text-primary dark:text-white mb-6">User Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-black/90 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-secondary">
            <a href="/forgot-password" className="text-primary dark:text-blue-400 hover:underline">Forgot Password?</a>
          </p>
          <p className="text-secondary">
            Don't have an account? <a href="/register" className="text-primary dark:text-blue-400 hover:underline">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
