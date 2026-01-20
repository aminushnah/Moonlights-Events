import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex justify-center items-center">
      <div className="w-96 bg-card-light dark:bg-card-dark p-10 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/images/logo.jpg" alt="Moon Light Events Logo" className="w-16 h-16" />
        </div>

        <h2 className="text-center text-2xl font-bold text-primary dark:text-white mb-6">Forgot Password</h2>

        {submitted ? (
          <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg text-center">
            <p className="font-semibold">Reset link sent!</p>
            <p className="text-sm">Check your email for password reset instructions.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-black/90 transition"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-secondary">
          <Link to="/login" className="text-primary dark:text-blue-400 hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
