import React, { useState } from 'react';
import { Problem } from '../../types';
import { SwipeCard } from './SwipeCard';
import { Button } from '../common';

interface SwipeCardsProps {
  problems: Problem[];
}

export const SwipeCards: React.FC<SwipeCardsProps> = ({ problems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // Filter problems that have solution data
  const problemsWithSolutions = problems.filter(
    (p) => p.approach && p.pattern && p.timeComplexity
  );

  const currentProblem =
    currentIndex < problemsWithSolutions.length
      ? problemsWithSolutions[currentIndex]
      : null;

  const handleSwipeRight = () => {
    // User knows this problem
    setKnownCount((prev) => prev + 1);
    moveToNext();
  };

  const handleSwipeLeft = () => {
    // User needs to review this
    setReviewCount((prev) => prev + 1);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < problemsWithSolutions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowStats(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setKnownCount(0);
    setReviewCount(0);
    setShowStats(false);
  };

  if (problemsWithSolutions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold mb-2">Swipe Cards Coming Soon!</h2>
        <p className="text-[var(--color-text-secondary)] max-w-md">
          I'm adding solution data for all 150 problems. Check back soon to start swiping and memorizing!
        </p>
      </div>
    );
  }

  if (showStats) {
    const total = knownCount + reviewCount;
    const knownPercent = total > 0 ? Math.round((knownCount / total) * 100) : 0;

    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold mb-4">Session Complete!</h2>
        
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6 max-w-md w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{knownCount}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Known</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{reviewCount}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Need Review</div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-[var(--color-bg-tertiary)]">
            <div className="text-lg font-semibold mb-2">Knowledge Score</div>
            <div className="text-4xl font-bold text-[var(--color-accent)]">{knownPercent}%</div>
          </div>
        </div>

        <Button
          onClick={handleRestart}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-8 py-3"
        >
          Review Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-bg-tertiary)]">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">💳 Swipe to Memorize</h1>
          <div className="text-sm text-[var(--color-text-secondary)]">
            {currentIndex + 1} / {problemsWithSolutions.length}
          </div>
        </div>
        <div className="w-full bg-[var(--color-bg-tertiary)] rounded-full h-2">
          <div
            className="bg-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / problemsWithSolutions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-3 bg-[var(--color-bg-secondary)] border-b border-[var(--color-bg-tertiary)]">
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👈</span>
            <span className="text-[var(--color-text-secondary)]">Need Review</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👍</span>
            <span className="text-[var(--color-text-secondary)]">Got It!</span>
          </div>
        </div>
      </div>

      {/* Swipe Card */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        {currentProblem && (
          <SwipeCard
            problem={currentProblem}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t border-[var(--color-bg-tertiary)] bg-[var(--color-bg-secondary)]">
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-green-500">{knownCount}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">Known</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-500">{reviewCount}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">Review</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              {problemsWithSolutions.length - currentIndex - 1}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};
