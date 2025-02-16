// components/Board.js
import React from 'react';
import Tile from './Tile';

const Board = ({ boardData, rowClassNames }) => {
  return (
    <div className="grid gap-3">
      {boardData.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex justify-center gap-3 ${rowClassNames[rowIndex] || ''}`}
        >
          {row.map((tile, tileIndex) => (
            <Tile
              key={tileIndex}
              value={tile.value}
              status={tile.status}
              index={tileIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;