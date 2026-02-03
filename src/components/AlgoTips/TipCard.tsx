import React, { useState } from 'react';
import { AlgoTip } from '../../types';
import { PATTERN_VISUALS, COMPLEXITY_HINTS } from '../../data/algoTips';

interface TipCardProps {
  tip: AlgoTip;
  showProblemName?: boolean;
}

const PATTERN_COLORS: Record<string, string> = {
  'HashMap': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'HashSet': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Two Pointers': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Sliding Window': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Stack': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Monotonic Stack': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Binary Search': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Linked List': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Fast & Slow Pointers': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Tree DFS': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Tree BFS': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Trie': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Heap': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'Backtracking': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  'Graph DFS': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Graph BFS': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Union Find': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Topological Sort': 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  'DP': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Greedy': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Intervals': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'Bit Manipulation': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  'Math': 'bg-stone-500/20 text-stone-400 border-stone-500/30',
};

const BORDER_COLORS: Record<string, string> = {
  'HashMap': 'border-l-blue-500',
  'HashSet': 'border-l-blue-500',
  'Two Pointers': 'border-l-green-500',
  'Sliding Window': 'border-l-yellow-500',
  'Stack': 'border-l-orange-500',
  'Monotonic Stack': 'border-l-orange-500',
  'Binary Search': 'border-l-purple-500',
  'Linked List': 'border-l-cyan-500',
  'Fast & Slow Pointers': 'border-l-cyan-500',
  'Tree DFS': 'border-l-emerald-500',
  'Tree BFS': 'border-l-emerald-500',
  'Trie': 'border-l-indigo-500',
  'Heap': 'border-l-rose-500',
  'Backtracking': 'border-l-fuchsia-500',
  'Graph DFS': 'border-l-teal-500',
  'Graph BFS': 'border-l-teal-500',
  'Union Find': 'border-l-amber-500',
  'Topological Sort': 'border-l-lime-500',
  'DP': 'border-l-violet-500',
  'Greedy': 'border-l-pink-500',
  'Intervals': 'border-l-sky-500',
  'Bit Manipulation': 'border-l-slate-500',
  'Math': 'border-l-stone-500',
};

export const TipCard: React.FC<TipCardProps> = ({ tip, showProblemName = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const patternColor = PATTERN_COLORS[tip.pattern] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  const borderColor = BORDER_COLORS[tip.pattern] || 'border-l-gray-500';
  const patternVisual = PATTERN_VISUALS[tip.pattern];
  const complexityHint = COMPLEXITY_HINTS[tip.pattern];

  return (
    <div
      className={`bg-[var(--color-bg-secondary)] rounded-xl overflow-hidden cursor-pointer hover:bg-[var(--color-bg-tertiary)] transition-all border-l-4 ${borderColor}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {/* Pattern Icon */}
              <span className="text-xl" title={patternVisual?.visual}>
                {patternVisual?.icon || '💡'}
              </span>
              {showProblemName && (
                <h3 className="font-medium text-[var(--color-text-primary)] truncate">
                  {tip.problemName}
                </h3>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${patternColor}`}>
                {tip.pattern}
              </span>
              {/* Complexity badge */}
              {complexityHint && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-mono">
                  {complexityHint.time}
                </span>
              )}
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform flex-shrink-0 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* One-liner (always visible) */}
        <p className="mt-3 text-sm text-[var(--color-text-primary)] leading-relaxed">
          {tip.oneLiner}
        </p>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[var(--color-bg-tertiary)] space-y-4 animate-fade-in">
            {/* Visual Memory Section */}
            {patternVisual && (
              <div className="bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent p-3 rounded-lg">
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
                  Visual Memory
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{patternVisual.icon}</span>
                  <div>
                    <p className="text-sm text-[var(--color-text-primary)] font-medium">
                      {patternVisual.visual}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      Gesture: {patternVisual.gesture}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Complexity Section */}
            {complexityHint && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[var(--color-bg-tertiary)] p-2 rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary)]">Time</p>
                  <p className="text-sm text-[var(--color-text-primary)] font-mono font-medium">
                    {complexityHint.time}
                  </p>
                </div>
                <div className="bg-[var(--color-bg-tertiary)] p-2 rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary)]">Space</p>
                  <p className="text-sm text-[var(--color-text-primary)] font-mono font-medium">
                    {complexityHint.space}
                  </p>
                </div>
                <div className="bg-[var(--color-bg-tertiary)] p-2 rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary)]">Hint</p>
                  <p className="text-xs text-[var(--color-text-primary)]">
                    {complexityHint.hint}
                  </p>
                </div>
              </div>
            )}

            {/* Memory Hook */}
            {tip.memoryHook && (
              <div className="flex items-start gap-2">
                <span className="text-lg">🧠</span>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">Memory Hook</p>
                  <p className="text-sm text-[var(--color-text-primary)] mt-0.5 italic">"{tip.memoryHook}"</p>
                </div>
              </div>
            )}

            {/* Key Question */}
            {tip.keyQuestion && (
              <div className="flex items-start gap-2">
                <span className="text-lg">❓</span>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">Ask Yourself</p>
                  <p className="text-sm text-[var(--color-text-primary)] mt-0.5">{tip.keyQuestion}</p>
                </div>
              </div>
            )}

            {/* Common Mistake */}
            {tip.commonMistake && (
              <div className="flex items-start gap-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-xs text-red-400 uppercase tracking-wide">Watch Out!</p>
                  <p className="text-sm text-[var(--color-text-primary)] mt-0.5">{tip.commonMistake}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
