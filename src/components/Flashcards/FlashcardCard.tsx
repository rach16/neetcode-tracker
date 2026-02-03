import React, { useState } from 'react';
import { Flashcard } from '../../types';

interface FlashcardCardProps {
  card: Flashcard;
  onCorrect: () => void;
  onIncorrect: () => void;
  showButtons?: boolean;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  onCorrect,
  onIncorrect,
  showButtons = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCorrect = () => {
    setIsFlipped(false);
    onCorrect();
  };

  const handleIncorrect = () => {
    setIsFlipped(false);
    onIncorrect();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Card Container */}
      <div
        className="relative w-full aspect-[3/2] cursor-pointer perspective-1000"
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] p-6 flex flex-col items-center justify-center shadow-xl border border-[var(--color-bg-tertiary)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-xs text-[var(--color-text-secondary)] mb-4 uppercase tracking-wide">
              Tap to reveal
            </div>
            <p className="text-xl font-medium text-[var(--color-text-primary)] text-center leading-relaxed">
              {card.front}
            </p>
            {card.reviewCount > 0 && (
              <div className="absolute bottom-4 right-4">
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {card.reviewCount >= 5 ? 'Mastered' : `Review #${card.reviewCount}`}
                </span>
              </div>
            )}
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[#ff6b6b] p-6 flex flex-col items-center justify-center shadow-xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-xs text-white/70 mb-4 uppercase tracking-wide">Answer</div>
            <pre className="text-lg font-mono text-white text-center whitespace-pre-wrap leading-relaxed max-w-full overflow-x-auto">
              {card.back}
            </pre>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {showButtons && isFlipped && (
        <div className="flex gap-4 mt-6 animate-fade-in">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleIncorrect();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-xl font-medium hover:bg-red-500/30 transition-colors touch-target"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Again
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCorrect();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-xl font-medium hover:bg-green-500/30 transition-colors touch-target"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Got it
          </button>
        </div>
      )}

      {/* Hint to tap */}
      {!isFlipped && (
        <p className="mt-4 text-sm text-[var(--color-text-secondary)] animate-pulse">
          Tap card to reveal answer
        </p>
      )}
    </div>
  );
};
