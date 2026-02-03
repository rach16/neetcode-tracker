import React, { useState } from 'react';
import { AlgoTip } from '../../types';
import { PATTERN_VISUALS, COMPLEXITY_HINTS } from '../../data/algoTips';

interface QuickTipProps {
  tip: AlgoTip | undefined;
}

const PATTERN_COLORS: Record<string, string> = {
  'HashMap': 'bg-blue-500/20 text-blue-400',
  'HashSet': 'bg-blue-500/20 text-blue-400',
  'Two Pointers': 'bg-green-500/20 text-green-400',
  'Sliding Window': 'bg-yellow-500/20 text-yellow-400',
  'Stack': 'bg-orange-500/20 text-orange-400',
  'Monotonic Stack': 'bg-orange-500/20 text-orange-400',
  'Binary Search': 'bg-purple-500/20 text-purple-400',
  'Linked List': 'bg-cyan-500/20 text-cyan-400',
  'Fast & Slow Pointers': 'bg-cyan-500/20 text-cyan-400',
  'Tree DFS': 'bg-emerald-500/20 text-emerald-400',
  'Tree BFS': 'bg-emerald-500/20 text-emerald-400',
  'Trie': 'bg-indigo-500/20 text-indigo-400',
  'Heap': 'bg-rose-500/20 text-rose-400',
  'Backtracking': 'bg-fuchsia-500/20 text-fuchsia-400',
  'Graph DFS': 'bg-teal-500/20 text-teal-400',
  'Graph BFS': 'bg-teal-500/20 text-teal-400',
  'Union Find': 'bg-amber-500/20 text-amber-400',
  'Topological Sort': 'bg-lime-500/20 text-lime-400',
  'DP': 'bg-violet-500/20 text-violet-400',
  'Greedy': 'bg-pink-500/20 text-pink-400',
  'Intervals': 'bg-sky-500/20 text-sky-400',
  'Bit Manipulation': 'bg-slate-500/20 text-slate-400',
  'Math': 'bg-stone-500/20 text-stone-400',
};

export const QuickTip: React.FC<QuickTipProps> = ({ tip }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!tip) return null;

  const patternColor = PATTERN_COLORS[tip.pattern] || 'bg-gray-500/20 text-gray-400';
  const patternVisual = PATTERN_VISUALS[tip.pattern];
  const complexityHint = COMPLEXITY_HINTS[tip.pattern];

  return (
    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl overflow-hidden">
      <button
        className="w-full p-4 flex items-center justify-between"
        onClick={() => setIsRevealed(!isRevealed)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{patternVisual?.icon || '💡'}</span>
          <span className="font-medium text-[var(--color-text-primary)]">Quick Tip</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${patternColor}`}>
            {tip.pattern}
          </span>
          {complexityHint && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-mono">
              {complexityHint.time}
            </span>
          )}
        </div>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {isRevealed ? 'Hide' : 'Reveal'}
        </span>
      </button>

      {isRevealed && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          {/* Visual Memory Aid */}
          {patternVisual && (
            <div className="flex items-center gap-3 p-2 bg-[var(--color-bg-tertiary)]/50 rounded-lg">
              <span className="text-2xl">{patternVisual.icon}</span>
              <div>
                <p className="text-xs text-[var(--color-text-primary)] font-medium">{patternVisual.visual}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Think: {patternVisual.gesture}</p>
              </div>
            </div>
          )}

          {/* One-liner */}
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed font-medium">
            {tip.oneLiner}
          </p>

          {/* Additional info */}
          <div className="flex flex-wrap gap-3">
            {tip.memoryHook && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                <span>🧠</span>
                <span className="italic">"{tip.memoryHook}"</span>
              </div>
            )}
            {tip.keyQuestion && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                <span>❓</span>
                <span>{tip.keyQuestion}</span>
              </div>
            )}
          </div>

          {/* Complexity hint */}
          {complexityHint && (
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
              <span className="font-mono">Time: {complexityHint.time}</span>
              <span className="font-mono">Space: {complexityHint.space}</span>
            </div>
          )}

          {tip.commonMistake && (
            <div className="flex items-start gap-1.5 text-xs text-orange-400 bg-orange-500/10 p-2 rounded-lg">
              <span>⚠️</span>
              <span>{tip.commonMistake}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
