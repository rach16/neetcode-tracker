import React, { useCallback } from 'react';
import { useApp } from './context/AppContext';
import { Dashboard } from './components/Dashboard';
import { ProblemList } from './components/ProblemList';
import { ProblemDetail } from './components/ProblemDetail';
import { Flashcards } from './components/Flashcards';
import { AlgoTips } from './components/AlgoTips';
import { CheatSheet } from './components/CheatSheet';
import { Settings } from './components/Settings';
import { BottomNav, Sidebar } from './components/Navigation';
import { useStreak } from './hooks/useStreak';
import { View, Status } from './types';

const App: React.FC = () => {
  const {
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
  } = useApp();

  const { getCurrentStreak } = useStreak();
  const currentStreak = getCurrentStreak(userProgress.streak);

  const handleNavigate = useCallback(
    (view: View) => {
      if (view !== 'problem-detail') {
        setSelectedProblemId(null);
      }
      setCurrentView(view);
    },
    [setCurrentView, setSelectedProblemId]
  );

  const handleProblemSelect = useCallback(
    (problemId: string) => {
      setSelectedProblemId(problemId);
      setCurrentView('problem-detail');
    },
    [setSelectedProblemId, setCurrentView]
  );

  const handleProblemBack = useCallback(() => {
    setSelectedProblemId(null);
    setCurrentView('problems');
  }, [setSelectedProblemId, setCurrentView]);

  const handleStatusChange = useCallback(
    (status: Status) => {
      if (selectedProblemId) {
        updateProblemStatus(selectedProblemId, status);
      }
    },
    [selectedProblemId, updateProblemStatus]
  );

  const handleToggleDarkMode = useCallback(() => {
    updateSettings({
      ...userProgress.settings,
      darkMode: !userProgress.settings.darkMode,
    });
  }, [userProgress.settings, updateSettings]);

  const handleNavigateToCheatSheet = useCallback(() => {
    setCurrentView('cheatsheet');
  }, [setCurrentView]);

  const handleNavigateToFlashcards = useCallback(() => {
    setCurrentView('flashcards');
  }, [setCurrentView]);

  const selectedProblem = selectedProblemId
    ? userProgress.problems.find((p) => p.id === selectedProblemId)
    : null;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            problems={userProgress.problems}
            streak={userProgress.streak}
            dailyGoal={userProgress.settings.dailyGoal}
            onProblemSelect={handleProblemSelect}
            flashcards={flashcardProgress.cards}
            onNavigateToFlashcards={handleNavigateToFlashcards}
          />
        );
      case 'problems':
        return (
          <ProblemList
            problems={userProgress.problems}
            onProblemSelect={handleProblemSelect}
          />
        );
      case 'problem-detail':
        if (!selectedProblem) {
          handleProblemBack();
          return null;
        }
        return (
          <ProblemDetail
            problem={selectedProblem}
            onBack={handleProblemBack}
            onUpdateProblem={updateProblem}
            onStatusChange={handleStatusChange}
            onNavigateToCheatSheet={handleNavigateToCheatSheet}
          />
        );
      case 'flashcards':
      case 'flashcard-review':
      case 'flashcard-quiz':
        return (
          <Flashcards
            cards={flashcardProgress.cards}
            onUpdateCard={updateFlashcard}
          />
        );
      case 'algo-tips':
        return <AlgoTips />;
      case 'cheatsheet':
        return <CheatSheet />;
      case 'settings':
        return (
          <Settings
            userProgress={userProgress}
            onSettingsChange={updateSettings}
            onImport={importProgress}
            onReset={resetProgress}
          />
        );
      default:
        return <Dashboard
          problems={userProgress.problems}
          streak={userProgress.streak}
          dailyGoal={userProgress.settings.dailyGoal}
          onProblemSelect={handleProblemSelect}
          flashcards={flashcardProgress.cards}
          onNavigateToFlashcards={handleNavigateToFlashcards}
        />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        streak={currentStreak}
        darkMode={userProgress.settings.darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-[var(--color-bg-primary)] transition-colors duration-300">
        <div className="h-full safe-area-padding">{renderView()}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
