// components/Tile.js
import React, { useEffect, useState } from 'react';

const Tile = ({ value, status, index }) => {
  const [animateTyping, setAnimateTyping] = useState(false);

  useEffect(() => {
    if (value && !status) {
      setAnimateTyping(true);
      const timeout = setTimeout(() => setAnimateTyping(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [value, status]);

  const getStatusStyle = () => {
    if (!value) return 'bg-white/70 dark:bg-gray-800/70';
    if (!status) return 'bg-blue-100/70 dark:bg-gray-700/70';
    if (status === 'correct') return 'bg-gradient-to-br from-green-400 to-green-600';
    if (status === 'present') return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-br from-gray-400 to-gray-600';
  };

  const getAnimationClass = () => {
    if (status) return 'animate-flip';
    if (animateTyping) return 'animate-typing';
    return '';
  };

  return (
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold
        shadow-lg transition-all duration-300 transform ${value ? 'scale-100' : 'scale-95'}
        ${status ? 'text-white' : 'text-gray-800 dark:text-white'}
        ${getStatusStyle()} ${getAnimationClass()}`}
      style={{ animationDelay: status ? `${index * 0.1}s` : '0s' }}
      aria-label={value ? `${value} ${status || 'empty'}` : 'Empty tile'}
    >
      {value}
    </div>
  );
};

export default Tile;