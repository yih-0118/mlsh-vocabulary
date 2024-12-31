import React from 'react';

const Flashcard = ({
    vocabulary,
    partOfSpeech,
    chinese,
    showChinese,
    fadeKey,
    darkMode,
    direction,
}) => {
    let animationClass = '';
    if (direction === 'next') {
        animationClass = 'slide-in-next';
    } else if (direction === 'prev') {
        animationClass = 'slide-in-prev';
    }

    const bgColor = darkMode
        ? 'bg-gradient-to-b from-gray-800/90 to-gray-900/90'
        : 'bg-gradient-to-b from-white/90 to-gray-50/90';
    
    const borderColor = darkMode
        ? 'border-gray-700'
        : 'border-gray-200';

    const displayPartOfSpeech = partOfSpeech || 'phr.';

    return (
        <div
            key={fadeKey}
            className={`
                ${bgColor}
                backdrop-blur-xl
                border ${borderColor}
                rounded-2xl
                shadow-lg
                p-4 mx-4 mb-4
                transition-all duration-300 ease-in-out
                animate-fadeIn opacity-100
                ${animationClass}
            `}
        >
            <div className="flex flex-col items-center space-y-4">
                <h2
                    className={`
                        text-4xl font-semibold
                        ${darkMode ? 'text-gray-100' : 'text-gray-800'}
                        tracking-tight
                    `}
                >
                    {vocabulary}
                </h2>
                <p
                    className={`
                        text-lg
                        ${darkMode ? 'text-gray-400' : 'text-gray-500'}
                        font-medium
                    `}
                >
                    {displayPartOfSpeech}
                </p>
                <div
                    className={`
                        w-full
                        overflow-hidden
                        transition-all duration-500 ease-in-out
                        ${showChinese ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <div className={`
                        ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100/50'}
                        rounded-xl p-4
                        backdrop-blur-sm
                    `}>
                        <p
                            className={`
                                text-2xl text-center
                                ${darkMode ? 'text-gray-200' : 'text-gray-700'}
                                font-medium
                            `}
                        >
                            {chinese}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
