import React, { useState } from 'react';
import { Button, ConfirmModal } from '../common';
import { ExportImport } from './ExportImport';
import { UserProgress, Settings as SettingsType } from '../../types';

interface SettingsProps {
  userProgress: UserProgress;
  onSettingsChange: (settings: SettingsType) => void;
  onImport: (data: UserProgress) => void;
  onReset: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  userProgress,
  onSettingsChange,
  onImport,
  onReset,
}) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const { settings } = userProgress;

  const handleDailyGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 20) {
      onSettingsChange({ ...settings, dailyGoal: value });
    }
  };

  const handleDarkModeToggle = () => {
    onSettingsChange({ ...settings, darkMode: !settings.darkMode });
  };

  const totalSolved = userProgress.problems.filter((p) => p.status === 'solved').length;
  const totalAttempted = userProgress.problems.filter((p) => p.status === 'attempted').length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-0">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Customize your experience</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 md:pb-4">
        {/* Daily Goal */}
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Daily Goal</h3>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              max="20"
              value={settings.dailyGoal}
              onChange={handleDailyGoalChange}
              className="w-20 px-4 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg text-center font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] touch-target"
            />
            <span className="text-[var(--color-text-secondary)]">problems per day</span>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Appearance</h3>
          <button
            onClick={handleDarkModeToggle}
            className="flex items-center justify-between w-full p-3 bg-[var(--color-bg-tertiary)] rounded-lg touch-target"
          >
            <div className="flex items-center gap-3">
              {settings.darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              <span className="font-medium text-[var(--color-text-primary)]">
                {settings.darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div
              className={`w-12 h-7 rounded-full transition-colors duration-200 flex items-center ${
                settings.darkMode ? 'bg-[var(--color-accent)]' : 'bg-gray-400'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 mx-1 ${
                  settings.darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Statistics */}
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
              <p className="text-3xl font-bold text-green-500">{totalSolved}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Problems Solved</p>
            </div>
            <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
              <p className="text-3xl font-bold text-yellow-500">{totalAttempted}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">In Progress</p>
            </div>
            <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
              <p className="text-3xl font-bold text-[var(--color-accent)]">{userProgress.streak.current}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Current Streak</p>
            </div>
            <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
              <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                {Math.round((totalSolved / 150) * 100)}%
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">Completion</p>
            </div>
          </div>
        </div>

        {/* Export/Import */}
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
          <ExportImport userProgress={userProgress} onImport={onImport} />
        </div>

        {/* iOS Install Instructions */}
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl">
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Install on iPhone</h3>
          <div className="text-sm text-[var(--color-text-secondary)] space-y-2">
            <p>To install this app on your iPhone:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Open this page in Safari (required)</li>
              <li>Tap the Share button (square with arrow)</li>
              <li>Scroll down and tap "Add to Home Screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
            <p className="mt-4 text-xs">
              The app will work offline and feel like a native app!
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl border-2 border-red-500/30">
          <h3 className="font-semibold text-red-500 mb-4">Danger Zone</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            This will permanently delete all your progress, notes, and streak data.
          </p>
          <Button variant="danger" onClick={() => setShowResetModal(true)} fullWidth>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Reset All Progress
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-[var(--color-text-secondary)] py-4">
          <p>NeetCode 150 Interview Prep Tracker</p>
          <p className="mt-1">Built with React + TypeScript + Tailwind</p>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={onReset}
        title="Reset All Progress?"
        message="This will permanently delete all your progress, notes, and streak data. This action cannot be undone."
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};
