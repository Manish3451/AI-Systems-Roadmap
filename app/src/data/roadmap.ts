import type { Module, Resource, ChecklistItem, DSAPattern } from '@/types';

// Helper function to create resource
const createResource = (
  id: string,
  title: string,
  url: string,
  type: Resource['type'],
  moduleId: string,
  estimatedMinutes: number,
  difficulty?: Resource['difficulty'],
  pattern?: string
): Resource => ({
  id,
  title,
  url,
  type,
  moduleId,
  estimatedMinutes,
  isCompleted: false,
  isFavorite: false,
  difficulty,
  pattern,
});

// Helper function to create checklist item
const createChecklistItem = (
  id: string,
  text: string,
  moduleId: string,
  category: string,
  resourceLinks: string[] = [],
  isCheckpoint = false,
  timeEstimate = 0
): ChecklistItem => ({
  id,
  text,
  isCompleted: false,
  moduleId,
  category,
  resourceLinks,
  isCheckpoint,
  timeEstimate,
});

// Module 0: Universal Problem-Solving Mindset
const module0Resources: Resource[] = [
  createResource('m0-r1', 'The Algorithm Design Canvas', 'https://www.hiredintech.com/classrooms/algorithm-design/lessons/13', 'article', 'module-0', 30),
  createResource('m0-r2', 'How to Approach a Coding Problem (NeetCode)', 'https://www.youtube.com/watch?v=GBuHSRDGZBY', 'video', 'module-0', 12),
];

const module0Checklist: ChecklistItem[] = [
  createChecklistItem('m0-c1', 'Read: The Algorithm Design Canvas (30 mins)', 'module-0', 'Learn', ['m0-r1']),
  createChecklistItem('m0-c2', 'Watch: How to Approach a Coding Problem (12 mins)', 'module-0', 'Learn', ['m0-r2']),
  createChecklistItem('m0-c3', 'Can you identify the pattern category within 60 seconds of reading a problem?', 'module-0', 'Validate', [], true),
  createChecklistItem('m0-c4', 'Can you explain Time/Space complexity using mathematical notation?', 'module-0', 'Validate', [], true),
  createChecklistItem('m0-c5', 'Can you list 3 alternative approaches and why they fail?', 'module-0', 'Validate', [], true),
  createChecklistItem('m0-c6', 'STOP CONDITION: Solve 3 Easy array problems using the framework without looking up solutions', 'module-0', 'Checkpoint', [], true, 180),
];

