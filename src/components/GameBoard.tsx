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
    <div className="relative w-full aspect-square bg-container-bg p-3 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden">
      {/* Background cells - fixed grid */}
      <div className="grid grid-cols-4 grid-rows-4 gap-3 w-full h-full">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <div key={i} className="bg-tile-empty rounded-lg w-full h-full" />
        ))}
      </div>

      {/* Active tiles - absolutely positioned over the grid */}
      <div className="absolute inset-3 pointer-events-none">
        <AnimatePresence>
          {grid.map((row, r) =>
            row.map((tile, c) => tile !== null && (
              <Tile key={tile.id} value={tile.value} row={r} col={c} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
