import React, { createContext, useContext, useCallback, useEffect, ReactNode } from 'react';
import { Problem, Settings, UserProgress, Status, View, Flashcard, FlashcardProgress } from '../types';
import { createInitialProblems } from '../data/problems';
import { createInitialFlashcards } from '../data/flashcards';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { useStreak } from '../hooks/useStreak';

interface AppContextType {
  userProgress: UserProgress;
  flashcardProgress: FlashcardProgress;
  currentView: View;
  selectedProblemId: string | null;
  setCurrentView: (view: View) => void;
  setSelectedProblemId: (id: string | null) => void;
  updateProblem: (problem: Problem) => void;
  updateProblemStatus: (problemId: string, status: Status) => void;
  updateFlashcard: (card: Flashcard) => void;
  updateSettings: (settings: Settings) => void;
  importProgress: (data: UserProgress) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'neetcode-tracker-progress';
const FLASHCARD_STORAGE_KEY = 'neetcode-flashcard-progress';

const getInitialProgress = (): UserProgress => ({
  problems: createInitialProblems(),
  streak: {
    current: 0,
    lastActiveDate: null,
  },
  settings: {
    dailyGoal: 3,
    darkMode: true,
  },
});

const getInitialFlashcardProgress = (): FlashcardProgress => ({
  cards: createInitialFlashcards(),
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>(
    STORAGE_KEY,
    getInitialProgress()
  );
  const [flashcardProgress, setFlashcardProgress] = useLocalStorage<FlashcardProgress>(
    FLASHCARD_STORAGE_KEY,
    getInitialFlashcardProgress()
  );
  const [currentView, setCurrentView] = useLocalStorage<View>('neetcode-current-view', 'dashboard');
  const [selectedProblemId, setSelectedProblemId] = useLocalStorage<string | null>('neetcode-selected-problem', null);

  const { updateProblemStatus: calculateNewProblemState } = useSpacedRepetition();
  const { recordActivity } = useStreak();

  // Apply dark mode class to document
  useEffect(() => {
    if (userProgress.settings.darkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [userProgress.settings.darkMode]);

  const updateProblem = useCallback((updatedProblem: Problem) => {
    setUserProgress((prev) => ({
      ...prev,
      problems: prev.problems.map((p) =>
        p.id === updatedProblem.id ? updatedProblem : p
      ),
    }));
  }, [setUserProgress]);

  const updateProblemStatus = useCallback((problemId: string, status: Status) => {
    setUserProgress((prev) => {
      const problem = prev.problems.find((p) => p.id === problemId);
      if (!problem) return prev;

      const updatedProblem = calculateNewProblemState(problem, status);

      // Update streak if problem is solved
      let newStreak = prev.streak;
      if (status === 'solved') {
        newStreak = recordActivity(prev.streak);
      }

      return {
        ...prev,
        problems: prev.problems.map((p) =>
          p.id === problemId ? updatedProblem : p
        ),
        streak: newStreak,
      };
    });
  }, [setUserProgress, calculateNewProblemState, recordActivity]);

  const updateSettings = useCallback((settings: Settings) => {
    setUserProgress((prev) => ({
      ...prev,
      settings,
    }));
  }, [setUserProgress]);

  const importProgress = useCallback((data: UserProgress) => {
    setUserProgress(data);
  }, [setUserProgress]);

  const resetProgress = useCallback(() => {
    setUserProgress(getInitialProgress());
    setFlashcardProgress(getInitialFlashcardProgress());
    setCurrentView('dashboard');
    setSelectedProblemId(null);
  }, [setUserProgress, setFlashcardProgress, setCurrentView, setSelectedProblemId]);

  const updateFlashcard = useCallback((updatedCard: Flashcard) => {
    setFlashcardProgress((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => c.id === updatedCard.id ? updatedCard : c),
    }));
  }, [setFlashcardProgress]);

  const value: AppContextType = {
    userProgress,
    flashcardProgress,
    currentView,
    selectedProblemId,
    setCurrentView,
    setSelectedProblemId,
    updateProblem,
    updateProblemStatus,
    updateFlashcard,
    updateSettings,
    importProgress,
    resetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
