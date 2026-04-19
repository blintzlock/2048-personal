/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useGame } from './lib/useGame';
import { GameBoard } from './components/GameBoard';
import { CheckInButton } from './components/CheckInButton';
import { Web3Provider } from './lib/web3-provider';
import { RotateCcw, Trophy, Target, Info } from 'lucide-react';

function GameContent() {
  const { grid, score, bestScore, over, resetGame, handleMove } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8 max-w-2xl mx-auto">
      {/* Header section */}
      <header className="w-full flex flex-col gap-6 max-w-[500px]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h1 className="text-6xl font-black text-white leading-none tracking-tighter">2048</h1>
            <div className="text-base-blue font-bold text-xs uppercase tracking-widest mt-1">Powered by Base</div>
          </div>
          
          <div className="flex gap-3">
            <div className="score-box px-6 py-3 rounded-lg min-w-[100px] text-center">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em]">Score</p>
              <p className="text-xl font-bold text-white">{score}</p>
            </div>
            <div className="score-box px-6 py-3 rounded-lg min-w-[100px] text-center">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em]">Best</p>
              <p className="text-xl font-bold text-white">{bestScore}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-container-bg/50 p-4 rounded-xl border border-white/5 shadow-sm">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-base-blue" />
              Join the numbers to get to 2048!
            </p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/10 transition-all active:scale-95 border border-white/10"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="relative w-full flex flex-col items-center gap-8">
        <div className="relative">
          <GameBoard grid={grid} />
          
          <AnimatePresence>
            {over && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 rounded-xl"
              >
                <div className="bg-container-bg p-8 rounded-2xl shadow-3xl flex flex-col items-center gap-6 border border-white/10 max-w-[280px] text-center">
                  <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 opacity-20 absolute" />
                    <span className="text-4xl font-black">!</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Game Over</h2>
                    <p className="text-gray-400 text-sm mt-1">Final score: {score}</p>
                  </div>
                  <button
                    onClick={resetGame}
                    className="w-full bg-base-blue text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-blue-500/20 shadow-xl active:scale-95"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer / Wallet Section */}
      <footer className="w-full flex flex-col items-center gap-6 mt-4 pt-4 max-w-[500px]">
        <div className="base-footer-theme rounded-2xl p-5 flex flex-col w-full gap-4">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-3">
               <div className="w-6 h-6 bg-base-blue rounded-full flex items-center justify-center text-[10px] font-bold text-white">B</div>
               <div>
                  <h3 className="font-bold text-sm text-white">Daily Check-in</h3>
                  <p className="text-[11px] text-text-muted">Claim points for gas only</p>
               </div>
             </div>
             <div className="flex flex-col items-end gap-1">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] px-2 py-0.5 bg-base-blue/10 text-base-blue rounded-full font-bold">Base Mainnet</span>
                 <span className="text-[9px] text-text-muted">Est: 0.00003 ETH</span>
               </div>
             </div>
          </div>
          
          <div className="flex justify-center">
            <CheckInButton variant="minimal" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <GameContent />
    </Web3Provider>
  );
}
