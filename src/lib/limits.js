// Track daily usage per tool in localStorage
// Resets automatically at midnight

const LIMITS = {
  'word-to-pdf':  5,
  'pdf-to-word':  3,
  'merge-pdf':    3,
  'split-pdf':    10,   // pages
  'compress-pdf': 5,
  'images-to-pdf':5,
  'rotate-pdf':   Infinity,
}

function getTodayKey(tool) {
  const today = new Date().toISOString().slice(0, 10)  // "2025-05-23"
  return `sp_limit_${tool}_${today}`
}

// Get how many times tool has been used today
export function getUsage(tool) {
  const key = getTodayKey(tool)
  return parseInt(localStorage.getItem(key) || '0')
}

// Get the limit for a tool
export function getLimit(tool) {
  return LIMITS[tool] ?? 5
}

// Check if user has reached their limit
export function isAtLimit(tool, count = 1) {
  const used  = getUsage(tool)
  const limit = getLimit(tool)
  return used + count > limit
}

// Increment usage counter
export function recordUsage(tool, count = 1) {
  const key  = getTodayKey(tool)
  const used = getUsage(tool)
  localStorage.setItem(key, String(used + count))
}

// How many uses remain today
export function remaining(tool) {
  return Math.max(0, getLimit(tool) - getUsage(tool))
}

// Limit messages per tool
export const LIMIT_MESSAGES = {
  'word-to-pdf':   "You've converted 5 files today.",
  'pdf-to-word':   "You've converted 3 files today.",
  'merge-pdf':     "You've merged 3 times today.",
  'split-pdf':     "You've reached the 10-page daily limit.",
  'compress-pdf':  "You've compressed 5 files today.",
  'images-to-pdf': "You've converted 5 image sets today.",
}
