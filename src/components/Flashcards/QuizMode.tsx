import React, { useState, useMemo, useCallback } from 'react';
import { Flashcard, DeckId, DECK_INFO } from '../../types';
import { useFlashcards } from '../../hooks/useFlashcards';

interface QuizModeProps {
  cards: Flashcard[];
  onBack: () => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ cards, onBack }) => {
  const { shuffleCards } = useFlashcards();

  const [selectedDeck, setSelectedDeck] = useState<DeckId | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizComplete, setQuizComplete] = useState(false);

  const quizCards = useMemo(() => {
    if (!quizStarted) return [];
    const filtered = selectedDeck ? cards.filter((c) => c.deckId === selectedDeck) : cards;
    return shuffleCards(filtered).slice(0, 20); // Max 20 cards per quiz
  }, [cards, selectedDeck, quizStarted, shuffleCards]);

  const currentCard = quizCards[currentIndex];

  const startQuiz = useCallback((deckId: DeckId | null) => {
    setSelectedDeck(deckId);
    setQuizStarted(true);
    setCurrentIndex(0);
    setShowAnswer(false);
    setScore({ correct: 0, incorrect: 0 });
    setQuizComplete(false);
  }, []);

  const handleReveal = () => {
    setShowAnswer(true);
  };

  const handleNext = (wasCorrect: boolean) => {
    setScore((s) => ({
      correct: s.correct + (wasCorrect ? 1 : 0),
      incorrect: s.incorrect + (wasCorrect ? 0 : 1),
    }));

    if (currentIndex < quizCards.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedDeck(null);
    setCurrentIndex(0);
    setShowAnswer(false);
    setScore({ correct: 0, incorrect: 0 });
    setQuizComplete(false);
  };

  // Deck Selection Screen
  if (!quizStarted) {
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
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Quick Quiz</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">Rapid fire - no tracking</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24 md:pb-4 space-y-3">
          <button
            onClick={() => startQuiz(null)}
            className="w-full p-4 bg-gradient-to-r from-[var(--color-accent)] to-[#ff6b6b] rounded-xl text-left text-white touch-target"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎲</span>
              <div>
                <h3 className="font-semibold">All Decks</h3>
                <p className="text-sm text-white/70">{cards.length} cards - Random mix</p>
              </div>
            </div>
          </button>

          <div className="pt-2">
            <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
              Or pick a deck
            </h2>
            {DECK_INFO.map((deck) => {
              const deckCardCount = cards.filter((c) => c.deckId === deck.id).length;
              return (
                <button
                  key={deck.id}
                  onClick={() => startQuiz(deck.id)}
                  className="w-full p-4 bg-[var(--color-bg-secondary)] rounded-xl text-left hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target mb-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{deck.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--color-text-primary)]">{deck.name}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">{deckCardCount} cards</p>
                    </div>
                    <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const percentage = Math.round((score.correct / quizCards.length) * 100);
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
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Quiz Complete</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-6xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{percentage}%</h2>
          <p className="text-[var(--color-text-secondary)] text-center mb-6">
            {score.correct} correct, {score.incorrect} incorrect
          </p>
          <div className="flex gap-3">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-xl font-medium hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target"
            >
              New Quiz
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-[var(--color-accent-hover)] transition-colors touch-target"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in Progress
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <button
          onClick={resetQuiz}
          className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target"
        >
          <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Quick Quiz</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {currentIndex + 1} of {quizCards.length}
          </p>
        </div>
        <div className="text-right">
          <span className="text-green-500 font-medium">{score.correct}</span>
          <span className="text-[var(--color-text-secondary)]"> / </span>
          <span className="text-red-500 font-medium">{score.incorrect}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quizCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {currentCard && (
          <div className="w-full max-w-md">
            <div
              className={`w-full aspect-[3/2] rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl ${
                showAnswer
                  ? 'bg-gradient-to-br from-[var(--color-accent)] to-[#ff6b6b]'
                  : 'bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-bg-tertiary)]'
              }`}
            >
              {showAnswer ? (
                <>
                  <div className="text-xs text-white/70 mb-4 uppercase tracking-wide">Answer</div>
                  <pre className="text-lg font-mono text-white text-center whitespace-pre-wrap leading-relaxed">
                    {currentCard.back}
                  </pre>
                </>
              ) : (
                <>
                  <div className="text-xs text-[var(--color-text-secondary)] mb-4 uppercase tracking-wide">
                    Question
                  </div>
                  <p className="text-xl font-medium text-[var(--color-text-primary)] text-center leading-relaxed">
                    {currentCard.front}
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center">
              {!showAnswer ? (
                <button
                  onClick={handleReveal}
                  className="px-8 py-3 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-[var(--color-accent-hover)] transition-colors touch-target"
                >
                  Show Answer
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleNext(false)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-xl font-medium hover:bg-red-500/30 transition-colors touch-target"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Wrong
                  </button>
                  <button
                    onClick={() => handleNext(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-xl font-medium hover:bg-green-500/30 transition-colors touch-target"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Correct
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
