// components/StatsModal.js
import React from 'react';
import { X } from 'lucide-react';

const StatsModal = ({ isOpen, onClose, stats, solution }) => {
  if (!isOpen) return null;

  const calculateWinRate = () => {
    if (stats.played === 0) return 0;
    return Math.round((stats.wins / stats.played) * 100);
  };

  const getMaxDistribution = () => {
    return Math.max(...stats.distribution, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-96 max-w-[90vw] relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Statistics
        </h2>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">{stats.played}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">{calculateWinRate()}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">{stats.currentStreak}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">{stats.maxStreak}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Max Streak</div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Guess Distribution
        </h3>

        <div className="space-y-2">
          {stats.distribution.map((count, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 text-gray-600 dark:text-gray-400">{index + 1}</div>
              <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-sm overflow-hidden">
                <div
                  className="h-full bg-green-500 flex items-center justify-end px-2 text-white text-sm transition-all duration-500"
                  style={{ width: `${(count / getMaxDistribution()) * 100}%`, minWidth: count > 0 ? '2rem' : '0' }}
                >
                  {count > 0 && count}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Solution: <span className="font-mono font-bold text-gray-800 dark:text-white">{solution}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;