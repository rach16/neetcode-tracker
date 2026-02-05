import React, { useState, useRef, useEffect } from 'react';
import { Problem } from '../../types';
import { Badge } from '../common';

interface SwipeCardProps {
  problem: Problem;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  problem,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchCurrent, setTouchCurrent] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchCurrent(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    setTouchCurrent(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchCurrent - touchStart;
    const threshold = 100;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped right - Got it!
        onSwipeRight();
      } else {
        // Swiped left - Need review
        onSwipeLeft();
      }
    }

    setIsSwiping(false);
    setTouchStart(0);
    setTouchCurrent(0);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
    setIsFlipped(false);
  };

  const swipeDistance = isSwiping ? touchCurrent - touchStart : 0;
  const rotation = swipeDistance / 20;
  const opacity = 1 - Math.abs(swipeDistance) / 300;

  useEffect(() => {
    setIsFlipped(false);
  }, [problem.id]);

  return (
    <div className="w-full max-w-md">
      <div
        ref={cardRef}
        className="relative w-full aspect-[3/4] transition-transform duration-200"
        style={{
          transform: `translateX(${swipeDistance}px) rotate(${rotation}deg)`,
          opacity,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe indicators */}
        {isSwiping && swipeDistance > 50 && (
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-6xl animate-pulse">
            👍
          </div>
        )}
        {isSwiping && swipeDistance < -50 && (
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-6xl animate-pulse">
            👈
          </div>
        )}

        {/* Card */}
        <div
          className={`w-full h-full rounded-2xl shadow-2xl cursor-pointer transition-transform duration-500 ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 flex flex-col"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-start justify-between mb-4">
              <Badge
                variant="difficulty"
                value={problem.difficulty}
                size="md"
              />
              <div className="text-white/60 text-sm">#{problem.id}</div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                {problem.name}
              </h2>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="text-white/80 text-sm mb-2">Category</div>
                <div className="text-white font-semibold">{problem.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
              </div>

              <div className="text-white/90 text-center text-lg mt-6">
                👆 Tap to see solution
              </div>
            </div>

            <div className="text-white/50 text-sm text-center">
              Swipe left to review later • Swipe right if you know it
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full bg-[var(--color-bg-secondary)] rounded-2xl p-6 flex flex-col overflow-y-auto"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{problem.name}</h3>
              <Badge variant="difficulty" value={problem.difficulty} size="md" />
            </div>

            <div className="space-y-4 flex-1">
              {problem.pattern && (
                <div>
                  <div className="text-sm font-semibold text-[var(--color-accent)] mb-1">
                    🎯 Pattern
                  </div>
                  <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3">
                    {problem.pattern}
                  </div>
                </div>
              )}

              {problem.approach && (
                <div>
                  <div className="text-sm font-semibold text-[var(--color-accent)] mb-1">
                    💡 Approach
                  </div>
                  <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3 text-sm">
                    {problem.approach}
                  </div>
                </div>
              )}

              {(problem.timeComplexity || problem.spaceComplexity) && (
                <div>
                  <div className="text-sm font-semibold text-[var(--color-accent)] mb-1">
                    ⏱️ Complexity
                  </div>
                  <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3 text-sm">
                    {problem.timeComplexity && <div>Time: {problem.timeComplexity}</div>}
                    {problem.spaceComplexity && <div>Space: {problem.spaceComplexity}</div>}
                  </div>
                </div>
              )}

              {problem.pythonSolution && (
                <div>
                  <div className="text-sm font-semibold text-[var(--color-accent)] mb-1">
                    🐍 Python Solution
                  </div>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto">
                    <code>{problem.pythonSolution}</code>
                  </pre>
                </div>
              )}

              {(problem.neetcodeUrl || problem.leetcodeUrl) && (
                <div className="flex gap-2">
                  {problem.neetcodeUrl && (
                    <a
                      href={problem.neetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-center py-2 rounded-lg text-sm font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      NeetCode 📺
                    </a>
                  )}
                  <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)] text-center py-2 rounded-lg text-sm font-semibold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    LeetCode 🔗
                  </a>
                </div>
              )}
            </div>

            <div className="text-[var(--color-text-secondary)] text-sm text-center mt-4">
              👆 Tap to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Desktop buttons */}
      <div className="flex gap-4 mt-6 md:flex hidden">
        <button
          onClick={() => handleButtonSwipe('left')}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition-colors"
        >
          👈 Need Review
        </button>
        <button
          onClick={() => handleButtonSwipe('right')}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors"
        >
          Got It! 👍
        </button>
      </div>
    </div>
  );
};
