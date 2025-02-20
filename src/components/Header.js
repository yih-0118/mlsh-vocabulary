import React from 'react';
import { List, Moon, Sun, Info } from 'lucide-react';
import { FaBook as Book } from 'react-icons/fa';
import IconButton from './IconButton';

const Header = ({ darkMode, setDarkMode, setShowDrawer }) => {
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
          <div className="flex items-center gap-2">
            <Book
              className={`
                w-6 h-6
                ${darkMode ? 'text-blue-400' : 'text-blue-500'}
              `}
            />
            <div className="flex items-center gap-3">
              <a href="/" className="no-underline">
                <h1
                  className={`
                    text-xl font-semibold
                    ${darkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  明倫單字
                </h1>
              </a>
              {visitCount !== null && (
                <div
                  className={`
                    text-sm px-2 py-0.5 rounded-full
                  ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}
                  `}
                >
                </div>
              )}
            </div>
          </div>

          {/* Header 右側功能按鈕 */}
          <div className="flex items-center space-x-2">
            <IconButton
              icon={Info}
              onClick={() => window.location.href = '/about'}
              label="About"
              darkMode={darkMode}
            />
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