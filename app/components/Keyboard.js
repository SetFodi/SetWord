// components/Keyboard.js
import React from 'react';

const Keyboard = ({ onKeyPress, letterStatuses }) => {
  const keysRow1 = ['Q','W','E','R','T','Y','U','I','O','P'];
  const keysRow2 = ['A','S','D','F','G','H','J','K','L'];
  const keysRow3 = ['ENTER', 'Z','X','C','V','B','N','M','DEL'];

  const getKeyStyle = (key) => {
    const status = letterStatuses[key];
    const baseStyle = "transition-all duration-200 rounded-lg font-bold shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 ";
    
    if (status === 'correct') 
      return baseStyle + 'bg-gradient-to-br from-green-400 to-green-600 text-white';
    if (status === 'present') 
      return baseStyle + 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
    if (status === 'absent') 
      return baseStyle + 'bg-gradient-to-br from-gray-400 to-gray-600 text-white';
    return baseStyle + 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-100';
  };

  return (
    <div className="mt-8 space-y-2 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm shadow-xl">
      {[keysRow1, keysRow2, keysRow3].map((row, idx) => (
        <div key={idx} className="flex justify-center gap-1.5">
          {row.map(key => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${getKeyStyle(key)} ${key.length > 1 ? 'px-3 py-4 text-sm' : 'w-10 py-4'}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
