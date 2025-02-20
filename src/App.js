import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Selector from './components/Selector';
import { categoriesMapping, loadCategoryData } from './categoriesMapping';
import FlashcardSection from './components/FlashcardSection';
import QuizSection from './components/QuizSection';
import Drawer from './components/Drawer';             
import Footer from './components/Footer'; 
import About from './About'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // ----------------- 測驗模式相關 -----------------
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizType, setQuizType] = useState('enToZh');
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_LIMIT);
  const [missedWords, setMissedWords] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // ----------------- 我的最愛 -----------------
  const [favorites, setFavorites] = useState([]);           
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');          

  // ----------------- 選擇篇章 -----------------
  const categoryOptions = Object.keys(categoriesMapping);
  const subcategoryOptions = category ? categoriesMapping[category] : [];

  useEffect(() => {
    (function(c, l, a, r, i, t, y) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "pz99mdntpf");
  }, []);

  // ----------------- 單元收藏 -----------------
  useEffect(() => {
    setSubcategory('');
    setVocabularies([]);
    setCurrentIndex(0);
    setShowChinese(false);
    setIsQuizMode(false);
  }, [category]);

  useEffect(() => {
    const storageKey = getStorageKey(category, subcategory);
    if (!storageKey) {
      setFavorites([]);
      return;
    }

    const storedFavs = localStorage.getItem(storageKey);
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    } else {
      setFavorites([]);
    }
  }, [category, subcategory]);

  useEffect(() => {
    const storageKey = getStorageKey(category, subcategory);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }, [favorites, category, subcategory]);

  // ----------------- 取得篇章對應的單字資料 -----------------
  useEffect(() => {
    const fetchData = async () => {
      const data = await loadCategoryData(category, subcategory);
      if (data) {
        setVocabularies(data.vocabularies || []);
        setCurrentIndex(0);
        setShowChinese(false);
        setFadeKey((prev) => prev + 1);
        resetQuiz();
      } else {
        setVocabularies([]);
        resetQuiz();
      }
    };
  
    if (category && subcategory) {
      fetchData();
    }
  }, [category, subcategory]);

  // ----------------- Dark Mode (深色模式) -----------------
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ----------------- 單字排序 -----------------
  const sortedVocabularies = sortAZ
    ? [...vocabularies].sort((a, b) =>
        a.vocabulary.localeCompare(b.vocabulary, 'en', { sensitivity: 'base' })
      )
    : vocabularies;

  // ----------------- 分篇章儲存 Favorites (關鍵函式) -----------------
  const getStorageKey = (cat, subcat) => {
    if (!cat) return '';
    if (!subcat) return `favorites_${cat}_all`; 
    return `favorites_${cat}_${subcat}`;
  };

  // ----------------- 我的最愛: 加入 / 取消 -----------------
  const toggleFavorite = (item) => {
    const itemVocabulary = item.vocabulary;
    if (favorites.includes(itemVocabulary)) {
      setFavorites((prev) => prev.filter((fav) => fav !== itemVocabulary));
    } else {
      setFavorites((prev) => [...prev, itemVocabulary]);
    }
  };

  // ----------------- Drawer 篩選邏輯 -----------------
  const filteredVocabularies = sortedVocabularies.filter((item) => {
    if (showOnlyFavorites && !favorites.includes(item.vocabulary)) {
      return false;
    }
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      const matchEn = item.vocabulary.toLowerCase().includes(lowerSearch);
      const matchZh = item.chinese.toLowerCase().includes(lowerSearch);
      return matchEn || matchZh;
    }
    return true;
  });

  // ----------------- Flashcard: 上一張 / 下一張 -----------------
  const [direction, setDirection] = useState(null);

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % vocabularies.length);
    setFadeKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection('prev');
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

    // 新增：重置答錯單字與完成狀態
    setMissedWords([]);
    setQuizFinished(false);
  };

  const generateQuestion = () => {
    if (sortedVocabularies.length === 0) return;
    const randomIndex = Math.floor(Math.random() * sortedVocabularies.length);
    const correctItem = sortedVocabularies[randomIndex];

    let otherOptions = [...sortedVocabularies];
    otherOptions.splice(randomIndex, 1);
    otherOptions = shuffleArray(otherOptions).slice(0, 3);

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

    setMissedWords([]);
    setQuizFinished(false);

    generateQuestion();
  };

  const handleAnswer = (item) => {
    if (!quizQuestion || quizAnswered) return;
    const isCorrect = item.vocabulary === quizQuestion.vocabulary;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    } else {
      setMissedWords((prev) => [...prev, quizQuestion]);
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
      setQuizFinished(true);
    }
  };

  // ----------------- 計時器 (測驗模式) -----------------
  useEffect(() => {
    if (!isQuizMode || !quizQuestion) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!quizAnswered) {
            setQuizIsCorrect(false);
            setQuizAnswered(true);

            setMissedWords((old) => [...old, quizQuestion]);
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
  
  const handleGoToIndex = (index) => {
    setCurrentIndex(index);
  };
  
  // ----------------- JSX -----------------
  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen transition-colors duration-500 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        {/* Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setShowDrawer={setShowDrawer}
        />

        {/* Routes */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <main className="pt-16 pb-24 max-w-xl mx-auto px-4">
                <Selector
                  darkMode={darkMode}
                  category={category}
                  setCategory={setCategory}
                  subcategory={subcategory}
                  setSubcategory={setSubcategory}
                  categoryOptions={categoryOptions}
                  subcategoryOptions={subcategoryOptions}
                />

                {/* Flashcard 模式 */}
                {!isQuizMode && (
                  <FlashcardSection
                    vocabularies={vocabularies}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    showChinese={showChinese}
                    setShowChinese={setShowChinese}
                    darkMode={darkMode}
                    fadeKey={fadeKey}
                    direction={direction}
                    setDirection={setDirection}
                    startQuiz={startQuiz}
                    quizType={quizType}
                    setQuizType={setQuizType}
                    sortedVocabularies={sortedVocabularies}
                  />
                )}

                {/* Quiz 模式 */}
                <QuizSection
                  darkMode={darkMode}
                  quizType={quizType}
                  quizQuestionIndex={quizQuestionIndex}
                  quizLength={QUIZ_LENGTH}
                  timeLeft={timeLeft}
                  quizQuestion={quizQuestion}
                  quizOptions={quizOptions}
                  quizAnswered={quizAnswered}
                  quizIsCorrect={quizIsCorrect}
                  quizScore={quizScore}
                  handleAnswer={handleAnswer}
                  handleNextQuestion={handleNextQuestion}
                  quizFinished={quizFinished}
                  missedWords={missedWords}
                  resetQuiz={resetQuiz}
                />
              </main>
            } />

            <Route path="/About" element={<About darkMode={darkMode} />} />
          </Routes>
        </div>

        {/* Flashcard 底部控制列 (非測驗模式才顯示) */}
        {!isQuizMode && vocabularies.length > 0 && (
          <Footer
            darkMode={darkMode}
            showChinese={showChinese}
            setShowChinese={setShowChinese}
            handleRead={handleRead}
            vocabularies={vocabularies}
            currentIndex={currentIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleGoToIndex={handleGoToIndex}
          />
        )}

        {/* Drawer (側邊單字列表) */}
        <Drawer
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          darkMode={darkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          drawerShowChinese={drawerShowChinese}
          setDrawerShowChinese={setDrawerShowChinese}
          sortAZ={sortAZ}
          setSortAZ={setSortAZ}
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
          filteredVocabularies={filteredVocabularies}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          vocabularies={vocabularies}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setFadeKey={setFadeKey}
        />
      </div>
    </Router>
  );
};

export default App;
