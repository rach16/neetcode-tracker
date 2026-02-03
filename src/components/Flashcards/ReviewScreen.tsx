import React, { useState, useMemo } from 'react';
import { Flashcard, DeckId, DECK_INFO } from '../../types';
import { FlashcardCard } from './FlashcardCard';
import { useFlashcards } from '../../hooks/useFlashcards';

interface ReviewScreenProps {
  cards: Flashcard[];
  deckId?: DeckId;
  onBack: () => void;
  onUpdateCard: (card: Flashcard) => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  cards,
  deckId,
  onBack,
  onUpdateCard,
}) => {
  const { getDueCards, markCardCorrect, markCardIncorrect, shuffleCards } = useFlashcards();

  const dueCards = useMemo(() => {
    const due = getDueCards(cards, deckId);
    return shuffleCards(due);
  }, [cards, deckId, getDueCards, shuffleCards]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(dueCards.length === 0);

  const currentCard = dueCards[currentIndex];
  const deckInfo = deckId ? DECK_INFO.find((d) => d.id === deckId) : null;
  const totalCards = dueCards.length;

  const handleCorrect = () => {
    if (currentCard) {
      const updatedCard = markCardCorrect(currentCard);
      onUpdateCard(updatedCard);
      setCompletedCount((c) => c + 1);
      moveToNext();
    }
  };

  const handleIncorrect = () => {
    if (currentCard) {
      const updatedCard = markCardIncorrect(currentCard);
      onUpdateCard(updatedCard);
      setCompletedCount((c) => c + 1);
      moveToNext();
    }
  };

  const moveToNext = () => {
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setSessionComplete(true);
    }
  };

  if (sessionComplete) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target"
          >
            <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Review Complete</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-6xl mb-6">
            {completedCount > 0 ? '🎉' : '📭'}
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            {completedCount > 0 ? 'Great job!' : 'All caught up!'}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-center mb-8">
            {completedCount > 0
              ? `You reviewed ${completedCount} card${completedCount !== 1 ? 's' : ''}`
              : 'No cards due for review right now'}
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-[var(--color-accent-hover)] transition-colors touch-target"
          >
            Back to Decks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target"
        >
          <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            {deckInfo ? deckInfo.name : 'All Decks'}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {currentIndex + 1} of {totalCards}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        {currentCard && (
          <FlashcardCard
            key={currentCard.id}
            card={currentCard}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        )}
      </div>
    </div>
  );
};
