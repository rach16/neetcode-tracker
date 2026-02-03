import React from 'react';
import { Difficulty, Status } from '../../types';

interface BadgeProps {
  variant: 'difficulty' | 'status';
  value: Difficulty | Status;
  size?: 'sm' | 'md';
}

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const statusLabels: Record<Status, string> = {
  not_started: 'Not Started',
  attempted: 'Attempted',
  solved: 'Solved',
  needs_review: 'Needs Review',
};

const difficultyStyles: Record<Difficulty, string> = {
  easy: 'bg-green-500 text-green-950',
  medium: 'bg-yellow-500 text-yellow-950',
  hard: 'bg-red-500 text-white',
};

const statusStyles: Record<Status, string> = {
  not_started: 'bg-gray-500 text-gray-100',
  attempted: 'bg-yellow-500 text-yellow-950',
  solved: 'bg-green-500 text-green-950',
  needs_review: 'bg-orange-500 text-orange-950',
};

export const Badge: React.FC<BadgeProps> = ({ variant, value, size = 'sm' }) => {
  const label = variant === 'difficulty' ? difficultyLabels[value as Difficulty] : statusLabels[value as Status];
  const styles = variant === 'difficulty' ? difficultyStyles[value as Difficulty] : statusStyles[value as Status];

  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${styles} ${sizeStyles}`}>
      {label}
    </span>
  );
};

interface StatusIconProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status, size = 'md' }) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const icons: Record<Status, React.ReactElement> = {
    not_started: (
      <svg className={`${sizeStyles[size]} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
      </svg>
    ),
    attempted: (
      <svg className={`${sizeStyles[size]} text-yellow-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4" />
      </svg>
    ),
    solved: (
      <svg className={`${sizeStyles[size]} text-green-500`} fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ),
    needs_review: (
      <svg className={`${sizeStyles[size]} text-orange-500`} fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM9.375 12a2.625 2.625 0 114.544 1.794l-.87 1.74a.75.75 0 01-1.344 0l-.87-1.74A2.606 2.606 0 019.375 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return icons[status];
};
