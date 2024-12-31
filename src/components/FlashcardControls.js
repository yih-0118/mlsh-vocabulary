import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EyeOff, Eye, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import IconButton from './IconButton';

const STYLES = {
  dark: 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700',
  light: 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
};

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
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // 防止在輸入框中觸發快捷鍵
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch(event.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) {
            handlePrev();
          }
          break;
        case 'ArrowRight':
          if (currentIndex < vocabularies.length - 1) {
            handleNext();
          }
          break;
        case ' ':  // 空白鍵
          event.preventDefault(); // 防止頁面滾動
          setShowChinese(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePrev, handleNext, setShowChinese, currentIndex, vocabularies.length]);

  const handleReadWithLoading = async () => {
    if (!vocabularies[currentIndex]?.vocabulary || isReading) return;

    try {
      setIsReading(true);
      await handleRead(vocabularies[currentIndex].vocabulary);
    } catch (error) {
      console.error('Error reading vocabulary:', error);
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div
      className={`
        fixed bottom-0 w-full border-t z-10
        transition-colors duration-500
        ${darkMode ? STYLES.dark : STYLES.light}
      `}
    >
      <div className="max-w-xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <IconButton
              icon={showChinese ? EyeOff : Eye}
              onClick={() => setShowChinese(!showChinese)}
              label={showChinese ? "隱藏中文" : "顯示中文"}
              darkMode={darkMode}
            />
            <IconButton
              icon={Volume2}
              onClick={handleReadWithLoading}
              label="播放音頻"
              darkMode={darkMode}
              disabled={isReading}
              className={isReading ? 'animate-pulse' : ''}
            />
          </div>

          <div className="text-center text-sm">
            <span className={`
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}
            `}>
              {currentIndex + 1} / {vocabularies.length}
            </span>
          </div>

          <div className="flex space-x-4">
            <IconButton
              icon={ChevronLeft}
              onClick={handlePrev}
              label="上一張"
              darkMode={darkMode}
              disabled={currentIndex === 0}
            />
            <IconButton
              icon={ChevronRight}
              onClick={handleNext}
              label="下一張"
              darkMode={darkMode}
              disabled={currentIndex === vocabularies.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

FlashcardControls.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  showChinese: PropTypes.bool.isRequired,
  setShowChinese: PropTypes.func.isRequired,
  handleRead: PropTypes.func.isRequired,
  vocabularies: PropTypes.arrayOf(
    PropTypes.shape({
      vocabulary: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default FlashcardControls;