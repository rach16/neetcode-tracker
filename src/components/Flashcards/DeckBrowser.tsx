import React from 'react';
import { Flashcard, DeckId, DECK_INFO } from '../../types';
import { useFlashcards } from '../../hooks/useFlashcards';

interface DeckBrowserProps {
  cards: Flashcard[];
  onSelectDeck: (deckId: DeckId) => void;
  onStartReview: () => void;
  onStartQuiz: () => void;
}

export const DeckBrowser: React.FC<DeckBrowserProps> = ({
  cards,
  onSelectDeck,
  onStartReview,
  onStartQuiz,
}) => {
  const { getDueCards, getDeckProgress } = useFlashcards();

  const totalDue = getDueCards(cards).length;
  const totalMastered = cards.filter((c) => c.reviewCount >= 5).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-0">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Flashcards</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Master Python syntax with spaced repetition
        </p>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
            <p className="text-2xl font-bold text-orange-500">{totalDue}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Cards Due</p>
          </div>
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
            <p className="text-2xl font-bold text-green-500">{totalMastered}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Mastered</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 flex gap-3">
        <button
          onClick={onStartReview}
          disabled={totalDue === 0}
          className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors touch-target ${
            totalDue > 0
              ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Review Due ({totalDue})
        </button>
        <button
          onClick={onStartQuiz}
          className="py-3 px-4 rounded-xl font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>

      {/* Deck Grid */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 md:pb-4">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
          Decks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DECK_INFO.map((deck) => {
            const progress = getDeckProgress(cards, deck.id);
            const dueInDeck = getDueCards(cards, deck.id).length;
            const progressPercent = progress.total > 0 ? (progress.mastered / progress.total) * 100 : 0;

            return (
              <button
                key={deck.id}
                onClick={() => onSelectDeck(deck.id)}
                className="p-4 bg-[var(--color-bg-secondary)] rounded-xl text-left hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{deck.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--color-text-primary)] truncate">
                        {deck.name}
                      </h3>
                      {dueInDeck > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full">
                          {dueInDeck}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">
                      {deck.description}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                        <span>
                          {progress.mastered}/{progress.total} mastered
                        </span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="h-1.5 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
