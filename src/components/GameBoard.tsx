/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Grid, GRID_SIZE } from '../lib/gameLogic';
import { Tile } from './Tile';
import { AnimatePresence } from 'motion/react';

interface GameBoardProps {
  grid: Grid;
}

export function GameBoard({ grid }: GameBoardProps) {
  return (
    <div className="relative aspect-square w-full max-w-[500px] bg-container-bg p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 grid grid-cols-4 grid-rows-4 gap-3">
      {/* Background cells */}
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
        <div key={i} className="bg-tile-empty rounded-lg" />
      ))}

      {/* Active tiles */}
      <AnimatePresence>
        {grid.map((row, r) =>
          row.map((value, c) => value !== null && (
            <Tile key={`${r}-${c}-${value}`} value={value} row={r} col={c} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
