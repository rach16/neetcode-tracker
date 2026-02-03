import { addDays, getToday, getTomorrow } from './dateUtils';

export const calculateNextReview = (reviewCount: number): string => {
  const today = getToday();

  switch (reviewCount) {
    case 0:
      return addDays(today, 1); // Review 1: +1 day
    case 1:
      return addDays(today, 3); // Review 2: +3 days
    case 2:
      return addDays(today, 7); // Review 3: +7 days
    case 3:
      return addDays(today, 14); // Review 4: +14 days
    default:
      return addDays(today, 30); // Review 5+: +30 days
  }
};

export const getReviewIntervalDescription = (reviewCount: number): string => {
  switch (reviewCount) {
    case 0:
      return 'Next review in 1 day';
    case 1:
      return 'Next review in 3 days';
    case 2:
      return 'Next review in 7 days';
    case 3:
      return 'Next review in 14 days';
    default:
      return 'Next review in 30 days';
  }
};

export const resetForNeedsReview = (): { nextReview: string; reviewCount: number } => {
  return {
    nextReview: getTomorrow(),
    reviewCount: 0,
  };
};
