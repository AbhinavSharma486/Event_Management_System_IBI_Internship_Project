import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  FileText,
  Save,
  ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Define the BackButton component here or import it if it's in its own file
const BackButton = ({ className = '' }) => (
  <Link
    to="/events"
    className={`inline-flex items-center justify-center
      px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base
      border border-transparent text-white font-medium rounded-3xl shadow-sm
      bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-700 hover:to-purple-700
      transition-colors duration-200
      ${className}
    `}
  >
    <ArrowLeft className="mr-2 h-5 w-5" />
    Back to Events
  </Link>
);

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [banner1Preview, setBanner1Preview] = useState('');
  const [banner2Preview, setBanner2Preview] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: 'draft',
    },
  });

  const handleImageUpload = (field) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockImageUrl = `https://images.pexels.com/photos/${Math.floor(Math.random() * 9999999)}/pexels-photo-${Math.floor(Math.random() * 9999999)}.jpeg?auto=compress&cs=tinysrgb&w=800`;

      setValue(field, mockImageUrl);
      if (field === 'image') {
        setImagePreview(mockImageUrl);
      } else if (field === 'banner1') {
        setBanner1Preview(mockImageUrl);
      } else if (field === 'banner2') {
        setBanner2Preview(mockImageUrl);
      }
      toast.success(`${field.includes('banner') ? 'Banner' : 'Event image'} uploaded successfully`);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Simulating event creation with data:', {
        ...data,
        createdBy: 'StaticUser123',
        status: data.status,
      });

      toast.success(`Event saved successfully!`);
      navigate('/events');
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-blue-800 relative">
      <div className="max-w-4xl mx-auto p-6 space-y-8 pt-10 pb-10 px-4 sm:px-6 lg:px-8">

        {/* Back Button at Top */}
        <div className="mt-10"> {/* Adjusted top/left for desired spacing */}
          <BackButton />
        </div>

        {/* Header */}
        <div className="mb-8 mt-5">
          <h1 className="text-3xl font-bold text-white">Create New Event</h1>
          <p className="mt-3 mb-3 text-white">
            Fill in the details below to create your event.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: 'Event title is required' })}
                  className={`block w-full px-4 py-3 border ${errors.title ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter event title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register('description', { required: 'Event description is required' })}
                  className={`block w-full px-4 py-3 border ${errors.description ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Describe your event"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Date & Time Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <Calendar className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Date & Time</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    {...register('date', { required: 'Event date is required' })}
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.date ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    {...register('time', { required: 'Event time is required' })}
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.time ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  />
                </div>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="lg:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    {...register('location', { required: 'Event location is required' })}
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.location ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter event location"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Media Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <ImageIcon className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Media & Branding</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors duration-200">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Event preview"
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setValue('image', '');
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
                        >
                          Upload Image
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload('image')}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Banner 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Banner 1
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors duration-200">
                  {banner1Preview ? (
                    <div className="space-y-4">
                      <img
                        src={banner1Preview}
                        alt="Banner 1 preview"
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBanner1Preview('');
                          setValue('banner1', '');
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove banner 1
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <label
                          htmlFor="banner1-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
                        >
                          Upload Banner 1
                        </label>
                        <input
                          id="banner1-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload('banner1')}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Banner 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Banner 2
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors duration-200">
                  {banner2Preview ? (
                    <div className="space-y-4">
                      <img
                        src={banner2Preview}
                        alt="Banner 2 preview"
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBanner2Preview('');
                          setValue('banner2', '');
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove banner 2
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <label
                          htmlFor="banner2-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
                        >
                          Upload Banner 2
                        </label>
                        <input
                          id="banner2-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload('banner2')}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Actions (Save and Cancel) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto flex flex-row justify-center items-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Save className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Saving...' : 'Save Event'}
              </button>
            </div>
          </motion.div>
        </form>

        {/* Back Button below the form and centered */}
        <div className="mt-8 flex justify-center">
          <BackButton />
        </div>

      </div>
    </div>
  );
};

export default CreateEventPage;