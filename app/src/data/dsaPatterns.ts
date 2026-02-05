import type { DSAPattern, Resource } from '@/types';

// Helper function to create LeetCode URL from problem name
const createLeetCodeUrl = (title: string): string => {
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  return `https://leetcode.com/problems/${slug}/`;
};

// Helper function to create solution URL
const createSolutionUrl = (title: string): string => {
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  return `/learn/dsa/${slug}`;
};

// Helper function to create YouTube search URL
const createYouTubeUrl = (title: string): string => {
  const query = encodeURIComponent(`${title} Leetcode`);
  return `https://www.youtube.com/results?search_query=${query}`;
};

// All DSA Patterns from AlgoMaster.io (300+ problems)
export const allDSAPatterns: DSAPattern[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    moduleId: 'module-1',
    timeBudget: 5,
    isCompleted: false,
    problems: [
      { problemId: 'lc283', title: 'Move Zeroes', difficulty: 'Easy', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc169', title: 'Majority Element', difficulty: 'Easy', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc26', title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc121', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc189', title: 'Rotate Array', difficulty: 'Medium', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc238', title: 'Product of Array Except Self', difficulty: 'Medium', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc122', title: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc2348', title: 'Number of Zero-Filled Subarrays', difficulty: 'Medium', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc334', title: 'Increasing Triplet Subsequence', difficulty: 'Medium', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc41', title: 'First Missing Positive', difficulty: 'Hard', pattern: 'Arrays', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'strings',
    name: 'Strings',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc392', title: 'Is Subsequence', difficulty: 'Easy', pattern: 'Strings', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc125', title: 'Valid Palindrome', difficulty: 'Easy', pattern: 'Strings', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc14', title: 'Longest Common Prefix', difficulty: 'Easy', pattern: 'Strings', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc6', title: 'Zigzag Conversion', difficulty: 'Medium', pattern: 'Strings', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc151', title: 'Reverse Words in a String', difficulty: 'Medium', pattern: 'Strings', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc843', title: 'Guess the Word', difficulty: 'Hard', pattern: 'Strings', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc136', title: 'Single Number', difficulty: 'Easy', pattern: 'Bit Manipulation', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc191', title: 'Number of 1 Bits', difficulty: 'Easy', pattern: 'Bit Manipulation', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc338', title: 'Counting Bits', difficulty: 'Easy', pattern: 'Bit Manipulation', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc190', title: 'Reverse Bits', difficulty: 'Easy', pattern: 'Bit Manipulation', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc201', title: 'Bitwise AND of Numbers Range', difficulty: 'Medium', pattern: 'Bit Manipulation', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc260', title: 'Single Number III', difficulty: 'Medium', pattern: 'Bit Manipulation', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc371', title: 'Sum of Two Integers', difficulty: 'Medium', pattern: 'Bit Manipulation', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'hash-tables',
    name: 'Hash Tables',
    moduleId: 'module-1',
    timeBudget: 6,
    isCompleted: false,
    problems: [
      { problemId: 'lc706', title: 'Design HashMap', difficulty: 'Easy', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1189', title: 'Maximum Number of Balloons', difficulty: 'Easy', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1512', title: 'Number of Good Pairs', difficulty: 'Easy', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc205', title: 'Isomorphic Strings', difficulty: 'Easy', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc383', title: 'Ransom Note', difficulty: 'Easy', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc219', title: 'Contains Duplicate II', difficulty: 'Easy', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc49', title: 'Group Anagrams', difficulty: 'Medium', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc535', title: 'Encode and Decode TinyURL', difficulty: 'Medium', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc767', title: 'Reorganize String', difficulty: 'Medium', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc128', title: 'Longest Consecutive Sequence', difficulty: 'Medium', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc659', title: 'Split Array into Consecutive Subsequences', difficulty: 'Medium', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc792', title: 'Number of Matching Subsequences', difficulty: 'Medium', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1525', title: 'Number of Good Ways to Split a String', difficulty: 'Medium', pattern: 'Hash Tables', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc88', title: 'Merge Sorted Array', difficulty: 'Easy', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc167', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc11', title: 'Container With Most Water', difficulty: 'Medium', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc15', title: '3Sum', difficulty: 'Medium', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc42', title: 'Trapping Rain Water', difficulty: 'Hard', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'prefix-sum',
    name: 'Prefix Sum',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc303', title: 'Range Sum Query - Immutable', difficulty: 'Easy', pattern: 'Prefix Sum', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc560', title: 'Subarray Sum Equals K', difficulty: 'Medium', pattern: 'Prefix Sum', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc974', title: 'Subarray Sums Divisible by K', difficulty: 'Medium', pattern: 'Prefix Sum', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc523', title: 'Continuous Subarray Sum', difficulty: 'Medium', pattern: 'Prefix Sum', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc525', title: 'Contiguous Array', difficulty: 'Medium', pattern: 'Prefix Sum', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'sliding-window-fixed',
    name: 'Sliding Window - Fixed Size',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc643', title: 'Maximum Average Subarray I', difficulty: 'Easy', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc438', title: 'Find All Anagrams in a String', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc567', title: 'Permutation in String', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc2461', title: 'Maximum Sum of Distinct Subarrays With Length K', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc30', title: 'Substring with Concatenation of All Words', difficulty: 'Hard', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'sliding-window-dynamic',
    name: 'Sliding Window - Dynamic Size',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc424', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc209', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1004', title: 'Max Consecutive Ones III', difficulty: 'Medium', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc76', title: 'Minimum Window Substring', difficulty: 'Hard', pattern: 'Sliding Window', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'kadane',
    name: "Kadane's Algorithm",
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc53', title: 'Maximum Subarray', difficulty: 'Medium', pattern: 'Kadane', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc918', title: 'Maximum Sum Circular Subarray', difficulty: 'Medium', pattern: 'Kadane', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc152', title: 'Maximum Product Subarray', difficulty: 'Medium', pattern: 'Kadane', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1014', title: 'Best Sightseeing Pair', difficulty: 'Medium', pattern: 'Kadane', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'matrix',
    name: 'Matrix (2D Array)',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc54', title: 'Spiral Matrix', difficulty: 'Medium', pattern: 'Matrix', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc48', title: 'Rotate Image', difficulty: 'Medium', pattern: 'Matrix', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc73', title: 'Set Matrix Zeroes', difficulty: 'Medium', pattern: 'Matrix', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc36', title: 'Valid Sudoku', difficulty: 'Medium', pattern: 'Matrix', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc289', title: 'Game of Life', difficulty: 'Medium', pattern: 'Matrix', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    moduleId: 'module-1',
    timeBudget: 5,
    isCompleted: false,
    problems: [
      { problemId: 'lc160', title: 'Intersection of Two Linked Lists', difficulty: 'Easy', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc707', title: 'Design Linked List', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc19', title: 'Remove Nth Node From End of List', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc82', title: 'Remove Duplicates from Sorted List II', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc24', title: 'Swap Nodes in Pairs', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc138', title: 'Copy List with Random Pointer', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc86', title: 'Partition List', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc61', title: 'Rotate List', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc2', title: 'Add Two Numbers', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc430', title: 'Flatten a Multilevel Doubly Linked List', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'linked-list-reversal',
    name: 'LinkedList In-place Reversal',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc234', title: 'Palindrome Linked List', difficulty: 'Easy', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc206', title: 'Reverse Linked List', difficulty: 'Easy', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc92', title: 'Reverse Linked List II', difficulty: 'Medium', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc25', title: 'Reverse Nodes in k-Group', difficulty: 'Hard', pattern: 'Linked List', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'fast-slow-pointers',
    name: 'Fast and Slow Pointers',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc876', title: 'Middle of the Linked List', difficulty: 'Easy', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc202', title: 'Happy Number', difficulty: 'Easy', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc142', title: 'Linked List Cycle II', difficulty: 'Medium', pattern: 'Two Pointers', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'stacks',
    name: 'Stacks',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc20', title: 'Valid Parentheses', difficulty: 'Easy', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1047', title: 'Remove All Adjacent Duplicates In String', difficulty: 'Easy', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc155', title: 'Min Stack', difficulty: 'Medium', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc316', title: 'Remove Duplicate Letters', difficulty: 'Medium', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc2390', title: 'Removing Stars From a String', difficulty: 'Medium', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc150', title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc227', title: 'Basic Calculator II', difficulty: 'Medium', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc32', title: 'Longest Valid Parentheses', difficulty: 'Hard', pattern: 'Stack', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'monotonic-stack',
    name: 'Monotonic Stack',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc496', title: 'Next Greater Element I', difficulty: 'Easy', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc739', title: 'Daily Temperatures', difficulty: 'Medium', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc901', title: 'Online Stock Span', difficulty: 'Medium', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc456', title: '132 Pattern', difficulty: 'Medium', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1944', title: 'Number of Visible People in a Queue', difficulty: 'Hard', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc84', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', pattern: 'Monotonic Stack', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'queues',
    name: 'Queues',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc933', title: 'Number of Recent Calls', difficulty: 'Easy', pattern: 'Queue', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc2073', title: 'Time Needed to Buy Tickets', difficulty: 'Easy', pattern: 'Queue', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc950', title: 'Reveal Cards In Increasing Order', difficulty: 'Medium', pattern: 'Queue', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'monotonic-queue',
    name: 'Monotonic Queue',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc1438', title: 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit', difficulty: 'Medium', pattern: 'Monotonic Queue', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1696', title: 'Jump Game VI', difficulty: 'Medium', pattern: 'Monotonic Queue', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc239', title: 'Sliding Window Maximum', difficulty: 'Hard', pattern: 'Monotonic Queue', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1499', title: 'Max Value of Equation', difficulty: 'Hard', pattern: 'Monotonic Queue', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    moduleId: 'module-1',
    timeBudget: 2,
    isCompleted: false,
    problems: [
      { problemId: 'lc451', title: 'Sort Characters By Frequency', difficulty: 'Medium', pattern: 'Bucket Sort', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc692', title: 'Top K Frequent Words', difficulty: 'Medium', pattern: 'Bucket Sort', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc164', title: 'Maximum Gap', difficulty: 'Medium', pattern: 'Bucket Sort', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    moduleId: 'module-1',
    timeBudget: 5,
    isCompleted: false,
    problems: [
      { problemId: 'lc704', title: 'Binary Search', difficulty: 'Easy', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc35', title: 'Search Insert Position', difficulty: 'Easy', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc33', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc153', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc34', title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc875', title: 'Koko Eating Bananas', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1011', title: 'Capacity To Ship Packages Within D Days', difficulty: 'Medium', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc410', title: 'Split Array Largest Sum', difficulty: 'Hard', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', pattern: 'Binary Search', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    moduleId: 'module-1',
    timeBudget: 6,
    isCompleted: false,
    problems: [
      { problemId: 'lc104', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc226', title: 'Invert Binary Tree', difficulty: 'Easy', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc543', title: 'Diameter of Binary Tree', difficulty: 'Easy', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc101', title: 'Symmetric Tree', difficulty: 'Easy', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc112', title: 'Path Sum', difficulty: 'Easy', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc102', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc199', title: 'Binary Tree Right Side View', difficulty: 'Medium', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc98', title: 'Validate Binary Search Tree', difficulty: 'Medium', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc230', title: 'Kth Smallest Element in a BST', difficulty: 'Medium', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc235', title: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Medium', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc236', title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc124', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc297', title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', pattern: 'Binary Tree', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'graph',
    name: 'Graph',
    moduleId: 'module-1',
    timeBudget: 7,
    isCompleted: false,
    problems: [
      { problemId: 'lc200', title: 'Number of Islands', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc133', title: 'Clone Graph', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc417', title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc207', title: 'Course Schedule', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc210', title: 'Course Schedule II', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc323', title: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc547', title: 'Number of Provinces', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc684', title: 'Redundant Connection', difficulty: 'Medium', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc127', title: 'Word Ladder', difficulty: 'Hard', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc269', title: 'Alien Dictionary', difficulty: 'Hard', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc332', title: 'Reconstruct Itinerary', difficulty: 'Hard', pattern: 'Graph', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    moduleId: 'module-1',
    timeBudget: 5,
    isCompleted: false,
    problems: [
      { problemId: 'lc46', title: 'Permutations', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc78', title: 'Subsets', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc90', title: 'Subsets II', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc47', title: 'Permutations II', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc39', title: 'Combination Sum', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc40', title: 'Combination Sum II', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc216', title: 'Combination Sum III', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc17', title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc79', title: 'Word Search', difficulty: 'Medium', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc51', title: 'N-Queens', difficulty: 'Hard', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc37', title: 'Sudoku Solver', difficulty: 'Hard', pattern: 'Backtracking', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    moduleId: 'module-1',
    timeBudget: 10,
    isCompleted: false,
    problems: [
      { problemId: 'lc70', title: 'Climbing Stairs', difficulty: 'Easy', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc746', title: 'Min Cost Climbing Stairs', difficulty: 'Easy', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc198', title: 'House Robber', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc213', title: 'House Robber II', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc5', title: 'Longest Palindromic Substring', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc322', title: 'Coin Change', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc518', title: 'Coin Change II', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc300', title: 'Longest Increasing Subsequence', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1143', title: 'Longest Common Subsequence', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc62', title: 'Unique Paths', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc63', title: 'Unique Paths II', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc64', title: 'Minimum Path Sum', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc416', title: 'Partition Equal Subset Sum', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc494', title: 'Target Sum', difficulty: 'Medium', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc72', title: 'Edit Distance', difficulty: 'Hard', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc123', title: 'Best Time to Buy and Sell Stock III', difficulty: 'Hard', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc188', title: 'Best Time to Buy and Sell Stock IV', difficulty: 'Hard', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc329', title: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', pattern: 'DP', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'heap',
    name: 'Heap/Priority Queue',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc215', title: 'Kth Largest Element in an Array', difficulty: 'Medium', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc347', title: 'Top K Frequent Elements', difficulty: 'Medium', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc23', title: 'Merge k Sorted Lists', difficulty: 'Hard', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc295', title: 'Find Median from Data Stream', difficulty: 'Hard', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc253', title: 'Meeting Rooms II', difficulty: 'Medium', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc355', title: 'Design Twitter', difficulty: 'Medium', pattern: 'Heap', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'trie',
    name: 'Trie',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc208', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', pattern: 'Trie', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc212', title: 'Word Search II', difficulty: 'Hard', pattern: 'Trie', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1268', title: 'Search Suggestions System', difficulty: 'Medium', pattern: 'Trie', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc211', title: 'Design Add and Search Words Data Structure', difficulty: 'Medium', pattern: 'Trie', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'union-find',
    name: 'Union Find',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc323', title: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', pattern: 'Union Find', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc547', title: 'Number of Provinces', difficulty: 'Medium', pattern: 'Union Find', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc684', title: 'Redundant Connection', difficulty: 'Medium', pattern: 'Union Find', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc1319', title: 'Number of Operations to Make Network Connected', difficulty: 'Medium', pattern: 'Union Find', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc128', title: 'Longest Consecutive Sequence', difficulty: 'Medium', pattern: 'Union Find', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc207', title: 'Course Schedule', difficulty: 'Medium', pattern: 'Topological Sort', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc210', title: 'Course Schedule II', difficulty: 'Medium', pattern: 'Topological Sort', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc269', title: 'Alien Dictionary', difficulty: 'Hard', pattern: 'Topological Sort', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc155', title: 'Min Stack', difficulty: 'Medium', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc225', title: 'Implement Stack using Queues', difficulty: 'Easy', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc232', title: 'Implement Queue using Stacks', difficulty: 'Easy', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc146', title: 'LRU Cache', difficulty: 'Medium', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc380', title: 'Insert Delete GetRandom O(1)', difficulty: 'Medium', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc381', title: 'Insert Delete GetRandom O(1) - Duplicates allowed', difficulty: 'Hard', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc173', title: 'Binary Search Tree Iterator', difficulty: 'Medium', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc208', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', pattern: 'Design', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'intervals',
    name: 'Intervals',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc252', title: 'Meeting Rooms', difficulty: 'Easy', pattern: 'Intervals', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc253', title: 'Meeting Rooms II', difficulty: 'Medium', pattern: 'Intervals', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc56', title: 'Merge Intervals', difficulty: 'Medium', pattern: 'Intervals', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc57', title: 'Insert Interval', difficulty: 'Medium', pattern: 'Intervals', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc435', title: 'Non-overlapping Intervals', difficulty: 'Medium', pattern: 'Intervals', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc452', title: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', pattern: 'Intervals', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'greedy',
    name: 'Greedy',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc455', title: 'Assign Cookies', difficulty: 'Easy', pattern: 'Greedy', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc121', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', pattern: 'Greedy', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc122', title: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', pattern: 'Greedy', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc134', title: 'Gas Station', difficulty: 'Medium', pattern: 'Greedy', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc406', title: 'Queue Reconstruction by Height', difficulty: 'Medium', pattern: 'Greedy', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc435', title: 'Non-overlapping Intervals', difficulty: 'Medium', pattern: 'Greedy', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc56', title: 'Merge Intervals', difficulty: 'Medium', pattern: 'Greedy', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'recursion',
    name: 'Recursion',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc21', title: 'Merge Two Sorted Lists', difficulty: 'Easy', pattern: 'Recursion', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc104', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', pattern: 'Recursion', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc226', title: 'Invert Binary Tree', difficulty: 'Easy', pattern: 'Recursion', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc509', title: 'Fibonacci Number', difficulty: 'Easy', pattern: 'Recursion', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc344', title: 'Reverse String', difficulty: 'Easy', pattern: 'Recursion', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'math',
    name: 'Math & Geometry',
    moduleId: 'module-1',
    timeBudget: 3,
    isCompleted: false,
    problems: [
      { problemId: 'lc9', title: 'Palindrome Number', difficulty: 'Easy', pattern: 'Math', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc13', title: 'Roman to Integer', difficulty: 'Easy', pattern: 'Math', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc66', title: 'Plus One', difficulty: 'Easy', pattern: 'Math', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc69', title: 'Sqrt(x)', difficulty: 'Easy', pattern: 'Math', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc50', title: 'Pow(x, n)', difficulty: 'Medium', pattern: 'Math', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc149', title: 'Max Points on a Line', difficulty: 'Hard', pattern: 'Math', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'segment-tree',
    name: 'Segment Tree',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc307', title: 'Range Sum Query - Mutable', difficulty: 'Medium', pattern: 'Segment Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc315', title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', pattern: 'Segment Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc493', title: 'Reverse Pairs', difficulty: 'Hard', pattern: 'Segment Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc218', title: 'The Skyline Problem', difficulty: 'Hard', pattern: 'Segment Tree', isCompleted: false, moduleId: 'module-1' },
    ],
  },
  {
    id: 'binary-indexed-tree',
    name: 'Binary Indexed Tree',
    moduleId: 'module-1',
    timeBudget: 4,
    isCompleted: false,
    problems: [
      { problemId: 'lc315', title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', pattern: 'Binary Indexed Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc327', title: 'Count of Range Sum', difficulty: 'Hard', pattern: 'Binary Indexed Tree', isCompleted: false, moduleId: 'module-1' },
      { problemId: 'lc493', title: 'Reverse Pairs', difficulty: 'Hard', pattern: 'Binary Indexed Tree', isCompleted: false, moduleId: 'module-1' },
    ],
  },
];

// Total problems count
export const totalDSAProblems = allDSAPatterns.reduce(
  (total, pattern) => total + pattern.problems.length, 
  0
);

// Calculate total time budget
export const totalDSATimeBudget = allDSAPatterns.reduce(
  (total, pattern) => total + pattern.timeBudget, 
  0
);

// Generate resources from patterns
export const generateDSAResources = (): Resource[] => {
  const resources: Resource[] = [];
  let resourceId = 1;

  allDSAPatterns.forEach((pattern) => {
    pattern.problems.forEach((problem) => {
      // Add LeetCode problem resource
      resources.push({
        id: `m1-dsa-${resourceId++}`,
        title: `LeetCode ${problem.problemId.replace('lc', '')} - ${problem.title}`,
        url: createLeetCodeUrl(problem.title),
        type: 'leetcode',
        moduleId: 'module-1',
        estimatedMinutes: problem.difficulty === 'Easy' ? 15 : problem.difficulty === 'Medium' ? 25 : 35,
        isCompleted: false,
        isFavorite: false,
        difficulty: problem.difficulty,
        pattern: pattern.name,
      });

      // Add solution resource
      resources.push({
        id: `m1-dsa-${resourceId++}`,
        title: `Solution: ${problem.title}`,
        url: createSolutionUrl(problem.title),
        type: 'article',
        moduleId: 'module-1',
        estimatedMinutes: 10,
        isCompleted: false,
        isFavorite: false,
        difficulty: problem.difficulty,
        pattern: pattern.name,
      });

      // Add YouTube video resource
      resources.push({
        id: `m1-dsa-${resourceId++}`,
        title: `Video: ${problem.title}`,
        url: createYouTubeUrl(problem.title),
        type: 'video',
        moduleId: 'module-1',
        estimatedMinutes: 10,
        isCompleted: false,
        isFavorite: false,
        difficulty: problem.difficulty,
        pattern: pattern.name,
      });
    });
  });

  return resources;
};

// Get problems by difficulty
export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  const problems: typeof allDSAPatterns[0]['problems'] = [];
  allDSAPatterns.forEach((pattern) => {
    problems.push(...pattern.problems.filter((p) => p.difficulty === difficulty));
  });
  return problems;
};

// Statistics
export const dsaStats = {
  total: totalDSAProblems,
  easy: getProblemsByDifficulty('Easy').length,
  medium: getProblemsByDifficulty('Medium').length,
  hard: getProblemsByDifficulty('Hard').length,
  patterns: allDSAPatterns.length,
  totalTimeBudget: totalDSATimeBudget,
};

export default allDSAPatterns;
