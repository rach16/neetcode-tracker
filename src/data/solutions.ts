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
};
