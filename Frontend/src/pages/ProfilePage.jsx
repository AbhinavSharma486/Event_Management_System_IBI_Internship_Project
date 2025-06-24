import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Camera, Save, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user = { name: "John Doe", email: "john@example.com", avatar: "https://i.pravatar.cc/100" } } = useState() || {};
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      location: '',
      website: '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  const newPassword = watch('newPassword');

  const onProfileSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
      resetPassword();
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = () => {
    toast.success('Avatar updated successfully!');
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-8 min-h-screen px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:px-8 relative z-10  
bg-gradient-to-tl from-purple-900 via-violet-800 to-slate-900">

      <div className="w-full mx-auto space-y-8 px-4 sm:[max-width:640px] md:[max-width:768px] lg:[max-width:1024px]">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">Profile Settings</h1>
          <p className="mt-2 text-base sm:text-lg text-center text-white">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            {/* Small screen badges */}
            <div className="flex lg:hidden justify-center flex-wrap gap-2 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 
                    ${activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
                    }`}
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Large screen sidebar */}
            <nav className="hidden lg:block space-y-1 bg-white rounded-xl shadow-lg p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 
                    ${activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-900 mb-6">
                  Profile Information
                </h2>

                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-24 w-24 rounded-full object-cover ring-2 ring-purple-300 ring-offset-2"
                    />
                    <button
                      onClick={handleAvatarChange}
                      className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-md"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          {...registerProfile('name', { required: 'Name is required' })}
                          className={`block w-full pl-10 pr-3 py-3 border ${profileErrors.name ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                        />
                      </div>
                      {profileErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          {...registerProfile('email', { required: 'Email is required' })}
                          className={`block w-full pl-10 pr-3 py-3 border ${profileErrors.email ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                        />
                      </div>
                      {profileErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      Member since {new Date().getFullYear()}
                    </p>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Save className="mr-2 h-5 w-5" />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                  Security Settings
                </h2>

                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        {...registerPassword('newPassword', {
                          required: 'New password is required',
                          minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}
                        className={`block w-full pl-10 pr-3 py-3 border ${passwordErrors.newPassword ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                      />
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        {...registerPassword('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) => value === newPassword || 'Passwords do not match',
                        })}
                        className={`block w-full pl-10 pr-3 py-3 border ${passwordErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                      />
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Save className="mr-2 h-5 w-5" />
                      )}
                      Update Password
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;