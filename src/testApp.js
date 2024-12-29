import React, { useState, useEffect } from 'react';
import { categoriesMapping } from './categoriesMapping';
import { shuffleArray, fetchData } from './components/utils';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import FlashcardSection from './components/FlashcardSection';
import QuizSection from './components/QuizSection';
import Drawer from './components/Drawer';
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
  const [direction, setDirection] = useState(null);

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
    const loadData = async () => {
      const subItem = categoriesMapping[category]?.find(
        (s) => s.label === subcategory
      );
      if (subItem?.link) {
        try {
          const data = await fetchData(subItem.link);
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
      } else {
        setVocabularies([]);
      }
    };
    loadData();
  }, [category, subcategory]);

  const sortedVocabularies = sortAZ
    ? [...vocabularies].sort((a, b) =>
      a.vocabulary.localeCompare(b.vocabulary, 'en', { sensitivity: 'base' })
    )
    : vocabularies;

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

  const startQuiz = () => {
    if (!category || !subcategory || sortedVocabularies.length === 0) return;
    setIsQuizMode(true);
    setQuizQuestionIndex(0);
    setQuizScore(0);
    generateQuestion();
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

  const handleAnswer = (item) => {
    if (!quizQuestion || quizAnswered) return;
    const isCorrect = item.vocabulary === quizQuestion.vocabulary;
    if (isCorrect) setQuizScore((prev) => prev + 1);
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

  useEffect(() => {
    if (!isQuizMode || !quizQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
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

    if (quizAnswered) clearInterval(timer);

    return () => clearInterval(timer);
  }, [isQuizMode, quizQuestion, quizAnswered]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
    >
      {/* 頂部 Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowDrawer={setShowDrawer}
      />

      <main className="pt-16 pb-24 max-w-6xl mx-auto px-4">
        <CategorySelector
          darkMode={darkMode}
          category={category}
          setCategory={setCategory}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
          categoryOptions={categoryOptions}
          subcategoryOptions={subcategoryOptions}
        />

        {/* FlashcardSection 或 QuizSection */}
        {!isQuizMode ? (
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
        ) : (
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
          />
        )}
      </main>

      {/* Drawer (單字列表) */}
      <Drawer
        darkMode={darkMode}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        drawerShowChinese={drawerShowChinese}
        setDrawerShowChinese={setDrawerShowChinese}
        sortAZ={sortAZ}
        setSortAZ={setSortAZ}
        sortedVocabularies={sortedVocabularies}
        setCurrentIndex={setCurrentIndex}
        setFadeKey={setFadeKey}
      />
    </div>
  );
};

export default App;
