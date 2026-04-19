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
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        gridRowStart: row + 1,
        gridColumnStart: col + 1,
      }}
      className={twMerge(
        'absolute inset-0 flex items-center justify-center rounded-lg font-extrabold text-3xl z-10 select-none',
        `tile-${value > 2048 ? 2048 : value}`
      )}
    >
      {value}
    </motion.div>
  );
}
