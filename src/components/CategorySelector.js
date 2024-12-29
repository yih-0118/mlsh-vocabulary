import React from 'react';
import ListboxSelect from './ListboxSelect';
import { categoriesMapping } from '../categoriesMapping';

const CategorySelector = ({
  darkMode,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  categoryOptions,
  subcategoryOptions,
}) => {

  return (
    <div className="space-y-4 my-12 transition-all duration-500">
      {/* 選擇篇章 */}
      <div>
        <ListboxSelect
          label="選擇篇章："
          selected={category}
          setSelected={setCategory}
          options={categoryOptions.map((cat) => ({
            value: cat,
            label: cat,
          }))}
          darkMode={darkMode}
        />
      </div>

      {/* 選擇單元 */}
      {category && (
        <div>
          <ListboxSelect
            label="選擇單元："
            selected={subcategory}
            setSelected={setSubcategory}
            options={(categoriesMapping[category] || []).map((sub) => ({
              value: sub.label,
              label: sub.label,
            }))}
            darkMode={darkMode}
          />
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
