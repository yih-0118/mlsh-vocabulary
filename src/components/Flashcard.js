import React from 'react';

const Flashcard = ({
    vocabulary,
    partOfSpeech,
    chinese,
    showChinese,
    fadeKey,
    darkMode,
}) => {
    return (
        <div
            key={fadeKey}
            className={`
        ${darkMode ? 'bg-gray-800' : 'bg-white'}
        rounded-xl shadow-lg p-8 mx-4 mb-4
        transition-all duration-300 ease-in-out
        animate-fadeIn opacity-100
      `}
        >
            <div className="flex flex-col items-center space-y-4">
                <h2
                    className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}
                >
                    {vocabulary}
                </h2>
                <p
                    className={`text-lg italic ${darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                >
                    {partOfSpeech}
                </p>
                <div
                    className={`
                    overflow-hidden
                    transition-all duration-300
                    ${showChinese ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                `}
                >
                    <p
                        className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                    >
                        {chinese}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
