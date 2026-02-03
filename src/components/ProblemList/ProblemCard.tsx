import React from 'react';
import { Problem } from '../../types';
import { Badge, StatusIcon } from '../common';
import { formatRelativeDate } from '../../utils/dateUtils';

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onClick }) => {
  const showReviewDate = problem.status === 'solved' || problem.status === 'needs_review';

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 bg-[var(--color-bg-tertiary)] rounded-xl hover:bg-opacity-80 transition-all duration-200 text-left touch-target active:scale-[0.98]"
    >
      <StatusIcon status={problem.status} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium text-[var(--color-text-primary)] truncate">{problem.name}</h3>
          <Badge variant="difficulty" value={problem.difficulty} size="sm" />
        </div>
        {showReviewDate && problem.nextReview && (
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Review: {formatRelativeDate(problem.nextReview)}
          </p>
        )}
      </div>

      <svg
        className="w-5 h-5 text-[var(--color-text-secondary)] flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};
