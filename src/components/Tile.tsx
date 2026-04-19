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
}

export function Tile({ value, row, col }: TileProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        top: `${row * 25}%`,
        left: `${col * 25}%`
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        layout: { duration: 0.1 }
      }}
      className={twMerge(
        'absolute p-2 w-1/4 h-1/4 z-10 select-none'
      )}
    >
      <div className={twMerge(
        'w-full h-full flex items-center justify-center rounded-lg font-black shadow-sm transition-colors duration-200',
        value < 100 ? 'text-3xl' : value < 1000 ? 'text-2xl' : 'text-xl',
        `tile-${value > 2048 ? 2048 : value}`
      )}>
        {value}
      </div>
    </motion.div>
  );
}
