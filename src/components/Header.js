import React from 'react';
import { List, Moon, Sun } from 'lucide-react';
import { FaBook as Book } from 'react-icons/fa';
import IconButton from './IconButton';
import { useEffect, useState } from 'react';
import $ from 'jquery';

const Header = ({ darkMode, setDarkMode, setShowDrawer }) => {
  const [visitCount, setVisitCount] = useState(null);
  useEffect(() => {
    fetchVisitCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVisitCount = () => {
    const parameter1 = {
      url: 'https://docs.google.com/spreadsheets/d/1sZKQONx4Y_J3ZbCZOphn70rHj4nNdZuYtjA51XLY34s/edit?resourcekey#gid=1080034406',
    };

    $.get(
      'https://script.google.com/macros/s/AKfycbwPvAfTgy4OGHRyz62F0Ug8s0rnZ9HYFfEhhZ2avdYckTcvDScB7jd1S8J07fDmyD-V/exec',
      parameter1,
      function (visitCount) {
        updateVisitCount(visitCount);
      }
    );
  };
  const updateVisitCount = (visitCount) => {
    setVisitCount(visitCount);
  };
  return (
    <header
      className={`
          fixed top-0 w-full z-10
          backdrop-blur-xl
          transition-all duration-300
          ${darkMode
          ? 'bg-gray-900/80 border-b border-gray-800'
          : 'bg-white/80 border-b border-gray-200'
        }
        `}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        <nav className="flex justify-between items-center">
          {/* Title Area */}
          <div className="flex items-center gap-2">
            <Book
              className={`
      w-6 h-6
      ${darkMode ? 'text-blue-400' : 'text-blue-500'}
    `}
            />
            <a href="/" className="no-underline">
              <h1
                className={`
        text-xl font-semibold
        ${darkMode ? 'text-white' : 'text-gray-900'}
      `}
              >
                明倫單字卡
              </h1>
            </a>
          </div>

          {/* Header 右側功能按鈕 */}
          <div className="flex items-center space-x-4 sm:space-x-2">
            {/* 顯示訪問人數 */}
            {visitCount !== null && (
              <div
                className={`
                    text-sm px-3 py-1 rounded-full
                    ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}
                  `}
              >
                {visitCount}
              </div>
            )}

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
        </nav>
      </div>
      <div
        className={`
            absolute inset-0 -z-10
            backdrop-blur-xl
            ${darkMode
            ? 'bg-gray-900/60'
            : 'bg-white/60'
          }
          `}
      />
    </header>
  );
};

export default Header;