import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import {
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  FileText,
  Save,
  ArrowLeft,
  Users,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { createEvent, updateEvent, fetchEventById } from '../slices/eventSlice';

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
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error, currentEvent } = useSelector(state => state.events);
  const { currentUser } = useSelector(state => state.auth);
  const isAuthenticated = !!currentUser;
  const [imageFile, setImageFile] = useState(null);
  const [banner1File, setBanner1File] = useState(null);
  const [banner2File, setBanner2File] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [banner1Preview, setBanner1Preview] = useState('');
  const [banner2Preview, setBanner2Preview] = useState('');
  const initialValuesRef = useRef(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [timeError, setTimeError] = useState('');
  const timeInputRef = useRef(null);

  // check if we are in edit mode 
  const isEditMode = !!id;
  const eventDataFromState = location.state?.eventData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
    reset,
    control

  } = useForm({
    defaultValues: {
      status: 'draft',
    },
    mode: 'onChange'
  });

  const timeValue = watch('time') || '';

  // Enhance time input handler with cursor position management
  const handleTimeChange = (e) => {
    const input = e.target;
    const cursorPosition = input.selectionStart;
    let value = input.value.toUpperCase();
    let newValue = '';
    let newCursorPosition = cursorPosition;

    // Remove all non-digit and non-AM/PM characters
    value = value.replace(/[^0-9APM]/g, '');

    // format hours (first 2 digits)
    if (value.length > 0) {
      newValue = value.slice(0, 2);

      // add colon after 2 digit (hours)
      if (value.length > 2) {
        newValue += ':' + value.slice(2, 4);

        // add space after 4 digits (hours:minutes)
        if (value.length > 4) {
          newValue += ' ';
          const ampm = value.slice(4, 6).replace(/[^APM]/g, '');

          // auto-complete AM/PM
          if (ampm.startsWith('A')) {
            newValue += 'AM';
          } else if (ampm.startsWith('P')) {
            newValue += 'PM';
          } else {
            newValue += ampm;
          }
        }
      }
    }

    // adjust cursor position based on changes 
    if (cursorPosition === 2 && value.length > 2) {
      newCursorPosition = 3;
    }
    else if (cursorPosition === 5 && value.length > 4) {
      newCursorPosition = 0;
    }

    // validate hours (1-12)
    if (newValue.length >= 2) {
      const hours = parseInt(newValue.slice(0, 2), 10);
      if (isNaN(hours)) {
        setTimeError('Please enter valid hours');
      }
      else if (hours < 1 || hours > 12) {
        setTimeError('Hours must be between 1 and 12');
      }
      else {
        setTimeError('');
      }
    }

    // validate AM/PM
    if (newValue.length >= 0) {
      const ampm = newValue.slice(6, 8);
      if (ampm !== 'AM' && ampm !== 'PM') {
        setTimeError('Please specify AM or PM');
      }
      else {
        setTimeError('');
      }
    }

    // Limit to 8 characters (hh:mm AM/PM)
    newValue = newValue.slice(0, 8);

    setValue('time', newValue, { shouldValidate: true });

    // restore cursor position after state update
    setTimeout(() => {
      if (timeInputRef.current) {
        timeInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  // fetch event data if in edit mode 
  useEffect(() => {
    if (isEditMode) {
      if (eventDataFromState) {
        setFormData(eventDataFromState);
      }
      else if (id) {
        setIsLoadingEvent(true);
        dispatch(fetchEventById(id))
          .unwrap()
          .then((data) => {
            setFormData(data.event);
            setIsLoadingEvent(false);
          })
          .catch(() => {
            setIsLoadingEvent(false);
          });
      }
    }
  }, [dispatch, id, isEditMode, eventDataFromState]);

  // Helper function to set form data
  const setFormData = (data) => {
    if (!data) return;

    const formValues = {
      title: data.title || '',
      description: data.description || '',
      date: data.date ? new Date(data.date) : null,
      time: data.time || '',
      location: data.location || '',
      maxAttendees: data.maxAttendees ? String(data.maxAttendees) : '',
      status: data.status || 'draft'
    };

    reset(formValues);

    if (data.image) setImagePreview(data.image);
    if (data.banner1) setBanner1Preview(data.banner1);
    if (data.banner2) setBanner2Preview(data.banner2);

    initialValuesRef.current = {
      ...formValues,
      image: data.image || '',
      banner1: data.banner1 || '',
      banner2: data.banner2 || ''
    };
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/create-event' } });
    }
  }, [isAuthenticated, navigate]);

  const handleImageUpload = (file, setFile, setPreview, type) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setFile(file);
        toast.success(`${type} uploaded successfully`);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const isValid = await trigger();

    if (!isValid) {
      const unfilledFields = [];

      if (!data.title?.trim()) unfilledFields.push('Event Title');
      if (!data.description?.trim()) unfilledFields.push('Description');
      if (!data.date) unfilledFields.push('Event Date');
      if (!data.time) unfilledFields.push('Event Time');
      if (!data.location?.trim()) unfilledFields.push('Location');
      if (!data.maxAttendees || data.maxAttendees < 1) unfilledFields.push('Maximum Attendees');

      if (unfilledFields.length > 0) {
        toast.error(`Please fill the following required fields: ${unfilledFields.join(', ')}`);
        return;
      }
    }

    try {
      const formData = {
        ...data,
        date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : '',
        maxAttendees: parseInt(data.maxAttendees) || 0,
      };

      if (imageFile) {
        formData.image = imagePreview;
      }
      else if (imagePreview) {
        formData.image = imagePreview;
      }

      if (banner1File) {
        formData.banner1 = banner1Preview;
      } else if (banner1Preview) {
        formData.banner1 = banner1Preview;
      }

      if (banner2File) {
        formData.banner2 = banner2Preview;
      } else if (banner2Preview) {
        formData.banner2 = banner2Preview;
      }

      if (!formData.image || !formData.banner1 || !formData.banner2) {
        toast.error('Please upload all required images (Main Image, Banner 1, Banner 2).');
        return;
      }

      if (isEditMode && initialValuesRef.current) {
        const fieldsToCheck = [
          'title', 'description', 'date', 'time', 'location', 'maxAttendees', 'image', 'banner1', 'banner2'
        ];
        // Helper to normalize values
        const normalize = (val, field) => {
          if (field === 'maxAttendees') return String(val ?? '');
          if (field === 'date') return val ? new Date(val).toISOString().slice(0, 10) : '';
          if (typeof val === 'string') return val.trim();
          return val ?? '';
        };
        let changed = false;
        for (const field of fieldsToCheck) {
          const current = normalize(formData[field], field);
          const original = normalize(initialValuesRef.current[field], field);
          if (current !== original) {
            changed = true;
            break;
          }
        }
        if (!changed) {
          toast.info('You have not made any changes to the event.');
          return;
        }
      }

      if (isEditMode) {
        await dispatch(updateEvent({ id, data: formData })).unwrap();
        toast.success('Event updated successfully!');
        navigate(`/events/${id}`);
      } else {
        await dispatch(createEvent(formData)).unwrap();
        toast.success('Event created successfully!');
        navigate('/events');
      }
    } catch (error) {
      console.error(error);
      toast.error(error || 'Failed to create event.');
    }
  };
  const validationMessages = {
    title: {
      required: 'Please fill Event Title',
      minLength: 'Event Title must be at least 3 characters'
    },
    description: {
      required: 'Please fill Event Description',
      minLength: 'Description must be at least 10 characters'
    },
    date: {
      required: 'Please select Event Date'
    },
    location: {
      required: 'Please fill Event Location'
    },
    maxAttendees: {
      required: 'Please fill Maximum Attendees',
      min: 'Maximum Attendees must be at least 1'
    }
  };

  if (isEditMode && isLoadingEvent) {
    return <div className="text-center py-12">Loading event data...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="w-full max-w-3xl mx-auto px-2 py-8 flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center mb-4">
            <BackButton />
          </div>
          <div className="flex flex-col items-start w-fit mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-2 text-left inline-block">
              {isEditMode ? 'Edit Event' : 'Create New Event'}
            </h2>
            <span className="block h-1 rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500" style={{ width: '100%', minWidth: 0 }} />
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-left">
              {isEditMode ? 'Edit the details below to update your event.' : 'Fill in the details below to create your event.'}
            </p>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" /> <span><b>*</b> marked fields are mandatory</span>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Basic Information</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Event Title <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter event title" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 outline-none" {...register('title', {
                    required: validationMessages.title.required,
                    minLength: { value: 3, message: validationMessages.title.minLength }
                  })} />
                  {errors.title && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {errors.title.message}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Maximum Attendees <span className="text-red-500">*</span></label>
                  <input type="number" min={1} placeholder="Enter maximum number of attendees" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 outline-none" {...register('maxAttendees', { required: validationMessages.maxAttendees.required, min: { value: 1, message: validationMessages.maxAttendees.min } })} />
                  {errors.maxAttendees && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {errors.maxAttendees.message}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Description <span className="text-red-500">*</span></label>
                <textarea placeholder="Describe your event" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 outline-none" rows={3} {...register('description', {
                  required: validationMessages.description.required,
                  minLength: { value: 10, message: validationMessages.description.minLength }
                })} />
                {errors.description && (
                  <div className="mt-2 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>
            {/* Date & Time */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Date & Time</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Event Date <span className="text-red-500">*</span></label>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        selected={field.value ? new Date(field.value) : null}
                        onChange={date => field.onChange(date)}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="dd-mm-yyyy"
                        minDate={new Date()}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 outline-none transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400 hover:border-blue-400 dark:hover:border-blue-500"
                        calendarClassName="bg-white text-gray-900"
                        popperPlacement="bottom"
                        showPopperArrow={false}
                      />
                    )}
                  />
                  {errors.date && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {errors.date.message}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Event Time <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    ref={timeInputRef}
                    placeholder="hh:mm AM/PM"
                    maxLength={8}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 outline-none transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400 hover:border-blue-400 dark:hover:border-blue-500"
                    value={timeValue}
                    onChange={handleTimeChange}
                    onBlur={() => {
                      if (timeValue && !timeValue.match(/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/)) {
                        setTimeError('Please use hh:mm AM/PM format');
                      }
                    }}
                    {...register('time', {
                      required: 'Event Time is required',
                      pattern: {
                        value: /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/,
                        message: 'Please use hh:mm AM/PM format'
                      },
                      validate: () => !timeError || timeError,
                    })}
                  />
                  {(errors.time || timeError) && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {errors.time?.message || timeError}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Location <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter event location" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 outline-none" {...register('location', { required: validationMessages.location.required })} />
                  {errors.location && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {errors.location.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Media & Branding */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Media & Branding</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Event Image <span className="text-red-500">*</span></label>
                  <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-purple-400 bg-purple-50 dark:bg-gray-800 cursor-pointer hover:border-purple-600 transition">
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e.target.files[0], setImageFile, setImagePreview, 'Main Image')} />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Main" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-purple-400" />
                        <span className="text-xs text-purple-500 mt-1">Upload Image</span>
                        <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                      </>
                    )}
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Banner 1</label>
                  <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-pink-400 bg-pink-50 dark:bg-gray-800 cursor-pointer hover:border-pink-600 transition">
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e.target.files[0], setBanner1File, setBanner1Preview, 'Banner 1')} />
                    {banner1Preview ? (
                      <img src={banner1Preview} alt="Banner 1" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-pink-400" />
                        <span className="text-xs text-pink-500 mt-1">Upload Banner</span>
                        <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                      </>
                    )}
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Banner 2</label>
                  <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 dark:bg-gray-800 cursor-pointer hover:border-blue-600 transition">
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e.target.files[0], setBanner2File, setBanner2Preview, 'Banner 2')} />
                    {banner2Preview ? (
                      <img src={banner2Preview} alt="Banner 2" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-blue-400" />
                        <span className="text-xs text-blue-500 mt-1">Upload Banner</span>
                        <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            {/* Bottom Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2"
                onClick={() => {
                  setImageFile(null);
                  setBanner1File(null);
                  setBanner2File(null);
                  setImagePreview('');
                  setBanner1Preview('');
                  setBanner2Preview('');
                  reset({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    location: '',
                    maxAttendees: '',
                    status: 'draft',
                  });
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    {isEditMode ? 'Update Event' : 'Create Event'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;