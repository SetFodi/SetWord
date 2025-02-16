// components/HelpModal.js
import React from 'react';
import { X } from 'lucide-react';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const examples = [
    {
      word: 'WEARY',
      description: 'W is in the word and in the correct spot.',
      tiles: [
        { letter: 'W', status: 'correct' },
        { letter: 'E', status: '' },
        { letter: 'A', status: '' },
        { letter: 'R', status: '' },
        { letter: 'Y', status: '' }
      ]
    },
    {
      word: 'PILLS',
      description: 'I is in the word but in the wrong spot.',
      tiles: [
        { letter: 'P', status: '' },
        { letter: 'I', status: 'present' },
        { letter: 'L', status: '' },
        { letter: 'L', status: '' },
        { letter: 'S', status: '' }
      ]
    },
    {
      word: 'VAGUE',
      description: 'U is not in the word in any spot.',
      tiles: [
        { letter: 'V', status: '' },
        { letter: 'A', status: '' },
        { letter: 'G', status: '' },
        { letter: 'U', status: 'absent' },
        { letter: 'E', status: '' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-96 max-w-[90vw] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          How to Play
        </h2>

        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            Guess the word in 6 tries. After each guess, the color of the tiles will change
            to show how close your guess was to the word.
          </p>

          <div className="space-y-4 my-6">
            {examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <div className="flex gap-2">
                  {example.tiles.map((tile, tileIndex) => (
                    <div
                      key={tileIndex}
                      className={`w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg
                        ${tile.status === 'correct' ? 'bg-green-500 text-white' :
                          tile.status === 'present' ? 'bg-yellow-500 text-white' :
                          tile.status === 'absent' ? 'bg-gray-500 text-white' :
                          'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
                    >
                      {tile.letter}
                    </div>
                  ))}
                </div>
                <p className="text-sm">{example.description}</p>
              </div>
            ))}
          </div>

          <p>
            A new word will be available each day in Daily mode, or you can play
            unlimited games in Practice mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;