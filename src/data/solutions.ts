// Solution data for swipe cards
// This extends the base problem data with approach, pattern, complexity, and Python solutions

export const problemSolutions: Record<string, {
  approach: string;
  pattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  pythonSolution: string;
  neetcodeUrl: string;
}> = {
  'two-sum': {
    approach: 'Use a hashmap to store numbers and their indices. For each number, check if target - num exists in the map.',
    pattern: 'HashMap',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pythonSolution: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i`,
    neetcodeUrl: 'https://neetcode.io/problems/two-integer-sum'
  },

  'contains-duplicate': {
    approach: 'Use a set to track seen numbers. If we encounter a number already in the set, return true.',
    pattern: 'HashSet',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pythonSolution: `def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
    neetcodeUrl: 'https://neetcode.io/problems/duplicate-integer'
  },

  'valid-anagram': {
    approach: 'Compare character frequencies using Counter or manual count. Both strings must have identical character counts.',
    pattern: 'HashMap',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) - limited to 26 letters',
    pythonSolution: `from collections import Counter

def isAnagram(s, t):
    return Counter(s) == Counter(t)
    
# Or manual:
# if len(s) != len(t): return False
# count = {}
# for c in s:
#     count[c] = count.get(c, 0) + 1
# for c in t:
#     count[c] = count.get(c, 0) - 1
#     if count[c] < 0: return False
# return True`,
    neetcodeUrl: 'https://neetcode.io/problems/is-anagram'
  },

  'group-anagrams': {
    approach: 'Use sorted string as key in hashmap to group anagrams together. All anagrams have the same sorted form.',
    pattern: 'HashMap',
    timeComplexity: 'O(n * k log k) where k is max string length',
    spaceComplexity: 'O(n * k)',
    pythonSolution: `from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
    neetcodeUrl: 'https://neetcode.io/problems/anagram-groups'
  },

  'top-k-frequent-elements': {
    approach: 'Count frequencies with Counter, then use bucket sort or heap. Bucket sort at index = frequency is O(n).',
    pattern: 'HashMap + Bucket Sort',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pythonSolution: `from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    
    for num, freq in count.items():
        buckets[freq].append(num)
    
    result = []
    for i in range(len(buckets) - 1, 0, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            return result[:k]`,
    neetcodeUrl: 'https://neetcode.io/problems/top-k-elements-in-list'
  },

  'valid-palindrome': {
    approach: 'Two pointers from start and end. Skip non-alphanumeric chars, compare lowercase characters.',
    pattern: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def isPalindrome(s):
    l, r = 0, len(s) - 1
    
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True`,
    neetcodeUrl: 'https://neetcode.io/problems/is-palindrome'
  },

  '3sum': {
    approach: 'Sort array, fix one number, use two pointers for remaining. Skip duplicates to avoid repeated triplets.',
    pattern: 'Two Pointers',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) excluding output',
    pythonSolution: `def threeSum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total < 0:
                l += 1
            elif total > 0:
                r -= 1
            else:
                result.append([nums[i], nums[l], nums[r]])
                l += 1
                while l < r and nums[l] == nums[l-1]:
                    l += 1
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/three-integer-sum'
  },

  'best-time-to-buy-sell-stock': {
    approach: 'Track minimum price seen so far, calculate max profit at each step.',
    pattern: 'Sliding Window / Greedy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        profit = price - min_price
        max_profit = max(max_profit, profit)
    
    return max_profit`,
    neetcodeUrl: 'https://neetcode.io/problems/buy-and-sell-crypto'
  },

  'longest-substring-without-repeating': {
    approach: 'Sliding window with hashmap. Expand right, shrink left when duplicate found.',
    pattern: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m)) where m is charset size',
    pythonSolution: `def lengthOfLongestSubstring(s):
    char_set = set()
    l = 0
    max_len = 0
    
    for r in range(len(s)):
        while s[r] in char_set:
            char_set.remove(s[l])
            l += 1
        char_set.add(s[r])
        max_len = max(max_len, r - l + 1)
    
    return max_len`,
    neetcodeUrl: 'https://neetcode.io/problems/longest-substring-without-duplicates'
  },

  'valid-parentheses': {
    approach: 'Use stack. Push opening brackets, pop and match for closing brackets.',
    pattern: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pythonSolution: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    
    return len(stack) == 0`,
    neetcodeUrl: 'https://neetcode.io/problems/validate-parentheses'
  },

  'reverse-linked-list': {
    approach: 'Iterative: maintain prev, curr, next pointers. Reverse links one by one.',
    pattern: 'Linked List',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def reverseList(head):
    prev = None
    curr = head
    
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    
    return prev`,
    neetcodeUrl: 'https://neetcode.io/problems/reverse-a-linked-list'
  },

  'merge-two-sorted-lists': {
    approach: 'Use dummy node. Compare values and attach smaller node. Move pointers accordingly.',
    pattern: 'Linked List',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def mergeTwoLists(l1, l2):
    dummy = ListNode()
    curr = dummy
    
    while l1 and l2:
        if l1.val < l2.val:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next
    
    curr.next = l1 or l2
    return dummy.next`,
    neetcodeUrl: 'https://neetcode.io/problems/merge-two-sorted-linked-lists'
  },

  'linked-list-cycle': {
    approach: 'Floyd\'s cycle detection: fast and slow pointers. If they meet, there\'s a cycle.',
    pattern: 'Fast & Slow Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def hasCycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False`,
    neetcodeUrl: 'https://neetcode.io/problems/linked-list-cycle-detection'
  },

  'invert-binary-tree': {
    approach: 'Recursively swap left and right children for each node.',
    pattern: 'Tree DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) recursion stack',
    pythonSolution: `def invertTree(root):
    if not root:
        return None
    
    # Swap children
    root.left, root.right = root.right, root.left
    
    # Recursively invert subtrees
    invertTree(root.left)
    invertTree(root.right)
    
    return root`,
    neetcodeUrl: 'https://neetcode.io/problems/invert-a-binary-tree'
  },

  'maximum-depth-of-binary-tree': {
    approach: 'Recursively find max depth of left and right subtrees, add 1 for current level.',
    pattern: 'Tree DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) recursion stack',
    pythonSolution: `def maxDepth(root):
    if not root:
        return 0
    
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)
    
    return 1 + max(left_depth, right_depth)`,
    neetcodeUrl: 'https://neetcode.io/problems/depth-of-binary-tree'
  },

  'same-tree': {
    approach: 'Recursively check if current nodes match and left/right subtrees are same.',
    pattern: 'Tree DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pythonSolution: `def isSameTree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    
    return (p.val == q.val and
            isSameTree(p.left, q.left) and
            isSameTree(p.right, q.right))`,
    neetcodeUrl: 'https://neetcode.io/problems/same-binary-tree'
  },

  'binary-tree-level-order-traversal': {
    approach: 'BFS with queue. Process nodes level by level.',
    pattern: 'Tree BFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pythonSolution: `from collections import deque

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/level-order-traversal-of-binary-tree'
  },

  'validate-binary-search-tree': {
    approach: 'DFS with valid range [min, max]. Left child must be < root, right child must be > root.',
    pattern: 'Tree DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pythonSolution: `def isValidBST(root):
    def valid(node, left, right):
        if not node:
            return True
        if not (left < node.val < right):
            return False
        
        return (valid(node.left, left, node.val) and
                valid(node.right, node.val, right))
    
    return valid(root, float('-inf'), float('inf'))`,
    neetcodeUrl: 'https://neetcode.io/problems/valid-binary-search-tree'
  },

  'binary-search': {
    approach: 'Classic binary search. Compare middle element with target, adjust search range.',
    pattern: 'Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def search(nums, target):
    l, r = 0, len(nums) - 1
    
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    
    return -1`,
    neetcodeUrl: 'https://neetcode.io/problems/binary-search'
  },

  'climbing-stairs': {
    approach: 'DP: ways[i] = ways[i-1] + ways[i-2]. Like Fibonacci - can use constant space.',
    pattern: '1D DP',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def climbStairs(n):
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    
    return prev1`,
    neetcodeUrl: 'https://neetcode.io/problems/climbing-stairs'
  },

  'product-of-array-except-self': {
    approach: 'Two pass: calculate prefix products left-to-right, then multiply with postfix right-to-left.',
    pattern: 'Array Manipulation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) excluding output array',
    pythonSolution: `def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n
    
    # Prefix pass
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    
    # Postfix pass
    postfix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= postfix
        postfix *= nums[i]
    
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/products-of-array-discluding-self'
  },

  'maximum-subarray': {
    approach: 'Kadane\'s algorithm: track current sum, reset to 0 if negative, update max.',
    pattern: 'DP / Greedy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def maxSubArray(nums):
    max_sum = nums[0]
    curr_sum = 0
    
    for num in nums:
        curr_sum = max(curr_sum + num, num)
        max_sum = max(max_sum, curr_sum)
    
    return max_sum`,
    neetcodeUrl: 'https://neetcode.io/problems/maximum-subarray'
  },

  'container-with-most-water': {
    approach: 'Two pointers from both ends. Move pointer with smaller height inward.',
    pattern: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def maxArea(height):
    l, r = 0, len(height) - 1
    max_area = 0
    
    while l < r:
        width = r - l
        area = min(height[l], height[r]) * width
        max_area = max(max_area, area)
        
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    
    return max_area`,
    neetcodeUrl: 'https://neetcode.io/problems/max-water-container'
  },

  'min-stack': {
    approach: 'Use two stacks: one for values, one for minimums at each level.',
    pattern: 'Stack',
    timeComplexity: 'O(1) all operations',
    spaceComplexity: 'O(n)',
    pythonSolution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)
    
    def pop(self):
        self.stack.pop()
        self.min_stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]`,
    neetcodeUrl: 'https://neetcode.io/problems/minimum-stack'
  },

  'search-in-rotated-sorted-array': {
    approach: 'Modified binary search. Determine which half is sorted, then check if target is in that range.',
    pattern: 'Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def search(nums, target):
    l, r = 0, len(nums) - 1
    
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid
        
        # Left half sorted
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]:
                r = mid - 1
            else:
                l = mid + 1
        # Right half sorted
        else:
            if nums[mid] < target <= nums[r]:
                l = mid + 1
            else:
                r = mid - 1
    
    return -1`,
    neetcodeUrl: 'https://neetcode.io/problems/find-target-in-rotated-sorted-array'
  },

  'reorder-list': {
    approach: 'Find middle, reverse second half, merge two halves alternately.',
    pattern: 'Linked List',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def reorderList(head):
    # Find middle
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    second = slow.next
    slow.next = None
    prev = None
    while second:
        tmp = second.next
        second.next = prev
        prev = second
        second = tmp
    
    # Merge alternately
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
    neetcodeUrl: 'https://neetcode.io/problems/reorder-linked-list'
  },

  'subtree-of-another-tree': {
    approach: 'For each node in main tree, check if subtree matches using sameTree function.',
    pattern: 'Tree DFS',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(h)',
    pythonSolution: `def isSubtree(root, subRoot):
    if not subRoot: return True
    if not root: return False
    
    if sameTree(root, subRoot):
        return True
    
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)

def sameTree(p, q):
    if not p and not q: return True
    if not p or not q or p.val != q.val: return False
    return sameTree(p.left, q.left) and sameTree(p.right, q.right)`,
    neetcodeUrl: 'https://neetcode.io/problems/subtree-of-a-binary-tree'
  },

  'lowest-common-ancestor-bst': {
    approach: 'BST property: if both nodes < root, search left. If both > root, search right. Else root is LCA.',
    pattern: 'Tree DFS',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1) iterative',
    pythonSolution: `def lowestCommonAncestor(root, p, q):
    curr = root
    
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr`,
    neetcodeUrl: 'https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree'
  },

  'kth-smallest-element-in-bst': {
    approach: 'Inorder traversal of BST gives sorted order. Return kth element.',
    pattern: 'Tree DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pythonSolution: `def kthSmallest(root, k):
    stack = []
    curr = root
    
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right`,
    neetcodeUrl: 'https://neetcode.io/problems/kth-smallest-integer-in-bst'
  },

  'implement-trie': {
    approach: 'Each node has children dict and isEnd flag. Insert adds chars, search checks isEnd.',
    pattern: 'Trie',
    timeComplexity: 'O(m) where m is word length',
    spaceComplexity: 'O(n * m) for n words',
    pythonSolution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.isEnd = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.isEnd = True
    
    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.isEnd
    
    def startsWith(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True`,
    neetcodeUrl: 'https://neetcode.io/problems/implement-prefix-tree'
  },

  'combination-sum': {
    approach: 'Backtracking with current sum. Can reuse same element multiple times.',
    pattern: 'Backtracking',
    timeComplexity: 'O(2^t) where t is target',
    spaceComplexity: 'O(t)',
    pythonSolution: `def combinationSum(candidates, target):
    result = []
    
    def backtrack(i, curr, total):
        if total == target:
            result.append(curr[:])
            return
        if i >= len(candidates) or total > target:
            return
        
        # Include current number
        curr.append(candidates[i])
        backtrack(i, curr, total + candidates[i])
        curr.pop()
        
        # Skip current number
        backtrack(i + 1, curr, total)
    
    backtrack(0, [], 0)
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/combination-target-sum'
  },

  'permutations': {
    approach: 'Backtracking: for each position, try all unused numbers.',
    pattern: 'Backtracking',
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    pythonSolution: `def permute(nums):
    result = []
    
    def backtrack(curr):
        if len(curr) == len(nums):
            result.append(curr[:])
            return
        
        for num in nums:
            if num not in curr:
                curr.append(num)
                backtrack(curr)
                curr.pop()
    
    backtrack([])
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/permutations'
  },

  'subsets': {
    approach: 'Backtracking: for each element, either include it or skip it.',
    pattern: 'Backtracking',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    pythonSolution: `def subsets(nums):
    result = []
    
    def backtrack(i, curr):
        if i >= len(nums):
            result.append(curr[:])
            return
        
        # Include nums[i]
        curr.append(nums[i])
        backtrack(i + 1, curr)
        curr.pop()
        
        # Don't include nums[i]
        backtrack(i + 1, curr)
    
    backtrack(0, [])
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/subsets'
  },

  'word-search': {
    approach: 'DFS backtracking from each cell. Mark visited, explore neighbors, backtrack.',
    pattern: 'Backtracking',
    timeComplexity: 'O(m * n * 4^L) where L is word length',
    spaceComplexity: 'O(L)',
    pythonSolution: `def exist(board, word):
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, i):
        if i == len(word):
            return True
        if (r < 0 or c < 0 or r >= rows or c >= cols or
            board[r][c] != word[i]):
            return False
        
        tmp = board[r][c]
        board[r][c] = '#'
        
        found = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or
                 dfs(r, c+1, i+1) or dfs(r, c-1, i+1))
        
        board[r][c] = tmp
        return found
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
    neetcodeUrl: 'https://neetcode.io/problems/search-for-word'
  },

  'merge-k-sorted-lists': {
    approach: 'Use min heap to track smallest element from each list. Pop and add next.',
    pattern: 'Heap',
    timeComplexity: 'O(n log k) where n is total nodes',
    spaceComplexity: 'O(k)',
    pythonSolution: `import heapq

def mergeKLists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    dummy = ListNode()
    curr = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next`,
    neetcodeUrl: 'https://neetcode.io/problems/merge-k-sorted-linked-lists'
  },

  'find-median-from-data-stream': {
    approach: 'Two heaps: max heap for smaller half, min heap for larger half. Balance sizes.',
    pattern: 'Heap',
    timeComplexity: 'O(log n) insert, O(1) median',
    spaceComplexity: 'O(n)',
    pythonSolution: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max heap
        self.large = []  # min heap
    
    def addNum(self, num):
        heapq.heappush(self.small, -num)
        
        # Balance: small's max <= large's min
        if self.small and self.large and -self.small[0] > self.large[0]:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        
        # Balance sizes
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)
    
    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`,
    neetcodeUrl: 'https://neetcode.io/problems/find-median-in-a-data-stream'
  },

  'longest-consecutive-sequence': {
    approach: 'Use set for O(1) lookup. For each sequence start (no num-1), count streak.',
    pattern: 'HashSet',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pythonSolution: `def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0
    
    for num in nums:
        # Check if start of sequence
        if num - 1 not in num_set:
            length = 0
            while num + length in num_set:
                length += 1
            longest = max(longest, length)
    
    return longest`,
    neetcodeUrl: 'https://neetcode.io/problems/longest-consecutive-sequence'
  },

  'encode-decode-strings': {
    approach: 'Encode with "length#string" format. Decode by reading length, then exact chars.',
    pattern: 'String Manipulation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def encode(strs):
    result = ""
    for s in strs:
        result += str(len(s)) + "#" + s
    return result

def decode(s):
    result = []
    i = 0
    while i < len(s):
        j = i
        while s[j] != '#':
            j += 1
        length = int(s[i:j])
        result.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/string-encode-and-decode'
  },

  'coin-change': {
    approach: 'DP: dp[i] = min coins to make amount i. Try each coin, take min.',
    pattern: '1D DP',
    timeComplexity: 'O(amount * n)',
    spaceComplexity: 'O(amount)',
    pythonSolution: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for a in range(1, amount + 1):
        for coin in coins:
            if a >= coin:
                dp[a] = min(dp[a], 1 + dp[a - coin])
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
    neetcodeUrl: 'https://neetcode.io/problems/coin-change'
  },

  'longest-increasing-subsequence': {
    approach: 'DP: dp[i] = longest LIS ending at i. For each j < i, if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1).',
    pattern: '1D DP',
    timeComplexity: 'O(n²) DP, O(n log n) binary search',
    spaceComplexity: 'O(n)',
    pythonSolution: `def lengthOfLIS(nums):
    dp = [1] * len(nums)
    
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)`,
    neetcodeUrl: 'https://neetcode.io/problems/longest-increasing-subsequence'
  },

  'house-robber': {
    approach: 'DP: rob[i] = max(rob[i-1], rob[i-2] + nums[i]). Can\'t rob adjacent houses.',
    pattern: '1D DP',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def rob(nums):
    rob1, rob2 = 0, 0
    
    for num in nums:
        temp = max(rob2, rob1 + num)
        rob1 = rob2
        rob2 = temp
    
    return rob2`,
    neetcodeUrl: 'https://neetcode.io/problems/house-robber'
  },

  'decode-ways': {
    approach: 'DP: dp[i] = ways to decode up to i. Can decode 1 char or 2 chars if valid.',
    pattern: '1D DP',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def numDecodings(s):
    if s[0] == '0':
        return 0
    
    dp1, dp2 = 1, 1
    
    for i in range(1, len(s)):
        curr = 0
        # Single digit
        if s[i] != '0':
            curr = dp2
        # Two digits
        if 10 <= int(s[i-1:i+1]) <= 26:
            curr += dp1
        
        dp1, dp2 = dp2, curr
    
    return dp2`,
    neetcodeUrl: 'https://neetcode.io/problems/decode-ways'
  },

  'number-of-islands': {
    approach: 'DFS/BFS to mark all connected land cells as visited. Count number of DFS calls.',
    pattern: 'Graph DFS',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n) for recursion',
    pythonSolution: `def numIslands(grid):
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    islands = 0
    
    def dfs(r, c):
        if (r < 0 or c < 0 or r >= rows or c >= cols or
            grid[r][c] != '1'):
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
    
    return islands`,
    neetcodeUrl: 'https://neetcode.io/problems/count-number-of-islands'
  },

  'clone-graph': {
    approach: 'DFS with hashmap to track old->new node mapping. Clone neighbors recursively.',
    pattern: 'Graph DFS',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    pythonSolution: `def cloneGraph(node):
    if not node:
        return None
    
    old_to_new = {}
    
    def dfs(node):
        if node in old_to_new:
            return old_to_new[node]
        
        copy = Node(node.val)
        old_to_new[node] = copy
        
        for neighbor in node.neighbors:
            copy.neighbors.append(dfs(neighbor))
        
        return copy
    
    return dfs(node)`,
    neetcodeUrl: 'https://neetcode.io/problems/clone-graph'
  },

  'pacific-atlantic-water-flow': {
    approach: 'DFS from ocean edges inward. Find cells reachable from both oceans.',
    pattern: 'Graph DFS',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    pythonSolution: `def pacificAtlantic(heights):
    rows, cols = len(heights), len(heights[0])
    pac, atl = set(), set()
    
    def dfs(r, c, visit):
        if (r, c) in visit:
            return
        visit.add((r, c))
        
        for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols and
                heights[nr][nc] >= heights[r][c]):
                dfs(nr, nc, visit)
    
    # DFS from edges
    for c in range(cols):
        dfs(0, c, pac)
        dfs(rows - 1, c, atl)
    for r in range(rows):
        dfs(r, 0, pac)
        dfs(r, cols - 1, atl)
    
    return list(pac & atl)`,
    neetcodeUrl: 'https://neetcode.io/problems/pacific-atlantic-water-flow'
  },

  'course-schedule': {
    approach: 'Detect cycle using DFS. Track visiting/visited states.',
    pattern: 'Graph DFS / Topological Sort',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    pythonSolution: `def canFinish(numCourses, prerequisites):
    graph = {i: [] for i in range(numCourses)}
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    
    visiting = set()
    
    def dfs(course):
        if course in visiting:
            return False
        if graph[course] == []:
            return True
        
        visiting.add(course)
        for prereq in graph[course]:
            if not dfs(prereq):
                return False
        visiting.remove(course)
        graph[course] = []
        return True
    
    for course in range(numCourses):
        if not dfs(course):
            return False
    return True`,
    neetcodeUrl: 'https://neetcode.io/problems/course-schedule'
  },

  'valid-sudoku': {
    approach: 'Use sets to track seen numbers in each row, column, and 3x3 box.',
    pattern: 'HashSet',
    timeComplexity: 'O(1) - fixed 9x9 board',
    spaceComplexity: 'O(1)',
    pythonSolution: `def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                continue
            
            num = board[r][c]
            box_idx = (r // 3) * 3 + c // 3
            
            if num in rows[r] or num in cols[c] or num in boxes[box_idx]:
                return False
            
            rows[r].add(num)
            cols[c].add(num)
            boxes[box_idx].add(num)
    
    return True`,
    neetcodeUrl: 'https://neetcode.io/problems/valid-sudoku'
  },

  'spiral-matrix': {
    approach: 'Track boundaries (top, bottom, left, right). Move in spiral, shrink boundaries.',
    pattern: 'Matrix Traversal',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(1) excluding output',
    pythonSolution: `def spiralOrder(matrix):
    result = []
    left, right = 0, len(matrix[0])
    top, bottom = 0, len(matrix)
    
    while left < right and top < bottom:
        # Top row
        for i in range(left, right):
            result.append(matrix[top][i])
        top += 1
        
        # Right column
        for i in range(top, bottom):
            result.append(matrix[i][right - 1])
        right -= 1
        
        if not (left < right and top < bottom):
            break
        
        # Bottom row
        for i in range(right - 1, left - 1, -1):
            result.append(matrix[bottom - 1][i])
        bottom -= 1
        
        # Left column
        for i in range(bottom - 1, top - 1, -1):
            result.append(matrix[i][left])
        left += 1
    
    return result`,
    neetcodeUrl: 'https://neetcode.io/problems/spiral-matrix'
  },

  'rotate-image': {
    approach: 'Transpose matrix (swap rows/cols), then reverse each row.',
    pattern: 'Matrix Manipulation',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def rotate(matrix):
    n = len(matrix)
    
    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # Reverse each row
    for i in range(n):
        matrix[i].reverse()`,
    neetcodeUrl: 'https://neetcode.io/problems/rotate-matrix'
  },

  'set-matrix-zeroes': {
    approach: 'Use first row/col as markers. Process matrix, then handle first row/col separately.',
    pattern: 'Matrix Manipulation',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(1)',
    pythonSolution: `def setZeroes(matrix):
    rows, cols = len(matrix), len(matrix[0])
    row_zero = False
    
    # Mark first row/col
    for r in range(rows):
        for c in range(cols):
            if matrix[r][c] == 0:
                matrix[0][c] = 0
                if r > 0:
                    matrix[r][0] = 0
                else:
                    row_zero = True
    
    # Set zeros based on markers
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[0][c] == 0 or matrix[r][0] == 0:
                matrix[r][c] = 0
    
    # Handle first column
    if matrix[0][0] == 0:
        for r in range(rows):
            matrix[r][0] = 0
    
    # Handle first row
    if row_zero:
        for c in range(cols):
            matrix[0][c] = 0`,
    neetcodeUrl: 'https://neetcode.io/problems/set-matrix-zeroes'
  },
};
