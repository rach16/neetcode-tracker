import React, { useState, useEffect } from 'react';

interface NotesEditorProps {
  notes: string;
  onSave: (notes: string) => void;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ notes, onSave }) => {
  const [localNotes, setLocalNotes] = useState(notes);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLocalNotes(notes);
    setHasChanges(false);
  }, [notes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
    setHasChanges(e.target.value !== notes);
  };

  const handleSave = () => {
    onSave(localNotes);
    setHasChanges(false);
  };

  const handleBlur = () => {
    if (hasChanges) {
      handleSave();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Notes</label>
        {hasChanges && (
          <span className="text-xs text-[var(--color-accent)]">Unsaved changes</span>
        )}
      </div>
      <textarea
        value={localNotes}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Add your notes here... (solution approach, edge cases, key insights)"
        className="w-full h-32 p-3 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-secondary)]"
      />
      {hasChanges && (
        <button
          onClick={handleSave}
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          Save Notes
        </button>
      )}
    </div>
  );
};
