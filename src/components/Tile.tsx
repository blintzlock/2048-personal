/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TileProps {
  value: number;
  row: number;
  col: number;
  key?: string | number;
}

export function Tile({ value, row, col }: TileProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: `${col * 100}%`,
        y: `${row * 100}%`,
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 450, 
        damping: 35,
        x: { type: 'spring', stiffness: 450, damping: 35 },
        y: { type: 'spring', stiffness: 450, damping: 35 },
        scale: { duration: 0.15 }
      }}
      className="absolute top-0 left-0 w-1/4 h-1/4 p-1.5 select-none z-10"
    >
      <div className={twMerge(
        'w-full h-full flex items-center justify-center rounded-lg font-black shadow-sm transition-all duration-200',
        value < 100 ? 'text-3xl' : value < 1000 ? 'text-2xl' : 'text-xl',
        `tile-${value > 2048 ? 2048 : value}`
      )}>
        {value}
      </div>
    </motion.div>
  );
}
