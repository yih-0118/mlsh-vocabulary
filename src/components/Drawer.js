import React, { useState } from 'react';
import { X, Eye, EyeOff, Star, StarOff, BookOpen, Search, SortAsc } from 'lucide-react';
import LockScrollButton from './LockScrollButton'

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
  showOnlyFavorites,
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-20
          transition-opacity duration-300
          ${showDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setShowDrawer(false)}
      />
      
      {/* Drawer */}
      <div
        className={`
          fixed inset-y-0 right-0 w-full max-w-sm z-30
          transform transition-all duration-300 ease-in-out
          flex flex-col
          ${showDrawer ? 'translate-x-0' : 'translate-x-full'}
          ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}
        `}
      >
        {/* Header */}
        <div className="relative h-16 overflow-hidden">
          <div className={`absolute inset-0 ${darkMode ? 'bg-blue-900' : 'bg-blue-500'}`}>
            <div className="absolute -bottom-8 left-0 right-0 h-16" />
          </div>
          <div className="relative flex justify-between items-center px-4 h-full">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              單字列表
            </h2>
            <button
              onClick={() => setShowDrawer(false)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <LockScrollButton darkMode={darkMode} />

        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className={`
            relative rounded-xl overflow-hidden
            ${darkMode ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
          `}>
            <Search className={`
              absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            `} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋..."
              className={`
                w-full py-3 pl-10 pr-4
                ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}
                focus:outline-none
              `}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="px-4 py-2 flex gap-2">
          <button
            onClick={() => setDrawerShowChinese(!drawerShowChinese)}
            className={`
              flex-1 py-2 px-3 rounded-xl
              flex items-center justify-center gap-2
              transition-all duration-300
              ${darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                : 'bg-white hover:bg-gray-100 text-gray-800'}
              shadow-md hover:shadow-lg
            `}
          >
            {drawerShowChinese ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm">{drawerShowChinese ? '隱藏中文' : '顯示中文'}</span>
          </button>

          <button
            onClick={() => setSortAZ(!sortAZ)}
            className={`
              flex-1 py-2 px-3 rounded-xl
              flex items-center justify-center gap-2
              transition-all duration-300
              ${darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                : 'bg-white hover:bg-gray-100 text-gray-800'}
              shadow-md hover:shadow-lg
            `}
          >
            <SortAsc className="w-4 h-4" />
            <span className="text-sm">{sortAZ ? '原順序' : 'A-Z'}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 py-2 flex gap-2">
          <button
            onClick={() => {
              setActiveTab('all');
              setShowOnlyFavorites(false);
            }}
            className={`
              flex-1 py-2 rounded-xl text-sm font-medium
              transition-all duration-300
              ${activeTab === 'all'
                ? darkMode
                  ? 'bg-blue-900 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-white text-gray-600'
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
              flex-1 py-2 rounded-xl text-sm font-medium
              transition-all duration-300
              ${activeTab === 'favorites'
                ? darkMode
                  ? 'bg-blue-900 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-white text-gray-600'
              }
            `}
          >
            我的最愛
          </button>
        </div>

        {/* Vocabulary List */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-2">
            {filteredVocabularies.map((item, idx) => {
              const isFavorite = favorites.includes(item.vocabulary);
              const isCurrent = vocabularies[currentIndex]?.vocabulary === item.vocabulary;

              return (
                <div
                  key={idx}
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
                    relative rounded-xl p-4
                    transition-all duration-300 ease-in-out
                    cursor-pointer group
                    ${isCurrent
                      ? darkMode
                        ? 'bg-blue-900'
                        : 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-white hover:bg-gray-100'
                    }
                    ${darkMode ? 'shadow-lg shadow-black/10' : 'shadow-md'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {/* Index Number */}
                      <span className={`
                        text-sm font-medium px-2 py-1 rounded-md
                        ${isCurrent
                          ? 'bg-blue-800 text-blue-100'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }
                      `}>
                        {idx + 1}
                      </span>
                      
                      {/* Word Content */}
                      <div className="flex-1">
                        {/* English Word */}
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
                        
                        {/* Part of Speech */}
                        <div className={`
                          text-sm font-medium mt-1
                          ${isCurrent
                            ? 'text-blue-200'
                            : darkMode
                              ? 'text-gray-400'
                              : 'text-gray-500'
                          }
                        `}>
                          {item.partOfSpeech}
                        </div>
                        
                        {/* Chinese Translation */}
                        {drawerShowChinese && (
                          <div className={`
                            mt-2 text-base font-medium
                            ${isCurrent
                              ? 'text-blue-100'
                              : darkMode
                                ? 'text-gray-400'
                                : 'text-gray-600'
                            }
                          `}>
                            {item.chinese}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className={`
                        p-2 rounded-full
                        transition-all duration-300
                        ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
                        ${isCurrent ? 'hover:bg-blue-700' : ''}
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