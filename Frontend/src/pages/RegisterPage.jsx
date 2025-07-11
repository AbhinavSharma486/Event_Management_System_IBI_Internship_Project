import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { register as registerThunk, clearError } from '../slices/authSlice';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');
  const { loading, error, currentUser } = useSelector(state => state.auth);
  const isAuthenticated = !!currentUser;

  useEffect(() => {
    // clear error on mount and unmount
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerThunk({
        fullName: data.name,
        email: data.email,
        password: data.password,
        mobileNumber: data.mobileNumber
      })).unwrap();

      // show success toast here instead of in eventspage
      toast.success('Account created successfully!');
      navigate('/events');
    } catch (error) {
      toast.error(error || 'Registration failed!');
    }
  };

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
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-2 text-center">Create Your Account</h2>
        </div>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
              placeholder="Enter your name"
              {...registerField('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Mobile Number</label>
            <input
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
              placeholder="Enter your mobile number"
              {...registerField('mobileNumber', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Enter a valid 10-digit Indian mobile number',
                },
              })}
            />
            {errors.mobileNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
              placeholder="Enter your email"
              {...registerField('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm pr-10"
                placeholder="Enter your password"
                {...registerField('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
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
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm pr-10"
                placeholder="Confirm your password"
                {...registerField('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 focus:outline-none"
                tabIndex={-1}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mx-auto bg-gradient-to-r from-blue-500 to-pink-500 text-white dark:text-white rounded-full font-semibold text-base px-8 py-3 shadow-lg hover:from-blue-600 hover:to-pink-600 hover:scale-105 active:scale-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

        </form>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link></p>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .animate-pulse { animation: pulse 3s infinite; }
      `}</style>
    </div>
  );
};

export default RegisterPage;