import React, { useState } from 'react';

const QuizSection = ({
  darkMode,
  quizType,
  quizQuestionIndex,
  quizLength,
  timeLeft,
  quizQuestion,
  quizOptions,
  quizAnswered,
  quizIsCorrect,
  quizScore,
  handleAnswer,
  handleNextQuestion
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  if (!quizQuestion) return null;

  const handleOptionClick = (item) => {
    if (quizAnswered) return;

    if (selectedOption === item) {
      setSelectedOption(null);
      handleAnswer(null);
    } else {
      setSelectedOption(item);
      handleAnswer(item);
    }
  };

  return (
    <div
      className={`
        p-4 rounded-2xl backdrop-blur-xl shadow-lg 
        transition-all duration-500
        ${darkMode
          ? 'bg-gray-900/70 text-gray-100'
          : 'bg-white/70 text-gray-800'
        }
      `}
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">
            題目：{quizQuestionIndex + 1} / {quizLength}
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            剩餘：{timeLeft} 秒
          </p>
        </div>
        <div className="relative w-full h-2 bg-gray-200/30 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 linear
            bg-gradient-to-r from-blue-400 to-blue-500"
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-medium">
          {quizType === 'enToZh'
            ? `「${quizQuestion.vocabulary}」的中文`
            : `「${quizQuestion.chinese}」的英文`}
        </p>
        <div
          className={`
            px-4 py-1.5 rounded-full font-medium text-sm
            backdrop-blur-sm transition-all duration-300
            ${quizAnswered && quizIsCorrect
              ? 'bg-green-500/20 text-green-300 border border-green-400'
              : darkMode
                ? 'bg-gray-800/50 text-gray-200 border border-gray-700'
                : 'bg-gray-100/50 text-gray-700 border border-gray-300'
            }
          `}
        >
          {quizScore}
        </div>
      </div>

      <div className="space-y-2">
        {quizOptions.map((item, idx) => {
          const displayText = quizType === 'enToZh' ? item.chinese : item.vocabulary;
          const isCorrectOption = item.vocabulary === quizQuestion.vocabulary ||
            item.chinese === quizQuestion.chinese;

          const isSelected = selectedOption === item;

          return (
            <button
              key={idx}
              disabled={quizAnswered}
              onClick={() => handleOptionClick(item)}
              className={`
              w-full text-left p-4 rounded-xl
              backdrop-blur-sm
              transition-all duration-300
              active:scale-95
              ${isSelected ? 'scale-110' : ''}  
              ${quizAnswered
                  ? isCorrectOption
                    ? darkMode
                      ? 'bg-green-800/50 border-2 border-green-400 text-green-300'
                      : 'bg-green-100 border-2 border-green-400 text-green-700'
                    : darkMode
                      ? 'bg-red-800/50 border-2 border-red-400 text-red-300'
                      : 'bg-red-100 border-2 border-red-400 text-red-700'
                  : darkMode
                    ? 'bg-gray-800/70 hover:bg-gray-700 text-gray-300 border border-gray-600'
                    : 'bg-white hover:bg-blue-100 border border-blue-300 text-blue-700'
                }
      `}
            >
              {displayText}
            </button>
          );
        })}
      </div>

      {quizAnswered && (
        <div className="mt-4 space-y-4">
          <button
            className={`
              w-full py-3 px-4 rounded-xl font-medium
              backdrop-blur-lg
              transition-all duration-300
              active:scale-95
              ${darkMode
                ? 'bg-blue-500/20 text-blue-200 border-2 border-blue-400'
                : 'bg-blue-500/10 text-blue-700 border-2 border-blue-500'
              }
            `}
            onClick={handleNextQuestion}
          >
            下一題
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
