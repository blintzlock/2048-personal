/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Grid = (number | null)[][];

export const GRID_SIZE = 4;

export function createEmptyGrid(): Grid {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
}

export function getRandomPosition(grid: Grid): { r: number; c: number } | null {
  const emptyCells: { r: number; c: number }[] = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === null) emptyCells.push({ r, c });
    });
  });

  if (emptyCells.length === 0) return null;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export function addRandomTile(grid: Grid): Grid {
  const newGrid = grid.map(row => [...row]);
  const pos = getRandomPosition(newGrid);
  if (pos) {
    newGrid[pos.r][pos.c] = Math.random() < 0.9 ? 2 : 4;
  }
  return newGrid;
}

export function moveLeft(grid: Grid): { grid: Grid; score: number; changed: boolean } {
  let score = 0;
  let changed = false;
  const newGrid = grid.map(row => {
    // Filter out nulls
    let newRow = row.filter(cell => cell !== null);
    
    // Merge
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] = (newRow[i] as number) * 2;
        score += newRow[i] as number;
        newRow.splice(i + 1, 1);
        changed = true;
      }
    }
    
    // Fill with nulls
    while (newRow.length < GRID_SIZE) {
      newRow.push(null);
    }
    
    // Check if row changed
    if (JSON.stringify(newRow) !== JSON.stringify(row)) {
      changed = true;
    }
    
    return newRow;
  });

  return { grid: newGrid, score, changed };
}

export function rotateGrid(grid: Grid): Grid {
  const newGrid = createEmptyGrid();
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      newGrid[c][GRID_SIZE - 1 - r] = grid[r][c];
    }
  }
  return newGrid;
}

export function move(grid: Grid, direction: 'up' | 'down' | 'left' | 'right'): { grid: Grid; score: number; changed: boolean } {
  let currentGrid = grid;
  let rotations = 0;

  if (direction === 'up') rotations = 3;
  else if (direction === 'right') rotations = 2;
  else if (direction === 'down') rotations = 1;

  for (let i = 0; i < rotations; i++) {
    currentGrid = rotateGrid(currentGrid);
  }

  const result = moveLeft(currentGrid);
  let finalGrid = result.grid;

  const reverseRotations = (4 - rotations) % 4;
  for (let i = 0; i < reverseRotations; i++) {
    finalGrid = rotateGrid(finalGrid);
  }

  return { grid: finalGrid, score: result.score, changed: result.changed };
}

export function isGameOver(grid: Grid): boolean {
  // Check for empty cells
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === null) return false;
    }
  }

  // Check for possible merges
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const val = grid[r][c];
      // Check right
      if (c < GRID_SIZE - 1 && grid[r][c + 1] === val) return false;
      // Check down
      if (r < GRID_SIZE - 1 && grid[r + 1][c] === val) return false;
    }
  }

  return true;
}
