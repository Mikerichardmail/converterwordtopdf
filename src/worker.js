export default {
  async fetch(request, env) {
    // Fallback: Serve static assets compiled by Vite
    return env.ASSETS.fetch(request)
  }
}
