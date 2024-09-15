import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 modal-overlay"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 relative max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal when clicking inside
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-4"> {/* Allows the content to expand */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
