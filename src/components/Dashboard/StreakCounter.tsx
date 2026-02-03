import React from 'react';

interface StreakCounterProps {
  streak: number;
  status: 'active' | 'at_risk' | 'broken' | 'none';
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak, status }) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'active':
        return "You're on fire today!";
      case 'at_risk':
        return 'Solve a problem to keep your streak!';
      case 'broken':
        return 'Start a new streak today!';
      case 'none':
        return 'Start your streak!';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'at_risk':
        return 'text-orange-500';
      case 'broken':
      case 'none':
        return 'text-[var(--color-text-secondary)]';
    }
  };

  return (
    <div className="p-6 bg-[var(--color-bg-secondary)] rounded-2xl">
      <div className="flex items-center gap-4">
        <div className={`text-5xl ${status === 'active' || status === 'at_risk' ? 'animate-flame' : ''}`}>
          {streak > 0 && status !== 'broken' ? '🔥' : '❄️'}
        </div>
        <div>
          <p className="text-4xl font-bold text-[var(--color-text-primary)]">{streak}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">day streak</p>
        </div>
      </div>
      <p className={`mt-4 text-sm font-medium ${getStatusColor()}`}>{getStatusMessage()}</p>
    </div>
  );
};
