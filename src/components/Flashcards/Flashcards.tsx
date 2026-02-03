import React, { useState } from 'react';
import { Flashcard, DeckId } from '../../types';
import { DeckBrowser } from './DeckBrowser';
import { ReviewScreen } from './ReviewScreen';
import { QuizMode } from './QuizMode';

type FlashcardView = 'browser' | 'review' | 'quiz' | 'deck-review';

interface FlashcardsProps {
  cards: Flashcard[];
  onUpdateCard: (card: Flashcard) => void;
}

export const Flashcards: React.FC<FlashcardsProps> = ({ cards, onUpdateCard }) => {
  const [view, setView] = useState<FlashcardView>('browser');
  const [selectedDeck, setSelectedDeck] = useState<DeckId | null>(null);

  const handleSelectDeck = (deckId: DeckId) => {
    setSelectedDeck(deckId);
    setView('deck-review');
  };

  const handleStartReview = () => {
    setSelectedDeck(null);
    setView('review');
  };

  const handleStartQuiz = () => {
    setView('quiz');
  };

  const handleBack = () => {
    setView('browser');
    setSelectedDeck(null);
  };

  switch (view) {
    case 'review':
      return (
        <ReviewScreen
          cards={cards}
          onBack={handleBack}
          onUpdateCard={onUpdateCard}
        />
      );
    case 'deck-review':
      return (
        <ReviewScreen
          cards={cards}
          deckId={selectedDeck || undefined}
          onBack={handleBack}
          onUpdateCard={onUpdateCard}
        />
      );
    case 'quiz':
      return <QuizMode cards={cards} onBack={handleBack} />;
    default:
      return (
        <DeckBrowser
          cards={cards}
          onSelectDeck={handleSelectDeck}
          onStartReview={handleStartReview}
          onStartQuiz={handleStartQuiz}
        />
      );
  }
};
