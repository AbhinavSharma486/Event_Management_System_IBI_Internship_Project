import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, eventName, loading, isOwner, isAttendeeDelete, customTitle, customerDescription, customButtonText }) => {

  if (!isOpen) return null;

  const getModalContent = () => {
    if (customTitle || customerDescription || customButtonText) {
      return {
        title: customTitle || 'Delete',
        description: customerDescription || '',
        buttonText: customButtonText || 'Delete',
        itemLabel: 'Account',
      };
    }

    if (isAttendeeDelete) {
      return {
        title: 'Remove Attendee',
        description: 'Are you sure you want to remove this attendee from the event? They will no longer be able to acess this event.',
        buttonText: loading ? 'Removing...' : 'Remove Attendee',
        itemLabel: 'Attendee'
      };
    }

    if (isOwner) {
      return {
        title: 'Delete Event',
        description: 'Are you sure you want to delete this event? This action cannot be undone.',
        buttonText: loading ? 'Deleting...' : 'Delete Event',
        itemLabel: 'Event'
      };
    }

    return {
      title: 'Leave Event',
      description: 'Are you sure you want to leave this event? You will no longer see this event in your attending list.',
      buttonText: loading ? 'Leaving...' : 'Leave Event',
      itemLabel: 'Event'
    };
  };

  const content = getModalContent();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{content.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              {content.description}
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">
                {content.itemLabel}: <span className="font-semibold">{eventName}</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {content.buttonText}
                </>
              ) : (
                content.buttonText
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;