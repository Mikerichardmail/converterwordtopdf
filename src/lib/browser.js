// Detect browser from user agent
// Edge must be checked before Chrome (Edge also contains "Chrome" in UA)

export function getBrowser() {
  const ua = navigator.userAgent

  if (ua.includes('OPR/') || ua.includes('Opera/')) return 'opera'
  if (typeof navigator !== 'undefined' && navigator.brave !== undefined) return 'brave'
  if (ua.includes('Brave/'))  return 'brave'
  if (ua.includes('Edg/'))     return 'edge'
  if (ua.includes('Firefox/')) return 'firefox'
  if (ua.includes('Chrome/'))  return 'chrome'
  if (ua.includes('Safari/'))  return 'safari'
  return 'other'
}

// Replace YOUR_IDs with real IDs after publishing to each store
export const STORE_URLS = {
  chrome:  'https://chromewebstore.google.com/detail/smartpdf-%E2%80%94-merge-split-pd/obhdifdgiompbmngalkgclidickpebka',
  firefox: 'https://addons.mozilla.org/en-US/firefox/addon/smartpdf-merge-split-pdf-files/',
  edge:    'https://chromewebstore.google.com/detail/smartpdf-%E2%80%94-merge-split-pd/obhdifdgiompbmngalkgclidickpebka',
  opera:   'https://chromewebstore.google.com/detail/smartpdf-%E2%80%94-merge-split-pd/obhdifdgiompbmngalkgclidickpebka',
  brave:   'https://chromewebstore.google.com/detail/smartpdf-%E2%80%94-merge-split-pd/obhdifdgiompbmngalkgclidickpebka',
  safari:  null,
  other:   null,
}

export const STORE_LABELS = {
  chrome:  'Add to Chrome',
  firefox: 'Add to Firefox',
  edge:    'Add to Edge',
  opera:   'Add to Opera',
  brave:   'Add to Brave',
  safari:  'Not available for Safari yet',
  other:   'Available for Chrome, Firefox, Edge, Opera & Brave',
}

export const STORE_COLORS = {
  chrome:  'bg-blue-600 hover:bg-blue-700',
  firefox: 'bg-orange-500 hover:bg-orange-600',
  edge:    'bg-blue-700 hover:bg-blue-800',
  opera:   'bg-red-600 hover:bg-red-700',
  brave:   'bg-orange-600 hover:bg-orange-700',
  safari:  'bg-gray-300 cursor-not-allowed',
  other:   'bg-gray-300 cursor-not-allowed',
}

export function isMobile() {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent || ''
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
}

// Returns the install button props for the detected browser
export function getInstallProps() {
  const browser = getBrowser()
  const mobile = isMobile()
  return {
    browser,
    url:     STORE_URLS[browser],
    label:   STORE_LABELS[browser],
    color:   STORE_COLORS[browser],
    enabled: !mobile && !!STORE_URLS[browser],
  }
}
