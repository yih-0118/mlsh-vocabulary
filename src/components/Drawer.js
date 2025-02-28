import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, Star, StarOff, Search, SortAsc } from 'lucide-react';
import IconButton from './IconButton';

const Drawer = ({
  showDrawer,
  setShowDrawer,
  darkMode,
  searchTerm,
  setSearchTerm,
  drawerShowChinese,
  setDrawerShowChinese,
  sortAZ,
  setSortAZ,
  setShowOnlyFavorites,
  filteredVocabularies,
  favorites,
  toggleFavorite,
  vocabularies,
  currentIndex,
  setCurrentIndex,
  setFadeKey,
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const itemRefs = useRef([]);

  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-md z-20
          transition-all duration-500 ease-in-out
          ${showDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setShowDrawer(false)}
      />

      <div
        className={`
          fixed inset-y-0 right-0 w-full max-w-sm z-30
          transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          flex flex-col
          ${showDrawer ? 'translate-x-0' : 'translate-x-full'}
          ${darkMode ? 'bg-gray-900/90' : 'bg-gray-50/90'}
          backdrop-blur-xl
        `}
      >
        <div className="pt-4 pb-2 px-6 flex justify-between items-center">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            單字列表
          </h2>
          <IconButton
            icon={X}
            onClick={() => setShowDrawer(false)}
            label="Close Drawer"
            darkMode={darkMode}
          />
        </div>

        <div className="px-4 py-2">
          <div className={`
            relative rounded-2xl overflow-hidden
            ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}
            backdrop-blur-sm
          `}>
            <Search className={`
              absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            `} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋..."
              className={`
                w-full py-3.5 pl-12 pr-4 text-base
                ${darkMode ? 'bg-transparent text-gray-200' : 'bg-transparent text-gray-800'}
                focus:outline-none placeholder:text-gray-500
              `}
            />
          </div>
        </div>

        <div className="px-4 py-2">
          <div className={`
            p-1 rounded-2xl flex gap-1
            ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}
            backdrop-blur-sm
          `}>
            <button
              onClick={() => {
                setActiveTab('all');
                setShowOnlyFavorites(false);
              }}
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-300
                ${activeTab === 'all'
                  ? darkMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 shadow-sm'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              全部單字
            </button>
            <button
              onClick={() => {
                setActiveTab('favorites');
                setShowOnlyFavorites(true);
              }}
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-300
                ${activeTab === 'favorites'
                  ? darkMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 shadow-sm'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              我的最愛
            </button>
          </div>
        </div>

        <div className="px-4 py-2 flex gap-2">
          <button
            onClick={() => setDrawerShowChinese(!drawerShowChinese)}
            className={`
              flex-1 py-3 px-4 rounded-2xl
              flex items-center justify-center gap-2
              transition-all duration-300
              ${darkMode
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200'
                : 'bg-white/50 hover:bg-white/70 text-gray-800'}
              backdrop-blur-sm
            `}
          >
            {drawerShowChinese ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm font-medium">{drawerShowChinese ? '隱藏中文' : '顯示中文'}</span>
          </button>

          <button
            onClick={() => setSortAZ(!sortAZ)}
            className={`
              flex-1 py-3 px-4 rounded-2xl
              flex items-center justify-center gap-2
              transition-all duration-300
              ${darkMode
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200'
                : 'bg-white/50 hover:bg-white/70 text-gray-800'}
              backdrop-blur-sm
            `}
          >
            <SortAsc className="w-4 h-4" />
            <span className="text-sm font-medium">{sortAZ ? '原順序' : 'A-Z'}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-2.5">
            {filteredVocabularies.map((item, idx) => {
              const isFavorite = favorites.includes(item.vocabulary);
              const isCurrent = vocabularies[currentIndex]?.vocabulary === item.vocabulary;

              return (
                <div
                  key={idx}
                  ref={(el) => itemRefs.current[idx] = el}
                  onClick={() => {
                    const realIndex = vocabularies.findIndex(
                      (v) => v.vocabulary === item.vocabulary
                    );
                    if (realIndex !== -1) {
                      setCurrentIndex(realIndex);
                      setFadeKey((prev) => prev + 1);
                      setShowDrawer(false);
                    }
                  }}
                  className={`
                    group rounded-2xl p-4
                    transition-all duration-300 ease-out
                    cursor-pointer
                    ${isCurrent
                      ? darkMode
                        ? 'bg-blue-500'
                        : 'bg-blue-500'
                      : darkMode
                        ? 'bg-gray-800/50 hover:bg-gray-700/50'
                        : 'bg-white/50 hover:bg-white/70'
                    }
                    backdrop-blur-sm
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <span className={`
                        text-sm font-medium px-3 py-1 rounded-lg
                        ${isCurrent
                          ? 'bg-blue-600/50 text-blue-50'
                          : darkMode
                            ? 'bg-gray-700/50 text-gray-300'
                            : 'bg-gray-200/50 text-gray-600'
                        }
                      `}>
                        {idx + 1}
                      </span>

                      <div className="flex-1">
                        <div className={`
                          text-xl font-bold tracking-wide
                          ${isCurrent
                            ? 'text-white'
                            : darkMode
                              ? 'text-gray-200'
                              : 'text-gray-800'
                          }
                        `}>
                          {item.vocabulary}
                        </div>

                        <div className={`
                          text-sm font-medium mt-1
                          ${isCurrent
                            ? 'text-blue-100'
                            : darkMode
                              ? 'text-gray-400'
                              : 'text-gray-500'
                          }
                        `}>
                          {item.partOfSpeech}
                        </div>

                        <div
                          className={`
                            mt-2 text-base font-medium
                            transition-all duration-300 ease-out
                            ${drawerShowChinese
                              ? 'opacity-100 max-h-20 transform translate-y-0'
                              : 'opacity-0 max-h-0 transform -translate-y-2 overflow-hidden'
                            }
                            ${isCurrent
                              ? 'text-blue-100'
                              : darkMode
                                ? 'text-gray-400'
                                : 'text-gray-600'
                            }
                          `}
                        >
                          {item.chinese}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className={`
                        p-2 rounded-full
                        transition-all duration-300
                        ${isCurrent 
                          ? 'hover:bg-blue-600/50' 
                          : darkMode 
                            ? 'hover:bg-gray-700/50' 
                            : 'hover:bg-gray-200/50'
                        }
                      `}
                    >
                      {isFavorite ? (
                        <Star className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <StarOff className={`
                          w-5 h-5
                          ${isCurrent
                            ? 'text-white'
                            : darkMode
                              ? 'text-gray-400'
                              : 'text-gray-400'
                          }
                        `} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;