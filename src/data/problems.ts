import { Problem } from '../types';
import { problemSolutions } from './solutions';

export const initialProblems: Omit<Problem, 'status' | 'notes' | 'lastAttempted' | 'nextReview' | 'reviewCount'>[] = [
  // Arrays & Hashing
  { id: 'contains-duplicate', name: 'Contains Duplicate', difficulty: 'easy', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/' },
  { id: 'valid-anagram', name: 'Valid Anagram', difficulty: 'easy', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/' },
  { id: 'two-sum', name: 'Two Sum', difficulty: 'easy', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/two-sum/' },
  { id: 'group-anagrams', name: 'Group Anagrams', difficulty: 'medium', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/' },
  { id: 'top-k-frequent-elements', name: 'Top K Frequent Elements', difficulty: 'medium', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/' },
  { id: 'encode-decode-strings', name: 'Encode and Decode Strings', difficulty: 'medium', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/' },
  { id: 'product-of-array-except-self', name: 'Product of Array Except Self', difficulty: 'medium', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { id: 'valid-sudoku', name: 'Valid Sudoku', difficulty: 'medium', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/' },
  { id: 'longest-consecutive-sequence', name: 'Longest Consecutive Sequence', difficulty: 'medium', category: 'arrays-hashing', leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/' },

  // Two Pointers
  { id: 'valid-palindrome', name: 'Valid Palindrome', difficulty: 'easy', category: 'two-pointers', leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/' },
  { id: 'two-sum-ii', name: 'Two Sum II', difficulty: 'medium', category: 'two-pointers', leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
  { id: '3sum', name: '3Sum', difficulty: 'medium', category: 'two-pointers', leetcodeUrl: 'https://leetcode.com/problems/3sum/' },
  { id: 'container-with-most-water', name: 'Container With Most Water', difficulty: 'medium', category: 'two-pointers', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/' },
  { id: 'trapping-rain-water', name: 'Trapping Rain Water', difficulty: 'hard', category: 'two-pointers', leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/' },

  // Sliding Window
  { id: 'best-time-to-buy-sell-stock', name: 'Best Time to Buy and Sell Stock', difficulty: 'easy', category: 'sliding-window', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { id: 'longest-substring-without-repeating', name: 'Longest Substring Without Repeating Characters', difficulty: 'medium', category: 'sliding-window', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { id: 'longest-repeating-character-replacement', name: 'Longest Repeating Character Replacement', difficulty: 'medium', category: 'sliding-window', leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
  { id: 'permutation-in-string', name: 'Permutation in String', difficulty: 'medium', category: 'sliding-window', leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/' },
  { id: 'minimum-window-substring', name: 'Minimum Window Substring', difficulty: 'hard', category: 'sliding-window', leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/' },
  { id: 'sliding-window-maximum', name: 'Sliding Window Maximum', difficulty: 'hard', category: 'sliding-window', leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/' },

  // Stack
  { id: 'valid-parentheses', name: 'Valid Parentheses', difficulty: 'easy', category: 'stack', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/' },
  { id: 'min-stack', name: 'Min Stack', difficulty: 'medium', category: 'stack', leetcodeUrl: 'https://leetcode.com/problems/min-stack/' },
  { id: 'evaluate-reverse-polish-notation', name: 'Evaluate Reverse Polish Notation', difficulty: 'medium', category: 'stack', leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
  { id: 'generate-parentheses', name: 'Generate Parentheses', difficulty: 'medium', category: 'stack', leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/' },
  { id: 'daily-temperatures', name: 'Daily Temperatures', difficulty: 'medium', category: 'stack', leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/' },
  { id: 'car-fleet', name: 'Car Fleet', difficulty: 'medium', category: 'stack', leetcodeUrl: 'https://leetcode.com/problems/car-fleet/' },
  { id: 'largest-rectangle-in-histogram', name: 'Largest Rectangle in Histogram', difficulty: 'hard', category: 'stack', leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },

  // Binary Search
  { id: 'binary-search', name: 'Binary Search', difficulty: 'easy', category: 'binary-search', leetcodeUrl: 'https://leetcode.com/problems/binary-search/' },
  { id: 'search-a-2d-matrix', name: 'Search a 2D Matrix', difficulty: 'medium', category: 'binary-search', leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/' },
  { id: 'koko-eating-bananas', name: 'Koko Eating Bananas', difficulty: 'medium', category: 'binary-search', leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/' },
  { id: 'find-minimum-in-rotated-sorted-array', name: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium', category: 'binary-search', leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { id: 'search-in-rotated-sorted-array', name: 'Search in Rotated Sorted Array', difficulty: 'medium', category: 'binary-search', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
  { id: 'time-based-key-value-store', name: 'Time Based Key-Value Store', difficulty: 'medium', category: 'binary-search', leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/' },
  { id: 'median-of-two-sorted-arrays', name: 'Median of Two Sorted Arrays', difficulty: 'hard', category: 'binary-search', leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },

  // Linked List
  { id: 'reverse-linked-list', name: 'Reverse Linked List', difficulty: 'easy', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/' },
  { id: 'merge-two-sorted-lists', name: 'Merge Two Sorted Lists', difficulty: 'easy', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { id: 'linked-list-cycle', name: 'Linked List Cycle', difficulty: 'easy', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/' },
  { id: 'reorder-list', name: 'Reorder List', difficulty: 'medium', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/reorder-list/' },
  { id: 'remove-nth-node-from-end', name: 'Remove Nth Node From End of List', difficulty: 'medium', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
  { id: 'copy-list-with-random-pointer', name: 'Copy List with Random Pointer', difficulty: 'medium', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
  { id: 'add-two-numbers', name: 'Add Two Numbers', difficulty: 'medium', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/' },
  { id: 'find-the-duplicate-number', name: 'Find the Duplicate Number', difficulty: 'medium', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/' },
  { id: 'lru-cache', name: 'LRU Cache', difficulty: 'medium', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/lru-cache/' },
  { id: 'merge-k-sorted-lists', name: 'Merge K Sorted Lists', difficulty: 'hard', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
  { id: 'reverse-nodes-in-k-group', name: 'Reverse Nodes in k-Group', difficulty: 'hard', category: 'linked-list', leetcodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },

  // Trees
  { id: 'invert-binary-tree', name: 'Invert Binary Tree', difficulty: 'easy', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/' },
  { id: 'maximum-depth-of-binary-tree', name: 'Maximum Depth of Binary Tree', difficulty: 'easy', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { id: 'diameter-of-binary-tree', name: 'Diameter of Binary Tree', difficulty: 'easy', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
  { id: 'balanced-binary-tree', name: 'Balanced Binary Tree', difficulty: 'easy', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/' },
  { id: 'same-tree', name: 'Same Tree', difficulty: 'easy', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/same-tree/' },
  { id: 'subtree-of-another-tree', name: 'Subtree of Another Tree', difficulty: 'easy', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/' },
  { id: 'lowest-common-ancestor-bst', name: 'Lowest Common Ancestor of a BST', difficulty: 'medium', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
  { id: 'binary-tree-level-order-traversal', name: 'Binary Tree Level Order Traversal', difficulty: 'medium', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { id: 'binary-tree-right-side-view', name: 'Binary Tree Right Side View', difficulty: 'medium', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
  { id: 'count-good-nodes-in-binary-tree', name: 'Count Good Nodes in Binary Tree', difficulty: 'medium', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/' },
  { id: 'validate-binary-search-tree', name: 'Validate Binary Search Tree', difficulty: 'medium', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { id: 'kth-smallest-element-in-bst', name: 'Kth Smallest Element in a BST', difficulty: 'medium', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
  { id: 'construct-binary-tree-preorder-inorder', name: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'medium', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
  { id: 'binary-tree-maximum-path-sum', name: 'Binary Tree Maximum Path Sum', difficulty: 'hard', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
  { id: 'serialize-deserialize-binary-tree', name: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', category: 'trees', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },

  // Tries
  { id: 'implement-trie', name: 'Implement Trie (Prefix Tree)', difficulty: 'medium', category: 'tries', leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
  { id: 'design-add-search-words', name: 'Design Add and Search Words Data Structure', difficulty: 'medium', category: 'tries', leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
  { id: 'word-search-ii', name: 'Word Search II', difficulty: 'hard', category: 'tries', leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/' },

  // Heap / Priority Queue
  { id: 'kth-largest-element-in-stream', name: 'Kth Largest Element in a Stream', difficulty: 'easy', category: 'heap-priority-queue', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
  { id: 'last-stone-weight', name: 'Last Stone Weight', difficulty: 'easy', category: 'heap-priority-queue', leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/' },
  { id: 'k-closest-points-to-origin', name: 'K Closest Points to Origin', difficulty: 'medium', category: 'heap-priority-queue', leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
  { id: 'kth-largest-element-in-array', name: 'Kth Largest Element in an Array', difficulty: 'medium', category: 'heap-priority-queue', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  { id: 'task-scheduler', name: 'Task Scheduler', difficulty: 'medium', category: 'heap-priority-queue', leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/' },
  { id: 'design-twitter', name: 'Design Twitter', difficulty: 'medium', category: 'heap-priority-queue', leetcodeUrl: 'https://leetcode.com/problems/design-twitter/' },
  { id: 'find-median-from-data-stream', name: 'Find Median from Data Stream', difficulty: 'hard', category: 'heap-priority-queue', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/' },

  // Backtracking
  { id: 'subsets', name: 'Subsets', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/subsets/' },
  { id: 'combination-sum', name: 'Combination Sum', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/combination-sum/' },
  { id: 'permutations', name: 'Permutations', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/permutations/' },
  { id: 'subsets-ii', name: 'Subsets II', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/' },
  { id: 'combination-sum-ii', name: 'Combination Sum II', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/' },
  { id: 'word-search', name: 'Word Search', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/word-search/' },
  { id: 'palindrome-partitioning', name: 'Palindrome Partitioning', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/' },
  { id: 'letter-combinations-of-phone-number', name: 'Letter Combinations of a Phone Number', difficulty: 'medium', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
  { id: 'n-queens', name: 'N-Queens', difficulty: 'hard', category: 'backtracking', leetcodeUrl: 'https://leetcode.com/problems/n-queens/' },

  // Graphs
  { id: 'number-of-islands', name: 'Number of Islands', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/' },
  { id: 'clone-graph', name: 'Clone Graph', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/clone-graph/' },
  { id: 'max-area-of-island', name: 'Max Area of Island', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/max-area-of-island/' },
  { id: 'pacific-atlantic-water-flow', name: 'Pacific Atlantic Water Flow', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
  { id: 'surrounded-regions', name: 'Surrounded Regions', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/' },
  { id: 'rotting-oranges', name: 'Rotting Oranges', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/' },
  { id: 'walls-and-gates', name: 'Walls and Gates', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/walls-and-gates/' },
  { id: 'course-schedule', name: 'Course Schedule', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/course-schedule/' },
  { id: 'course-schedule-ii', name: 'Course Schedule II', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/' },
  { id: 'redundant-connection', name: 'Redundant Connection', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/' },
  { id: 'number-of-connected-components', name: 'Number of Connected Components in an Undirected Graph', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
  { id: 'graph-valid-tree', name: 'Graph Valid Tree', difficulty: 'medium', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/' },
  { id: 'word-ladder', name: 'Word Ladder', difficulty: 'hard', category: 'graphs', leetcodeUrl: 'https://leetcode.com/problems/word-ladder/' },

  // Advanced Graphs
  { id: 'reconstruct-itinerary', name: 'Reconstruct Itinerary', difficulty: 'hard', category: 'advanced-graphs', leetcodeUrl: 'https://leetcode.com/problems/reconstruct-itinerary/' },
  { id: 'min-cost-to-connect-all-points', name: 'Min Cost to Connect All Points', difficulty: 'medium', category: 'advanced-graphs', leetcodeUrl: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
  { id: 'network-delay-time', name: 'Network Delay Time', difficulty: 'medium', category: 'advanced-graphs', leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/' },
  { id: 'swim-in-rising-water', name: 'Swim in Rising Water', difficulty: 'hard', category: 'advanced-graphs', leetcodeUrl: 'https://leetcode.com/problems/swim-in-rising-water/' },
  { id: 'alien-dictionary', name: 'Alien Dictionary', difficulty: 'hard', category: 'advanced-graphs', leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/' },
  { id: 'cheapest-flights-within-k-stops', name: 'Cheapest Flights Within K Stops', difficulty: 'medium', category: 'advanced-graphs', leetcodeUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },

  // 1D Dynamic Programming
  { id: 'climbing-stairs', name: 'Climbing Stairs', difficulty: 'easy', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/' },
  { id: 'min-cost-climbing-stairs', name: 'Min Cost Climbing Stairs', difficulty: 'easy', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
  { id: 'house-robber', name: 'House Robber', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/house-robber/' },
  { id: 'house-robber-ii', name: 'House Robber II', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/' },
  { id: 'longest-palindromic-substring', name: 'Longest Palindromic Substring', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/' },
  { id: 'palindromic-substrings', name: 'Palindromic Substrings', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/' },
  { id: 'decode-ways', name: 'Decode Ways', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/decode-ways/' },
  { id: 'coin-change', name: 'Coin Change', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/coin-change/' },
  { id: 'maximum-product-subarray', name: 'Maximum Product Subarray', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/' },
  { id: 'word-break', name: 'Word Break', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/word-break/' },
  { id: 'longest-increasing-subsequence', name: 'Longest Increasing Subsequence', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
  { id: 'partition-equal-subset-sum', name: 'Partition Equal Subset Sum', difficulty: 'medium', category: '1d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/' },

  // 2D Dynamic Programming
  { id: 'unique-paths', name: 'Unique Paths', difficulty: 'medium', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/unique-paths/' },
  { id: 'longest-common-subsequence', name: 'Longest Common Subsequence', difficulty: 'medium', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/' },
  { id: 'best-time-buy-sell-stock-cooldown', name: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'medium', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/' },
  { id: 'coin-change-ii', name: 'Coin Change II', difficulty: 'medium', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/coin-change-ii/' },
  { id: 'target-sum', name: 'Target Sum', difficulty: 'medium', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/target-sum/' },
  { id: 'interleaving-string', name: 'Interleaving String', difficulty: 'medium', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/interleaving-string/' },
  { id: 'longest-increasing-path-in-matrix', name: 'Longest Increasing Path in a Matrix', difficulty: 'hard', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/' },
  { id: 'distinct-subsequences', name: 'Distinct Subsequences', difficulty: 'hard', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/distinct-subsequences/' },
  { id: 'edit-distance', name: 'Edit Distance', difficulty: 'medium', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/edit-distance/' },
  { id: 'burst-balloons', name: 'Burst Balloons', difficulty: 'hard', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/burst-balloons/' },
  { id: 'regular-expression-matching', name: 'Regular Expression Matching', difficulty: 'hard', category: '2d-dynamic-programming', leetcodeUrl: 'https://leetcode.com/problems/regular-expression-matching/' },

  // Greedy
  { id: 'maximum-subarray', name: 'Maximum Subarray', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/' },
  { id: 'jump-game', name: 'Jump Game', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/jump-game/' },
  { id: 'jump-game-ii', name: 'Jump Game II', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/' },
  { id: 'gas-station', name: 'Gas Station', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/gas-station/' },
  { id: 'hand-of-straights', name: 'Hand of Straights', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/hand-of-straights/' },
  { id: 'merge-triplets-to-form-target', name: 'Merge Triplets to Form Target Triplet', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/' },
  { id: 'partition-labels', name: 'Partition Labels', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/partition-labels/' },
  { id: 'valid-parenthesis-string', name: 'Valid Parenthesis String', difficulty: 'medium', category: 'greedy', leetcodeUrl: 'https://leetcode.com/problems/valid-parenthesis-string/' },

  // Intervals
  { id: 'insert-interval', name: 'Insert Interval', difficulty: 'medium', category: 'intervals', leetcodeUrl: 'https://leetcode.com/problems/insert-interval/' },
  { id: 'merge-intervals', name: 'Merge Intervals', difficulty: 'medium', category: 'intervals', leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/' },
  { id: 'non-overlapping-intervals', name: 'Non-overlapping Intervals', difficulty: 'medium', category: 'intervals', leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/' },
  { id: 'meeting-rooms', name: 'Meeting Rooms', difficulty: 'easy', category: 'intervals', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/' },
  { id: 'meeting-rooms-ii', name: 'Meeting Rooms II', difficulty: 'medium', category: 'intervals', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/' },
  { id: 'minimum-interval-to-include-each-query', name: 'Minimum Interval to Include Each Query', difficulty: 'hard', category: 'intervals', leetcodeUrl: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/' },

  // Math & Geometry
  { id: 'rotate-image', name: 'Rotate Image', difficulty: 'medium', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/rotate-image/' },
  { id: 'spiral-matrix', name: 'Spiral Matrix', difficulty: 'medium', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/' },
  { id: 'set-matrix-zeroes', name: 'Set Matrix Zeroes', difficulty: 'medium', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/' },
  { id: 'happy-number', name: 'Happy Number', difficulty: 'easy', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/happy-number/' },
  { id: 'plus-one', name: 'Plus One', difficulty: 'easy', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/plus-one/' },
  { id: 'pow-x-n', name: 'Pow(x, n)', difficulty: 'medium', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/powx-n/' },
  { id: 'multiply-strings', name: 'Multiply Strings', difficulty: 'medium', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/multiply-strings/' },
  { id: 'detect-squares', name: 'Detect Squares', difficulty: 'medium', category: 'math-geometry', leetcodeUrl: 'https://leetcode.com/problems/detect-squares/' },

  // Bit Manipulation
  { id: 'single-number', name: 'Single Number', difficulty: 'easy', category: 'bit-manipulation', leetcodeUrl: 'https://leetcode.com/problems/single-number/' },
  { id: 'number-of-1-bits', name: 'Number of 1 Bits', difficulty: 'easy', category: 'bit-manipulation', leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/' },
  { id: 'counting-bits', name: 'Counting Bits', difficulty: 'easy', category: 'bit-manipulation', leetcodeUrl: 'https://leetcode.com/problems/counting-bits/' },
  { id: 'reverse-bits', name: 'Reverse Bits', difficulty: 'easy', category: 'bit-manipulation', leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/' },
  { id: 'missing-number', name: 'Missing Number', difficulty: 'easy', category: 'bit-manipulation', leetcodeUrl: 'https://leetcode.com/problems/missing-number/' },
  { id: 'sum-of-two-integers', name: 'Sum of Two Integers', difficulty: 'medium', category: 'bit-manipulation', leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/' },
  { id: 'reverse-integer', name: 'Reverse Integer', difficulty: 'medium', category: 'bit-manipulation', leetcodeUrl: 'https://leetcode.com/problems/reverse-integer/' },
];

export const createInitialProblems = (): Problem[] => {
  return initialProblems.map((problem) => {
    const solution = problemSolutions[problem.id];
    return {
      ...problem,
      status: 'not_started' as const,
      notes: '',
      lastAttempted: null,
      nextReview: null,
      reviewCount: 0,
      // Add solution data if available
      ...(solution && {
        approach: solution.approach,
        pattern: solution.pattern,
        timeComplexity: solution.timeComplexity,
        spaceComplexity: solution.spaceComplexity,
        pythonSolution: solution.pythonSolution,
        neetcodeUrl: solution.neetcodeUrl,
      }),
    };
  });
};
