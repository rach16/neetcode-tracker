import React from 'react';
import { Problem, CATEGORY_INFO } from '../../types';

interface ProgressOverviewProps {
  problems: Problem[];
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({ problems }) => {
  const totalSolved = problems.filter((p) => p.status === 'solved').length;
  const totalAttempted = problems.filter((p) => p.status === 'attempted').length;
  const totalNeedsReview = problems.filter((p) => p.status === 'needs_review').length;
  const overallProgress = (totalSolved / 150) * 100;

  // Get top 5 categories with most progress for display
  const categoryProgress = CATEGORY_INFO.map((category) => {
    const categoryProblems = problems.filter((p) => p.category === category.id);
    const solved = categoryProblems.filter((p) => p.status === 'solved').length;
    return {
      ...category,
      solved,
      total: categoryProblems.length,
      progress: (solved / categoryProblems.length) * 100,
    };
  }).sort((a, b) => b.progress - a.progress);

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="p-6 bg-[var(--color-bg-secondary)] rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Overall Progress</h3>
          <span className="text-2xl font-bold text-[var(--color-accent)]">
            {totalSolved}/150
          </span>
        </div>
        <div className="h-3 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent)] to-pink-500 rounded-full transition-all duration-1000 animate-progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">{totalSolved}</p>
            <p className="text-[var(--color-text-secondary)]">Solved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">{totalAttempted}</p>
            <p className="text-[var(--color-text-secondary)]">Attempted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-500">{totalNeedsReview}</p>
            <p className="text-[var(--color-text-secondary)]">Review</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-500">{150 - totalSolved - totalAttempted - totalNeedsReview}</p>
            <p className="text-[var(--color-text-secondary)]">Remaining</p>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="p-6 bg-[var(--color-bg-secondary)] rounded-2xl">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Progress by Category</h3>
        <div className="space-y-3">
          {categoryProgress.map((category) => (
            <div key={category.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[var(--color-text-primary)] truncate flex-1 mr-2">{category.name}</span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {category.solved}/{category.total}
                </span>
              </div>
              <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    category.progress === 100
                      ? 'bg-green-500'
                      : category.progress >= 50
                      ? 'bg-[var(--color-accent)]'
                      : 'bg-[var(--color-accent)]/60'
                  }`}
                  style={{ width: `${category.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
