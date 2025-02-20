import React from 'react';
import ListboxSelect from './ListboxSelect';
import { categoriesMapping } from '../categoriesMapping';

// 新增 decodeHex 函式
const decodeHex = (hexStr) => {
  // 移除所有空白（例如空格或換行）
  const cleanHex = hexStr.replace(/\s+/g, '');
  let decoded = '';
  for (let i = 0; i < cleanHex.length; i += 2) {
    decoded += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
  }
  return decoded;
};

const Selector = ({
  darkMode = false, 
  category,
  setCategory,
  subcategory,
  setSubcategory,
  categoryOptions,
}) => {
  // 你提供的 Hex 字串
  const hex = "54 48 4A 43 43 7B 6A 73 6A 73 6A 73 6A 73 6A 73 7D";
  const decodedHex = decodeHex(hex);

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
      {/* 在頁面上顯示解碼後的結果 */}
      {/* <p className="text-lg font-bold">{decodedHex}</p> */}

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
