// components/FlashcardControls.jsx

import React from 'react';
import { EyeOff, Eye, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import IconButton from './IconButton';

const FlashcardControls = ({
  darkMode,
  showChinese,
  setShowChinese,
  handleRead,
  vocabularies,
  currentIndex,
  handlePrev,
  handleNext
}) => {
  return (
    <div
      className={`
        fixed bottom-0 w-full border-t z-10
        transition-colors duration-500
        ${
          darkMode
            ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700'
            : 'bg-gradient-to-r from-white to-gray-100 border-gray-200'
        }
      `}
    >
      <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-3">
          <IconButton
            icon={showChinese ? EyeOff : Eye}
            onClick={() => setShowChinese(!showChinese)}
            label="Toggle Chinese"
            darkMode={darkMode}
          />
          <IconButton
            icon={Volume2}
            onClick={() => handleRead(vocabularies[currentIndex]?.vocabulary)}
            label="Play Audio"
            darkMode={darkMode}
          />
        </div>
        <div className="flex space-x-3">
          <IconButton
            icon={ChevronLeft}
            onClick={handlePrev}
            label="Previous Card"
            darkMode={darkMode}
          />
          <IconButton
            icon={ChevronRight}
            onClick={handleNext}
            label="Next Card"
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default FlashcardControls;
