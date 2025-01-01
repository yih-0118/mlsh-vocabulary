import React from 'react';
import ListboxSelect from './ListboxSelect';
import { categoriesMapping } from '../categoriesMapping';

const Selector = ({
  darkMode = false, 
  category,
  setCategory,
  subcategory,
  setSubcategory,
  categoryOptions,
}) => {
  const mappedCategoryOptions = categoryOptions.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const mappedSubcategoryOptions = 
    categoriesMapping[category]?.map((sub) => ({
      value: sub.label,
      label: sub.label,
    })) || [];

  return (
    <div className="space-y-4 my-12 transition-all duration-500">
      {/* 選擇篇章 */}
      <ListboxSelect
        label="選擇篇章："
        selected={category}
        setSelected={setCategory}
        options={mappedCategoryOptions}
        darkMode={darkMode}
      />

      {/* 選擇單元 */}
      {category && (
        <ListboxSelect
          label="選擇單元："
          selected={subcategory}
          setSelected={setSubcategory}
          options={mappedSubcategoryOptions}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Selector;