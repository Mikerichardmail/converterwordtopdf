# Cloudflare Deployment & Architecture Fixes Guide

This document outlines the architectural fixes, configuration changes, and layout adjustments implemented to resolve Cloudflare deployment issues and UI bugs. Use this as a reference guide for future websites deployed on Cloudflare Workers/Pages.

---

## 1. Deploying a Website with Static Assets & Dynamic API Endpoints

### The Problem
When using `npx wrangler deploy` on a Cloudflare build server, Cloudflare expects a Worker deployment. If the project is configured as a Pages project but deployed via the Worker command, you will encounter:
1. `✘ [ERROR] Missing entry-point to Worker script or to assets directory`
2. `▲ [WARNING] It seems that you have run wrangler deploy on a Pages project` (if project names conflict).

### The Solution: Cloudflare Workers with Assets (Modern Spec)
Instead of Cloudflare Pages, use the modern **Cloudflare Workers with Assets** specification. This allows both static frontend files and dynamic backend serverless routes to run under a single Worker.

#### 1. Configuration (`wrangler.jsonc`)
Configure `wrangler.jsonc` in the root directory:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "image-downloader-worker", // Avoid name conflicts with existing Pages projects
  "main": "src/worker.js",          // Entrypoint for dynamic routing & asset fallback
  "compatibility_date": "2026-05-22",
  "observability": {
    "enabled": true
  },
  "assets": {
    "directory": "dist",            // Directory where static assets are compiled
    "binding": "ASSETS",            // Binds static assets to env.ASSETS
    "not_found_handling": "single-page-application"
  },
  "compatibility_flags": [
    "nodejs_compat"
  ]
}
```

#### 2. Worker Entrypoint (`src/worker.js`)
Create a single Worker file to route dynamic API endpoints and fall back to static assets for standard pages:

```javascript
import { handleExtract } from '../api/extract.js';
import { handleProxy } from '../api/proxy.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route dynamic APIs
    if (url.pathname === '/api/extract') {
      return handleExtract(request, env, ctx);
    }
    if (url.pathname === '/api/proxy') {
      return handleProxy(request, env, ctx);
    }

    // Fallback: Serve static assets (Vite compiled files)
    return env.ASSETS.fetch(request);
  }
};
```

---

## 2. Automating Build Commands in CI

### The Problem
In Cloudflare's Git integration deployment pipeline, custom build commands defined inside `wrangler.jsonc` (under `"build": {"command": "npm run build"}`) are **ignored**. Cloudflare runs `npx wrangler deploy` directly, leading to missing asset directories if the frontend isn't pre-compiled.

### The Solution: `postinstall` script hook
Define a `postinstall` script in `package.json`. Cloudflare's build server runs `npm install` (or `npm clean-install`) first. By hooks, this automatically compiles the static assets before the deployment command executes.

#### `package.json` setup:
```json
{
  "scripts": {
    "build": "vite build",
    "postinstall": "npm run build"
  }
}
```

---

## 3. Dynamic Endpoint Directory Naming

### The Problem
If the backend API endpoints are placed inside a folder named `/functions` (e.g. `functions/api/extract.js`), Cloudflare's Wrangler tool automatically assumes a Cloudflare Pages Functions architecture. This triggers warnings/errors when deploying via Worker-based commands.

### The Solution: Rename Folder
Rename the directory from `functions` to a neutral name, such as `api/` (e.g. `api/extract.js` and `api/proxy.js`). 
* Update the routing paths inside `src/worker.js` accordingly.
* This ensures that Wrangler treats the code as standard ES modules imported directly by the Worker script, completely bypassing Cloudflare Pages detection logic.

---

## 4. UI Layout & CSS Overlap Bugs

### The Problem
A global CSS rule targets the generic `<header>` element tag to build a sticky navigation bar:
```css
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  /* ... glassmorphism & background ... */
}
```
If any inner hero section or page header uses the `<header>` HTML tag (e.g. `<header class="blog-header">`), the browser forces it to be `position: fixed; top: 0`, causing the hero banner to stack on top of the navigation bar and cover the main content (such as blog posts).

### The Solution: Avoid semantic tag reuse for layout styling
1. **Never use the generic `<header>` tag for inner headers/hero components.** Use `<div>` or `<section>` tags instead (e.g. `<div class="blog-header">`).
2. Keep the `<header>` element unique to the main navigation navbar wrapper.
