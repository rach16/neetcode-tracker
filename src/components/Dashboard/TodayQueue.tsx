import React from 'react';
import { Problem } from '../../types';
import { Badge, StatusIcon } from '../common';

interface TodayQueueProps {
  reviewProblems: Problem[];
  suggestedProblems: Problem[];
  dailyGoal: number;
  solvedToday: number;
  onProblemClick: (problemId: string) => void;
}

export const TodayQueue: React.FC<TodayQueueProps> = ({
  reviewProblems,
  suggestedProblems,
  dailyGoal,
  solvedToday,
  onProblemClick,
}) => {
  const remainingToday = Math.max(0, dailyGoal - solvedToday);
  const allProblems = [...reviewProblems, ...suggestedProblems.slice(0, remainingToday)];

  return (
    <div className="p-6 bg-[var(--color-bg-secondary)] rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Today's Queue</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-secondary)]">Goal:</span>
          <span className={`text-sm font-bold ${solvedToday >= dailyGoal ? 'text-green-500' : 'text-[var(--color-accent)]'}`}>
            {solvedToday}/{dailyGoal}
          </span>
          {solvedToday >= dailyGoal && <span className="text-lg">🎉</span>}
        </div>
      </div>

      {allProblems.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">🎊</span>
          <p className="text-[var(--color-text-primary)] font-medium">All caught up!</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            No problems due for review. Keep up the great work!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Review Problems */}
          {reviewProblems.length > 0 && (
            <div>
              <p className="text-xs font-medium text-orange-500 mb-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Due for Review
              </p>
              {reviewProblems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => onProblemClick(problem.id)}
                  className="w-full flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-xl hover:bg-opacity-80 transition-all duration-200 text-left touch-target active:scale-[0.98] mb-2"
                >
                  <StatusIcon status={problem.status} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)] truncate">{problem.name}</p>
                  </div>
                  <Badge variant="difficulty" value={problem.difficulty} size="sm" />
                </button>
              ))}
            </div>
          )}

          {/* Suggested New Problems */}
          {suggestedProblems.length > 0 && remainingToday > 0 && (
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Suggested New Problems
              </p>
              {suggestedProblems.slice(0, remainingToday).map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => onProblemClick(problem.id)}
                  className="w-full flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-xl hover:bg-opacity-80 transition-all duration-200 text-left touch-target active:scale-[0.98] mb-2"
                >
                  <StatusIcon status={problem.status} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)] truncate">{problem.name}</p>
                  </div>
                  <Badge variant="difficulty" value={problem.difficulty} size="sm" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
