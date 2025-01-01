import React from 'react';
import { categoriesMapping } from '../categoriesMapping';

const Selector = ({
  darkMode = false,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  categoryOptions,
}) => {
  const scrollRef = React.useRef(null);

  return (
    <div className={`mt-8 mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto py-4 px-2 no-scrollbar"
        >
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSubcategory('');
              }}
              aria-pressed={category === cat}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                ${category === cat
                  ? darkMode
                    ? 'bg-blue-500/20 border-2 border-blue-400 text-blue-200'
                    : 'bg-blue-500/10 border-2 border-blue-500 text-blue-700'
                  : darkMode
                    ? 'bg-gray-800/50 text-gray-300'
                    : 'bg-gray-100/50 text-gray-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {category && categoriesMapping[category] && (
        <div className="mt-6 relative">
          <div className="flex items-center gap-2 overflow-x-auto py-1 px-2 no-scrollbar">
            {/* <ChevronRight size={16} className="text-gray-400 flex-shrink-0" /> */}
            {categoriesMapping[category].map((sub) => (
              <button
                key={sub.label}
                onClick={() => setSubcategory(sub.label)}
                aria-pressed={subcategory === sub.label}
                className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-green-400
                  ${subcategory === sub.label
                    ? darkMode
                      ? 'bg-green-500/20 border-2 border-green-400 text-green-200'
                      : 'bg-green-500/10 border-2 border-green-500 text-green-700'
                    : darkMode
                      ? 'bg-gray-800/50 text-gray-300'
                      : 'bg-gray-100/50 text-gray-700'}`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Selector;
