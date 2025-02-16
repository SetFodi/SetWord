// app/components/Game.js
"use client";
import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { Moon, Sun, HelpCircle, BarChart2, RefreshCw } from 'lucide-react';
import Board from './Board';
import Keyboard from './Keyboard';
import { validWords, solutions } from '../../lib/words';
import StatsModal from './StatsModal';
import HelpModal from './HelpModal';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-dom-confetti'), { ssr: false });

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 100,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  colors: ["#4CAF50", "#FFC107", "#2196F3", "#9C27B0", "#F44336"]
};

// Convert the current local time to Tbilisi time (UTC+4)
function getTbilisiNow() {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcTime + 4 * 3600000);
}

// Get the effective date for the daily puzzle based on Tbilisi time.
// If the current Tbilisi time is before 9:00 AM, treat it as part of the previous day.
function getEffectiveDate() {
  const tbilisiNow = getTbilisiNow();
  if (tbilisiNow.getHours() < 9) {
    tbilisiNow.setDate(tbilisiNow.getDate() - 1);
  }
  const effective = new Date(tbilisiNow);
  effective.setHours(9, 0, 0, 0);
  return effective;
}

// Calculate the daily solution based on an epoch (9:00 AM Tbilisi time on Jan 1, 2023)
// and the effective date computed above.
function getDailySolution() {
  // Epoch: January 1, 2023 at 09:00 AM Tbilisi time.
  const epoch = new Date('2023-01-01T09:00:00+04:00');
  const effective = getEffectiveDate();
  const diff = effective.getTime() - epoch.getTime();
  const days = Math.floor(diff / 86400000);
  const index = days % solutions.length;
  return solutions[index].toUpperCase();
}

function getRandomSolution() {
  const index = Math.floor(Math.random() * solutions.length);
  return solutions[index].toUpperCase();
}

const loadStats = () => {
  if (typeof window === 'undefined')
    return {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      distribution: Array(6).fill(0)
    };
  try {
    return JSON.parse(localStorage.getItem('wordleStats')) || {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      distribution: Array(6).fill(0)
    };
  } catch {
    return {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      distribution: Array(6).fill(0)
    };
  }
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
      
    case 'ADD_LETTER':
      if (state.gameOver || state.currentCol >= 5) return state;
      const newBoard = state.board.map(row => [...row]);
      newBoard[state.currentRow][state.currentCol] = { 
        ...newBoard[state.currentRow][state.currentCol],
        value: action.payload 
      };
      return { 
        ...state, 
        board: newBoard, 
        currentCol: state.currentCol + 1,
        errorMessage: '' 
      };

    case 'DELETE_LETTER':
      if (state.gameOver || state.currentCol === 0) return state;
      const updatedBoard = state.board.map(row => [...row]);
      updatedBoard[state.currentRow][state.currentCol - 1].value = '';
      return { 
        ...state, 
        board: updatedBoard, 
        currentCol: state.currentCol - 1,
        errorMessage: '' 
      };

    case 'SUBMIT_GUESS':
      if (state.currentCol !== 5 || state.gameOver) return state;
      const guess = state.board[state.currentRow].map(tile => tile.value).join('').toLowerCase();
      if (!validWords.includes(guess)) {
        return {
          ...state,
          rowClassNames: state.rowClassNames.map((_, i) =>
            i === state.currentRow ? 'animate-shake' : ''
          ),
          errorMessage: 'Not in word list'
        };
      }
      const solutionLetters = state.solution.split('');
      const newRow = state.board[state.currentRow].map((tile, i) => {
        if (tile.value === solutionLetters[i]) return { ...tile, status: 'correct' };
        if (solutionLetters.includes(tile.value)) return { ...tile, status: 'present' };
        return { ...tile, status: 'absent' };
      });
      const letterStatuses = { ...state.letterStatuses };
      newRow.forEach(({ value, status }) => {
        if (!letterStatuses[value] ||
            (status === 'correct' && letterStatuses[value] !== 'correct') ||
            (status === 'present' && letterStatuses[value] === 'absent')) {
          letterStatuses[value] = status;
        }
      });
      const isWin = newRow.every(tile => tile.status === 'correct');
      const newRowClassNames = [...state.rowClassNames];
      newRowClassNames[state.currentRow] = isWin ? 'animate-bounce' : '';
      return {
        ...state,
        board: state.board.map((row, i) => (i === state.currentRow ? newRow : row)),
        currentRow: isWin || state.currentRow === 5 ? state.currentRow : state.currentRow + 1,
        currentCol: 0,
        letterStatuses,
        rowClassNames: newRowClassNames,
        gameOver: isWin || state.currentRow === 5,
        showStats: isWin || state.currentRow === 5,
        errorMessage: '',
        stats: {
          ...state.stats,
          played: state.stats.played + 1,
          wins: isWin ? state.stats.wins + 1 : state.stats.wins,
          currentStreak: isWin ? state.stats.currentStreak + 1 : 0,
          maxStreak: Math.max(state.stats.maxStreak, isWin ? state.stats.currentStreak + 1 : 0),
          distribution: isWin
            ? state.stats.distribution.map((v, i) => (i === state.currentRow ? v + 1 : v))
            : state.stats.distribution
        }
      };

    case 'RESET_GAME':
      if (state.mode === 'daily') return state;
      return {
        ...state,
        board: Array(6).fill().map(() => Array(5).fill({ value: '', status: '' })),
        solution: getRandomSolution(),
        currentRow: 0,
        currentCol: 0,
        gameOver: false,
        letterStatuses: {},
        rowClassNames: Array(6).fill(''),
        errorMessage: ''
      };

    case 'TOGGLE_THEME':
      return { ...state, darkMode: !state.darkMode };
    case 'SHOW_HELP':
      return { ...state, showHelp: true };
    case 'CLOSE_HELP':
      return { ...state, showHelp: false };
    case 'SHOW_STATS':
      return { ...state, showStats: true };
    case 'CLOSE_STATS':
      return { ...state, showStats: false };
    default:
      return state;
  }
}

