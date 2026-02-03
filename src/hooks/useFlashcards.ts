import { useCallback } from 'react';
import { Flashcard, DeckId } from '../types';
import { calculateNextReview, resetForNeedsReview } from '../utils/spacedRepetition';
import { getToday, isDueToday } from '../utils/dateUtils';

interface UseFlashcardsReturn {
  markCardCorrect: (card: Flashcard) => Flashcard;
  markCardIncorrect: (card: Flashcard) => Flashcard;
  getDueCards: (cards: Flashcard[], deckId?: DeckId) => Flashcard[];
  getDueCardCount: (cards: Flashcard[]) => number;
  getCardsByDeck: (cards: Flashcard[], deckId: DeckId) => Flashcard[];
  getDeckProgress: (cards: Flashcard[], deckId: DeckId) => { mastered: number; total: number };
  shuffleCards: (cards: Flashcard[]) => Flashcard[];
}

export function useFlashcards(): UseFlashcardsReturn {
  const markCardCorrect = useCallback((card: Flashcard): Flashcard => {
    const today = getToday();
    const newReviewCount = card.reviewCount + 1;

    return {
      ...card,
      lastReviewed: today,
      nextReview: calculateNextReview(card.reviewCount),
      reviewCount: newReviewCount,
    };
  }, []);

  const markCardIncorrect = useCallback((card: Flashcard): Flashcard => {
    const today = getToday();
    const { nextReview, reviewCount } = resetForNeedsReview();

    return {
      ...card,
      lastReviewed: today,
      nextReview,
      reviewCount,
    };
  }, []);

  const getDueCards = useCallback((cards: Flashcard[], deckId?: DeckId): Flashcard[] => {
    let filtered = cards;
    if (deckId) {
      filtered = cards.filter((card) => card.deckId === deckId);
    }

    return filtered.filter((card) => {
      if (!card.nextReview) return true; // Never reviewed
      return isDueToday(card.nextReview);
    });
  }, []);

  const getDueCardCount = useCallback((cards: Flashcard[]): number => {
    return getDueCards(cards).length;
  }, [getDueCards]);

  const getCardsByDeck = useCallback((cards: Flashcard[], deckId: DeckId): Flashcard[] => {
    return cards.filter((card) => card.deckId === deckId);
  }, []);

  const getDeckProgress = useCallback(
    (cards: Flashcard[], deckId: DeckId): { mastered: number; total: number } => {
      const deckCards = getCardsByDeck(cards, deckId);
      const mastered = deckCards.filter((card) => card.reviewCount >= 5).length;
      return { mastered, total: deckCards.length };
    },
    [getCardsByDeck]
  );

  const shuffleCards = useCallback((cards: Flashcard[]): Flashcard[] => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  return {
    markCardCorrect,
    markCardIncorrect,
    getDueCards,
    getDueCardCount,
    getCardsByDeck,
    getDeckProgress,
    shuffleCards,
  };
}
