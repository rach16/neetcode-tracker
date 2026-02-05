import React from 'react';
import { View } from '../../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  streak: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

interface NavItem {
  id: View;
  label: string;
  icon: React.ReactElement;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  streak,
  darkMode,
  onToggleDarkMode,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'problems',
      label: 'Problems',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 'swipe-cards',
      label: 'Swipe Cards',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
    },
    {
      id: 'algo-tips',
      label: 'Algo Tips',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 'cheatsheet',
      label: 'Python Cheat Sheet',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-bg-tertiary)] h-full">
      {/* Logo/Title */}
      <div className="p-6 border-b border-[var(--color-bg-tertiary)]">
        <h1 className="text-xl font-bold text-[var(--color-accent)]">NeetCode 150</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Interview Prep Tracker</p>
      </div>

      {/* Streak Display */}
      <div className="p-4 mx-4 mt-4 rounded-xl bg-[var(--color-bg-tertiary)]">
        <div className="flex items-center gap-3">
          <span className={`text-2xl ${streak > 0 ? 'animate-flame' : ''}`}>
            {streak > 0 ? '🔥' : '❄️'}
          </span>
          <div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">{streak}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">day streak</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id ||
            (item.id === 'problems' && currentView === 'problem-detail') ||
            (item.id === 'flashcards' && (currentView === 'flashcard-review' || currentView === 'flashcard-quiz'));
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 touch-target ${
                isActive
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="p-4 border-t border-[var(--color-bg-tertiary)]">
        <button
          onClick={onToggleDarkMode}
          className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] hover:opacity-80 transition-opacity touch-target"
        >
          <div className="flex items-center gap-3">
            {darkMode ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>
          <div
            className={`w-10 h-6 rounded-full transition-colors duration-200 ${
              darkMode ? 'bg-[var(--color-accent)]' : 'bg-gray-400'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5 ${
                darkMode ? 'translate-x-4.5 ml-0.5' : 'translate-x-0.5'
              }`}
            />
          </div>
        </button>
      </div>
    </aside>
  );
};
