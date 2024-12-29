import React from 'react';
import IconButton from './IconButton';
import Flashcard from './Flashcard';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Volume2 } from 'lucide-react';

const FlashcardSection = ({
  vocabularies,
  currentIndex,
  setCurrentIndex,
  showChinese,
  setShowChinese,
  darkMode,
  fadeKey,
  direction,
  setDirection,
  startQuiz,
  quizType,
  setQuizType,
  sortedVocabularies,
}) => {
  const handleRead = (word) => {
    if (!word) return;
    const encoded = encodeURIComponent(word);
    const audio = new Audio(
      `https://dict.youdao.com/dictvoice?type=1&audio=${encoded}`
    );
    audio.play();
  };

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % vocabularies.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + vocabularies.length) % vocabularies.length);
  };

  return (
    <>
      {/* 如果有資料才顯示 Flashcard */}
      {vocabularies.length > 0 && currentIndex < vocabularies.length && (
        <Flashcard
          vocabulary={vocabularies[currentIndex].vocabulary}
          partOfSpeech={vocabularies[currentIndex].partOfSpeech}
          chinese={vocabularies[currentIndex].chinese}
          showChinese={showChinese}
          fadeKey={fadeKey}
          darkMode={darkMode}
          direction={direction}
        />
      )}

      {/* 顯示測驗相關按鈕（題型切換 + 開始測驗） */}
      {vocabularies.length > 0 && (
        <div className="my-6 space-y-4 transition-all duration-500">
          <div className="flex space-x-2">
            <button
              className={`
                flex-1 py-2 px-4 rounded-lg border-2 transition-transform duration-300 hover:scale-100
                ${
                  quizType === 'enToZh'
                    ? darkMode
                      ? 'border-blue-400 bg-gray-700 text-gray-100'
                      : 'border-blue-600 bg-blue-100 text-blue-900'
                    : darkMode
                      ? 'border-transparent bg-gray-700 text-gray-200'
                      : 'border-transparent bg-blue-50 text-blue-900'
                }
              `}
              onClick={() => setQuizType('enToZh')}
            >
              看英文選中文
            </button>

            <button
              className={`
                flex-1 py-2 px-4 rounded-lg border-2 transition-transform duration-300 hover:scale-100
                ${
                  quizType === 'zhToEn'
                    ? darkMode
                      ? 'border-blue-400 bg-gray-700 text-gray-100'
                      : 'border-blue-600 bg-blue-100 text-blue-900'
                    : darkMode
                      ? 'border-transparent bg-gray-700 text-gray-200'
                      : 'border-transparent bg-blue-50 text-blue-900'
                }
              `}
              onClick={() => setQuizType('zhToEn')}
            >
              看中文選英文
            </button>
          </div>
          <button
            className={`
              w-full py-2 px-4 rounded-lg font-bold transition-transform duration-300 hover:scale-100
              ${
                darkMode
                  ? 'bg-red-500 hover:bg-red-500 text-white'
                  : 'bg-red-300 hover:bg-red-400 text-red-900'
              }
            `}
            onClick={startQuiz}
          >
            開始測驗
          </button>
        </div>
      )}

      {/* Flashcard 模式底部操作列 (只有在有資料且非測驗模式時顯示) */}
      {vocabularies.length > 0 && (
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
      )}
    </>
  );
};

export default FlashcardSection;
