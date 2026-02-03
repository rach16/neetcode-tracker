import { getToday } from './dateUtils';

export interface StreakData {
  current: number;
  lastActiveDate: string | null;
}

export const updateStreak = (currentStreak: StreakData): StreakData => {
  const today = getToday();

  if (!currentStreak.lastActiveDate) {
    // First ever activity
    return {
      current: 1,
      lastActiveDate: today,
    };
  }

  if (currentStreak.lastActiveDate === today) {
    // Already active today
    return currentStreak;
  }

  const lastActive = new Date(currentStreak.lastActiveDate);
  const todayDate = new Date(today);
  lastActive.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);

  const diffTime = todayDate.getTime() - lastActive.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day - increment streak
    return {
      current: currentStreak.current + 1,
      lastActiveDate: today,
    };
  } else {
    // Streak broken - reset to 1
    return {
      current: 1,
      lastActiveDate: today,
    };
  }
};

export const checkIfStreakBroken = (lastActiveDate: string | null): boolean => {
  if (!lastActiveDate) return false;

  const today = getToday();
  const lastActive = new Date(lastActiveDate);
  const todayDate = new Date(today);
  lastActive.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);

  const diffTime = todayDate.getTime() - lastActive.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 1;
};

export const getStreakStatus = (streak: StreakData): 'active' | 'at_risk' | 'broken' | 'none' => {
  if (!streak.lastActiveDate) return 'none';

  const today = getToday();

  if (streak.lastActiveDate === today) return 'active';

  const lastActive = new Date(streak.lastActiveDate);
  const todayDate = new Date(today);
  lastActive.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);

  const diffTime = todayDate.getTime() - lastActive.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'at_risk';
  if (diffDays > 1) return 'broken';

  return 'active';
};
