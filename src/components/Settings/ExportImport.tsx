import React, { useRef } from 'react';
import { Button } from '../common';
import { UserProgress } from '../../types';

interface ExportImportProps {
  userProgress: UserProgress;
  onImport: (data: UserProgress) => void;
}

export const ExportImport: React.FC<ExportImportProps> = ({ userProgress, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(userProgress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `neetcode-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as UserProgress;

        // Basic validation
        if (!data.problems || !Array.isArray(data.problems)) {
          throw new Error('Invalid data format: missing problems array');
        }
        if (!data.streak || typeof data.streak.current !== 'number') {
          throw new Error('Invalid data format: missing streak data');
        }
        if (!data.settings || typeof data.settings.dailyGoal !== 'number') {
          throw new Error('Invalid data format: missing settings');
        }

        onImport(data);
        alert('Data imported successfully!');
      } catch (error) {
        console.error('Import error:', error);
        alert('Failed to import data. Please make sure the file is a valid NeetCode Tracker export.');
      }
    };
    reader.readAsText(file);

    // Reset the input
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-[var(--color-text-primary)]">Data Management</h3>

      <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-xl space-y-4">
        <div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            Export your progress to a JSON file for backup or transfer to another device.
          </p>
          <Button onClick={handleExport} variant="secondary" fullWidth>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Data
          </Button>
        </div>

        <div className="border-t border-[var(--color-bg-secondary)] pt-4">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            Import progress from a previously exported JSON file.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button onClick={handleImportClick} variant="secondary" fullWidth>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import Data
          </Button>
        </div>
      </div>
    </div>
  );
};
