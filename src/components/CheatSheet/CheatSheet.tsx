import React, { useState, useMemo } from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';

const cheatSheetData = {
  'Basic Data Structures': [
    {
      title: 'Lists',
      code: `# Lists
arr = [1, 2, 3]
arr.append(4)          # Add to end
arr.pop()              # Remove from end
arr.pop(0)             # Remove from front (O(n))
arr[-1]                # Last element
arr[::-1]              # Reverse
len(arr)`,
    },
    {
      title: 'Strings',
      code: `# Strings
s = "hello"
s[0]                   # First char
s[-1]                  # Last char
s[::-1]                # Reverse
"".join(["a","b"])     # Join list to string
list(s)                # String to list
ord('a')               # Char to ASCII (97)
chr(97)                # ASCII to char ('a')`,
    },
    {
      title: 'Dictionary (HashMap)',
      code: `# Dictionary (HashMap)
d = {}
d = {"a": 1, "b": 2}
d["c"] = 3             # Add/update
d.get("x", 0)          # Get with default
"a" in d               # Check key exists
d.keys()
d.values()
d.items()              # Key-value pairs
del d["a"]             # Remove key`,
    },
    {
      title: 'Set',
      code: `# Set
s = set()
s.add(1)
s.remove(1)            # Errors if missing
s.discard(1)           # No error if missing
1 in s                 # O(1) lookup`,
    },
    {
      title: 'Tuple (immutable)',
      code: `# Tuple (immutable)
t = (1, 2)
a, b = t               # Unpacking`,
    },
  ],
  'Common Imports': [
    {
      title: 'Collections & Typing',
      code: `from collections import defaultdict, Counter, deque
from heapq import heappush, heappop, heapify
from typing import List, Optional
import math`,
    },
    {
      title: 'Counter',
      code: `# Counter
Counter("aabbc")       # {'a': 2, 'b': 2, 'c': 1}
counter.most_common(2) # Top 2 frequent`,
    },
    {
      title: 'defaultdict',
      code: `# defaultdict
d = defaultdict(list)  # Default value is []
d = defaultdict(int)   # Default value is 0`,
    },
    {
      title: 'deque (double-ended queue)',
      code: `# deque (double-ended queue)
q = deque()
q.append(1)            # Add right
q.appendleft(1)        # Add left
q.pop()                # Remove right
q.popleft()            # Remove left - O(1)!`,
    },
  ],
  'Heap (Min Heap)': [
    {
      title: 'Heap Operations',
      code: `import heapq

heap = []
heappush(heap, 3)
heappush(heap, 1)
heappop(heap)          # Returns 1 (smallest)

# Max heap trick: negate values
heappush(heap, -val)
-heappop(heap)

# Heapify existing list
arr = [3, 1, 2]
heapify(arr)           # In-place, O(n)`,
    },
  ],
  'Loops & Ranges': [
    {
      title: 'Range and Enumeration',
      code: `for i in range(5):           # 0,1,2,3,4
for i in range(2, 5):        # 2,3,4
for i in range(5, 0, -1):    # 5,4,3,2,1
for i, val in enumerate(arr): # Index + value
for a, b in zip(arr1, arr2): # Parallel iteration`,
    },
  ],
  'Sorting': [
    {
      title: 'Sort Methods',
      code: `arr.sort()                    # In-place
arr.sort(reverse=True)        # Descending
sorted(arr)                   # Returns new list
arr.sort(key=lambda x: x[1])  # Sort by second element`,
    },
  ],
  'Common Patterns': [
    {
      title: 'Two Pointers',
      code: `# Two pointers
left, right = 0, len(arr) - 1
while left < right:
    # ...
    left += 1
    right -= 1`,
    },
    {
      title: 'Sliding Window',
      code: `# Sliding window
left = 0
for right in range(len(arr)):
    # Add arr[right] to window
    while window_invalid:
        # Remove arr[left] from window
        left += 1`,
    },
    {
      title: 'BFS',
      code: `# BFS
from collections import deque
queue = deque([start])
visited = set([start])
while queue:
    node = queue.popleft()
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append(neighbor)`,
    },
    {
      title: 'DFS (recursive)',
      code: `# DFS (recursive)
def dfs(node, visited):
    if node in visited:
        return
    visited.add(node)
    for neighbor in graph[node]:
        dfs(neighbor, visited)`,
    },
    {
      title: 'Binary Search',
      code: `# Binary search
left, right = 0, len(arr) - 1
while left <= right:
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1`,
    },
  ],
  'Useful Tricks': [
    {
      title: 'Common Operations',
      code: `# Infinity
float('inf')
float('-inf')

# Integer division
7 // 2                 # 3 (rounds down)

# Swap
a, b = b, a

# Min/Max of multiple
min(a, b, c)
max(arr)

# Check if all/any
all([True, True])      # True
any([False, True])     # True`,
    },
    {
      title: 'List Comprehension',
      code: `# List comprehension
[x*2 for x in arr]
[x for x in arr if x > 0]
[[0]*cols for _ in range(rows)]  # 2D array`,
    },
    {
      title: 'String Checks',
      code: `# String checks
s.isalpha()            # Letters only
s.isdigit()            # Digits only
s.isalnum()            # Letters or digits
s.lower()
s.upper()`,
    },
  ],
  'Time Complexity': [
    {
      title: 'Quick Reference Table',
      code: `# Time Complexity Quick Reference
# | Operation | List | Dict/Set | Heap |
# |-----------|------|----------|------|
# | Access    | O(1) | O(1)     | -    |
# | Search    | O(n) | O(1)     | O(n) |
# | Insert    | O(n)*| O(1)     | O(log n) |
# | Delete    | O(n) | O(1)     | O(log n) |
# | Min/Max   | O(n) | O(n)     | O(1)/O(n) |
# *List append is O(1) amortized`,
    },
  ],
};

export const CheatSheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = useMemo(() => {
    if (!searchQuery) return cheatSheetData;

    const query = searchQuery.toLowerCase();
    const filtered: Partial<typeof cheatSheetData> = {};

    Object.entries(cheatSheetData).forEach(([section, items]) => {
      const matchingItems = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.code.toLowerCase().includes(query) ||
          section.toLowerCase().includes(query)
      );
      if (matchingItems.length > 0) {
        filtered[section as keyof typeof cheatSheetData] = matchingItems;
      }
    });

    return filtered as typeof cheatSheetData;
  }, [searchQuery]);

  const sectionCount = Object.keys(filteredSections).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-0">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Python Cheat Sheet</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Quick reference for LeetCode problems</p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-secondary)] touch-target"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[var(--color-bg-tertiary)] rounded-full"
            >
              <svg className="w-4 h-4 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-4 pb-24 md:pb-4">
        {sectionCount === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-[var(--color-text-secondary)] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[var(--color-text-secondary)]">No snippets found</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Try a different search term</p>
          </div>
        ) : (
          Object.entries(filteredSections).map(([section, items]) => (
            <Section key={section} title={section} defaultExpanded={!!searchQuery || section === 'Common Patterns'}>
              {items.map((item, index) => (
                <div key={index}>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">{item.title}</p>
                  <CodeBlock code={item.code} />
                </div>
              ))}
            </Section>
          ))
        )}
      </div>
    </div>
  );
};
