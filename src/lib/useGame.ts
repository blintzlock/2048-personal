/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Grid, createEmptyGrid, addRandomTile, move, isGameOver } from './gameLogic';

export function useGame() {
  const [grid, setGrid] = useState<Grid>(() => {
    let g = createEmptyGrid();
    g = addRandomTile(g);
    g = addRandomTile(g);
    return g;
  });
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('base-2048-best');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [over, setOver] = useState(false);

  const resetGame = useCallback(() => {
    let g = createEmptyGrid();
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
    setScore(0);
    setOver(false);
  }, []);

  const handleMove = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (over) return;

    const result = move(grid, direction);
    if (result.changed) {
      const newGrid = addRandomTile(result.grid);
      setGrid(newGrid);
      setScore(s => {
        const newScore = s + result.score;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem('base-2048-best', newScore.toString());
        }
        return newScore;
      });

      if (isGameOver(newGrid)) {
        setOver(true);
      }
    }
  }, [grid, over, bestScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': handleMove('up'); break;
        case 'ArrowDown': handleMove('down'); break;
        case 'ArrowLeft': handleMove('left'); break;
        case 'ArrowRight': handleMove('right'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  return { grid, score, bestScore, over, resetGame, handleMove };
}
