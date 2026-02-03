import React from 'react';
import { Status } from '../../types';

interface StatusSelectorProps {
  currentStatus: Status;
  onStatusChange: (status: Status) => void;
}

const statusOptions: { value: Status; label: string; description: string }[] = [
  { value: 'not_started', label: 'Not Started', description: "Haven't attempted yet" },
  { value: 'attempted', label: 'Attempted', description: 'Tried but not solved' },
  { value: 'solved', label: 'Solved', description: 'Successfully solved!' },
  { value: 'needs_review', label: 'Needs Review', description: 'Need to practice again' },
];

const statusColors: Record<Status, string> = {
  not_started: 'border-gray-500 bg-gray-500/10',
  attempted: 'border-yellow-500 bg-yellow-500/10',
  solved: 'border-green-500 bg-green-500/10',
  needs_review: 'border-orange-500 bg-orange-500/10',
};

const statusActiveColors: Record<Status, string> = {
  not_started: 'border-gray-500 bg-gray-500 text-white',
  attempted: 'border-yellow-500 bg-yellow-500 text-yellow-950',
  solved: 'border-green-500 bg-green-500 text-green-950',
  needs_review: 'border-orange-500 bg-orange-500 text-orange-950',
};

export const StatusSelector: React.FC<StatusSelectorProps> = ({ currentStatus, onStatusChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--color-text-secondary)]">Status</label>
      <div className="grid grid-cols-2 gap-2">
        {statusOptions.map((option) => {
          const isSelected = currentStatus === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onStatusChange(option.value)}
              className={`p-3 rounded-xl border-2 text-left transition-all duration-200 touch-target ${
                isSelected
                  ? statusActiveColors[option.value]
                  : `${statusColors[option.value]} text-[var(--color-text-primary)]`
              }`}
            >
              <span className="font-medium block">{option.label}</span>
              <span className={`text-xs ${isSelected ? 'opacity-80' : 'text-[var(--color-text-secondary)]'}`}>
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
