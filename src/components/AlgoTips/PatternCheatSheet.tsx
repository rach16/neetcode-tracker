import React, { useState } from 'react';
import { PATTERN_TRIGGERS, PATTERN_VISUALS, COMPLEXITY_HINTS } from '../../data/algoTips';
import { Pattern } from '../../types';

interface PatternCheatSheetProps {
  onPatternClick?: (pattern: Pattern) => void;
}

const PATTERN_COLORS: Record<string, string> = {
  'HashMap': 'text-blue-400',
  'HashSet': 'text-blue-400',
  'Two Pointers': 'text-green-400',
  'Sliding Window': 'text-yellow-400',
  'Stack': 'text-orange-400',
  'Monotonic Stack': 'text-orange-400',
  'Binary Search': 'text-purple-400',
  'Linked List': 'text-cyan-400',
  'Fast & Slow Pointers': 'text-cyan-400',
  'Tree DFS': 'text-emerald-400',
  'Tree BFS': 'text-emerald-400',
  'Trie': 'text-indigo-400',
  'Heap': 'text-rose-400',
  'Backtracking': 'text-fuchsia-400',
  'Graph DFS': 'text-teal-400',
  'Graph BFS': 'text-teal-400',
  'Union Find': 'text-amber-400',
  'Topological Sort': 'text-lime-400',
  'DP': 'text-violet-400',
  'Greedy': 'text-pink-400',
  'Intervals': 'text-sky-400',
  'Bit Manipulation': 'text-slate-400',
  'Math': 'text-stone-400',
};

export const PatternCheatSheet: React.FC<PatternCheatSheetProps> = ({ onPatternClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] rounded-xl overflow-hidden">
      {/* Header */}
      <button
        className="w-full p-4 flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div className="text-left">
            <h2 className="font-bold text-[var(--color-text-primary)]">Pattern Recognition Guide</h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Visual cues and triggers for each pattern
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-2 animate-fade-in">
          {PATTERN_TRIGGERS.map(({ pattern, trigger }) => {
            const visual = PATTERN_VISUALS[pattern];
            const complexity = COMPLEXITY_HINTS[pattern];
            const color = PATTERN_COLORS[pattern] || 'text-gray-400';

            return (
              <button
                key={pattern}
                className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors text-left group"
                onClick={() => onPatternClick?.(pattern)}
              >
                {/* Icon */}
                <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {visual?.icon || '💡'}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-semibold ${color}`}>
                      {pattern}
                    </span>
                    {complexity && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-mono">
                        {complexity.time}
                      </span>
                    )}
                  </div>

                  {/* Trigger text */}
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    {trigger}
                  </p>

                  {/* Visual hint */}
                  {visual && (
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 opacity-70 italic">
                      Think: {visual.visual}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
