export type Difficulty = 'easy' | 'medium' | 'hard';

export type Status = 'not_started' | 'attempted' | 'solved' | 'needs_review';

export type Category =
  | 'arrays-hashing'
  | 'two-pointers'
  | 'sliding-window'
  | 'stack'
  | 'binary-search'
  | 'linked-list'
  | 'trees'
  | 'tries'
  | 'heap-priority-queue'
  | 'backtracking'
  | 'graphs'
  | 'advanced-graphs'
  | '1d-dynamic-programming'
  | '2d-dynamic-programming'
  | 'greedy'
  | 'intervals'
  | 'math-geometry'
  | 'bit-manipulation';

export interface Problem {
  id: string;
  name: string;
  difficulty: Difficulty;
  category: Category;
  leetcodeUrl: string;
  status: Status;
  notes: string;
  lastAttempted: string | null;
  nextReview: string | null;
  reviewCount: number;
  // Solution data for swipe cards
  approach?: string;
  pattern?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  pythonSolution?: string;
  neetcodeUrl?: string;
}

export interface Streak {
  current: number;
  lastActiveDate: string | null;
}

export interface Settings {
  dailyGoal: number;
  darkMode: boolean;
}

export interface UserProgress {
  problems: Problem[];
  streak: Streak;
  settings: Settings;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  problemCount: number;
}

export const CATEGORY_INFO: CategoryInfo[] = [
  { id: 'arrays-hashing', name: 'Arrays & Hashing', problemCount: 9 },
  { id: 'two-pointers', name: 'Two Pointers', problemCount: 5 },
  { id: 'sliding-window', name: 'Sliding Window', problemCount: 6 },
  { id: 'stack', name: 'Stack', problemCount: 7 },
  { id: 'binary-search', name: 'Binary Search', problemCount: 7 },
  { id: 'linked-list', name: 'Linked List', problemCount: 11 },
  { id: 'trees', name: 'Trees', problemCount: 15 },
  { id: 'tries', name: 'Tries', problemCount: 3 },
  { id: 'heap-priority-queue', name: 'Heap / Priority Queue', problemCount: 7 },
  { id: 'backtracking', name: 'Backtracking', problemCount: 9 },
  { id: 'graphs', name: 'Graphs', problemCount: 13 },
  { id: 'advanced-graphs', name: 'Advanced Graphs', problemCount: 6 },
  { id: '1d-dynamic-programming', name: '1D Dynamic Programming', problemCount: 12 },
  { id: '2d-dynamic-programming', name: '2D Dynamic Programming', problemCount: 11 },
  { id: 'greedy', name: 'Greedy', problemCount: 8 },
  { id: 'intervals', name: 'Intervals', problemCount: 6 },
  { id: 'math-geometry', name: 'Math & Geometry', problemCount: 8 },
  { id: 'bit-manipulation', name: 'Bit Manipulation', problemCount: 7 },
];

export type View = 'dashboard' | 'problems' | 'flashcards' | 'algo-tips' | 'cheatsheet' | 'settings' | 'problem-detail' | 'flashcard-review' | 'flashcard-quiz' | 'swipe-cards';

// Algorithm Tips Types
export type Pattern =
  | 'HashMap'
  | 'HashSet'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Stack'
  | 'Monotonic Stack'
  | 'Binary Search'
  | 'Linked List'
  | 'Fast & Slow Pointers'
  | 'Tree DFS'
  | 'Tree BFS'
  | 'Trie'
  | 'Heap'
  | 'Backtracking'
  | 'Graph DFS'
  | 'Graph BFS'
  | 'Union Find'
  | 'Topological Sort'
  | 'DP'
  | 'Greedy'
  | 'Intervals'
  | 'Bit Manipulation'
  | 'Math';

export interface AlgoTip {
  problemId: string;
  problemName: string;
  category: Category;
  pattern: Pattern;
  oneLiner: string;
  memoryHook?: string;
  keyQuestion?: string;
  commonMistake?: string;
}

// Flashcard Types
export type DeckId =
  | 'data-structures'
  | 'common-imports'
  | 'heap-operations'
  | 'loops-iteration'
  | 'sorting'
  | 'common-patterns'
  | 'useful-tricks'
  | 'time-complexity';

export interface Flashcard {
  id: string;
  deckId: DeckId;
  front: string;
  back: string;
  lastReviewed: string | null;
  nextReview: string | null;
  reviewCount: number;
}

export interface FlashcardDeck {
  id: DeckId;
  name: string;
  description: string;
  icon: string;
}

export interface FlashcardProgress {
  cards: Flashcard[];
}

export const DECK_INFO: FlashcardDeck[] = [
  { id: 'data-structures', name: 'Data Structures', description: 'Lists, dicts, sets, strings', icon: '📦' },
  { id: 'common-imports', name: 'Common Imports', description: 'Counter, defaultdict, deque, heapq', icon: '📥' },
  { id: 'heap-operations', name: 'Heap Operations', description: 'heappush, heappop, heapify', icon: '🗻' },
  { id: 'loops-iteration', name: 'Loops & Iteration', description: 'range, enumerate, zip', icon: '🔄' },
  { id: 'sorting', name: 'Sorting', description: 'sort, sorted, key functions', icon: '📊' },
  { id: 'common-patterns', name: 'Common Patterns', description: 'Two pointers, BFS, DFS, sliding window', icon: '🎯' },
  { id: 'useful-tricks', name: 'Useful Tricks', description: 'Infinity, swap, comprehensions', icon: '✨' },
  { id: 'time-complexity', name: 'Time Complexity', description: 'Big O for common operations', icon: '⏱️' },
];
