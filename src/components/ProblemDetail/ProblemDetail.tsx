import React, { useState, useEffect } from 'react';
import { Problem, Status, CATEGORY_INFO } from '../../types';
import { Badge, Button, Confetti } from '../common';
import { Timer } from '../Timer';
import { StatusSelector } from './StatusSelector';
import { NotesEditor } from './NotesEditor';
import { QuickTip } from '../AlgoTips';
import { useTimer } from '../../hooks/useTimer';
import { formatDate, formatRelativeDate } from '../../utils/dateUtils';
import { getReviewIntervalDescription } from '../../utils/spacedRepetition';
import { getTipByProblemId } from '../../data/algoTips';

interface ProblemDetailProps {
  problem: Problem;
  onBack: () => void;
  onUpdateProblem: (problem: Problem) => void;
  onStatusChange: (status: Status) => void;
  onNavigateToCheatSheet: () => void;
}

export const ProblemDetail: React.FC<ProblemDetailProps> = ({
  problem,
  onBack,
  onUpdateProblem,
  onStatusChange,
  onNavigateToCheatSheet,
}) => {
  const timer = useTimer(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previousStatus, setPreviousStatus] = useState(problem.status);

  const categoryInfo = CATEGORY_INFO.find((c) => c.id === problem.category);
  const tip = getTipByProblemId(problem.id);

  useEffect(() => {
    // Show confetti when status changes to solved
    if (problem.status === 'solved' && previousStatus !== 'solved') {
      setShowConfetti(true);
    }
    setPreviousStatus(problem.status);
  }, [problem.status, previousStatus]);

  const handleStatusChange = (status: Status) => {
    onStatusChange(status);
  };

  const handleNotesChange = (notes: string) => {
    onUpdateProblem({ ...problem, notes });
  };

  const handleOpenLeetCode = () => {
    window.open(problem.leetcodeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full">
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <div className="p-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-bg-tertiary)]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors touch-target"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[var(--color-text-primary)] truncate">{problem.name}</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">{categoryInfo?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="difficulty" value={problem.difficulty} size="md" />
          <Badge variant="status" value={problem.status} size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
        {/* Quick Tip */}
        <QuickTip tip={tip} />

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button onClick={handleOpenLeetCode} variant="primary" fullWidth>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open on LeetCode
          </Button>
          <Button onClick={onNavigateToCheatSheet} variant="secondary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </Button>
        </div>

        {/* Timer */}
        <Timer
          time={timer.time}
          isRunning={timer.isRunning}
          onStart={timer.start}
          onPause={timer.pause}
          onReset={timer.reset}
        />

        {/* Status Selector */}
        <StatusSelector currentStatus={problem.status} onStatusChange={handleStatusChange} />

        {/* Review Info */}
        {(problem.status === 'solved' || problem.status === 'needs_review') && (
          <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-xl space-y-2">
            <h3 className="font-medium text-[var(--color-text-primary)]">Spaced Repetition</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[var(--color-text-secondary)]">Last Attempted</p>
                <p className="text-[var(--color-text-primary)] font-medium">
                  {problem.lastAttempted ? formatDate(problem.lastAttempted) : 'Never'}
                </p>
              </div>
              <div>
                <p className="text-[var(--color-text-secondary)]">Next Review</p>
                <p className="text-[var(--color-text-primary)] font-medium">
                  {problem.nextReview ? formatRelativeDate(problem.nextReview) : 'Not scheduled'}
                </p>
              </div>
              <div>
                <p className="text-[var(--color-text-secondary)]">Review Count</p>
                <p className="text-[var(--color-text-primary)] font-medium">{problem.reviewCount}</p>
              </div>
              <div>
                <p className="text-[var(--color-text-secondary)]">Next Interval</p>
                <p className="text-[var(--color-text-primary)] font-medium">
                  {getReviewIntervalDescription(problem.reviewCount)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <NotesEditor notes={problem.notes} onSave={handleNotesChange} />

        {/* Mark Complete Button */}
        {problem.status !== 'solved' && (
          <Button
            onClick={() => handleStatusChange('solved')}
            variant="primary"
            fullWidth
            className="mt-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Mark as Solved
          </Button>
        )}
      </div>
    </div>
  );
};
