import React, { useState, useMemo } from 'react';
import { Problem, CATEGORY_INFO, Difficulty, Status } from '../../types';
import { Filters } from './Filters';
import { CategorySection } from './CategorySection';
import { ProblemCard } from './ProblemCard';

interface ProblemListProps {
  problems: Problem[];
  onProblemSelect: (problemId: string) => void;
}

export const ProblemList: React.FC<ProblemListProps> = ({ problems, onProblemSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = problem.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || problem.status === statusFilter;
      const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [problems, searchQuery, statusFilter, difficultyFilter]);

  const isFiltering = searchQuery || statusFilter !== 'all' || difficultyFilter !== 'all';

  const problemsByCategory = useMemo(() => {
    return CATEGORY_INFO.map((category) => ({
      category,
      problems: filteredProblems.filter((p) => p.category === category.id),
    })).filter((group) => group.problems.length > 0);
  }, [filteredProblems]);

  const totalSolved = problems.filter((p) => p.status === 'solved').length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Problems</h1>
          <div className="text-sm text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-success)] font-semibold">{totalSolved}</span>
            <span> / 150 solved</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4">
        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          difficultyFilter={difficultyFilter}
          onDifficultyFilterChange={setDifficultyFilter}
        />
      </div>

      {/* Problem List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-[var(--color-text-secondary)] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[var(--color-text-secondary)]">No problems found</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Try adjusting your filters</p>
          </div>
        ) : isFiltering ? (
          // Show flat list when filtering/searching
          <div className="space-y-2">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} onClick={() => onProblemSelect(problem.id)} />
            ))}
          </div>
        ) : (
          // Show categorized list
          problemsByCategory.map(({ category, problems: categoryProblems }) => (
            <CategorySection
              key={category.id}
              category={category}
              problems={categoryProblems}
              onProblemClick={onProblemSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};