// Module 1: Pattern-Based DSA Mastery
const dsaPatterns: DSAPattern[] = [
  {
    id: 'sw',
    name: 'Sliding Window',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc121', title: 'Best Time to Buy/Sell Stock', difficulty: 'Easy', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc3', title: 'Longest Substring Without Repeating', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc76', title: 'Minimum Window Substring', difficulty: 'Hard', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc209', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc567', title: 'Permutation in String', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'tp',
    name: 'Two Pointers',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc167', title: 'Two Sum II', difficulty: 'Easy', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc15', title: '3Sum', difficulty: 'Medium', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc11', title: 'Container With Most Water', difficulty: 'Medium', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc26', title: 'Remove Duplicates', difficulty: 'Easy', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'ps',
    name: 'Prefix Sum',
    moduleId: 'module-1',
    timeBudget: 1,
    isCompleted: false,
    problems: [
      { problemId: 'lc238', title: 'Product of Array Except Self', difficulty: 'Medium', pattern: 'Prefix Sum', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc560', title: 'Subarray Sum Equals K', difficulty: 'Medium', pattern: 'Prefix Sum', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'bs',
    name: 'Binary Search',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc704', title: 'Binary Search', difficulty: 'Easy', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc33', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc153', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc875', title: 'Koko Eating Bananas', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1011', title: 'Capacity To Ship Packages', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc410', title: 'Split Array Largest Sum', difficulty: 'Hard', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'll',
    name: 'Linked List',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc206', title: 'Reverse Linked List', difficulty: 'Easy', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc141', title: 'Linked List Cycle', difficulty: 'Easy', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc142', title: 'Linked List Cycle II', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc19', title: 'Remove Nth Node From End', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc21', title: 'Merge Two Sorted Lists', difficulty: 'Easy', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'stack',
    name: 'Stack & Monotonic Stack',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc20', title: 'Valid Parentheses', difficulty: 'Easy', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc739', title: 'Daily Temperatures', difficulty: 'Medium', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc84', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc155', title: 'Min Stack', difficulty: 'Medium', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'tree',
    name: 'Binary Trees (DFS/BFS)',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc104', title: 'Maximum Depth', difficulty: 'Easy', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc543', title: 'Diameter of Binary Tree', difficulty: 'Easy', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc124', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc226', title: 'Invert Binary Tree', difficulty: 'Easy', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc102', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc199', title: 'Binary Tree Right Side View', difficulty: 'Medium', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc98', title: 'Validate Binary Search Tree', difficulty: 'Medium', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc235', title: 'Lowest Common Ancestor of BST', difficulty: 'Medium', pattern: 'Tree', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'graph',
    name: 'Graphs (BFS/DFS/Union Find)',
    moduleId: 'module-1',
    timeBudget: 5,
    isCompleted: false,
    problems: [
      { problemId: 'lc200', title: 'Number of Islands', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc133', title: 'Clone Graph', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc417', title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc207', title: 'Course Schedule', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc210', title: 'Course Schedule II', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc323', title: 'Number of Connected Components', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc547', title: 'Number of Provinces', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc684', title: 'Redundant Connection', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc127', title: 'Word Ladder', difficulty: 'Hard', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc269', title: 'Alien Dictionary', difficulty: 'Hard', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'bt',
    name: 'Backtracking',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc46', title: 'Permutations', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc78', title: 'Subsets', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc51', title: 'N-Queens', difficulty: 'Hard', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc37', title: 'Sudoku Solver', difficulty: 'Hard', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc79', title: 'Word Search', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    moduleId: 'module-1',
    timeBudget: 7,
    isCompleted: false,
    problems: [
      { problemId: 'lc70', title: 'Climbing Stairs', difficulty: 'Easy', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc198', title: 'House Robber', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc322', title: 'Coin Change', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1143', title: 'Longest Common Subsequence', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc72', title: 'Edit Distance', difficulty: 'Hard', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc5', title: 'Longest Palindromic Substring', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc62', title: 'Unique Paths', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc64', title: 'Minimum Path Sum', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc416', title: 'Partition Equal Subset Sum', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc494', title: 'Target Sum', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc337', title: 'House Robber III', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc123', title: 'Best Time to Buy/Sell Stock III', difficulty: 'Hard', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'heap',
    name: 'Heap/Priority Queue',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc215', title: 'Kth Largest Element', difficulty: 'Medium', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc295', title: 'Find Median from Data Stream', difficulty: 'Hard', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc253', title: 'Meeting Rooms II', difficulty: 'Medium', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'trie',
    name: 'Trie',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc208', title: 'Implement Trie', difficulty: 'Medium', pattern: 'Trie', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc212', title: 'Word Search II', difficulty: 'Hard', pattern: 'Trie', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1268', title: 'Search Suggestions System', difficulty: 'Medium', pattern: 'Trie', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'composite',
    name: 'Composite Patterns (Hard)',
    moduleId: 'module-1',
    timeBudget: 5,
    isCompleted: false,
    problems: [
      { problemId: 'lc480', title: 'Sliding Window Median', difficulty: 'Hard', pattern: 'Composite', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc315', title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', pattern: 'Composite', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc23', title: 'Merge K Sorted Lists', difficulty: 'Hard', pattern: 'Composite', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc854', title: 'K-Similar Strings', difficulty: 'Hard', pattern: 'Composite', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc329', title: 'Longest Increasing Path in Matrix', difficulty: 'Hard', pattern: 'Composite', isCompleted: false, moduleId: 'module-1' },
    ],
  },
];

const module1Resources: Resource[] = [
  // Sliding Window
  createResource('m1-sw-r1', 'Sliding Window Algorithm Template', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/discuss/2136465/template', 'article', 'module-1', 10),
  createResource('m1-sw-r2', 'Sliding Window FIXED (NeetCode)', 'https://www.youtube.com/watch?v=MK-NZ4hN7rs', 'video', 'module-1', 8),
  createResource('m1-sw-r3', 'LeetCode 121 - Best Time to Buy/Sell Stock', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', 'leetcode', 'module-1', 15, 'Easy', 'Sliding Window'),
  createResource('m1-sw-r4', 'LeetCode 3 - Longest Substring Without Repeating', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 'leetcode', 'module-1', 20, 'Medium', 'Sliding Window'),
  createResource('m1-sw-r5', 'LeetCode 76 - Minimum Window Substring', 'https://leetcode.com/problems/minimum-window-substring/', 'leetcode', 'module-1', 30, 'Hard', 'Sliding Window'),
  createResource('m1-sw-r6', 'LeetCode 209 - Minimum Size Subarray Sum', 'https://leetcode.com/problems/minimum-size-subarray-sum/', 'leetcode', 'module-1', 20, 'Medium', 'Sliding Window'),
  createResource('m1-sw-r7', 'LeetCode 567 - Permutation in String', 'https://leetcode.com/problems/permutation-in-string/', 'leetcode', 'module-1', 20, 'Medium', 'Sliding Window'),
  // Two Pointers
  createResource('m1-tp-r1', 'Two Pointers Technique', 'https://www.geeksforgeeks.org/two-pointers-technique/', 'article', 'module-1', 8),
  createResource('m1-tp-r2', 'Hashing vs Two Pointers', 'https://www.interviewcake.com/article/hash-map-two-pointer', 'article', 'module-1', 5),
  createResource('m1-tp-r3', 'LeetCode 167 - Two Sum II', 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', 'leetcode', 'module-1', 15, 'Easy', 'Two Pointers'),
  createResource('m1-tp-r4', 'LeetCode 15 - 3Sum', 'https://leetcode.com/problems/3sum/', 'leetcode', 'module-1', 25, 'Medium', 'Two Pointers'),
  createResource('m1-tp-r5', 'LeetCode 11 - Container With Most Water', 'https://leetcode.com/problems/container-with-most-water/', 'leetcode', 'module-1', 20, 'Medium', 'Two Pointers'),
  createResource('m1-tp-r6', 'LeetCode 26 - Remove Duplicates', 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', 'leetcode', 'module-1', 15, 'Easy', 'Two Pointers'),
  // Prefix Sum
  createResource('m1-ps-r1', 'Prefix Sum Array', 'https://www.hackerearth.com/practice/data-structures/arrays/1-d/tutorial/', 'article', 'module-1', 15),
  createResource('m1-ps-r2', 'LeetCode 238 - Product of Array Except Self', 'https://leetcode.com/problems/product-of-array-except-self/', 'leetcode', 'module-1', 20, 'Medium', 'Prefix Sum'),
  createResource('m1-ps-r3', 'LeetCode 560 - Subarray Sum Equals K', 'https://leetcode.com/problems/subarray-sum-equals-k/', 'leetcode', 'module-1', 25, 'Medium', 'Prefix Sum'),
  // Binary Search
  createResource('m1-bs-r1', 'Binary Search Template', 'https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template-solved-many-problems', 'article', 'module-1', 15),
  createResource('m1-bs-r2', 'Binary Search on Answer', 'https://usaco.guide/silver/binary-search?lang=py', 'article', 'module-1', 20),
  createResource('m1-bs-r3', 'LeetCode 704 - Binary Search', 'https://leetcode.com/problems/binary-search/', 'leetcode', 'module-1', 15, 'Easy', 'Binary Search'),
  createResource('m1-bs-r4', 'LeetCode 33 - Search in Rotated Sorted Array', 'https://leetcode.com/problems/search-in-rotated-sorted-array/', 'leetcode', 'module-1', 25, 'Medium', 'Binary Search'),
  createResource('m1-bs-r5', 'LeetCode 153 - Find Minimum in Rotated Sorted Array', 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', 'leetcode', 'module-1', 20, 'Medium', 'Binary Search'),
  createResource('m1-bs-r6', 'LeetCode 875 - Koko Eating Bananas', 'https://leetcode.com/problems/koko-eating-bananas/', 'leetcode', 'module-1', 25, 'Medium', 'Binary Search'),
  createResource('m1-bs-r7', 'LeetCode 1011 - Capacity To Ship Packages', 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', 'leetcode', 'module-1', 25, 'Medium', 'Binary Search'),
  createResource('m1-bs-r8', 'LeetCode 410 - Split Array Largest Sum', 'https://leetcode.com/problems/split-array-largest-sum/', 'leetcode', 'module-1', 30, 'Hard', 'Binary Search'),
  // Linked List
  createResource('m1-ll-r1', 'Linked List Patterns', 'https://medium.com/leetcode-patterns/linked-list-patterns-d0b005170ede', 'article', 'module-1', 12),
  createResource('m1-ll-r2', 'VisuAlgo Linked List', 'https://visualgo.net/en/list', 'doc', 'module-1', 10),
  createResource('m1-ll-r3', 'LeetCode 206 - Reverse Linked List', 'https://leetcode.com/problems/reverse-linked-list/', 'leetcode', 'module-1', 15, 'Easy', 'Linked List'),
  createResource('m1-ll-r4', 'LeetCode 141 - Linked List Cycle', 'https://leetcode.com/problems/linked-list-cycle/', 'leetcode', 'module-1', 15, 'Easy', 'Linked List'),
  createResource('m1-ll-r5', 'LeetCode 142 - Linked List Cycle II', 'https://leetcode.com/problems/linked-list-cycle-ii/', 'leetcode', 'module-1', 20, 'Medium', 'Linked List'),
  createResource('m1-ll-r6', 'LeetCode 19 - Remove Nth Node From End', 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', 'leetcode', 'module-1', 20, 'Medium', 'Linked List'),
  createResource('m1-ll-r7', 'LeetCode 21 - Merge Two Sorted Lists', 'https://leetcode.com/problems/merge-two-sorted-lists/', 'leetcode', 'module-1', 15, 'Easy', 'Linked List'),
  // Stack
  createResource('m1-stack-r1', 'Monotonic Stack Explained', 'https://liyin2015.medium.com/monotonic-stack-survey-7d0a684af8b3', 'article', 'module-1', 10),
  createResource('m1-stack-r2', 'LeetCode 20 - Valid Parentheses', 'https://leetcode.com/problems/valid-parentheses/', 'leetcode', 'module-1', 15, 'Easy', 'Stack'),
  createResource('m1-stack-r3', 'LeetCode 739 - Daily Temperatures', 'https://leetcode.com/problems/daily-temperatures/', 'leetcode', 'module-1', 20, 'Medium', 'Monotonic Stack'),
  createResource('m1-stack-r4', 'LeetCode 84 - Largest Rectangle in Histogram', 'https://leetcode.com/problems/largest-rectangle-in-histogram/', 'leetcode', 'module-1', 30, 'Hard', 'Monotonic Stack'),
  createResource('m1-stack-r5', 'LeetCode 155 - Min Stack', 'https://leetcode.com/problems/min-stack/', 'leetcode', 'module-1', 20, 'Medium', 'Stack'),
  // Trees
  createResource('m1-tree-r1', 'DFS & BFS Tree Traversal', 'https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/breadth-first-search-and-its-uses', 'article', 'module-1', 20),
  createResource('m1-tree-r2', 'Tree Patterns', 'https://seanprashad.com/leetcode-patterns/', 'article', 'module-1', 15),
  createResource('m1-tree-r3', 'LeetCode 104 - Maximum Depth', 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', 'leetcode', 'module-1', 10, 'Easy', 'Tree'),
  createResource('m1-tree-r4', 'LeetCode 543 - Diameter of Binary Tree', 'https://leetcode.com/problems/diameter-of-binary-tree/', 'leetcode', 'module-1', 15, 'Easy', 'Tree'),
  createResource('m1-tree-r5', 'LeetCode 124 - Binary Tree Maximum Path Sum', 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', 'leetcode', 'module-1', 30, 'Hard', 'Tree'),
  createResource('m1-tree-r6', 'LeetCode 226 - Invert Binary Tree', 'https://leetcode.com/problems/invert-binary-tree/', 'leetcode', 'module-1', 10, 'Easy', 'Tree'),
  createResource('m1-tree-r7', 'LeetCode 102 - Binary Tree Level Order Traversal', 'https://leetcode.com/problems/binary-tree-level-order-traversal/', 'leetcode', 'module-1', 20, 'Medium', 'Tree'),
  createResource('m1-tree-r8', 'LeetCode 199 - Binary Tree Right Side View', 'https://leetcode.com/problems/binary-tree-right-side-view/', 'leetcode', 'module-1', 20, 'Medium', 'Tree'),
  createResource('m1-tree-r9', 'LeetCode 98 - Validate Binary Search Tree', 'https://leetcode.com/problems/validate-binary-search-tree/', 'leetcode', 'module-1', 20, 'Medium', 'Tree'),
  createResource('m1-tree-r10', 'LeetCode 235 - Lowest Common Ancestor of BST', 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', 'leetcode', 'module-1', 20, 'Medium', 'Tree'),
  // Graphs
  createResource('m1-graph-r1', 'Graph Algorithms', 'https://www.programiz.com/dsa/graph', 'article', 'module-1', 20),
  createResource('m1-graph-r2', 'Union Find', 'https://www.hackerearth.com/practice/data-structures/disjoint-data-structures/basics-of-disjoint-data-structures/tutorial/', 'article', 'module-1', 15),
  createResource('m1-graph-r3', 'LeetCode 200 - Number of Islands', 'https://leetcode.com/problems/number-of-islands/', 'leetcode', 'module-1', 25, 'Medium', 'Graph'),
  createResource('m1-graph-r4', 'LeetCode 133 - Clone Graph', 'https://leetcode.com/problems/clone-graph/', 'leetcode', 'module-1', 20, 'Medium', 'Graph'),
  createResource('m1-graph-r5', 'LeetCode 417 - Pacific Atlantic Water Flow', 'https://leetcode.com/problems/pacific-atlantic-water-flow/', 'leetcode', 'module-1', 25, 'Medium', 'Graph'),
  createResource('m1-graph-r6', 'LeetCode 207 - Course Schedule', 'https://leetcode.com/problems/course-schedule/', 'leetcode', 'module-1', 25, 'Medium', 'Graph'),
  createResource('m1-graph-r7', 'LeetCode 210 - Course Schedule II', 'https://leetcode.com/problems/course-schedule-ii/', 'leetcode', 'module-1', 25, 'Medium', 'Graph'),
  createResource('m1-graph-r8', 'LeetCode 323 - Number of Connected Components', 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', 'leetcode', 'module-1', 20, 'Medium', 'Graph'),
  createResource('m1-graph-r9', 'LeetCode 547 - Number of Provinces', 'https://leetcode.com/problems/number-of-provinces/', 'leetcode', 'module-1', 20, 'Medium', 'Graph'),
  createResource('m1-graph-r10', 'LeetCode 684 - Redundant Connection', 'https://leetcode.com/problems/redundant-connection/', 'leetcode', 'module-1', 25, 'Medium', 'Graph'),
  createResource('m1-graph-r11', 'LeetCode 127 - Word Ladder', 'https://leetcode.com/problems/word-ladder/', 'leetcode', 'module-1', 35, 'Hard', 'Graph'),
  createResource('m1-graph-r12', 'LeetCode 269 - Alien Dictionary', 'https://leetcode.com/problems/alien-dictionary/', 'leetcode', 'module-1', 35, 'Hard', 'Graph'),
  // Backtracking
  createResource('m1-bt-r1', 'Backtracking Template', 'https://leetcode.com/problems/subsets/discuss/27288/python-solution-with-detailed-explanation', 'article', 'module-1', 15),
  createResource('m1-bt-r2', 'LeetCode 46 - Permutations', 'https://leetcode.com/problems/permutations/', 'leetcode', 'module-1', 20, 'Medium', 'Backtracking'),
  createResource('m1-bt-r3', 'LeetCode 78 - Subsets', 'https://leetcode.com/problems/subsets/', 'leetcode', 'module-1', 20, 'Medium', 'Backtracking'),
  createResource('m1-bt-r4', 'LeetCode 51 - N-Queens', 'https://leetcode.com/problems/n-queens/', 'leetcode', 'module-1', 35, 'Hard', 'Backtracking'),
  createResource('m1-bt-r5', 'LeetCode 37 - Sudoku Solver', 'https://leetcode.com/problems/sudoku-solver/', 'leetcode', 'module-1', 35, 'Hard', 'Backtracking'),
  createResource('m1-bt-r6', 'LeetCode 79 - Word Search', 'https://leetcode.com/problems/word-search/', 'leetcode', 'module-1', 25, 'Medium', 'Backtracking'),
  // DP
  createResource('m1-dp-r1', 'DP Patterns (NeetCode)', 'https://www.youtube.com/watch?v=aPQY__2H3tE', 'video', 'module-1', 60),
  createResource('m1-dp-r2', 'DP 14 Patterns', 'https://leetcode.com/discuss/general-discussion/1062887/dynamic-programming-patterns', 'article', 'module-1', 20),
  createResource('m1-dp-r3', 'LeetCode 70 - Climbing Stairs', 'https://leetcode.com/problems/climbing-stairs/', 'leetcode', 'module-1', 15, 'Easy', 'DP'),
  createResource('m1-dp-r4', 'LeetCode 198 - House Robber', 'https://leetcode.com/problems/house-robber/', 'leetcode', 'module-1', 20, 'Medium', 'DP'),
  createResource('m1-dp-r5', 'LeetCode 322 - Coin Change', 'https://leetcode.com/problems/coin-change/', 'leetcode', 'module-1', 25, 'Medium', 'DP'),
  createResource('m1-dp-r6', 'LeetCode 1143 - Longest Common Subsequence', 'https://leetcode.com/problems/longest-common-subsequence/', 'leetcode', 'module-1', 25, 'Medium', 'DP'),
  createResource('m1-dp-r7', 'LeetCode 72 - Edit Distance', 'https://leetcode.com/problems/edit-distance/', 'leetcode', 'module-1', 30, 'Hard', 'DP'),
  createResource('m1-dp-r8', 'LeetCode 5 - Longest Palindromic Substring', 'https://leetcode.com/problems/longest-palindromic-substring/', 'leetcode', 'module-1', 25, 'Medium', 'DP'),
  createResource('m1-dp-r9', 'LeetCode 62 - Unique Paths', 'https://leetcode.com/problems/unique-paths/', 'leetcode', 'module-1', 20, 'Medium', 'DP'),
  createResource('m1-dp-r10', 'LeetCode 64 - Minimum Path Sum', 'https://leetcode.com/problems/minimum-path-sum/', 'leetcode', 'module-1', 20, 'Medium', 'DP'),
  createResource('m1-dp-r11', 'LeetCode 416 - Partition Equal Subset Sum', 'https://leetcode.com/problems/partition-equal-subset-sum/', 'leetcode', 'module-1', 25, 'Medium', 'DP'),
  createResource('m1-dp-r12', 'LeetCode 494 - Target Sum', 'https://leetcode.com/problems/target-sum/', 'leetcode', 'module-1', 25, 'Medium', 'DP'),
  createResource('m1-dp-r13', 'LeetCode 337 - House Robber III', 'https://leetcode.com/problems/house-robber-iii/', 'leetcode', 'module-1', 25, 'Medium', 'DP'),
  createResource('m1-dp-r14', 'LeetCode 123 - Best Time to Buy/Sell Stock III', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', 'leetcode', 'module-1', 30, 'Hard', 'DP'),
  // Heap
  createResource('m1-heap-r1', 'Heaps in Python', 'https://realpython.com/python-heapq-module/', 'article', 'module-1', 10),
  createResource('m1-heap-r2', 'LeetCode 215 - Kth Largest Element', 'https://leetcode.com/problems/kth-largest-element-in-an-array/', 'leetcode', 'module-1', 20, 'Medium', 'Heap'),
  createResource('m1-heap-r3', 'LeetCode 295 - Find Median from Data Stream', 'https://leetcode.com/problems/find-median-from-data-stream/', 'leetcode', 'module-1', 30, 'Hard', 'Heap'),
  createResource('m1-heap-r4', 'LeetCode 253 - Meeting Rooms II', 'https://leetcode.com/problems/meeting-rooms-ii/', 'leetcode', 'module-1', 20, 'Medium', 'Heap'),
  // Trie
  createResource('m1-trie-r1', 'Implement Trie', 'https://leetcode.com/problems/implement-trie-prefix-tree/discuss/150083/trie-in-python', 'article', 'module-1', 15),
  createResource('m1-trie-r2', 'LeetCode 208 - Implement Trie', 'https://leetcode.com/problems/implement-trie-prefix-tree/', 'leetcode', 'module-1', 25, 'Medium', 'Trie'),
  createResource('m1-trie-r3', 'LeetCode 212 - Word Search II', 'https://leetcode.com/problems/word-search-ii/', 'leetcode', 'module-1', 35, 'Hard', 'Trie'),
  createResource('m1-trie-r4', 'LeetCode 1268 - Search Suggestions System', 'https://leetcode.com/problems/search-suggestions-system/', 'leetcode', 'module-1', 25, 'Medium', 'Trie'),
  // Composite
  createResource('m1-comp-r1', 'LeetCode 480 - Sliding Window Median', 'https://leetcode.com/problems/sliding-window-median/', 'leetcode', 'module-1', 35, 'Hard', 'Composite'),
  createResource('m1-comp-r2', 'LeetCode 315 - Count of Smaller Numbers After Self', 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', 'leetcode', 'module-1', 35, 'Hard', 'Composite'),
  createResource('m1-comp-r3', 'LeetCode 23 - Merge K Sorted Lists', 'https://leetcode.com/problems/merge-k-sorted-lists/', 'leetcode', 'module-1', 30, 'Hard', 'Composite'),
  createResource('m1-comp-r4', 'LeetCode 854 - K-Similar Strings', 'https://leetcode.com/problems/k-similar-strings/', 'leetcode', 'module-1', 35, 'Hard', 'Composite'),
  createResource('m1-comp-r5', 'LeetCode 329 - Longest Increasing Path in Matrix', 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', 'leetcode', 'module-1', 30, 'Hard', 'Composite'),
];

const module1Checklist: ChecklistItem[] = [
  // Sliding Window
  createChecklistItem('m1-sw-c1', 'Read: Sliding Window Algorithm Template (10 mins)', 'module-1', 'Sliding Window', ['m1-sw-r1']),
  createChecklistItem('m1-sw-c2', 'Watch: Sliding Window FIXED + VARIABLE (20 mins)', 'module-1', 'Sliding Window', ['m1-sw-r2']),
  createChecklistItem('m1-sw-c3', 'Solve: LeetCode 121 - Best Time to Buy/Sell Stock', 'module-1', 'Sliding Window', ['m1-sw-r3']),
  createChecklistItem('m1-sw-c4', 'Solve: LeetCode 3 - Longest Substring Without Repeating', 'module-1', 'Sliding Window', ['m1-sw-r4']),
  createChecklistItem('m1-sw-c5', 'Solve: LeetCode 76 - Minimum Window Substring', 'module-1', 'Sliding Window', ['m1-sw-r5']),
  createChecklistItem('m1-sw-c6', 'Solve: LeetCode 209 - Minimum Size Subarray Sum', 'module-1', 'Sliding Window', ['m1-sw-r6']),
  createChecklistItem('m1-sw-c7', 'Solve: LeetCode 567 - Permutation in String', 'module-1', 'Sliding Window', ['m1-sw-r7']),
  createChecklistItem('m1-sw-c8', 'Validate: Implement template from scratch without notes', 'module-1', 'Sliding Window', [], true),
  // Two Pointers
  createChecklistItem('m1-tp-c1', 'Read: Two Pointers Technique (8 mins)', 'module-1', 'Two Pointers', ['m1-tp-r1']),
  createChecklistItem('m1-tp-c2', 'Read: When to use Hashing vs Two Pointers (5 mins)', 'module-1', 'Two Pointers', ['m1-tp-r2']),
  createChecklistItem('m1-tp-c3', 'Solve: LeetCode 167 - Two Sum II', 'module-1', 'Two Pointers', ['m1-tp-r3']),
  createChecklistItem('m1-tp-c4', 'Solve: LeetCode 15 - 3Sum', 'module-1', 'Two Pointers', ['m1-tp-r4']),
  createChecklistItem('m1-tp-c5', 'Solve: LeetCode 11 - Container With Most Water', 'module-1', 'Two Pointers', ['m1-tp-r5']),
  createChecklistItem('m1-tp-c6', 'Solve: LeetCode 26 - Remove Duplicates', 'module-1', 'Two Pointers', ['m1-tp-r6']),
  createChecklistItem('m1-tp-c7', 'Validate: Code 3Sum in 15 minutes without hints', 'module-1', 'Two Pointers', [], true),
  // Prefix Sum
  createChecklistItem('m1-ps-c1', 'Read: Prefix Sum Array (15 mins)', 'module-1', 'Prefix Sum', ['m1-ps-r1']),
  createChecklistItem('m1-ps-c2', 'Solve: LeetCode 238 - Product of Array Except Self', 'module-1', 'Prefix Sum', ['m1-ps-r2']),
  createChecklistItem('m1-ps-c3', 'Solve: LeetCode 560 - Subarray Sum Equals K', 'module-1', 'Prefix Sum', ['m1-ps-r3']),
  createChecklistItem('m1-ps-c4', 'Validate: Solve 560 using both Brute Force O(N²) and Optimized O(N)', 'module-1', 'Prefix Sum', [], true),
  // Binary Search
  createChecklistItem('m1-bs-c1', 'Read: Binary Search Template (15 mins)', 'module-1', 'Binary Search', ['m1-bs-r1']),
  createChecklistItem('m1-bs-c2', 'Read: Binary Search on Answer (20 mins)', 'module-1', 'Binary Search', ['m1-bs-r2']),
  createChecklistItem('m1-bs-c3', 'Solve: LeetCode 704 - Binary Search', 'module-1', 'Binary Search', ['m1-bs-r3']),
  createChecklistItem('m1-bs-c4', 'Solve: LeetCode 33 - Search in Rotated Sorted Array', 'module-1', 'Binary Search', ['m1-bs-r4']),
  createChecklistItem('m1-bs-c5', 'Solve: LeetCode 153 - Find Minimum in Rotated Sorted Array', 'module-1', 'Binary Search', ['m1-bs-r5']),
  createChecklistItem('m1-bs-c6', 'Solve: LeetCode 875 - Koko Eating Bananas', 'module-1', 'Binary Search', ['m1-bs-r6']),
  createChecklistItem('m1-bs-c7', 'Solve: LeetCode 1011 - Capacity To Ship Packages', 'module-1', 'Binary Search', ['m1-bs-r7']),
  createChecklistItem('m1-bs-c8', 'Solve: LeetCode 410 - Split Array Largest Sum', 'module-1', 'Binary Search', ['m1-bs-r8']),
  createChecklistItem('m1-bs-c9', 'Validate: Write Binary Search template from scratch', 'module-1', 'Binary Search', [], true),
  // Linked List
  createChecklistItem('m1-ll-c1', 'Read: Linked List Patterns (12 mins)', 'module-1', 'Linked List', ['m1-ll-r1']),
  createChecklistItem('m1-ll-c2', 'Visualize: VisuAlgo Linked List (10 mins)', 'module-1', 'Linked List', ['m1-ll-r2']),
  createChecklistItem('m1-ll-c3', 'Solve: LeetCode 206 - Reverse Linked List', 'module-1', 'Linked List', ['m1-ll-r3']),
  createChecklistItem('m1-ll-c4', 'Solve: LeetCode 141 - Linked List Cycle', 'module-1', 'Linked List', ['m1-ll-r4']),
  createChecklistItem('m1-ll-c5', 'Solve: LeetCode 142 - Linked List Cycle II', 'module-1', 'Linked List', ['m1-ll-r5']),
  createChecklistItem('m1-ll-c6', 'Solve: LeetCode 19 - Remove Nth Node From End', 'module-1', 'Linked List', ['m1-ll-r6']),
  createChecklistItem('m1-ll-c7', 'Solve: LeetCode 21 - Merge Two Sorted Lists', 'module-1', 'Linked List', ['m1-ll-r7']),
  createChecklistItem('m1-ll-c8', 'Validate: Draw Floyd\'s Cycle detection proof on paper', 'module-1', 'Linked List', [], true),
  // Stack
  createChecklistItem('m1-stack-c1', 'Read: Monotonic Stack Explained (10 mins)', 'module-1', 'Stack', ['m1-stack-r1']),
  createChecklistItem('m1-stack-c2', 'Solve: LeetCode 20 - Valid Parentheses', 'module-1', 'Stack', ['m1-stack-r2']),
  createChecklistItem('m1-stack-c3', 'Solve: LeetCode 739 - Daily Temperatures', 'module-1', 'Stack', ['m1-stack-r3']),
  createChecklistItem('m1-stack-c4', 'Solve: LeetCode 84 - Largest Rectangle in Histogram', 'module-1', 'Stack', ['m1-stack-r4']),
  createChecklistItem('m1-stack-c5', 'Solve: LeetCode 155 - Min Stack', 'module-1', 'Stack', ['m1-stack-r5']),
  createChecklistItem('m1-stack-c6', 'Validate: Explain why Monotonic Stack is O(N)', 'module-1', 'Stack', [], true),
  // Trees
  createChecklistItem('m1-tree-c1', 'Read: DFS & BFS Tree Traversal (20 mins)', 'module-1', 'Trees', ['m1-tree-r1']),
  createChecklistItem('m1-tree-c2', 'Browse: Tree Patterns list (15 mins)', 'module-1', 'Trees', ['m1-tree-r2']),
  createChecklistItem('m1-tree-c3', 'Solve: LeetCode 104 - Maximum Depth', 'module-1', 'Trees', ['m1-tree-r3']),
  createChecklistItem('m1-tree-c4', 'Solve: LeetCode 543 - Diameter of Binary Tree', 'module-1', 'Trees', ['m1-tree-r4']),
  createChecklistItem('m1-tree-c5', 'Solve: LeetCode 124 - Binary Tree Maximum Path Sum', 'module-1', 'Trees', ['m1-tree-r5']),
  createChecklistItem('m1-tree-c6', 'Solve: LeetCode 226 - Invert Binary Tree', 'module-1', 'Trees', ['m1-tree-r6']),
  createChecklistItem('m1-tree-c7', 'Solve: LeetCode 102 - Binary Tree Level Order Traversal', 'module-1', 'Trees', ['m1-tree-r7']),
  createChecklistItem('m1-tree-c8', 'Solve: LeetCode 199 - Binary Tree Right Side View', 'module-1', 'Trees', ['m1-tree-r8']),
  createChecklistItem('m1-tree-c9', 'Solve: LeetCode 98 - Validate Binary Search Tree', 'module-1', 'Trees', ['m1-tree-r9']),
  createChecklistItem('m1-tree-c10', 'Solve: LeetCode 235 - Lowest Common Ancestor of BST', 'module-1', 'Trees', ['m1-tree-r10']),
  createChecklistItem('m1-tree-c11', 'Validate: Solve 104 using BFS and DFS; discuss complexity', 'module-1', 'Trees', [], true),
  // Graphs
  createChecklistItem('m1-graph-c1', 'Read: Graph Algorithms - BFS/DFS sections', 'module-1', 'Graphs', ['m1-graph-r1']),
  createChecklistItem('m1-graph-c2', 'Read: Union Find (15 mins)', 'module-1', 'Graphs', ['m1-graph-r2']),
  createChecklistItem('m1-graph-c3', 'Solve: LeetCode 200 - Number of Islands', 'module-1', 'Graphs', ['m1-graph-r3']),
  createChecklistItem('m1-graph-c4', 'Solve: LeetCode 133 - Clone Graph', 'module-1', 'Graphs', ['m1-graph-r4']),
  createChecklistItem('m1-graph-c5', 'Solve: LeetCode 417 - Pacific Atlantic Water Flow', 'module-1', 'Graphs', ['m1-graph-r5']),
  createChecklistItem('m1-graph-c6', 'Solve: LeetCode 207 - Course Schedule', 'module-1', 'Graphs', ['m1-graph-r6']),
  createChecklistItem('m1-graph-c7', 'Solve: LeetCode 210 - Course Schedule II', 'module-1', 'Graphs', ['m1-graph-r7']),
  createChecklistItem('m1-graph-c8', 'Solve: LeetCode 323 - Number of Connected Components', 'module-1', 'Graphs', ['m1-graph-r8']),
  createChecklistItem('m1-graph-c9', 'Solve: LeetCode 547 - Number of Provinces', 'module-1', 'Graphs', ['m1-graph-r9']),
  createChecklistItem('m1-graph-c10', 'Solve: LeetCode 684 - Redundant Connection', 'module-1', 'Graphs', ['m1-graph-r10']),
  createChecklistItem('m1-graph-c11', 'Solve: LeetCode 127 - Word Ladder', 'module-1', 'Graphs', ['m1-graph-r11']),
  createChecklistItem('m1-graph-c12', 'Solve: LeetCode 269 - Alien Dictionary', 'module-1', 'Graphs', ['m1-graph-r12']),
  createChecklistItem('m1-graph-c13', 'Validate: Implement Union Find with Path Compression', 'module-1', 'Graphs', [], true),
  // Backtracking
  createChecklistItem('m1-bt-c1', 'Read: Backtracking Template', 'module-1', 'Backtracking', ['m1-bt-r1']),
  createChecklistItem('m1-bt-c2', 'Solve: LeetCode 46 - Permutations', 'module-1', 'Backtracking', ['m1-bt-r2']),
  createChecklistItem('m1-bt-c3', 'Solve: LeetCode 78 - Subsets', 'module-1', 'Backtracking', ['m1-bt-r3']),
  createChecklistItem('m1-bt-c4', 'Solve: LeetCode 51 - N-Queens', 'module-1', 'Backtracking', ['m1-bt-r4']),
  createChecklistItem('m1-bt-c5', 'Solve: LeetCode 37 - Sudoku Solver', 'module-1', 'Backtracking', ['m1-bt-r5']),
  createChecklistItem('m1-bt-c6', 'Solve: LeetCode 79 - Word Search', 'module-1', 'Backtracking', ['m1-bt-r6']),
  createChecklistItem('m1-bt-c7', 'Validate: Draw recursion tree for Subsets problem', 'module-1', 'Backtracking', [], true),
  // DP
  createChecklistItem('m1-dp-c1', 'Watch: DP Patterns (1 hour)', 'module-1', 'Dynamic Programming', ['m1-dp-r1']),
  createChecklistItem('m1-dp-c2', 'Read: DP 14 Patterns', 'module-1', 'Dynamic Programming', ['m1-dp-r2']),
  createChecklistItem('m1-dp-c3', 'Solve: LeetCode 70 - Climbing Stairs', 'module-1', 'Dynamic Programming', ['m1-dp-r3']),
  createChecklistItem('m1-dp-c4', 'Solve: LeetCode 198 - House Robber', 'module-1', 'Dynamic Programming', ['m1-dp-r4']),
  createChecklistItem('m1-dp-c5', 'Solve: LeetCode 322 - Coin Change', 'module-1', 'Dynamic Programming', ['m1-dp-r5']),
  createChecklistItem('m1-dp-c6', 'Solve: LeetCode 1143 - Longest Common Subsequence', 'module-1', 'Dynamic Programming', ['m1-dp-r6']),
  createChecklistItem('m1-dp-c7', 'Solve: LeetCode 72 - Edit Distance', 'module-1', 'Dynamic Programming', ['m1-dp-r7']),
  createChecklistItem('m1-dp-c8', 'Solve: LeetCode 5 - Longest Palindromic Substring', 'module-1', 'Dynamic Programming', ['m1-dp-r8']),
  createChecklistItem('m1-dp-c9', 'Solve: LeetCode 62 - Unique Paths', 'module-1', 'Dynamic Programming', ['m1-dp-r9']),
  createChecklistItem('m1-dp-c10', 'Solve: LeetCode 64 - Minimum Path Sum', 'module-1', 'Dynamic Programming', ['m1-dp-r10']),
  createChecklistItem('m1-dp-c11', 'Solve: LeetCode 416 - Partition Equal Subset Sum', 'module-1', 'Dynamic Programming', ['m1-dp-r11']),
  createChecklistItem('m1-dp-c12', 'Solve: LeetCode 494 - Target Sum', 'module-1', 'Dynamic Programming', ['m1-dp-r12']),
  createChecklistItem('m1-dp-c13', 'Solve: LeetCode 337 - House Robber III', 'module-1', 'Dynamic Programming', ['m1-dp-r13']),
  createChecklistItem('m1-dp-c14', 'Solve: LeetCode 123 - Best Time to Buy/Sell Stock III', 'module-1', 'Dynamic Programming', ['m1-dp-r14']),
  createChecklistItem('m1-dp-c15', 'Validate: Write recurrence relation for Coin Change', 'module-1', 'Dynamic Programming', [], true),
  // Heap
  createChecklistItem('m1-heap-c1', 'Read: Heaps in Python (10 mins)', 'module-1', 'Heap', ['m1-heap-r1']),
  createChecklistItem('m1-heap-c2', 'Solve: LeetCode 215 - Kth Largest Element', 'module-1', 'Heap', ['m1-heap-r2']),
  createChecklistItem('m1-heap-c3', 'Solve: LeetCode 295 - Find Median from Data Stream', 'module-1', 'Heap', ['m1-heap-r3']),
  createChecklistItem('m1-heap-c4', 'Solve: LeetCode 253 - Meeting Rooms II', 'module-1', 'Heap', ['m1-heap-r4']),
  createChecklistItem('m1-heap-c5', 'Validate: Implement Heap Sort from scratch', 'module-1', 'Heap', [], true),
  // Trie
  createChecklistItem('m1-trie-c1', 'Read: Implement Trie (15 mins)', 'module-1', 'Trie', ['m1-trie-r1']),
  createChecklistItem('m1-trie-c2', 'Solve: LeetCode 208 - Implement Trie', 'module-1', 'Trie', ['m1-trie-r2']),
  createChecklistItem('m1-trie-c3', 'Solve: LeetCode 212 - Word Search II', 'module-1', 'Trie', ['m1-trie-r3']),
  createChecklistItem('m1-trie-c4', 'Solve: LeetCode 1268 - Search Suggestions System', 'module-1', 'Trie', ['m1-trie-r4']),
  createChecklistItem('m1-trie-c5', 'Validate: Write TrieNode class from scratch', 'module-1', 'Trie', [], true),
  // Composite
  createChecklistItem('m1-comp-c1', 'Solve: LeetCode 480 - Sliding Window Median', 'module-1', 'Composite', ['m1-comp-r1']),
  createChecklistItem('m1-comp-c2', 'Solve: LeetCode 315 - Count of Smaller Numbers After Self', 'module-1', 'Composite', ['m1-comp-r2']),
  createChecklistItem('m1-comp-c3', 'Solve: LeetCode 23 - Merge K Sorted Lists', 'module-1', 'Composite', ['m1-comp-r3']),
  createChecklistItem('m1-comp-c4', 'Solve: LeetCode 854 - K-Similar Strings', 'module-1', 'Composite', ['m1-comp-r4']),
  createChecklistItem('m1-comp-c5', 'Solve: LeetCode 329 - Longest Increasing Path in Matrix', 'module-1', 'Composite', ['m1-comp-r5']),
  // Module 1 Checkpoint
  createChecklistItem('m1-checkpoint', 'MODULE 1 CHECKPOINT: Solve LC76, LC84, LC72 back-to-back in 60 minutes', 'module-1', 'Checkpoint', [], true, 60),
];

// Module 2: LLD Mastery
const module2Resources: Resource[] = [
  // OOP & SOLID
  createResource('m2-oop-r1', 'SOLID Principles with Examples', 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design', 'article', 'module-2', 20),
  createResource('m2-oop-r2', 'Composition over Inheritance', 'https://www.youtube.com/watch?v=wfMtDGfHWpA', 'video', 'module-2', 15),
  createResource('m2-oop-r3', 'UML Class Diagram Tutorial', 'https://www.uml-diagrams.org/class-diagrams-overview.html', 'doc', 'module-2', 30),
  // Design Patterns
  createResource('m2-dp-r1', 'Refactoring Guru - Creational Patterns', 'https://refactoring.guru/design-patterns/creational-patterns', 'article', 'module-2', 30),
  createResource('m2-dp-r2', 'Refactoring Guru - Structural Patterns', 'https://refactoring.guru/design-patterns/structural-patterns', 'article', 'module-2', 35),
  createResource('m2-dp-r3', 'Refactoring Guru - Behavioral Patterns', 'https://refactoring.guru/design-patterns/behavioral-patterns', 'article', 'module-2', 45),
  // LLD Problems
  createResource('m2-lld-r1', 'Tic Tac Toe', 'https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry', 'article', 'module-2', 60),
  createResource('m2-lld-r2', 'Parking Lot', 'https://workat.tech/machine-coding/practice/design-parking-lot-qmmpd4l3v336', 'article', 'module-2', 90),
  createResource('m2-lld-r3', 'LRU Cache', 'https://leetcode.com/problems/lru-cache/', 'leetcode', 'module-2', 45, 'Medium'),
  createResource('m2-lld-r4', 'Snake and Ladder', 'https://workat.tech/machine-coding/practice/snake-and-ladder-problem-zb96rf5xps12', 'article', 'module-2', 60),
  createResource('m2-lld-r5', 'Task Management', 'https://workat.tech/machine-coding/practice/design-task-management-system-8y1kfk2qm2z0', 'article', 'module-2', 75),
];

const module2Checklist: ChecklistItem[] = [
  // OOP & SOLID
  createChecklistItem('m2-oop-c1', 'Read: SOLID Principles with Examples (20 mins)', 'module-2', 'OOP & SOLID', ['m2-oop-r1']),
  createChecklistItem('m2-oop-c2', 'Watch: Composition over Inheritance (15 mins)', 'module-2', 'OOP & SOLID', ['m2-oop-r2']),
  createChecklistItem('m2-oop-c3', 'Study: UML Class Diagram Tutorial (30 mins)', 'module-2', 'OOP & SOLID', ['m2-oop-r3']),
  createChecklistItem('m2-oop-c4', 'Design: Vehicle inheritance hierarchy with Association, Aggregation, Composition', 'module-2', 'OOP & SOLID'),
  createChecklistItem('m2-oop-c5', 'Refactor: Apply SOLID principles to Vehicle design', 'module-2', 'OOP & SOLID'),
  createChecklistItem('m2-oop-c6', 'Draw: Class Diagram using PlantUML', 'module-2', 'OOP & SOLID'),
  createChecklistItem('m2-oop-c7', 'Validate: Explain Liskov Substitution Principle', 'module-2', 'OOP & SOLID', [], true),
  // Creational & Structural
  createChecklistItem('m2-cs-c1', 'Read: Refactoring Guru - Creational Patterns (30 mins)', 'module-2', 'Creational Patterns', ['m2-dp-r1']),
  createChecklistItem('m2-cs-c2', 'Read: Refactoring Guru - Structural Patterns (35 mins)', 'module-2', 'Structural Patterns', ['m2-dp-r2']),
  createChecklistItem('m2-cs-c3', 'Implement: Singleton - Database Connection Pool', 'module-2', 'Creational Patterns'),
  createChecklistItem('m2-cs-c4', 'Implement: Factory - Notification Factory', 'module-2', 'Creational Patterns'),
  createChecklistItem('m2-cs-c5', 'Implement: Builder - HTTP Request Builder', 'module-2', 'Creational Patterns'),
  createChecklistItem('m2-cs-c6', 'Implement: Decorator - Coffee Shop', 'module-2', 'Structural Patterns'),
  createChecklistItem('m2-cs-c7', 'Implement: Adapter - XML to JSON Adapter', 'module-2', 'Structural Patterns'),
  createChecklistItem('m2-cs-c8', 'Validate: Draw UML diagram before coding each pattern', 'module-2', 'Design Patterns', [], true),
  // Behavioral
  createChecklistItem('m2-beh-c1', 'Read: Refactoring Guru - Behavioral Patterns (45 mins)', 'module-2', 'Behavioral Patterns', ['m2-dp-r3']),
  createChecklistItem('m2-beh-c2', 'Implement: Strategy - Payment Strategy', 'module-2', 'Behavioral Patterns'),
  createChecklistItem('m2-beh-c3', 'Implement: Observer - Stock Price Alert', 'module-2', 'Behavioral Patterns'),
  createChecklistItem('m2-beh-c4', 'Implement: State - Traffic Light', 'module-2', 'Behavioral Patterns'),
  createChecklistItem('m2-beh-c5', 'Implement: Chain of Responsibility - Logger', 'module-2', 'Behavioral Patterns'),
  createChecklistItem('m2-beh-c6', 'Implement: Command - Text Editor Undo/Redo', 'module-2', 'Behavioral Patterns'),
  // Phase A: Beginner
  createChecklistItem('m2-a-c1', 'Tic Tac Toe - State pattern implementation', 'module-2', 'Phase A - Beginner', ['m2-lld-r1']),
  createChecklistItem('m2-a-c2', 'Parking Lot - Strategy for pricing', 'module-2', 'Phase A - Beginner', ['m2-lld-r2']),
  createChecklistItem('m2-a-c3', 'LRU Cache - DSA + LLD bridge', 'module-2', 'Phase A - Beginner', ['m2-lld-r3']),
  createChecklistItem('m2-a-c4', 'Snake and Ladder', 'module-2', 'Phase A - Beginner', ['m2-lld-r4']),
  createChecklistItem('m2-a-c5', 'Task Management - Command pattern for undo', 'module-2', 'Phase A - Beginner', ['m2-lld-r5']),
  // Phase B: Medium
  createChecklistItem('m2-b-c1', 'Stack Overflow - Observer for notifications', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c2', 'ATM - State pattern implementation', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c3', 'Logging Framework - Chain of Responsibility', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c4', 'Pub-Sub System - Observer pattern', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c5', 'Elevator System - State + Strategy', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c6', 'Splitwise - Graph algorithm + Strategy', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c7', 'Vending Machine - State pattern', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c8', 'Car Rental - Strategy + Factory', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c9', 'Hotel Management - Observer pattern', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c10', 'Digital Wallet - Decorator + Concurrency', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c11', 'Library Management - Observer pattern', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c12', 'Traffic Signal - State + Mediator', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c13', 'Concert Ticket Booking - Concurrency', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c14', 'Social Network - Graph + Observer', 'module-2', 'Phase B - Medium'),
  createChecklistItem('m2-b-c15', 'Chat Application - Mediator + Memento', 'module-2', 'Phase B - Medium'),
  // Phase C: Hard
  createChecklistItem('m2-c-c1', 'Spotify - Composite + Strategy', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c2', 'Amazon - Decorator + State machine', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c3', 'LinkedIn - Graph + Mediator', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c4', 'CricInfo - Observer pattern heavy', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c5', 'Chess - State + Strategy + Command', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c6', 'Uber - Strategy + State + Observer', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c7', 'Rate Limiter - Token bucket algorithm', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c8', 'Typeahead/Trie Service - Trie + LRU', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c9', 'ML Pipeline - Chain of Responsibility', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c10', 'Notification System - Factory + Observer', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c11', 'Distributed Cache - Consistent hashing', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c12', 'LLM Router - Strategy + Circuit breaker', 'module-2', 'Phase C - Hard'),
  createChecklistItem('m2-c-c13', 'Movie Ticket Booking - Concurrency', 'module-2', 'Phase C - Hard'),
  // Module 2 Checkpoint
  createChecklistItem('m2-checkpoint', 'MODULE 2 CHECKPOINT: Implement Chess Game with full move validation, check/checkmate, undo. Time limit: 4 hours', 'module-2', 'Checkpoint', [], true, 240),
];

// Module 3: Python Advanced & Async
const module3Resources: Resource[] = [
  createResource('m3-r1', 'Python Type Hints Guide', 'https://realpython.com/python-type-checking/', 'article', 'module-3', 20),
  createResource('m3-r2', 'Descriptors and Properties', 'https://realpython.com/python-descriptors/', 'article', 'module-3', 15),
  createResource('m3-r3', '__slots__ and Memory Management', 'https://wiki.python.org/moin/UsingSlots', 'doc', 'module-3', 10),
  createResource('m3-r4', 'Async IO in Python', 'https://realpython.com/async-io-python/', 'article', 'module-3', 45),
  createResource('m3-r5', 'asyncio Documentation', 'https://docs.python.org/3/library/asyncio.html', 'doc', 'module-3', 30),
];

const module3Checklist: ChecklistItem[] = [
  createChecklistItem('m3-c1', 'Read: Python Type Hints Guide (20 mins)', 'module-3', 'Python Internals', ['m3-r1']),
  createChecklistItem('m3-c2', 'Read: Descriptors and Properties (15 mins)', 'module-3', 'Python Internals', ['m3-r2']),
  createChecklistItem('m3-c3', 'Read: __slots__ and Memory Management (10 mins)', 'module-3', 'Python Internals', ['m3-r3']),
  createChecklistItem('m3-c4', 'Implement: @property decorator with validation', 'module-3', 'Python Internals'),
  createChecklistItem('m3-c5', 'Implement: Generic Repository[T] class', 'module-3', 'Python Internals'),
  createChecklistItem('m3-c6', 'Convert: Regular class to use __slots__; measure memory', 'module-3', 'Python Internals'),
  createChecklistItem('m3-c7', 'Read: Async IO in Python (full tutorial)', 'module-3', 'Asyncio', ['m3-r4']),
  createChecklistItem('m3-c8', 'Read: asyncio Documentation', 'module-3', 'Asyncio', ['m3-r5']),
  createChecklistItem('m3-c9', 'Build: Async HTTP Client with aiohttp (10 URLs)', 'module-3', 'Asyncio'),
  createChecklistItem('m3-c10', 'Implement: Producer-Consumer with asyncio.Queue', 'module-3', 'Asyncio'),
  createChecklistItem('m3-c11', 'Build: LLM Batch Processor with semaphore (100 prompts, concurrency 5)', 'module-3', 'Asyncio'),
  createChecklistItem('m3-c12', 'Build: WebSocket Server - Simple chat server', 'module-3', 'Asyncio'),
  createChecklistItem('m3-c13', 'Validate: Explain asyncio.gather() vs asyncio.wait()', 'module-3', 'Asyncio', [], true),
  createChecklistItem('m3-c14', 'Debug: Fix deadlock scenario with improper await', 'module-3', 'Asyncio'),
  // Module 3 Checkpoint
  createChecklistItem('m3-checkpoint', 'MODULE 3 CHECKPOINT: Build async API crawler (50 pages, max 10 concurrent, retries, JSON output) in under 10 seconds', 'module-3', 'Checkpoint', [], true, 10),
];

// Module 4: AI Systems Fundamentals
const module4Resources: Resource[] = [
  // Transformer Internals
  createResource('m4-r1', 'Attention Is All You Need', 'https://arxiv.org/abs/1706.03762', 'article', 'module-4', 40),
  createResource('m4-r2', 'Attention Mechanism (StatQuest)', 'https://www.youtube.com/watch?v=UPtG_38Rqyk', 'video', 'module-4', 8),
  createResource('m4-r3', 'NanoGPT', 'https://github.com/karpathy/nanoGPT', 'doc', 'module-4', 60),
  // RAG
  createResource('m4-r4', 'Building RAG Applications', 'https://www.deeplearning.ai/short-courses/building-rag-applications/', 'video', 'module-4', 60),
  createResource('m4-r5', 'Chunking Strategies', 'https://www.pinecone.io/learn/chunking-strategies/', 'article', 'module-4', 15),
  createResource('m4-r6', 'Reranking Guide', 'https://www.pinecone.io/learn/series/rag/reranking/', 'article', 'module-4', 10),
  createResource('m4-r7', 'ChromaDB', 'https://docs.trychroma.com/getting-started', 'doc', 'module-4', 20),
  createResource('m4-r8', 'Qdrant', 'https://qdrant.tech/documentation/quick-start/', 'doc', 'module-4', 20),
  createResource('m4-r9', 'RAGAS', 'https://docs.ragas.io/en/latest/getstarted/index.html', 'doc', 'module-4', 30),
  // Prompt Engineering
  createResource('m4-pe-r1', 'Prompt Engineering Guide - OpenAI', 'https://platform.openai.com/docs/guides/prompt-engineering', 'doc', 'module-4', 30),
  createResource('m4-pe-r2', 'Prompt Engineering Best Practices', 'https://www.anthropic.com/engineering/prompt-engineering-best-practices', 'article', 'module-4', 20),
  createResource('m4-pe-r3', 'Chain of Thought Prompting', 'https://arxiv.org/abs/2201.11903', 'article', 'module-4', 15),
  createResource('m4-pe-r4', 'Few-Shot Prompting Guide', 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/few-shot-prompting', 'doc', 'module-4', 15),
  createResource('m4-pe-r5', 'Prompt Chaining Techniques', 'https://www.pinecone.io/learn/series/langchain/langchain-prompt-templates/', 'article', 'module-4', 20),
  // Agents
  createResource('m4-r10', 'AI Agents in LangGraph', 'https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/', 'video', 'module-4', 60),
  createResource('m4-r11', 'ReAct Pattern', 'https://arxiv.org/abs/2210.03629', 'article', 'module-4', 20),
  createResource('m4-r12', 'Building Effective Agents', 'https://www.anthropic.com/research/building-effective-agents', 'article', 'module-4', 20),
  // Infrastructure
  createResource('m4-r13', 'vLLM PagedAttention', 'https://blog.vllm.ai/2023/06/20/vllm.html', 'article', 'module-4', 15),
  createResource('m4-r14', 'Quantization Guide', 'https://huggingface.co/docs/optimum/concept_guides/quantization', 'doc', 'module-4', 10),
  createResource('m4-r15', 'Llama-2-7B vLLM', 'https://docs.vllm.ai/en/latest/getting_started/quickstart.html', 'doc', 'module-4', 30),
  // Security
  createResource('m4-r16', 'OWASP Top 10 for LLMs', 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', 'article', 'module-4', 20),
  createResource('m4-r17', 'Microsoft Presidio', 'https://microsoft.github.io/presidio/', 'doc', 'module-4', 20),
  createResource('m4-r18', 'Guardrails AI', 'https://www.guardrailsai.com/docs', 'doc', 'module-4', 20),
  // Multimodal Foundations Resources
  createResource('m46-r1', 'How CLIP Works - AI Explained', 'https://www.youtube.com/watch?v=KcFVKKsTNIU', 'video', 'module-4', 6),
  createResource('m46-r2', 'LLaVA Visual Instruction Tuning', 'https://www.youtube.com/watch?v=H4YKPJ3_1fY', 'video', 'module-4', 13),
  createResource('m46-r3', 'Whisper ASR Full Tutorial - AssemblyAI', 'https://www.youtube.com/watch?v=AwJf8aQfChE', 'video', 'module-4', 30),
  createResource('m46-r4', 'Vision Transformers Visually - Computerphile', 'https://www.youtube.com/watch?v=HZ4j_U3FCp0', 'video', 'module-4', 10),
  createResource('m46-r5', 'OpenCLIP Documentation', 'https://github.com/mlfoundations/open_clip', 'doc', 'module-4', 15),
  createResource('m46-r6', 'HuggingFace Audio Course', 'https://huggingface.co/learn/audio-course/', 'doc', 'module-4', 60),
  createResource('m46-r7', 'Qdrant Quick Start', 'https://qdrant.tech/documentation/quick-start/', 'doc', 'module-4', 20),
  // Voice & Speech Resources
  createResource('m47-r1', 'Realtime Speech Recognition Tutorial', 'https://www.youtube.com/watch?v=0RB_pyiZ4wA', 'video', 'module-4', 25),
  createResource('m47-r2', 'Silero VAD Implementation', 'https://www.youtube.com/watch?v=8c8f36z3z8k', 'video', 'module-4', 12),
  createResource('m47-r3', 'Coqui TTS Tutorial', 'https://www.youtube.com/watch?v=3qH3_g5V2rI', 'video', 'module-4', 15),
  createResource('m47-r4', 'faster-whisper Documentation', 'https://github.com/SYSTRAN/faster-whisper', 'doc', 'module-4', 20),
  createResource('m47-r5', 'Silero VAD GitHub', 'https://github.com/snakers4/silero-vad', 'doc', 'module-4', 15),
  createResource('m47-r6', 'Coqui TTS Documentation', 'https://github.com/coqui-ai/TTS', 'doc', 'module-4', 20),
  createResource('m47-r7', 'WebSocket Protocol', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', 'doc', 'module-4', 15),
  // Multimodal Agent Resources
  createResource('m48-r1', 'GPT-4V Vision Agents Tutorial', 'https://www.youtube.com/watch?v=LVhFyF5zt1g', 'video', 'module-4', 22),
  createResource('m48-r2', 'Multimodal RAG Systems', 'https://www.youtube.com/watch?v=JpU7kzN4X9w', 'video', 'module-4', 35),
  createResource('m48-r3', 'LLaVA: Large Language and Vision Assistant', 'https://llava-vl.github.io/', 'doc', 'module-4', 20),
  createResource('m48-r4', 'LangGraph Multi-Agent', 'https://langchain-ai.github.io/langgraph/', 'doc', 'module-4', 30),
  createResource('m48-r5', 'Reciprocal Rank Fusion', 'https://www.pinecone.io/learn/series/rag/reranking/', 'article', 'module-4', 15),
  // Multimodal Production Resources
  createResource('m49-r1', 'Optimizing Vision Transformers', 'https://www.youtube.com/watch?v=5FLOvL3PNf8', 'video', 'module-4', 15),
  createResource('m49-r2', 'ONNX Runtime Documentation', 'https://onnxruntime.ai/docs/', 'doc', 'module-4', 20),
  createResource('m49-r3', 'Optimum Quantization Guide', 'https://huggingface.co/docs/optimum/concept_guides/quantization', 'doc', 'module-4', 15),
  createResource('m49-r4', 'Redis Caching Best Practices', 'https://redis.io/docs/manual/client-side-caching/', 'doc', 'module-4', 15),
  createResource('m49-r5', 'Azure Content Safety', 'https://azure.microsoft.com/en-us/services/cognitive-services/content-moderator/', 'doc', 'module-4', 20),
  createResource('m49-r6', 'OpenCV Face Detection', 'https://docs.opencv.org/4.x/d2/d99/tutorial_js_face_detection.html', 'doc', 'module-4', 15),
];

const module4Checklist: ChecklistItem[] = [
  // Transformer Internals
  createChecklistItem('m4-t-c1', 'Paper: Attention Is All You Need (Sections 1, 2, 3.1)', 'module-4', 'Transformer Internals', ['m4-r1']),
  createChecklistItem('m4-t-c2', 'Watch: Attention Mechanism (StatQuest)', 'module-4', 'Transformer Internals', ['m4-r2']),
  createChecklistItem('m4-t-c3', 'Implement: Clone and run NanoGPT train.py', 'module-4', 'Transformer Internals', ['m4-r3']),
  createChecklistItem('m4-t-c4', 'Validate: Write matrix dimensions for Q, K, V', 'module-4', 'Transformer Internals', [], true),
  // Prompt Engineering
  createChecklistItem('m4-pe-c1', 'Read: OpenAI Prompt Engineering Guide', 'module-4', 'Prompt Engineering', ['m4-pe-r1']),
  createChecklistItem('m4-pe-c2', 'Read: Prompt Engineering Best Practices from Anthropic', 'module-4', 'Prompt Engineering', ['m4-pe-r2']),
  createChecklistItem('m4-pe-c3', 'Paper: Chain of Thought Prompting (pages 1-4)', 'module-4', 'Prompt Engineering', ['m4-pe-r3']),
  createChecklistItem('m4-pe-c4', 'Design: Create a system prompt for a customer support agent with persona, constraints, and output format', 'module-4', 'Prompt Engineering'),
  createChecklistItem('m4-pe-c5', 'Implement: Few-shot prompting for entity extraction with 3 examples', 'module-4', 'Prompt Engineering', ['m4-pe-r4']),
  createChecklistItem('m4-pe-c6', 'Build: Chain-of-thought prompt for math problem solving that shows reasoning', 'module-4', 'Prompt Engineering'),
  createChecklistItem('m4-pe-c7', 'Design: Prompt chaining pipeline - break complex task into 3 sequential prompts', 'module-4', 'Prompt Engineering', ['m4-pe-r5']),
  createChecklistItem('m4-pe-c8', 'Validate: Compare zero-shot vs few-shot vs chain-of-thought on same task', 'module-4', 'Prompt Engineering', [], true),
  // RAG
  createChecklistItem('m4-rag-c1', 'Course: Building RAG Applications (1 hour)', 'module-4', 'RAG Architecture', ['m4-r4']),
  createChecklistItem('m4-rag-c2', 'Read: Chunking Strategies (15 mins)', 'module-4', 'RAG Architecture', ['m4-r5']),
  createChecklistItem('m4-rag-c3', 'Read: Reranking Guide (10 mins)', 'module-4', 'RAG Architecture', ['m4-r6']),
  createChecklistItem('m4-rag-c4', 'Setup: Vector DB (ChromaDB or Qdrant), ingest 100 documents', 'module-4', 'RAG Architecture', ['m4-r7', 'm4-r8']),
  createChecklistItem('m4-rag-c5', 'Implement: Hybrid Search (BM25 + Dense + RRF)', 'module-4', 'RAG Architecture'),
  createChecklistItem('m4-rag-c6', 'Build: End-to-end RAG Pipeline', 'module-4', 'RAG Architecture'),
  createChecklistItem('m4-rag-c7', 'Evaluate: RAGAS for Faithfulness and Answer Relevancy', 'module-4', 'RAG Architecture', ['m4-r9']),
  createChecklistItem('m4-rag-c8', 'Validate: Compare latency (Naive vs Reranked RAG)', 'module-4', 'RAG Architecture', [], true),
  // Agents
  createChecklistItem('m4-agent-c1', 'Course: AI Agents in LangGraph (1 hour)', 'module-4', 'Agent Architecture', ['m4-r10']),
  createChecklistItem('m4-agent-c2', 'Paper: ReAct Pattern (pages 1-4)', 'module-4', 'Agent Architecture', ['m4-r11']),
  createChecklistItem('m4-agent-c3', 'Read: Building Effective Agents (20 mins)', 'module-4', 'Agent Architecture', ['m4-r12']),
  createChecklistItem('m4-agent-c4', 'Build: ReAct Agent from scratch (no LangChain)', 'module-4', 'Agent Architecture'),
  createChecklistItem('m4-agent-c5', 'Integrate: 3 tools (Wikipedia, Python REPL, Calculator)', 'module-4', 'Agent Architecture'),
  createChecklistItem('m4-agent-c6', 'Implement: ConversationBufferMemory + VectorStoreMemory', 'module-4', 'Agent Architecture'),
  createChecklistItem('m4-agent-c7', 'Build: Multi-Agent supervisor pattern', 'module-4', 'Agent Architecture'),
  createChecklistItem('m4-agent-c8', 'Validate: Agent answers multi-step query', 'module-4', 'Agent Architecture', [], true),
  // Infrastructure
  createChecklistItem('m4-inf-c1', 'Read: vLLM PagedAttention (15 mins)', 'module-4', 'AI Infrastructure', ['m4-r13']),
  createChecklistItem('m4-inf-c2', 'Read: Quantization Guide (10 mins)', 'module-4', 'AI Infrastructure', ['m4-r14']),
  createChecklistItem('m4-inf-c3', 'Deploy: Llama-2-7B using vLLM', 'module-4', 'AI Infrastructure', ['m4-r15']),
  createChecklistItem('m4-inf-c4', 'Compare: FP16 vs INT8 inference speed', 'module-4', 'AI Infrastructure'),
  createChecklistItem('m4-inf-c5', 'Benchmark: Single vs 10 requests with continuous batching', 'module-4', 'AI Infrastructure'),
  createChecklistItem('m4-inf-c6', 'Validate: Achieve >50 tokens/sec throughput', 'module-4', 'AI Infrastructure', [], true),
  // Security
  createChecklistItem('m4-sec-c1', 'Read: OWASP Top 10 for LLMs', 'module-4', 'Security & Guardrails', ['m4-r16']),
  createChecklistItem('m4-sec-c2', 'Read: Microsoft Presidio Documentation', 'module-4', 'Security & Guardrails', ['m4-r17']),
  createChecklistItem('m4-sec-c3', 'Implement: Input Guardrail with Presidio (PII redaction)', 'module-4', 'Security & Guardrails'),
  createChecklistItem('m4-sec-c4', 'Implement: Prompt Injection Detection', 'module-4', 'Security & Guardrails'),
  createChecklistItem('m4-sec-c5', 'Implement: Output Validation (JSON format)', 'module-4', 'Security & Guardrails', ['m4-r18']),
  
  // Multimodal Foundations (from Module 4.6)
  createChecklistItem('m4-mm-c1', 'Watch: How CLIP Works - AI Explained (6 mins)', 'module-4', 'Multimodal Foundations', ['m46-r1']),
  createChecklistItem('m4-mm-c2', 'Implement CLIP image and text encoder', 'module-4', 'Multimodal Foundations'),
  createChecklistItem('m4-mm-c3', 'Validate: Image-text similarity matching', 'module-4', 'Multimodal Foundations', [], true),
  createChecklistItem('m4-mm-c4', 'Watch: Whisper ASR Tutorial', 'module-4', 'Multimodal Foundations', ['m46-r3']),
  createChecklistItem('m4-mm-c5', 'Implement audio transcription pipeline', 'module-4', 'Multimodal Foundations'),
  createChecklistItem('m4-mm-c6', 'Build cross-modal search (text to image)', 'module-4', 'Multimodal Foundations'),
  createChecklistItem('m4-mm-c7', 'Validate: Top-1 retrieval accuracy >80%', 'module-4', 'Multimodal Foundations', [], true),
  
  // Voice & Speech Systems (from Module 4.7)
  createChecklistItem('m4-voice-c1', 'Watch: Realtime Speech Recognition Tutorial', 'module-4', 'Voice & Speech Systems', ['m47-r1']),
  createChecklistItem('m4-voice-c2', 'Implement streaming ASR with WebSocket', 'module-4', 'Voice & Speech Systems'),
  createChecklistItem('m4-voice-c3', 'Add Voice Activity Detection (VAD)', 'module-4', 'Voice & Speech Systems', ['m47-r2']),
  createChecklistItem('m4-voice-c4', 'Validate: Real-time transcription latency <500ms', 'module-4', 'Voice & Speech Systems', [], true),
  createChecklistItem('m4-voice-c5', 'Implement Text-to-Speech pipeline', 'module-4', 'Voice & Speech Systems', ['m47-r3']),
  createChecklistItem('m4-voice-c6', 'Build voice cloning feature', 'module-4', 'Voice & Speech Systems'),
  createChecklistItem('m4-voice-c7', 'Validate: Voice cloning blind test at chance level', 'module-4', 'Voice & Speech Systems', [], true),
  
  // Multimodal Agent Architecture (from Module 4.8)
  createChecklistItem('m4-agent-mm-c1', 'Watch: GPT-4V Vision Agents Tutorial', 'module-4', 'Multimodal Agent Architecture', ['m48-r1']),
  createChecklistItem('m4-agent-mm-c2', 'Build vision-language agent core', 'module-4', 'Multimodal Agent Architecture'),
  createChecklistItem('m4-agent-mm-c3', 'Implement omni-modal context management', 'module-4', 'Multimodal Agent Architecture'),
  createChecklistItem('m4-agent-mm-c4', 'Validate: Multi-turn visual conversations', 'module-4', 'Multimodal Agent Architecture', [], true),
  createChecklistItem('m4-agent-mm-c5', 'Build multimodal RAG with RRF fusion', 'module-4', 'Multimodal Agent Architecture', ['m48-r2']),
  createChecklistItem('m4-agent-mm-c6', 'Implement video understanding pipeline', 'module-4', 'Multimodal Agent Architecture'),
  createChecklistItem('m4-agent-mm-c7', 'Validate: Temporal video queries', 'module-4', 'Multimodal Agent Architecture', [], true),
  
  // Multimodal Production (from Module 4.9)
  createChecklistItem('m4-prod-mm-c1', 'Optimize models with quantization (INT8/ONNX)', 'module-4', 'Multimodal Production', ['m49-r1']),
  createChecklistItem('m4-prod-mm-c2', 'Validate: <50% latency, <2% accuracy loss', 'module-4', 'Multimodal Production', [], true),
  createChecklistItem('m4-prod-mm-c3', 'Implement Redis caching for embeddings', 'module-4', 'Multimodal Production'),
  createChecklistItem('m4-prod-mm-c4', 'Validate: Cache hit <10ms vs miss >500ms', 'module-4', 'Multimodal Production', [], true),
  createChecklistItem('m4-prod-mm-c5', 'Build safety guardrails (PII, face blur)', 'module-4', 'Multimodal Production'),
  createChecklistItem('m4-prod-mm-c6', 'Implement deepfake detection', 'module-4', 'Multimodal Production'),
  createChecklistItem('m4-prod-mm-c7', 'Validate: Safety pipeline accuracy', 'module-4', 'Multimodal Production', [], true),
  
  // Module 4 Checkpoint
  createChecklistItem('m4-checkpoint', 'MODULE 4 CHECKPOINT: Build production multimodal AI system with vision, audio, and text understanding. Deploy with quantization and caching.', 'module-4', 'Checkpoint', [], true, 300),
];

// Module 4.6: Multimodal Foundations
const module46Resources: Resource[] = [
  createResource('m46-r1', 'How CLIP Works - AI Explained', 'https://www.youtube.com/watch?v=KcFVKKsTNIU', 'video', 'module-4.6', 6),
  createResource('m46-r2', 'LLaVA Visual Instruction Tuning', 'https://www.youtube.com/watch?v=H4YKPJ3_1fY', 'video', 'module-4.6', 13),
  createResource('m46-r3', 'Whisper ASR Full Tutorial - AssemblyAI', 'https://www.youtube.com/watch?v=AwJf8aQfChE', 'video', 'module-4.6', 30),
  createResource('m46-r4', 'Vision Transformers Visually - Computerphile', 'https://www.youtube.com/watch?v=HZ4j_U3FCp0', 'video', 'module-4.6', 10),
  createResource('m46-r5', 'OpenCLIP Documentation', 'https://github.com/mlfoundations/open_clip', 'doc', 'module-4.6', 15),
  createResource('m46-r6', 'HuggingFace Audio Course', 'https://huggingface.co/learn/audio-course/', 'doc', 'module-4.6', 60),
  createResource('m46-r7', 'Qdrant Quick Start', 'https://qdrant.tech/documentation/quick-start/', 'doc', 'module-4.6', 20),
];

const module46Checklist: ChecklistItem[] = [
  // Step 1: Environment Setup
  createChecklistItem('m46-c1', 'Create multimodal_env/ with requirements.txt (torch==2.1.0, transformers==4.35, open-clip-torch==2.24, whisper-openai, qdrant-client==1.6)', 'module-4.6', 'Environment Setup'),
  createChecklistItem('m46-c2', 'Run GPU verification: python -c "import torch; print(torch.cuda.is_available())" → True', 'module-4.6', 'Environment Setup', [], true),
  createChecklistItem('m46-c3', 'Verify GPU memory: nvidia-smi shows >8GB available', 'module-4.6', 'Environment Setup', [], true),
  // Step 2: CLIP Implementation
  createChecklistItem('m46-c4', 'Watch: How CLIP Works - AI Explained (6 mins)', 'module-4.6', 'CLIP Vision-Language', ['m46-r1']),
  createChecklistItem('m46-c5', 'Create src/multimodal/clip_embedder.py with CLIPEmbedder class', 'module-4.6', 'CLIP Vision-Language'),
  createChecklistItem('m46-c6', 'Implement encode_image(image_path: str) using open_clip ViT-B-32', 'module-4.6', 'CLIP Vision-Language'),
  createChecklistItem('m46-c7', 'Implement encode_text(text: str) for text embeddings', 'module-4.6', 'CLIP Vision-Language'),
  createChecklistItem('m46-c8', 'Create scripts/test_clip.py calculating cosine similarity', 'module-4.6', 'CLIP Vision-Language'),
  createChecklistItem('m46-c9', 'Validate: Dog-text vs Dog-image similarity >0.25, Dog-text vs Cat-image <0.15', 'module-4.6', 'CLIP Vision-Language', [], true),
  // Step 3: Whisper ASR
  createChecklistItem('m46-c10', 'Watch: Whisper ASR Tutorial minutes 0-15', 'module-4.6', 'Whisper ASR', ['m46-r3']),
  createChecklistItem('m46-c11', 'Download Whisper base model: whisper.load_model("base")', 'module-4.6', 'Whisper ASR'),
  createChecklistItem('m46-c12', 'Create src/multimodal/audio_transcriber.py with transcribe(audio_path) -> dict', 'module-4.6', 'Whisper ASR'),
  createChecklistItem('m46-c13', 'Process samples/meeting_5min.wav, save to outputs/transcription.json with timestamps', 'module-4.6', 'Whisper ASR'),
  createChecklistItem('m46-c14', 'Validate: WER <15% on clean audio using jiwer library', 'module-4.6', 'Whisper ASR', [], true),
  // Step 4: Cross-Modal Alignment
  createChecklistItem('m46-c15', 'Create notebooks/cross_modal_search.ipynb', 'module-4.6', 'Cross-Modal Search'),
  createChecklistItem('m46-c16', 'Index 50 images using CLIP into Qdrant collection multimodal_demo', 'module-4.6', 'Cross-Modal Search', ['m46-r7']),
  createChecklistItem('m46-c17', 'Test query: "red sports car" retrieves red car (not truck)', 'module-4.6', 'Cross-Modal Search'),
  createChecklistItem('m46-c18', 'Validate: Top-1 retrieval accuracy >80% on 10 test queries', 'module-4.6', 'Cross-Modal Search', [], true),
  // Module 4.6 Checkpoint
  createChecklistItem('m46-checkpoint', 'MODULE 4.6 CHECKPOINT: Build end-to-end multimodal search (text->image) with CLIP + Qdrant, transcribe 5-min audio with Whisper', 'module-4.6', 'Checkpoint', [], true, 180),
];

// Module 4.7: Speech & Voice Systems
const module47Resources: Resource[] = [
  createResource('m47-r1', 'Realtime Speech Recognition Tutorial', 'https://www.youtube.com/watch?v=0RB_pyiZ4wA', 'video', 'module-4.7', 25),
  createResource('m47-r2', 'Silero VAD Implementation', 'https://www.youtube.com/watch?v=8c8f36z3z8k', 'video', 'module-4.7', 12),
  createResource('m47-r3', 'Coqui TTS Tutorial', 'https://www.youtube.com/watch?v=3qH3_g5V2rI', 'video', 'module-4.7', 15),
  createResource('m47-r4', 'faster-whisper Documentation', 'https://github.com/SYSTRAN/faster-whisper', 'doc', 'module-4.7', 20),
  createResource('m47-r5', 'Silero VAD GitHub', 'https://github.com/snakers4/silero-vad', 'doc', 'module-4.7', 15),
  createResource('m47-r6', 'Coqui TTS Documentation', 'https://github.com/coqui-ai/TTS', 'doc', 'module-4.7', 20),
  createResource('m47-r7', 'WebSocket Protocol', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', 'doc', 'module-4.7', 15),
];

const module47Checklist: ChecklistItem[] = [
  // Step 5: Real-time Audio Streaming
  createChecklistItem('m47-c1', 'Watch: Realtime Speech Recognition Tutorial', 'module-4.7', 'Streaming ASR', ['m47-r1']),
  createChecklistItem('m47-c2', 'Install faster-whisper with CTranslate2 backend', 'module-4.7', 'Streaming ASR', ['m47-r4']),
  createChecklistItem('m47-c3', 'Create src/voice/streaming_asr.py WebSocket consumer', 'module-4.7', 'Streaming ASR'),
  createChecklistItem('m47-c4', 'Implement PCM 16-bit audio chunk buffering', 'module-4.7', 'Streaming ASR'),
  createChecklistItem('m47-c5', 'Transcribe on VAD silence detection (3 seconds)', 'module-4.7', 'Streaming ASR'),
  createChecklistItem('m47-c6', 'Validate: websocat sends 10s audio, receives transcription within 500ms', 'module-4.7', 'Streaming ASR', [], true),
  // Step 6: Voice Activity Detection
  createChecklistItem('m47-c7', 'Watch: Silero VAD Implementation', 'module-4.7', 'VAD', ['m47-r2']),
  createChecklistItem('m47-c8', 'Install silero-vad and torchaudio', 'module-4.7', 'VAD', ['m47-r5']),
  createChecklistItem('m47-c9', 'Create src/voice/vad_processor.py with SileroVAD class', 'module-4.7', 'VAD'),
  createChecklistItem('m47-c10', 'Implement process_chunk(chunk: bytes) -> bool', 'module-4.7', 'VAD'),
  createChecklistItem('m47-c11', 'Validate: Process 30s audio (3 speech, 2 silence), detect exactly 3 start/end events', 'module-4.7', 'VAD', [], true),
  // Step 7: Text-to-Speech Pipeline
  createChecklistItem('m47-c12', 'Watch: Coqui TTS Tutorial', 'module-4.7', 'TTS Pipeline', ['m47-r3']),
  createChecklistItem('m47-c13', 'Install TTS from Coqui: pip install TTS', 'module-4.7', 'TTS Pipeline', ['m47-r6']),
  createChecklistItem('m47-c14', 'Download XTTS v2 model', 'module-4.7', 'TTS Pipeline'),
  createChecklistItem('m47-c15', 'Create src/voice/tts_generator.py with synthesize(text, speaker_wav)', 'module-4.7', 'TTS Pipeline'),
  createChecklistItem('m47-c16', 'Validate: Generate "Hello world", MOS >3.5/5 with 3 listeners', 'module-4.7', 'TTS Pipeline', [], true),
  // Step 8: Voice Cloning
  createChecklistItem('m47-c17', 'Record 1-minute voice sample to samples/my_voice.wav', 'module-4.7', 'Voice Cloning'),
  createChecklistItem('m47-c18', 'Generate 5 different sentences using cloned voice', 'module-4.7', 'Voice Cloning'),
  createChecklistItem('m47-c19', 'Create tests/test_voice_cloning.py comparing spectrograms', 'module-4.7', 'Voice Cloning'),
  createChecklistItem('m47-c20', 'Validate: Blind test identifies clone vs real at chance level (50/50)', 'module-4.7', 'Voice Cloning', [], true),
  // Module 4.7 Checkpoint
  createChecklistItem('m47-checkpoint', 'MODULE 4.7 CHECKPOINT: Build real-time ASR with WebSocket (<500ms latency), implement voice cloning with XTTS v2', 'module-4.7', 'Checkpoint', [], true, 240),
];

// Module 4.8: Multimodal Agent Architecture
const module48Resources: Resource[] = [
  createResource('m48-r1', 'GPT-4V Vision Agents Tutorial', 'https://www.youtube.com/watch?v=LVhFyF5zt1g', 'video', 'module-4.8', 22),
  createResource('m48-r2', 'Multimodal RAG Systems', 'https://www.youtube.com/watch?v=JpU7kzN4X9w', 'video', 'module-4.8', 35),
  createResource('m48-r3', 'LLaVA: Large Language and Vision Assistant', 'https://llava-vl.github.io/', 'doc', 'module-4.8', 20),
  createResource('m48-r4', 'LangGraph Multi-Agent', 'https://langchain-ai.github.io/langgraph/', 'doc', 'module-4.8', 30),
  createResource('m48-r5', 'Reciprocal Rank Fusion', 'https://www.pinecone.io/learn/series/rag/reranking/', 'article', 'module-4.8', 15),
];

const module48Checklist: ChecklistItem[] = [
  // Step 9: Vision-Language Agent Core
  createChecklistItem('m48-c1', 'Watch: GPT-4V Vision Agents Tutorial', 'module-4.8', 'Vision Agent', ['m48-r1']),
  createChecklistItem('m48-c2', 'Create src/agents/visual_agent.py with VisualReActAgent class', 'module-4.8', 'Vision Agent'),
  createChecklistItem('m48-c3', 'Implement see(image_path, question) using GPT-4V or LLaVA', 'module-4.8', 'Vision Agent', ['m48-r3']),
  createChecklistItem('m48-c4', 'Test on test_images/chart.png: "What is the highest value?"', 'module-4.8', 'Vision Agent'),
  createChecklistItem('m48-c5', 'Validate: Extracts correct numerical value with >90% accuracy', 'module-4.8', 'Vision Agent', [], true),
  // Step 10: Audio-Visual Integration
  createChecklistItem('m48-c6', 'Create src/agents/omni_agent.py with MultimodalContext', 'module-4.8', 'Omni-Modal Integration'),
  createChecklistItem('m48-c7', 'Implement recent_images: deque[maxlen=3]', 'module-4.8', 'Omni-Modal Integration'),
  createChecklistItem('m48-c8', 'Implement audio_transcript and timestamp_sync dict', 'module-4.8', 'Omni-Modal Integration'),
  createChecklistItem('m48-c9', 'Implement process_query() with context retrieval', 'module-4.8', 'Omni-Modal Integration'),
  createChecklistItem('m48-c10', 'Validate: Upload image → "What is this?" → New image → "Compare with previous" → Correctly compares first', 'module-4.8', 'Omni-Modal Integration', [], true),
  // Step 11: Multimodal RAG
  createChecklistItem('m48-c11', 'Watch: Multimodal RAG Systems', 'module-4.8', 'Multimodal RAG', ['m48-r2']),
  createChecklistItem('m48-c12', 'Create src/rag/multimodal_retriever.py', 'module-4.8', 'Multimodal RAG'),
  createChecklistItem('m48-c13', 'Index text chunks (BM25 sparse) + image embeddings (CLIP dense)', 'module-4.8', 'Multimodal RAG'),
  createChecklistItem('m48-c14', 'Implement RRF fusion (k=60)', 'module-4.8', 'Multimodal RAG', ['m48-r5']),
  createChecklistItem('m48-c15', 'Validate: "revenue graph from Q3" retrieves correct bar chart from 100 mixed items', 'module-4.8', 'Multimodal RAG', [], true),
  // Step 12: Video Understanding
  createChecklistItem('m48-c16', 'Create src/video/video_parser.py extracting 1 frame/second', 'module-4.8', 'Video Understanding'),
  createChecklistItem('m48-c17', 'Generate CLIP embeddings for keyframes', 'module-4.8', 'Video Understanding'),
  createChecklistItem('m48-c18', 'Implement temporal search: "What happens at 02:30?"', 'module-4.8', 'Video Understanding'),
  createChecklistItem('m48-c19', 'Validate: Process 5-min video, answer 5 timestamp questions correctly', 'module-4.8', 'Video Understanding', [], true),
  // Module 4.8 Checkpoint
  createChecklistItem('m48-checkpoint', 'MODULE 4.8 CHECKPOINT: Build omni-modal agent (vision+audio) with context memory, implement multimodal RAG with RRF fusion', 'module-4.8', 'Checkpoint', [], true, 300),
];

// Module 4.9: Multimodal Production
const module49Resources: Resource[] = [
  createResource('m49-r1', 'Optimizing Vision Transformers', 'https://www.youtube.com/watch?v=5FLOvL3PNf8', 'video', 'module-4.9', 15),
  createResource('m49-r2', 'ONNX Runtime Documentation', 'https://onnxruntime.ai/docs/', 'doc', 'module-4.9', 20),
  createResource('m49-r3', 'Optimum Quantization Guide', 'https://huggingface.co/docs/optimum/concept_guides/quantization', 'doc', 'module-4.9', 15),
  createResource('m49-r4', 'Redis Caching Best Practices', 'https://redis.io/docs/manual/client-side-caching/', 'doc', 'module-4.9', 15),
  createResource('m49-r5', 'Azure Content Safety', 'https://azure.microsoft.com/en-us/services/cognitive-services/content-moderator/', 'doc', 'module-4.9', 20),
  createResource('m49-r6', 'OpenCV Face Detection', 'https://docs.opencv.org/4.x/d2/d99/tutorial_js_face_detection.html', 'doc', 'module-4.9', 15),
];

const module49Checklist: ChecklistItem[] = [
  // Step 13: Model Quantization
  createChecklistItem('m49-c1', 'Watch: Optimizing Vision Transformers', 'module-4.9', 'Quantization', ['m49-r1']),
  createChecklistItem('m49-c2', 'Convert Whisper to INT8 using faster-whisper', 'module-4.9', 'Quantization'),
  createChecklistItem('m49-c3', 'Convert CLIP to ONNX using optimum-cli', 'module-4.9', 'Quantization', ['m49-r2', 'm49-r3']),
  createChecklistItem('m49-c4', 'Create benchmark.py comparing PyTorch vs ONNX vs INT8 (100 inferences)', 'module-4.9', 'Quantization'),
  createChecklistItem('m49-c5', 'Validate: ONNX latency <50% of PyTorch, accuracy degradation <2%', 'module-4.9', 'Quantization', [], true),
  // Step 14: Multimodal Caching
  createChecklistItem('m49-c6', 'Implement Redis cache for image embeddings (SHA256 as key)', 'module-4.9', 'Caching', ['m49-r4']),
  createChecklistItem('m49-c7', 'Implement transcription cache for audio (file hash as key)', 'module-4.9', 'Caching'),
  createChecklistItem('m49-c8', 'Create src/caching/multimodal_cache.py with get/set methods', 'module-4.9', 'Caching'),
  createChecklistItem('m49-c9', 'Validate: Cache hit <10ms vs cache miss >500ms', 'module-4.9', 'Caching', [], true),
  // Step 15: Safety & Guardrails
  createChecklistItem('m49-c10', 'Create src/safety/image_filter.py with PII detection', 'module-4.9', 'Safety'),
  createChecklistItem('m49-c11', 'Implement face blurring using OpenCV cascade classifier', 'module-4.9', 'Safety', ['m49-r6']),
  createChecklistItem('m49-c12', 'Implement audio deepfake detection (Resemble AI or similar)', 'module-4.9', 'Safety'),
  createChecklistItem('m49-c13', 'Validate: Face image → output has blurred face. Synthetic audio → flagged as fake', 'module-4.9', 'Safety', [], true),
  // Module 4.9 Checkpoint
  createChecklistItem('m49-checkpoint', 'MODULE 4.9 CHECKPOINT: Deploy quantized multimodal pipeline (ONNX/INT8) with Redis caching, implement safety guardrails', 'module-4.9', 'Checkpoint', [], true, 240),
];

// Module 5: Production Engineering & MLOps
const module5Resources: Resource[] = [
  createResource('m5-r1', 'Kubernetes Basics', 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', 'doc', 'module-5', 120),
  createResource('m5-r2', 'Docker Best Practices', 'https://docs.docker.com/develop/dev-best-practices/', 'doc', 'module-5', 10),
  createResource('m5-r3', 'Langfuse Tracing', 'https://langfuse.com/docs/get-started', 'doc', 'module-5', 20),
  createResource('m5-r4', 'Prometheus Metrics', 'https://prometheus.io/docs/tutorials/instrumenting_python/', 'doc', 'module-5', 20),
  createResource('m5-r5', 'Locust Load Testing', 'https://locust.io/', 'doc', 'module-5', 20),
  createResource('m5-r6', 'k6 Load Testing', 'https://k6.io/', 'doc', 'module-5', 20),
];

const module5Checklist: ChecklistItem[] = [
  // Kubernetes
  createChecklistItem('m5-k8s-c1', 'Course: Kubernetes Basics (2 hours)', 'module-5', 'Kubernetes', ['m5-r1']),
  createChecklistItem('m5-k8s-c2', 'Read: Docker Best Practices (10 mins)', 'module-5', 'Kubernetes', ['m5-r2']),
  createChecklistItem('m5-k8s-c3', 'Dockerize: RAG API with multi-stage Dockerfile (<1GB)', 'module-5', 'Kubernetes'),
  createChecklistItem('m5-k8s-c4', 'Write: K8s Deployment, Service, Ingress YAML', 'module-5', 'Kubernetes'),
  createChecklistItem('m5-k8s-c5', 'Create: Helm chart with values.yaml', 'module-5', 'Kubernetes'),
  createChecklistItem('m5-k8s-c6', 'Configure: NVIDIA Device Plugin for GPU', 'module-5', 'Kubernetes'),
  // LLMOps
  createChecklistItem('m5-ops-c1', 'Read: Langfuse Tracing Documentation', 'module-5', 'LLMOps', ['m5-r3']),
  createChecklistItem('m5-ops-c2', 'Read: Prometheus Metrics Tutorial', 'module-5', 'LLMOps', ['m5-r4']),
  createChecklistItem('m5-ops-c3', 'Integrate: Langfuse/LangSmith tracing for RAG calls', 'module-5', 'LLMOps'),
  createChecklistItem('m5-ops-c4', 'Export: Prometheus metrics (latency, tokens/sec, cost)', 'module-5', 'LLMOps'),
  createChecklistItem('m5-ops-c5', 'Create: Grafana dashboard (P50, P95, P99, error rates)', 'module-5', 'LLMOps'),
  createChecklistItem('m5-ops-c6', 'Build: Weekly RAGAS evaluation pipeline', 'module-5', 'LLMOps'),
  // Load Testing
  createChecklistItem('m5-load-c1', 'Read: Locust Documentation', 'module-5', 'Load Testing', ['m5-r5']),
  createChecklistItem('m5-load-c2', 'Read: k6 Documentation', 'module-5', 'Load Testing', ['m5-r6']),
  createChecklistItem('m5-load-c3', 'Load Test: 100 concurrent users on RAG endpoint', 'module-5', 'Load Testing'),
  createChecklistItem('m5-load-c4', 'Analyze: Identify bottleneck (CPU/GPU/I/O)', 'module-5', 'Load Testing'),
  createChecklistItem('m5-load-c5', 'Optimize: Redis caching for frequent queries', 'module-5', 'Load Testing'),
];

// Export all modules
export const modules: Module[] = [
  {
    id: 'module-0',
    title: 'Module 0: Universal Problem-Solving Mindset',
    shortTitle: 'Mindset',
    description: 'Start here. Do not skip. Master the framework for structured problem solving before diving into patterns.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: [],
    checklist: module0Checklist,
    resources: module0Resources,
    estimatedDays: 1,
    color: 'slate',
  },
  {
    id: 'module-1',
    title: 'Module 1: Pattern-Based DSA Mastery',
    shortTitle: 'DSA',
    description: '12 pattern categories with 75+ LeetCode problems. Master the fundamental algorithms and data structures.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-0'],
    checklist: module1Checklist,
    resources: module1Resources,
    estimatedDays: 45,
    targetProblems: 75,
    color: 'emerald',
  },
  {
    id: 'module-2',
    title: 'Module 2: Low Level Design (LLD) Mastery',
    shortTitle: 'LLD',
    description: '33 design problems covering OOP, SOLID, Design Patterns, and system implementation.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-0'],
    checklist: module2Checklist,
    resources: module2Resources,
    estimatedDays: 30,
    color: 'blue',
  },
  {
    id: 'module-3',
    title: 'Module 3: Python Advanced & Async Programming',
    shortTitle: 'Python',
    description: 'Python internals, typing, descriptors, and asyncio for high-performance applications.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-0'],
    checklist: module3Checklist,
    resources: module3Resources,
    estimatedDays: 6,
    color: 'yellow',
  },
  {
    id: 'module-4',
    title: 'Module 4: AI Systems Fundamentals',
    shortTitle: 'AI Systems',
    description: 'Transformers, RAG architecture, Agent systems, and AI infrastructure optimization.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-1', 'module-3'],
    checklist: module4Checklist,
    resources: module4Resources,
    estimatedDays: 17,
    color: 'violet',
  },
  {
    id: 'module-4.6',
    title: 'Module 4.6: Multimodal Foundations',
    shortTitle: '4.6 Multimodal',
    description: 'CLIP vision-language models, Whisper ASR, and cross-modal alignment with vector search.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-4'],
    checklist: module46Checklist,
    resources: module46Resources,
    estimatedDays: 3,
    color: 'violet',
  },
  {
    id: 'module-4.7',
    title: 'Module 4.7: Speech & Voice Systems',
    shortTitle: '4.7 Voice',
    description: 'Real-time streaming ASR, Voice Activity Detection, TTS pipelines, and voice cloning.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-4.6'],
    checklist: module47Checklist,
    resources: module47Resources,
    estimatedDays: 4,
    color: 'violet',
  },
  {
    id: 'module-4.8',
    title: 'Module 4.8: Multimodal Agent Architecture',
    shortTitle: '4.8 Agents',
    description: 'Vision-language agents, omni-modal integration, multimodal RAG, and video understanding.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-4.7'],
    checklist: module48Checklist,
    resources: module48Resources,
    estimatedDays: 4,
    color: 'violet',
  },
  {
    id: 'module-4.9',
    title: 'Module 4.9: Multimodal Production',
    shortTitle: '4.9 Production',
    description: 'Model quantization (ONNX/INT8), multimodal caching, safety guardrails, and deployment.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-4.8'],
    checklist: module49Checklist,
    resources: module49Resources,
    estimatedDays: 3,
    color: 'violet',
  },
  {
    id: 'module-5',
    title: 'Module 5: Production Engineering & MLOps',
    shortTitle: 'MLOps',
    description: 'Kubernetes, containerization, LLMOps, observability, and load testing.',
    status: 'available',
    isLocked: false,
    isCompleted: false,
    completionPercentage: 0,
    prerequisites: ['module-3', 'module-4.9'],
    checklist: module5Checklist,
    resources: module5Resources,
    estimatedDays: 9,
    color: 'orange',
  },
];

export { dsaPatterns };

// Calculate total stats
export const getTotalStats = () => {
  const totalResources = modules.reduce((acc, m) => acc + m.resources.length, 0);
  const totalChecklistItems = modules.reduce((acc, m) => acc + m.checklist.length, 0);
  const totalProblems = module1Resources.filter(r => r.type === 'leetcode').length;
  const totalEstimatedDays = modules.reduce((acc, m) => acc + m.estimatedDays, 0);
  
  return {
    totalResources,
    totalChecklistItems,
    totalProblems,
    totalEstimatedDays,
  };
};
