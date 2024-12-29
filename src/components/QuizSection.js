import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

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
  handleNextQuestion,
}) => {
  if (!quizQuestion) return null; // 防呆

  return (
    <div
      className={`
        p-6 rounded-lg shadow-lg transition-all duration-500
        ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}
      `}
    >
      {/* 計時器 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">
            題目：{quizQuestionIndex + 1} / {quizLength}
          </h2>
          <p className="text-sm">剩餘時間：{timeLeft} 秒</p>
        </div>
        <div className="relative w-full h-3 bg-gray-300 rounded">
          <div
            className="absolute left-0 top-0 h-3 bg-[#8993b4] rounded transition-all duration-1000 linear"
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 題目區 + 分數 */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold">
          {quizType === 'enToZh'
            ? `「${quizQuestion.vocabulary}」的中文：`
            : `「${quizQuestion.chinese}」的英文：`}
        </p>
        <div
          className={`
            px-3 py-1 rounded-full font-bold
            ${
              quizAnswered && quizIsCorrect
                ? 'bg-green-500 text-white animate-pingOnce'
                : darkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-blue-100 text-blue-900'
            }
          `}
        >
          {quizScore}
        </div>
      </div>

      {/* 選項 */}
      <div className="space-y-2">
        {quizOptions.map((item, idx) => {
          const displayText =
            quizType === 'enToZh' ? item.chinese : item.vocabulary;

          const isCorrectOption =
            item.vocabulary === quizQuestion.vocabulary ||
            item.chinese === quizQuestion.chinese;

          return (
            <button
              key={idx}
              disabled={quizAnswered}
              onClick={() => handleAnswer(item)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all duration-300
                hover:scale-[1.00]
                ${darkMode ? 'border-gray-700' : 'border-gray-300'}
                ${
                  quizAnswered
                    ? isCorrectOption
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : ''
                }
              `}
            >
              {displayText}
            </button>
          );
        })}
      </div>

      {/* 顯示答對或答錯 */}
      {quizAnswered && (
        <div className="mt-4">
          {quizIsCorrect ? (
            <div
              className={`
                p-4 mb-2 rounded-lg flex items-center space-x-2
                bg-green-100 border-l-4 border-green-500
                transition-transform duration-500 animate-fadeInScale
                ${darkMode ? 'bg-opacity-10 text-green-400' : 'text-green-700'}
              `}
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-semibold">答對了！</p>
            </div>
          ) : (
            <div
              className={`
                p-4 mb-2 rounded-lg flex items-center space-x-2
                bg-red-100 border-l-4 border-red-500
                transition-transform duration-500 animate-fadeInScale
                ${darkMode ? 'bg-opacity-10 text-red-400' : 'text-red-700'}
              `}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="font-semibold">
                答錯了！正確答案是：{' '}
                {quizType === 'enToZh'
                  ? quizQuestion.chinese
                  : quizQuestion.vocabulary}
              </p>
            </div>
          )}

          <button
            className={`
              w-full mt-2 py-2 px-4 rounded-lg font-bold
              transition-transform duration-300 hover:scale-100
              ${darkMode
                ? 'bg-[#8993b4] text-white'
                : 'bg-[#e0e3ed] text-[#3b3d4a]'
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
