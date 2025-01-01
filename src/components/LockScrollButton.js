import React, { useState } from 'react';
import { useLockBodyScroll } from 'react-use';
import { Lock, Unlock } from 'lucide-react';

const LockScrollButton = ({ darkMode }) => {
  const [locked, setLocked] = useState(false);
  useLockBodyScroll(locked);

  return (
    <div className="px-4 py-2">
      <button
        onClick={() => setLocked(!locked)}
        className={`
          group
          w-full
          flex items-center justify-center gap-2
          py-2 px-3 rounded-xl
          font-medium text-sm
          shadow-md hover:shadow-lg
          transition-all duration-300
          ${darkMode
            ? locked
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
              : 'bg-blue-900 hover:bg-blue-800 text-white'
            : locked
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {locked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <Unlock className="w-4 h-4" />
          )}
        </div>
        <span className="transition-all duration-300 group-hover:tracking-wide">
          {locked ? '解除凍結捲動' : '凍結捲動'}
        </span>
      </button>
    </div>
  );
};

export default LockScrollButton;