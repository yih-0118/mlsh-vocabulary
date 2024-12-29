import React from 'react';
import { X, Eye, EyeOff, Star, StarOff } from 'lucide-react';
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
  return (
    <>
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
        {/* Drawer Header */}
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

        {/* Drawer 功能列 */}
        <div
          className={`
            p-4 border-b flex flex-col gap-2
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}
          `}
        >
          {/* 搜尋列 */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋英文或中文"
              className={`
                flex-1 py-2 px-3 rounded-lg focus:outline-none
                ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}
              `}
            />
          </div>

          {/* 按鈕群 */}
          <div className="flex gap-2">
            {/* 切換中英顯示 */}
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

            {/* 切換排序 */}
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

          {/* 切換我的最愛 */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`
              w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2
              transition-transform duration-300 hover:scale-100
              ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}
            `}
          >
            {showOnlyFavorites ? (
              <>
                <Star className="w-5 h-5" />
                <span>顯示全部單字</span>
              </>
            ) : (
              <>
                <StarOff className="w-5 h-5" />
                <span>只顯示我的最愛</span>
              </>
            )}
          </button>
        </div>

        {/* Drawer 內文 (單字清單) */}
        <div className="p-4 flex-1 overflow-y-auto">
          {filteredVocabularies.map((item, idx) => {
            const isFavorite = favorites.includes(item.vocabulary);
            // 判斷「目前正在看的卡片」
            const isCurrent =
              vocabularies[currentIndex] &&
              item.vocabulary === vocabularies[currentIndex].vocabulary;

            return (
              <div
                key={idx}
                onClick={() => {
                  // 找到該單字在 vocabularies 陣列中的實際索引
                  const realIndex = vocabularies.findIndex(
                    (v) => v.vocabulary === item.vocabulary
                  );
                  if (realIndex !== -1) {
                    setCurrentIndex(realIndex);
                    setFadeKey((prev) => prev + 1);
                  }
                  setShowDrawer(false);
                }}
                className={`
                  p-3 mb-2 rounded-lg cursor-pointer transition-colors duration-300 flex justify-between items-center
                  ${
                    darkMode
                      ? isCurrent
                        ? 'bg-blue-600'
                        : 'hover:bg-gray-700 bg-transparent'
                      : isCurrent
                        ? 'bg-blue-100'
                        : 'hover:bg-gray-100 bg-transparent'
                  }
                `}
              >
                <div>
                  <div
                    className={`font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    {idx + 1}. {item.vocabulary}{' '}
                    <span
                      className={`italic ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {item.partOfSpeech}
                    </span>
                  </div>
                  {drawerShowChinese && (
                    <div
                      className={`mt-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {item.chinese}
                    </div>
                  )}
                </div>

                {/* 我的最愛按鈕 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 防止點擊後同時切換卡片
                    toggleFavorite(item);
                  }}
                  className={`
                    p-2 rounded-full
                    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                  `}
                >
                  {isFavorite ? (
                    <Star className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <StarOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Drawer;
