import { Flashcard, DeckId } from '../types';

interface FlashcardTemplate {
  front: string;
  back: string;
}

const flashcardTemplates: Record<DeckId, FlashcardTemplate[]> = {
  'data-structures': [
    { front: 'Create an empty list', back: 'arr = []' },
    { front: 'Add item to end of list', back: 'arr.append(x)' },
    { front: 'Remove and return last item', back: 'arr.pop()' },
    { front: 'Remove and return first item', back: 'arr.pop(0)' },
    { front: 'Get last element', back: 'arr[-1]' },
    { front: 'Reverse a list in place', back: 'arr.reverse() or arr[::-1]' },
    { front: 'Create empty dict', back: 'd = {}' },
    { front: 'Get value with default', back: 'd.get(key, default)' },
    { front: 'Check if key exists', back: 'key in d' },
    { front: 'Get all key-value pairs', back: 'd.items()' },
    { front: 'Create empty set', back: 's = set()' },
    { front: 'Add to set', back: 's.add(x)' },
    { front: 'O(1) set lookup', back: 'x in s' },
    { front: 'String to list of chars', back: 'list(s)' },
    { front: 'List of chars to string', back: '"".join(arr)' },
    { front: 'Char to ASCII', back: "ord('a') → 97" },
    { front: 'ASCII to char', back: "chr(97) → 'a'" },
  ],
  'common-imports': [
    { front: 'Import Counter', back: 'from collections import Counter' },
    { front: 'Import defaultdict', back: 'from collections import defaultdict' },
    { front: 'Import deque', back: 'from collections import deque' },
    { front: 'Import heap functions', back: 'from heapq import heappush, heappop, heapify' },
    { front: 'Count occurrences in string', back: 'Counter("aabbc") → {\'a\': 2, \'b\': 2, \'c\': 1}' },
    { front: 'Get top 2 most common', back: 'counter.most_common(2)' },
    { front: 'Dict with default list', back: 'defaultdict(list)' },
    { front: 'Dict with default int (0)', back: 'defaultdict(int)' },
    { front: 'Add to right of deque', back: 'q.append(x)' },
    { front: 'Add to left of deque', back: 'q.appendleft(x)' },
    { front: 'Remove from left (O(1))', back: 'q.popleft()' },
  ],
  'heap-operations': [
    { front: 'Add to heap', back: 'heappush(heap, val)' },
    { front: 'Remove smallest from heap', back: 'heappop(heap)' },
    { front: 'Convert list to heap in-place', back: 'heapify(arr)' },
    { front: 'Max heap trick (add)', back: 'heappush(heap, -val)' },
    { front: 'Max heap trick (remove)', back: '-heappop(heap)' },
    { front: "Peek at smallest (don't remove)", back: 'heap[0]' },
  ],
  'loops-iteration': [
    { front: 'Loop 0 to 4', back: 'for i in range(5)' },
    { front: 'Loop 2 to 4', back: 'for i in range(2, 5)' },
    { front: 'Loop backwards 5 to 1', back: 'for i in range(5, 0, -1)' },
    { front: 'Loop with index and value', back: 'for i, val in enumerate(arr)' },
    { front: 'Loop two lists together', back: 'for a, b in zip(arr1, arr2)' },
    { front: 'Loop through dict items', back: 'for k, v in d.items()' },
  ],
  'sorting': [
    { front: 'Sort list in place', back: 'arr.sort()' },
    { front: 'Sort descending', back: 'arr.sort(reverse=True)' },
    { front: 'Return new sorted list', back: 'sorted(arr)' },
    { front: 'Sort by second element', back: 'arr.sort(key=lambda x: x[1])' },
    { front: 'Sort by multiple keys', back: 'arr.sort(key=lambda x: (x[0], x[1]))' },
  ],
  'common-patterns': [
    { front: 'Two pointer init', back: 'left, right = 0, len(arr) - 1' },
    { front: 'Binary search mid calc', back: 'mid = (left + right) // 2' },
    { front: 'BFS queue init', back: 'queue = deque([start])' },
    { front: 'BFS visited init', back: 'visited = set([start])' },
    { front: 'DFS base case', back: 'if node in visited: return' },
    { front: 'Sliding window left pointer', back: 'left = 0; for right in range(len(arr)):' },
    { front: '2D array init (m rows, n cols)', back: '[[0] * n for _ in range(m)]' },
  ],
  'useful-tricks': [
    { front: 'Positive infinity', back: "float('inf')" },
    { front: 'Negative infinity', back: "float('-inf')" },
    { front: 'Integer division', back: '7 // 2 → 3' },
    { front: 'Swap two variables', back: 'a, b = b, a' },
    { front: 'Min of multiple values', back: 'min(a, b, c)' },
    { front: 'Max of list', back: 'max(arr)' },
    { front: 'Check all true', back: 'all([True, True, False]) → False' },
    { front: 'Check any true', back: 'any([False, False, True]) → True' },
    { front: 'List comprehension', back: '[x*2 for x in arr]' },
    { front: 'Filtered comprehension', back: '[x for x in arr if x > 0]' },
    { front: 'Is letter only', back: 's.isalpha()' },
    { front: 'Is digit only', back: 's.isdigit()' },
    { front: 'Is alphanumeric', back: 's.isalnum()' },
  ],
  'time-complexity': [
    { front: 'List access by index', back: 'O(1)' },
    { front: 'List search (in)', back: 'O(n)' },
    { front: 'List append', back: 'O(1) amortized' },
    { front: 'List insert at index', back: 'O(n)' },
    { front: 'Dict/Set lookup', back: 'O(1)' },
    { front: 'Dict/Set insert', back: 'O(1)' },
    { front: 'Heap push', back: 'O(log n)' },
    { front: 'Heap pop', back: 'O(log n)' },
    { front: 'Heap peek min', back: 'O(1)' },
    { front: 'Heapify', back: 'O(n)' },
    { front: 'Sorting', back: 'O(n log n)' },
  ],
};

export const createInitialFlashcards = (): Flashcard[] => {
  const cards: Flashcard[] = [];

  Object.entries(flashcardTemplates).forEach(([deckId, templates]) => {
    templates.forEach((template, index) => {
      cards.push({
        id: `${deckId}-${index}`,
        deckId: deckId as DeckId,
        front: template.front,
        back: template.back,
        lastReviewed: null,
        nextReview: null,
        reviewCount: 0,
      });
    });
  });

  return cards;
};

export const getCardsByDeck = (cards: Flashcard[], deckId: DeckId): Flashcard[] => {
  return cards.filter((card) => card.deckId === deckId);
};

export const getDueCards = (cards: Flashcard[]): Flashcard[] => {
  const today = new Date().toISOString().split('T')[0];
  return cards.filter((card) => {
    if (!card.nextReview) return true; // Never reviewed
    return card.nextReview <= today;
  });
};

export const getMasteredCards = (cards: Flashcard[], deckId?: DeckId): Flashcard[] => {
  const filtered = deckId ? cards.filter((c) => c.deckId === deckId) : cards;
  return filtered.filter((card) => card.reviewCount >= 5);
};

export const getTotalCardCount = (): number => {
  return Object.values(flashcardTemplates).reduce((sum, deck) => sum + deck.length, 0);
};

export const getDeckCardCount = (deckId: DeckId): number => {
  return flashcardTemplates[deckId]?.length || 0;
};