function Game({ mode }) {
  const router = useRouter();
  const solution = mode === 'daily' ? getDailySolution() : getRandomSolution();
  const [confetti, setConfetti] = useState(false);
  const defaultState = {
    board: Array(6).fill().map(() => Array(5).fill({ value: '', status: '' })),
    solution,
    currentRow: 0,
    currentCol: 0,
    gameOver: false,
    letterStatuses: {},
    rowClassNames: Array(6).fill(''),
    stats: loadStats(),
    showStats: false,
    showHelp: false,
    errorMessage: '',
    mode,
    darkMode: true
  };
  const [state, dispatch] = useReducer(gameReducer, defaultState);

  // Dark mode effect: update document class when state.darkMode changes.
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  useEffect(() => {
    if (mode === "daily") {
      const storedDate = localStorage.getItem("dailyGameDate");
      const storedWord = localStorage.getItem("dailyGameWord");
      const today = new Date().toDateString();
      
      fetch("/api/daily-word")
        .then((res) => res.json())
        .then((data) => {
          const dailyWord = data.word.toUpperCase();
  
          // If it's a new day or the stored word is different, reset state
          if (storedDate !== today || storedWord !== dailyWord) {
            localStorage.setItem("dailyGameDate", today);
            localStorage.setItem("dailyGameWord", dailyWord);
            localStorage.removeItem("dailyGameState"); // Clear previous state
            dispatch({ type: "RESET_GAME", payload: { solution: dailyWord } });
          } else {
            // Load existing state if the word hasn't changed
            const storedState = localStorage.getItem("dailyGameState");
            if (storedState) {
              dispatch({ type: "LOAD_STATE", payload: JSON.parse(storedState) });
            }
          }
        })
        .catch((err) => console.error("Error fetching daily word:", err));
    }
  }, [mode]);
  

  // Save daily game state when game is over in daily mode.
  useEffect(() => {
    if (mode === 'daily' && state.gameOver) {
      localStorage.setItem('dailyGameDate', new Date().toDateString());
      localStorage.setItem('dailyGameState', JSON.stringify(state));
    }
  }, [mode, state.gameOver, state]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (state.gameOver) return;
      if (e.key === 'Enter') {
        dispatch({ type: 'SUBMIT_GUESS' });
      } else if (e.key === 'Backspace') {
        dispatch({ type: 'DELETE_LETTER' });
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        dispatch({ type: 'ADD_LETTER', payload: e.key.toUpperCase() });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.gameOver]);

  useEffect(() => {
    if (state.gameOver && state.showStats) {
      localStorage.setItem('wordleStats', JSON.stringify(state.stats));
      if (state.board[state.currentRow].every(tile => tile.status === 'correct')) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      }
    }
  }, [state.gameOver, state.showStats, state.stats, state.board, state.currentRow]);

  return (
    <div className={`min-h-screen ${state.darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="relative">
          <Confetti active={confetti} config={config} />
        </div>
        {/* Header */}
        <div className="w-full max-w-xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wordle {mode === 'daily' ? 'Daily' : 'Unlimited'}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => dispatch({ type: 'SHOW_HELP' })}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <HelpCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={() => dispatch({ type: 'SHOW_STATS' })}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <BarChart2 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {state.darkMode ? (
                <Sun className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
        <main className="max-w-xl mx-auto px-4 py-8">
          {state.errorMessage && (
            <div className="text-center text-red-600 dark:text-red-400 mb-4 font-medium">
              {state.errorMessage}
            </div>
          )}
          {/* Game Board */}
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <Board
              boardData={state.board}
              rowClassNames={state.rowClassNames}
            />
          </div>
          {/* Keyboard */}
          <Keyboard
            onKeyPress={(key) => {
              if (state.gameOver) return;
              if (key === 'ENTER') dispatch({ type: 'SUBMIT_GUESS' });
              else if (key === 'DEL') dispatch({ type: 'DELETE_LETTER' });
              else dispatch({ type: 'ADD_LETTER', payload: key });
            }}
            letterStatuses={state.letterStatuses}
          />
          {/* Game Controls */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Go Home
            </button>
            {mode === 'unlimited' && (
              <button
                onClick={() => dispatch({ type: 'RESET_GAME' })}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                New Game
              </button>
            )}
          </div>
        </main>
        <StatsModal
          isOpen={state.showStats}
          onClose={() => dispatch({ type: 'CLOSE_STATS' })}
          stats={state.stats}
          solution={state.solution}
        />
        <HelpModal
          isOpen={state.showHelp}
          onClose={() => dispatch({ type: 'CLOSE_HELP' })}
        />
      </div>
    </div>
  );
}

export default Game;
