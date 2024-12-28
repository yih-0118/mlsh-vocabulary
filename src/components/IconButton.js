import React from 'react';

const IconButton = ({ icon: Icon, onClick, label, darkMode }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-3 rounded-lg transition-transform duration-300 hover:scale-105
        ${
          darkMode
            ? 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500'
            : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300'
        } flex items-center justify-center`}
    >
      <Icon
        className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
      />
    </button>
  );
};

export default IconButton;
