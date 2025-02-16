"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Github, Calendar, Infinity, Moon, Sun } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // If saved theme is explicitly "light", set dark mode to false.
    // Otherwise, force dark mode.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update document class and localStorage when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {/* Main Content */}
        <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-geist-sans">
         SetWord 
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12 text-xl">
          A modern take on the classic word game
        </p>

        {/* Game Mode Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <button
            onClick={() => router.push('/daily')}
            className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-500 
              text-white rounded-xl hover:from-green-500 hover:to-emerald-600 transition-all duration-200 
              transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-xl font-semibold"
          >
            <Calendar className="w-6 h-6" />
            Daily Challenge
            <span className="absolute top-0 right-0 -mt-2 -mr-2 px-2.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
              NEW
            </span>
          </button>

          <button
            onClick={() => router.push('/unlimited')}
            className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-400 to-indigo-500 
              text-white rounded-xl hover:from-blue-500 hover:to-indigo-600 transition-all duration-200 
              transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-xl font-semibold"
          >
            <Infinity className="w-6 h-6" />
            Unlimited Play
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <a
            href="https://github.com/SetFodi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 
              dark:hover:text-gray-200 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with ❤️ by Andromeda
          </p>
        </div>
      </div>
    </div>
  );
}
