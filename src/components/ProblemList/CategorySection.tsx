import React, { useState } from 'react';
import { Problem, CategoryInfo } from '../../types';
import { ProblemCard } from './ProblemCard';

interface CategorySectionProps {
  category: CategoryInfo;
  problems: Problem[];
  onProblemClick: (problemId: string) => void;
  defaultExpanded?: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  problems,
  onProblemClick,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const solvedCount = problems.filter((p) => p.status === 'solved').length;
  const progressPercent = (solvedCount / problems.length) * 100;

  return (
    <div className="rounded-xl overflow-hidden bg-[var(--color-bg-secondary)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-[var(--color-text-primary)]">{category.name}</h2>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {solvedCount}/{problems.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-success)] rounded-full transition-all duration-500 animate-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <svg
          className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform duration-200 ml-4 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-2 animate-fade-in">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} onClick={() => onProblemClick(problem.id)} />
          ))}
        </div>
      )}
    </div>
  );
};
