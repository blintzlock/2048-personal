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
    <div className="relative aspect-square w-full max-w-[500px] bg-container-bg p-2 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
      {/* Background cells */}
      <div className="absolute inset-0 p-2 grid grid-cols-4 grid-rows-4 gap-0">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <div key={i} className="p-2 w-full h-full">
            <div className="bg-tile-empty w-full h-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Active tiles */}
      <div className="absolute inset-0 p-2">
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
