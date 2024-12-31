import React, { useState, useRef } from 'react';
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
}) => {
  const [isPlaying, setIsPlaying] = useState(false); // 控制音頻播放狀態
  const audioRef = useRef(null); // 用來追踪音頻實例

  const handleRead = (word) => {
    if (!word || isPlaying) return; // 如果正在播放音訊，則不重複
    setIsPlaying(true);

    const encoded = encodeURIComponent(word);
    const audio = new Audio(
      `https://dict.youdao.com/dictvoice?type=1&audio=${encoded}`
    );
    audioRef.current = audio;

    audio.play();
    audio.addEventListener('ended', () => setIsPlaying(false)); // 播放完成後重設狀態
  };

  const cancelRead = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // 重置播放位置
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    cancelRead(); // 每次切換卡片時取消音頻播放
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % vocabularies.length);
  };

  const handlePrev = () => {
    cancelRead(); // 每次切換卡片時取消音頻播放
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + vocabularies.length) % vocabularies.length);
  };

  return (
    <div className="relative min-h-screen pb-24">
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

      {vocabularies.length > 0 && (
        <div className="mx-4 my-6 space-y-4">
          <div className="flex gap-3">
            <button
              className={`
      flex-1 py-3 px-4 rounded-2xl
      transition-colors duration-300
      backdrop-blur-lg
      ${quizType === 'enToZh'
                  ? darkMode
                    ? 'bg-blue-500/20 border-2 border-blue-400 text-blue-200'
                    : 'bg-blue-500/10 border-2 border-blue-500 text-blue-700'
                  : darkMode
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                }
    `}
              onClick={() => setQuizType('enToZh')}
            >
              看英文選中文
            </button>

            <button
              className={`
      flex-1 py-3 px-4 rounded-2xl
      transition-colors duration-300
      backdrop-blur-lg
      ${quizType === 'zhToEn'
                  ? darkMode
                    ? 'bg-blue-500/20 border-2 border-blue-400 text-blue-200'
                    : 'bg-blue-500/10 border-2 border-blue-500 text-blue-700'
                  : darkMode
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                }
    `}
              onClick={() => setQuizType('zhToEn')}
            >
              看中文選英文
            </button>
          </div>


          <button
            className={`
              w-full py-3 px-4 rounded-2xl font-medium
              transition-all duration-300
              backdrop-blur-lg
              ${darkMode
                ? 'bg-red-500/20 text-red-200 border-2 border-red-400'
                : 'bg-red-500/10 text-red-700 border-2 border-red-500'
              }
            `}
            onClick={startQuiz}
          >
            開始測驗
          </button>
        </div>
      )}

      {vocabularies.length > 0 && (
        <div
          className={`
            fixed bottom-0 left-0 right-0
            backdrop-blur-xl
            transition-colors duration-500
            ${darkMode
              ? 'bg-gray-900/70'
              : 'bg-white/70'
            }
          `}
        >
          <div className="max-w-xl mx-auto px-6 py-6 flex justify-between items-center">
            <div className="flex gap-4">
              <IconButton
                icon={showChinese ? EyeOff : Eye}
                onClick={() => setShowChinese(!showChinese)}
                label="Toggle Chinese"
                darkMode={darkMode}
              />
              <IconButton
                icon={isPlaying ? EyeOff : Volume2} // 根據播放狀態變更圖示
                onClick={isPlaying ? cancelRead : () => handleRead(vocabularies[currentIndex]?.vocabulary)}
                label={isPlaying ? "Stop Audio" : "Play Audio"} // 提示動作
                darkMode={darkMode}
              />
            </div>
            <div className="flex gap-4">
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
    </div>
  );
};

export default FlashcardSection;
