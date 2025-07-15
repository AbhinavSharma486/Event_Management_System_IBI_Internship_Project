import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Camera, Save, Shield, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { updateProfile, updatePassword, clearError, deleteProfile } from '../slices/authSlice';
import DeleteConfirmationModal from '../components/Events/DeleteConfirmationModal';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.profilePic || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm({
    defaultValues: {
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      mobileNumber: currentUser?.mobileNumber || ''
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors }
  } = useForm();

  const newPassword = watch('newPassword');

  // reset form when user data changes
  useEffect(() => {
    if (currentUser) {
      resetProfile({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        mobileNumber: currentUser.mobileNumber || ''
      });
    }
  }, [currentUser, resetProfile]);

  // handle erros
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (currentUser?.profilePic && !avatarFile) {
      setAvatarPreview(currentUser.profilePic);
    }
  }, [currentUser?.profilePic, avatarFile]);

  const onProfileSubmit = async (data) => {
    // check if user made any changes 
    const originalName = currentUser?.fullName || '';
    const originalPic = currentUser?.profilePic || '';
    const originalMobile = currentUser?.mobileNumber || '';
    const newName = data.fullName.trim();
    let newPic = originalPic;
    if (avatarFile) {
      newPic = await toBase64(avatarFile);
    }

    if (newName === originalName && (!avatarFile || newPic === originalPic) && (data.mobileNumber === originalMobile)) {
      toast.info('You have not made any changes!');
      return;
    }

    try {
      let profilePic = undefined;

      if (avatarFile) {
        // convert file to base64
        profilePic = await toBase64(avatarFile);
      }

      await dispatch(updateProfile({ fullName: data.fullName, profilePic, mobileNumber: data.mobileNumber }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error?.message || 'Profile update failed!');
    }
  };

  // Helper to convert file to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      await dispatch(updatePassword({
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmPassword,
      }));

      toast.success('Password updated successfully!');
      resetPassword();
    } catch (error) {
      toast.error(error?.message || 'Password update failed!');
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await dispatch(deleteProfile(currentUser._id)).unwrap();
      setShowDeleteModal(false);
      toast.success('Account deleted successfully!');
      navigate('/');
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">My Profile</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-700 mb-2">
              {userInitials}
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">{currentUser.fullName}</div>
              <div className="text-gray-500">{currentUser.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-1 sm:px-2 py-4 sm:py-8">
      <div className="w-full max-w-full sm:max-w-3xl lg:max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          {/* Mobile Tabs */}
          <div className="flex lg:hidden justify-center flex-wrap gap-2 mb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow'
                    : 'bg-gray-200 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'
                  }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </div>
          {/* Desktop Sidebar */}
          <nav className="hidden lg:block space-y-2 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-800 backdrop-blur-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-colors duration-200 
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow border-l-4 border-purple-500'
                    : 'text-gray-700 dark:text-gray-200 hover:text-purple-700 hover:bg-purple-50 dark:hover:text-white dark:hover:bg-gray-800'
                  }`}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-3 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-800 backdrop-blur-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">Profile Settings</h1>
            <p className="mb-6 text-base sm:text-lg text-center text-gray-700 dark:text-gray-300">Manage your account settings and preferences</p>
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=""
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
                  Profile Information
                </h2>
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <img
                      src={avatarPreview || currentUser?.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt={currentUser?.fullName}
                      className="h-24 w-24 rounded-full object-cover ring-2 ring-purple-300 ring-offset-2"
                    />
                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-md cursor-pointer">
                      <Camera className="h-4 w-4" />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="fullName"
                          {...registerProfile('fullName', {
                            required: 'Full name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                          })}
                          className={`block w-full pl-10 pr-3 py-3 border ${profileErrors.fullName ? 'border-red-300' : 'border-gray-300 dark:border-gray-700'}
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {profileErrors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{profileErrors.fullName.message}</p>
                      )}
                    </div>
                    {/* Mobile Number */}
                    <div>
                      <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="h-5 w-5 text-gray-400 flex items-center justify-center">+91</span>
                        </div>
                        <input
                          type="tel"
                          id="mobileNumber"
                          {...registerProfile('mobileNumber', {
                            required: 'Mobile number is required',
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message: 'Enter a valid 10-digit Indian mobile number',
                            },
                          })}
                          className={`block w-full pl-10 pr-3 py-3 border ${profileErrors.mobileNumber ? 'border-red-300' : 'border-gray-300 dark:border-gray-700'}
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                          placeholder="Enter your mobile number"
                        />
                      </div>
                      {profileErrors.mobileNumber && (
                        <p className="mt-1 text-sm text-red-600">{profileErrors.mobileNumber.message}</p>
                      )}
                    </div>
                    {/* Email - Read Only */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={currentUser?.email || ''}
                          readOnly
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          placeholder="Your email address"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-900 dark:text-white">
                      Member since {(() => {
                        const date = currentUser?.createdAt ? new Date(currentUser.createdAt) : new Date();
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                      })()}
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Save className="mr-2 h-5 w-5" />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
                <div className="flex flex-col items-center mt-8">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Deleting Account...' : 'Delete Account'}
                  </button>
                </div>
                <DeleteConfirmationModal
                  isOpen={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  onConfirm={confirmDeleteAccount}
                  eventName={currentUser?.fullName}
                  loading={loading}
                  customTitle="Delete Account"
                  customDescription="Are you sure you want to delete your account? This will permanently remove your profile, all events you created, and remove you from all events you are attending. This action cannot be undone."
                  customButtonText={loading ? 'Deleting...' : 'Delete Account'}
                />
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Security Settings
                </h2>

                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        {...registerPassword('newPassword', {
                          required: 'New password is required',
                          minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}
                        className={`block w-full pl-10 pr-12 py-3 border ${passwordErrors.newPassword ? 'border-red-300' : 'border-gray-300 dark:border-gray-700'}
                          rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        {...registerPassword('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) => value === newPassword || 'Passwords do not match',
                        })}
                        className={`block w-full pl-10 pr-12 py-3 border ${passwordErrors.confirmPassword ? 'border-red-300' : 'border-gray-300 dark:border-gray-700'}
                          rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? (
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