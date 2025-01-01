import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { EyeOff, Eye, Volume2, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import IconButton from './IconButton';

const STYLES = {
  dark: 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700',
  light: 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
};

const Footer = ({
  darkMode,
  showChinese,
  setShowChinese,
  handleRead,
  vocabularies,
  currentIndex,
  handlePrev,
  handleNext,
  handleGoToIndex
}) => {
  const [isReading, setIsReading] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const currentItemRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isSelectOpen && currentItemRef.current && dropdownRef.current) {
      requestAnimationFrame(() => {
        currentItemRef.current.scrollIntoView({
          block: 'center',
          behavior: 'auto'
        });
      });
    }
  }, [isSelectOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    if (isSelectOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelectOpen]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.tagName === 'SELECT') {
        return;
      }

      switch (event.key) {
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
        case ' ':
          event.preventDefault();
          setShowChinese((prev) => !prev);
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
        fixed bottom-0 w-full z-10
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

          <div className="relative flex items-center">
            <div
              className={`
                flex items-center space-x-2 px-3 py-1.5 rounded-md cursor-pointer
                ${darkMode 
                  ? 'hover:bg-gray-700 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span className="min-w-[4rem] text-center">
                {currentIndex + 1} / {vocabularies.length}
              </span>
              <ChevronsUpDown className="h-4 w-4" />
            </div>

            {isSelectOpen && (
              <div 
                ref={dropdownRef}
                className={`
                  absolute bottom-full mb-2 w-48 max-h-64 overflow-y-auto
                  rounded-md shadow-lg py-1
                  ${darkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                  }
                `}
              >
                {vocabularies.map((vocab, index) => (
                  <div
                    key={index}
                    ref={index === currentIndex ? currentItemRef : null}
                    className={`
                      px-4 py-2 cursor-pointer truncate
                      ${darkMode 
                        ? `${index === currentIndex ? 'bg-gray-700' : 'hover:bg-gray-700'} text-gray-200` 
                        : `${index === currentIndex ? 'bg-gray-100' : 'hover:bg-gray-100'} text-gray-700`
                      }
                    `}
                    onClick={() => {
                      handleGoToIndex(index);
                      setIsSelectOpen(false);
                    }}
                  >
                    {index + 1}. {vocab.vocabulary}
                  </div>
                ))}
              </div>
            )}
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

Footer.propTypes = {
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
  handleNext: PropTypes.func.isRequired,
  handleGoToIndex: PropTypes.func.isRequired,
};

export default Footer;