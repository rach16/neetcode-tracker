import React from 'react';
import { Button } from '../common';
import { formatTime } from '../../utils/dateUtils';

interface TimerProps {
  time: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const Timer: React.FC<TimerProps> = ({ time, isRunning, onStart, onPause, onReset }) => {
  const defaultTime = 45 * 60; // 45 minutes in seconds
  const progress = Math.min((time / defaultTime) * 100, 100);
  const isOvertime = time > defaultTime;

  return (
    <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">Timer</span>
        {isOvertime && (
          <span className="text-xs text-orange-500 font-medium">Overtime</span>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <span className={`text-4xl font-mono font-bold ${isOvertime ? 'text-orange-500' : 'text-[var(--color-text-primary)]'}`}>
          {formatTime(time)}
        </span>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
          Target: 45:00
        </p>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isOvertime ? 'bg-orange-500' : 'bg-[var(--color-accent)]'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {isRunning ? (
          <Button onClick={onPause} variant="secondary" fullWidth>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            Pause
          </Button>
        ) : (
          <Button onClick={onStart} variant="primary" fullWidth>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {time > 0 ? 'Resume' : 'Start'}
          </Button>
        )}
        <Button onClick={onReset} variant="ghost">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
