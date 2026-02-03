import { useCallback } from 'react';
import { Streak } from '../types';
import { updateStreak, getStreakStatus, checkIfStreakBroken } from '../utils/streakCalculator';

interface UseStreakReturn {
  recordActivity: (currentStreak: Streak) => Streak;
  getStatus: (streak: Streak) => 'active' | 'at_risk' | 'broken' | 'none';
  isStreakBroken: (lastActiveDate: string | null) => boolean;
  getCurrentStreak: (streak: Streak) => number;
}

export function useStreak(): UseStreakReturn {
  const recordActivity = useCallback((currentStreak: Streak): Streak => {
    return updateStreak(currentStreak);
  }, []);

  const getStatus = useCallback((streak: Streak): 'active' | 'at_risk' | 'broken' | 'none' => {
    return getStreakStatus(streak);
  }, []);

  const isStreakBroken = useCallback((lastActiveDate: string | null): boolean => {
    return checkIfStreakBroken(lastActiveDate);
  }, []);

  const getCurrentStreak = useCallback((streak: Streak): number => {
    if (checkIfStreakBroken(streak.lastActiveDate)) {
      return 0;
    }
    return streak.current;
  }, []);

  return {
    recordActivity,
    getStatus,
    isStreakBroken,
    getCurrentStreak,
  };
}
