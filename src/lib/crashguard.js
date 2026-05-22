export async function safeConvert(fn) {
  const start = Date.now()
  try {
    const result = await Promise.race([fn(), timeout(60_000)])
    return { ...result, timeMs: Date.now() - start, error: false }
  } catch (err) {
    return { error: true, message: humanError(err), timeMs: Date.now() - start }
  }
}

function timeout(ms) {
  return new Promise((_, r) => setTimeout(() => r(new Error('timeout')), ms))
}

function humanError(err) {
  const m = (err?.message || '').toLowerCase()
  if (m.includes('timeout'))  return 'Took too long. Try a smaller file.'
  if (m.includes('memory'))   return 'File too large for your browser. Try a smaller file.'
  if (m.includes('password')) return 'PDF is password protected. Remove password first.'
  if (m.includes('corrupt'))  return 'File appears damaged or unsupported.'
  return 'Something went wrong. Try again.'
}
