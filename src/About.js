import React, { useState, useEffect } from 'react';
import { Github, Mail, Heart, Star, Book, Calendar, CircleUser, History } from 'lucide-react';

const About = ({ darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeDiff, setTimeDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const startDate = new Date('2024-02-14T00:00:00');
  const versionButtons = [
    { href: "*", label: "回到第一代" },
    { href: "*", label: "回到第二代" },
    { href: "*", label: "回到第三代" },
  ];

  useEffect(() => {
    const timeTimer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeDiff({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timeTimer);
  }, []);

  const iconClasses = `
    w-5 h-5 transition-transform duration-300
    group-hover:scale-110 group-hover:rotate-12
  `;

  const stats = [
    { icon: Book, label: '單字數', value: '12000+', color: 'text-blue-500' },
    { icon: Star, label: '使用累計', value: '20000+', color: 'text-yellow-500' },
    { icon: Heart, label: '每日複習', value: '100+', color: 'text-red-500' },
  ];

  const achievements = [
    '⭐ 收錄雜誌',
    '📕 收錄大考中心7000單',
    '📢 收錄明倫專有單字書',
    '🏆 根據龍騰gogogo改良',
  ];

  return (
    <div className={`
      min-h-screen w-full px-4 sm:px-6 py-16 mt-8
      ${darkMode ? 'text-gray-200' : 'text-gray-800'}
    `}>
      <div className="max-w-4xl mx-auto">
        {/* 主要卡片 */}
        <div className={`
          rounded-xl p-4 sm:p-8
          transition-all duration-500 hover:scale-[1.01]
          ${darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}
        `}>
          {/* Logo 區域 */}
          <div className="flex flex-col items-center">
            <div
              className={`
                w-24 sm:w-28 h-24 sm:h-28 rounded-xl 
                flex items-center justify-center
                transition-all duration-500
                transform hover:rotate-180
                cursor-pointer
                ${darkMode ? 'bg-blue-900' : 'bg-blue-500'}
                hover:shadow-xl
              `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Book className={`
                w-12 sm:w-14 h-12 sm:h-14 text-white
                transition-all duration-500
                ${isHovered ? 'scale-110' : ''}
              `} />
            </div>

            {/* 標題和描述 */}
            <h1 className={`
              mt-6 text-2xl sm:text-3xl font-bold text-center
              ${darkMode ? 'text-gray-100' : 'text-gray-900'}
            `}>
              明倫單字卡 / mlsh-vocabulary
            </h1>

            <p className="mt-4 text-base sm:text-lg text-center max-w-xl px-4">
              最早是因為開學考雜誌單字還沒背，就草率做出來的。
            </p>

            {/* 上線時間 */}
            <div className={`
              mt-8 p-4 sm:p-6 rounded-xl w-full
              ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
              shadow text-center
            `}>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold break-words">
                已上線 {timeDiff.days} 天 {timeDiff.hours} 時 {timeDiff.minutes} 分 {timeDiff.seconds} 秒
              </div>
            </div>

            {/* 數據統計 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`
                    p-4 rounded-xl
                    ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}
                    shadow flex flex-col items-center
                    transition-all duration-300 hover:scale-105
                  `}
                >
                  <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
                  <div className="font-bold text-xl">{stat.value}</div>
                  <div className="text-sm opacity-75">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 特色展示 */}
            <div className="mt-8 w-full">
              <h2 className="text-xl font-semibold mb-4 text-center">特色</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`
                      p-4 rounded-xl text-center
                      ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}
                      shadow transition-all duration-300
                      hover:scale-105
                    `}
                  >
                    {achievement}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {versionButtons.map((version, index) => (
                <a
                  key={index}
                  href={version.href}
                  className={`
                    group flex items-center justify-center gap-2 
                    p-3 rounded-xl w-full
                    ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}
                    shadow transition-all duration-300
                    hover:scale-105
                  `}
                >
                  <History className={iconClasses} />
                  <span className="text-sm">{version.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                { href: "https://github.com/yih-0118/mlsh-vocabulary", icon: Github, label: "GitHub" },
                { href: "mailto:s11131191@mlsh.tp.edu.tw", icon: Mail, label: "Gmail" },
                { href: "https://yih-0118.github.io/about/", icon: CircleUser, label: "關於作者" },
              ].map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target={button.href.startsWith('http') ? "_blank" : "_self"}
                  rel={button.href.startsWith('http') ? "noopener noreferrer" : ""}
                  className={`
                    group flex items-center justify-center gap-2 
                    p-3 rounded-xl
                    ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}
                    shadow transition-all duration-300
                    hover:scale-105
                  `}
                >
                  <button.icon className={iconClasses} />
                  <span className="text-sm">{button.label}</span>
                </a>
              ))}
            </div>

            <div 
              className={`
                mt-8 pt-6 text-sm text-center w-full
                ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}
                border-t
              `}
            >
              © 2024 - 2025 明倫單字卡 / mlsh-vocabulary  
              <br />
              Created by Yi-Hung Wu
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;