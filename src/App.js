import React, { useState, useEffect, Fragment } from 'react';
import {
  ChevronLeft, ChevronRight, Eye, EyeOff, Volume2, List, X, Moon, Sun, CheckCircle, AlertTriangle,
} from 'lucide-react';
import { FaBook as Book } from 'react-icons/fa';
import { categoriesMapping } from './categoriesMapping';
import IconButton from './components/IconButton';
import Flashcard from './components/Flashcard';
import ListboxSelect from './components/ListboxSelect';
import './App.css';
const QUIZ_LENGTH = 10;
const QUIZ_TIME_LIMIT = 10;

const App = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [vocabularies, setVocabularies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChinese, setShowChinese] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerShowChinese, setDrawerShowChinese] = useState(false);
  const [sortAZ, setSortAZ] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizType, setQuizType] = useState('enToZh');
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_LIMIT);

  const categoryOptions = Object.keys(categoriesMapping);
  const subcategoryOptions = category ? categoriesMapping[category] : [];

  useEffect(() => {
    setSubcategory('');
    setVocabularies([]);
    setCurrentIndex(0);
    setShowChinese(false);
    setIsQuizMode(false);
  }, [category]);

  useEffect(() => {
    const fetchData = async (path) => {
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setVocabularies(data.vocabularies || []);
        setCurrentIndex(0);
        setShowChinese(false);
        setFadeKey((prev) => prev + 1);
        resetQuiz();
      } catch (err) {
        console.error('Error fetching JSON:', err);
        setVocabularies([]);
        resetQuiz();
      }
    };

    const subItem = categoriesMapping[category]?.find(
      (s) => s.label === subcategory
    );
    if (subItem?.link) {
      fetchData(subItem.link);
    } else {
      setVocabularies([]);
    }
  }, [category, subcategory]);

  // ----------------- 單字排序 -----------------
  const sortedVocabularies = sortAZ
    ? [...vocabularies].sort((a, b) =>
      a.vocabulary.localeCompare(b.vocabulary, 'en', { sensitivity: 'base' })
    )
    : vocabularies;

  // ----------------- 按鈕 (Flashcard ) -----------------
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % vocabularies.length);
    setFadeKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + vocabularies.length) % vocabularies.length);
    setFadeKey((prev) => prev + 1);
  };

  const handleRead = (word) => {
    if (!word) return;
    const encoded = encodeURIComponent(word);
    const audio = new Audio(
      `https://dict.youdao.com/dictvoice?type=1&audio=${encoded}`
    );
    audio.play();
  };

  // ----------------- 測驗模式 -----------------
  const resetQuiz = () => {
    setIsQuizMode(false);
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizQuestion(null);
    setQuizOptions([]);
    setQuizAnswered(false);
    setQuizIsCorrect(null);
    setTimeLeft(QUIZ_TIME_LIMIT);
  };

  const generateQuestion = () => {
    if (sortedVocabularies.length === 0) return;

    // 隨機挑一個正確答案
    const randomIndex = Math.floor(Math.random() * sortedVocabularies.length);
    const correctItem = sortedVocabularies[randomIndex];

    // 取出其他三個
    let otherOptions = [...sortedVocabularies];
    otherOptions.splice(randomIndex, 1);
    otherOptions = shuffleArray(otherOptions).slice(0, 3);

    // 洗牌合併
    const options = shuffleArray([correctItem, ...otherOptions]);

    setQuizQuestion(correctItem);
    setQuizOptions(options);
    setQuizAnswered(false);
    setQuizIsCorrect(null);
    setTimeLeft(QUIZ_TIME_LIMIT);
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const startQuiz = () => {
    if (!category || !subcategory || sortedVocabularies.length === 0) return;
    setIsQuizMode(true);
    setQuizQuestionIndex(0);
    setQuizScore(0);
    generateQuestion();
  };

  const handleAnswer = (item) => {
    if (!quizQuestion || quizAnswered) return;
    const isCorrect = item.vocabulary === quizQuestion.vocabulary;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
    setQuizIsCorrect(isCorrect);
    setQuizAnswered(true);
  };

  const handleNextQuestion = () => {
    const nextIndex = quizQuestionIndex + 1;
    if (nextIndex < QUIZ_LENGTH) {
      setQuizQuestionIndex(nextIndex);
      generateQuestion();
    } else {
      alert(`測驗結束！總得分: ${quizScore}/${QUIZ_LENGTH}`);
      resetQuiz();
    }
  };

  // ----------------- 計時器 -----------------
  useEffect(() => {
    if (!isQuizMode || !quizQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // 時間到尚未回答則自動算答錯
          if (!quizAnswered) {
            setQuizIsCorrect(false);
            setQuizAnswered(true);
          }
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (quizAnswered) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isQuizMode, quizQuestion, quizAnswered]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  // 準備 Listbox 選單選項格式
  const categorySelectOptions = categoryOptions.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const subcategorySelectOptions = subcategoryOptions.map((sub) => ({
    value: sub.label,
    label: sub.label,
  }));

  // ----------------- 最終回傳的畫面 -----------------
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
    >
      {/* ---------- Header ---------- */}
      <header
        className={`
          fixed top-0 w-full z-10 shadow-md rounded-b-lg
          transition-all duration-500
          ${darkMode
            ? 'bg-gradient-to-r from-gray-900 to-gray-800'
            : 'bg-gradient-to-r from-white to-gray-200'
          }
        `}
      >
        <div className="max-w-xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className={`text-2xl font-extrabold tracking-wide transition-colors duration-500 flex items-center space-x-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'
              }`}
          >
            <Book className="inline-block text-lg" />
            <span>明倫單字卡</span>
          </h1>
          <div className="flex space-x-3 sm:space-x-2">
            <IconButton
              icon={darkMode ? Sun : Moon}
              onClick={() => setDarkMode(!darkMode)}
              label="Toggle Dark Mode"
              darkMode={darkMode}
            />
            <IconButton
              icon={List}
              onClick={() => setShowDrawer(true)}
              label="Show Index"
              darkMode={darkMode}
            />
          </div>
        </div>
      </header>

      <main className="pt-16 pb-24 max-w-xl mx-auto px-4">
        <div className="space-y-4 my-12 transition-all duration-500">
          {/* 選擇篇章 */}
          <div>
            <ListboxSelect
              label="選擇篇章："
              selected={category}
              setSelected={setCategory}
              options={categorySelectOptions}
              darkMode={darkMode} // 傳遞 darkMode

            />
          </div>

          {/* 選擇單元 */}
          {category && (
            <div>
              <ListboxSelect
                label="選擇單元："
                selected={subcategory}
                setSelected={setSubcategory}
                options={subcategorySelectOptions}
                darkMode={darkMode} // 傳遞 darkMode

              />
            </div>
          )}
        </div>

        {/* 如果不是測驗模式，就顯示 Flashcard */}
        {!isQuizMode && (
          <>
            {vocabularies.length > 0 && currentIndex < vocabularies.length && (
              <Flashcard
                vocabulary={vocabularies[currentIndex].vocabulary}
                partOfSpeech={vocabularies[currentIndex].partOfSpeech}
                chinese={vocabularies[currentIndex].chinese}
                showChinese={showChinese}
                fadeKey={fadeKey}
                darkMode={darkMode}
              />
            )}

            {/* 顯示題型選擇 + 開始測驗按鈕 */}
            {vocabularies.length > 0 && (
              <div className="my-6 space-y-4 transition-all duration-500">
                <div className="flex space-x-2">
                  <button
                    className={`
                      flex-1 py-2 px-4 rounded-lg border-2 transition-transform duration-300 hover:scale-100
                      ${quizType === 'enToZh'
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
                      ${quizType === 'zhToEn'
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
                    ${darkMode
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
          </>
        )}

        {/* 如果是測驗模式，就顯示 Quiz 介面 */}
        {isQuizMode && quizQuestion && (
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
                  題目：{quizQuestionIndex + 1} / {QUIZ_LENGTH}
                </h2>
                <p className="text-sm">剩餘時間：{timeLeft} 秒</p>
              </div>
              <div className="relative w-full h-3 bg-gray-300 rounded">
                <div
                  className="absolute left-0 top-0 h-3 bg-[#8993b4] rounded transition-all duration-1000 linear"
                  style={{ width: `${(timeLeft / QUIZ_TIME_LIMIT) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 題目與分數在同一行 */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">
                {quizType === 'enToZh'
                  ? `「${quizQuestion.vocabulary}」的中文：`
                  : `「${quizQuestion.chinese}」的英文：`}
              </p>
              <div
                className={`
                  px-3 py-1 rounded-full font-bold
                  ${quizAnswered && quizIsCorrect
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
                return (
                  <button
                    key={idx}
                    disabled={quizAnswered}
                    onClick={() => handleAnswer(item)}
                    className={`
                      w-full text-left p-3 rounded-lg border transition-all duration-300
                      hover:scale-[1.00]
                      ${darkMode
                        ? 'border-gray-700'
                        : 'border-gray-300'
                      }
                      ${quizAnswered
                        ? item.vocabulary === quizQuestion.vocabulary ||
                          item.chinese === quizQuestion.chinese
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

            {/* 顯示對錯區塊 */}
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
                  className={`w-full mt-2 py-2 px-4 rounded-lg font-bold transition-transformＦ duration-300 hover:scale-100
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
        )}
      </main>

      {/* Flashcard 模式底部操作列 (只有非測驗模式時顯示) */}
      {!isQuizMode && vocabularies.length > 0 && (
        <div
          className={`
            fixed bottom-0 w-full border-t z-10
            transition-colors duration-500
            ${darkMode
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

      {/* Drawer (側邊單字列表) */}
      {/* 半透明遮罩 */}
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-50 z-20
          transition-opacity duration-300
          ${showDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setShowDrawer(false)}
      />
      {/* Drawer 本體 */}
      <div
        className={`
          fixed inset-y-0 right-0 w-full max-w-sm shadow-xl z-30
          transform transition-transform duration-300
          flex flex-col
          ${showDrawer ? 'translate-x-0' : 'translate-x-full'}
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
        `}
      >
        <div
          className={`
            p-4 border-b flex justify-between items-center
            transition-colors duration-500
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}
          `}
        >
          <h2
            className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            單字列表
          </h2>
          <IconButton
            icon={X}
            onClick={() => setShowDrawer(false)}
            label="Close Drawer"
            darkMode={darkMode}
          />
        </div>

        <div
          className={`
            p-4 border-b flex space-x-2
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}
          `}
        >
          <button
            onClick={() => setDrawerShowChinese(!drawerShowChinese)}
            className={`
              flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2
              transition-transform duration-300 hover:scale-100
              ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}
            `}
          >
            {drawerShowChinese ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
            <span>{drawerShowChinese ? '隱藏中文' : '顯示中文'}</span>
          </button>

          <button
            onClick={() => setSortAZ(!sortAZ)}
            className={`
              flex-1 py-2 px-4 rounded-lg
              transition-transform duration-300 hover:scale-100
              ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}
            `}
          >
            {sortAZ ? '原順序' : 'A~Z排序'}
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {sortedVocabularies.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setFadeKey((prev) => prev + 1);
                setShowDrawer(false);
              }}
              className={`
                p-3 rounded-lg cursor-pointer transition-colors duration-300
                ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
              `}
            >
              <div
                className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}
              >
                {idx + 1}. {item.vocabulary}{' '}
                <span
                  className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {item.partOfSpeech}
                </span>
              </div>
              {drawerShowChinese && (
                <div
                  className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {item.chinese}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
