import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { login } from '../slices/authSlice.js';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, error, currentUser } = useSelector(state => state.auth);
  const isAuthenticated = !!currentUser;
  const location = useLocation();
  const logoutToastShownRef = useRef(false);

  useEffect(() => {
    if (location.state?.showLogoutToast && !logoutToastShownRef.current) {
      toast.success('Logged out successfully!');
      logoutToastShownRef.current = true;

      // clear the state so it doesn't show again
      navigate(location.pathname, { replace: true, state: undefined });
    }
  }, [location, navigate]);

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success('Login successful!');
      navigate('/events');
    } catch (error) {
      if (error === 'Invalid password') {
        toast.error('invalid Password');
      }
      else {
        toast.error(error || 'User not found or not registered!');
      }
    }
  };

  // Prevent showing login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 px-4 py-8 relative overflow-hidden">
      {/* Glassmorphism Card */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-gray-100 dark:border-gray-800 relative z-10">
        {/* Gradient Heading */}
        <div className="flex flex-col items-center w-fit mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-2 text-center">Sign In to EventFlow</h2>
        </div>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm pr-10"
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="mx-auto bg-gradient-to-r from-blue-500 to-pink-500 text-white dark:text-white rounded-full font-semibold text-base px-8 py-3 shadow-lg hover:from-blue-600 hover:to-pink-600 hover:scale-105 active:scale-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-2 flex items-center justify-center gap-2"
            disabled={loading}
            aria-busy={loading}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link></p>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .animate-pulse { animation: pulse 3s infinite; }
      `}</style>
    </div>
  );
};

export default LoginPage;