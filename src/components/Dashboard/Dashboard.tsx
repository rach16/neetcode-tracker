import React from 'react';
import { Problem, Streak, Flashcard } from '../../types';
import { StreakCounter } from './StreakCounter';
import { TodayQueue } from './TodayQueue';
import { ProgressOverview } from './ProgressOverview';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';
import { useStreak } from '../../hooks/useStreak';
import { useFlashcards } from '../../hooks/useFlashcards';
import { getToday } from '../../utils/dateUtils';

interface DashboardProps {
  problems: Problem[];
  streak: Streak;
  dailyGoal: number;
  onProblemSelect: (problemId: string) => void;
  flashcards?: Flashcard[];
  onNavigateToFlashcards?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  problems,
  streak,
  dailyGoal,
  onProblemSelect,
  flashcards = [],
  onNavigateToFlashcards,
}) => {
  const { getProblemsForReview, getSuggestedNewProblems } = useSpacedRepetition();
  const { getStatus, getCurrentStreak } = useStreak();
  const { getDueCardCount } = useFlashcards();

  const reviewProblems = getProblemsForReview(problems);
  const suggestedProblems = getSuggestedNewProblems(problems, dailyGoal);
  const streakStatus = getStatus(streak);
  const currentStreak = getCurrentStreak(streak);
  const dueFlashcards = getDueCardCount(flashcards);

  // Calculate problems solved today
  const today = getToday();
  const solvedToday = problems.filter(
    (p) => p.lastAttempted === today && p.status === 'solved'
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-0">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
        {/* Streak Counter - Mobile */}
        <div className="md:hidden">
          <StreakCounter streak={currentStreak} status={streakStatus} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
            <p className="text-2xl font-bold text-green-500">
              {problems.filter((p) => p.status === 'solved').length}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">Total Solved</p>
          </div>
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
            <p className="text-2xl font-bold text-orange-500">{reviewProblems.length}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Problems Due</p>
          </div>
          <button
            onClick={onNavigateToFlashcards}
            className="p-4 bg-[var(--color-bg-secondary)] rounded-xl text-left hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <p className="text-2xl font-bold text-purple-500">{dueFlashcards}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Cards Due</p>
          </button>
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
            <p className="text-2xl font-bold text-[var(--color-accent)]">{solvedToday}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Solved Today</p>
          </div>
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {Math.round((problems.filter((p) => p.status === 'solved').length / 150) * 100)}%
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">Complete</p>
          </div>
        </div>

        {/* Today's Queue */}
        <TodayQueue
          reviewProblems={reviewProblems}
          suggestedProblems={suggestedProblems}
          dailyGoal={dailyGoal}
          solvedToday={solvedToday}
          onProblemClick={onProblemSelect}
        />

        {/* Progress Overview */}
        <ProgressOverview problems={problems} />
      </div>
    </div>
  );
};
