// Detect browser from user agent
// Edge must be checked before Chrome (Edge also contains "Chrome" in UA)

export function getBrowser() {
  const ua = navigator.userAgent

  if (ua.includes('Edg/'))     return 'edge'
  if (ua.includes('Firefox/')) return 'firefox'
  if (ua.includes('Chrome/'))  return 'chrome'
  if (ua.includes('Safari/'))  return 'safari'
  return 'other'
}

// Replace YOUR_IDs with real IDs after publishing to each store
export const STORE_URLS = {
  chrome:  'https://chromewebstore.google.com/detail/smartpdf/YOUR_CHROME_ID',
  firefox: 'https://addons.mozilla.org/en-US/firefox/addon/smartpdf/',
  edge:    'https://microsoftedge.microsoft.com/addons/detail/smartpdf/YOUR_EDGE_ID',
  safari:  null,
  other:   null,
}

export const STORE_LABELS = {
  chrome:  'Add to Chrome — Free',
  firefox: 'Add to Firefox — Free',
  edge:    'Add to Edge — Free',
  safari:  'Not available for Safari yet',
  other:   'Available for Chrome, Firefox & Edge',
}

export const STORE_COLORS = {
  chrome:  'bg-blue-600 hover:bg-blue-700',
  firefox: 'bg-orange-500 hover:bg-orange-600',
  edge:    'bg-blue-700 hover:bg-blue-800',
  safari:  'bg-gray-300 cursor-not-allowed',
  other:   'bg-gray-300 cursor-not-allowed',
}

// Returns the install button props for the detected browser
export function getInstallProps() {
  const browser = getBrowser()
  return {
    browser,
    url:     STORE_URLS[browser],
    label:   STORE_LABELS[browser],
    color:   STORE_COLORS[browser],
    enabled: !!STORE_URLS[browser],
  }
}
