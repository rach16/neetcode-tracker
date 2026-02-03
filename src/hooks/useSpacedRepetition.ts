import { useCallback } from 'react';
import { Problem, Status } from '../types';
import { calculateNextReview, resetForNeedsReview } from '../utils/spacedRepetition';
import { getToday, isDueToday } from '../utils/dateUtils';

interface UseSpacedRepetitionReturn {
  updateProblemStatus: (problem: Problem, newStatus: Status) => Problem;
  getProblemsForReview: (problems: Problem[]) => Problem[];
  getSuggestedNewProblems: (problems: Problem[], count: number) => Problem[];
}

export function useSpacedRepetition(): UseSpacedRepetitionReturn {
  const updateProblemStatus = useCallback((problem: Problem, newStatus: Status): Problem => {
    const today = getToday();

    if (newStatus === 'solved') {
      const newReviewCount = problem.reviewCount + 1;
      return {
        ...problem,
        status: newStatus,
        lastAttempted: today,
        nextReview: calculateNextReview(problem.reviewCount),
        reviewCount: newReviewCount,
      };
    }

    if (newStatus === 'needs_review') {
      const { nextReview, reviewCount } = resetForNeedsReview();
      return {
        ...problem,
        status: newStatus,
        lastAttempted: today,
        nextReview,
        reviewCount,
      };
    }

    if (newStatus === 'attempted') {
      return {
        ...problem,
        status: newStatus,
        lastAttempted: today,
      };
    }

    return {
      ...problem,
      status: newStatus,
    };
  }, []);

  const getProblemsForReview = useCallback((problems: Problem[]): Problem[] => {
    return problems.filter(
      (problem) =>
        (problem.status === 'solved' || problem.status === 'needs_review') &&
        problem.nextReview &&
        isDueToday(problem.nextReview)
    );
  }, []);

  const getSuggestedNewProblems = useCallback((problems: Problem[], count: number): Problem[] => {
    // Get problems that haven't been started, prioritizing by:
    // 1. Easy problems first for warm-up
    // 2. Problems from categories with the least progress
    const notStarted = problems.filter((p) => p.status === 'not_started');

    // Calculate category progress
    const categoryProgress = new Map<string, { total: number; solved: number }>();
    problems.forEach((p) => {
      const current = categoryProgress.get(p.category) || { total: 0, solved: 0 };
      current.total++;
      if (p.status === 'solved') current.solved++;
      categoryProgress.set(p.category, current);
    });

    // Sort by difficulty (easy first), then by category progress (least progress first)
    const sorted = [...notStarted].sort((a, b) => {
      const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
      const diffDiff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      if (diffDiff !== 0) return diffDiff;

      const aProgress = categoryProgress.get(a.category);
      const bProgress = categoryProgress.get(b.category);
      const aRatio = aProgress ? aProgress.solved / aProgress.total : 0;
      const bRatio = bProgress ? bProgress.solved / bProgress.total : 0;

      return aRatio - bRatio;
    });

    return sorted.slice(0, count);
  }, []);

  return {
    updateProblemStatus,
    getProblemsForReview,
    getSuggestedNewProblems,
  };
}
