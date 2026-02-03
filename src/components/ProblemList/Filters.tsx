import React from 'react';
import { Difficulty, Status } from '../../types';

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: Status | 'all';
  onStatusFilterChange: (status: Status | 'all') => void;
  difficultyFilter: Difficulty | 'all';
  onDifficultyFilterChange: (difficulty: Difficulty | 'all') => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  difficultyFilter,
  onDifficultyFilterChange,
}) => {
  return (
    <div className="space-y-3 p-4 bg-[var(--color-bg-secondary)] rounded-xl sticky top-0 z-10">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-secondary)] touch-target"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[var(--color-bg-secondary)] rounded-full"
          >
            <svg className="w-4 h-4 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 flex-wrap">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as Status | 'all')}
          className="px-3 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] touch-target"
        >
          <option value="all">All Status</option>
          <option value="not_started">Not Started</option>
          <option value="attempted">Attempted</option>
          <option value="solved">Solved</option>
          <option value="needs_review">Needs Review</option>
        </select>

        {/* Difficulty Filter */}
        <select
          value={difficultyFilter}
          onChange={(e) => onDifficultyFilterChange(e.target.value as Difficulty | 'all')}
          className="px-3 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] touch-target"
        >
          <option value="all">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};
