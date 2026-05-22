# converterwordtopdf.com — Website Build Plan
### React + Vite + Tailwind — Cloudflare Pages — $0 hosting forever

---

## Table of Contents

1. [Project Goals](#1-project-goals)
2. [Project Setup](#2-project-setup)
3. [Install Dependencies](#3-install-dependencies)
4. [File Structure](#4-file-structure)
5. [Vite Config](#5-vite-config)
6. [Tailwind Config](#6-tailwind-config)
7. [Browser Detection](#7-browser-detection)
8. [Usage Limits](#8-usage-limits)
9. [Converter Modules](#9-converter-modules)
10. [Components](#10-components)
11. [Pages](#11-pages)
12. [App Router](#12-app-router)
13. [SEO Per Page](#13-seo-per-page)
14. [Blog System](#14-blog-system)
15. [Blog Post Templates](#15-blog-post-templates)
16. [robots.txt and sitemap.xml](#16-robotstxt-and-sitemapxml)
17. [Deploy to Cloudflare Pages](#17-deploy-to-cloudflare-pages)
18. [Connect Custom Domain](#18-connect-custom-domain)
19. [File Reference](#19-file-reference)
20. [Quick Reference](#20-quick-reference)

---

## 1. Project Goals

- Drive Chrome / Firefox / Edge extension installs
- Convert users with free tools then show install CTA when limit hit
- Rank on Google for 50 high-volume PDF search queries
- $0 hosting cost at any traffic volume
- All processing in browser — no server, no uploads

### User Flow

```
Visits converterwordtopdf.com
        ↓
Browser detected automatically
        ↓
Converts files free (tracked in localStorage)
        ↓
Hits daily limit
        ↓
"Install SmartPDF extension — free"
[Add to Chrome →] / [Add to Firefox →] / [Add to Edge →]
        ↓
Installs extension → unlimited free use
        ↓
Hits Pro limit inside extension → $5.99 Gumroad
```

### Daily Free Limits Per Tool

| Tool | Free limit |
|---|---|
| Word → PDF | 5 files/day |
| PDF → Word | 3 files/day |
| Merge PDF | 3 merges/day |
| Split PDF | 10 pages/day |
| Compress PDF | 5 files/day |
| Images → PDF | 5 images/day |
| Rotate PDF | Unlimited |

---

## 2. Project Setup

```bash
mkdir converterwordtopdf
cd converterwordtopdf

npm create vite@latest . -- --template react
npm install

mkdir -p src/pages
mkdir -p src/components
mkdir -p src/converters
mkdir -p src/lib
mkdir -p src/blog
mkdir -p public
```

---

## 3. Install Dependencies

```bash
npm install react-router-dom
npm install react-helmet-async
npm install pdf-lib
npm install pdfjs-dist
npm install mammoth
npm install docx
npm install jszip
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Full `package.json`:

```json
{
  "name": "converterwordtopdf",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev":   "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react":              "^18.0.0",
    "react-dom":          "^18.0.0",
    "react-router-dom":   "^6.0.0",
    "react-helmet-async": "^2.0.0",
    "pdf-lib":            "^1.17.1",
    "pdfjs-dist":         "^4.0.0",
    "mammoth":            "^1.7.0",
    "docx":               "^8.5.0",
    "jszip":              "^3.10.1"
  },
  "devDependencies": {
    "vite":          "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss":   "^3.0.0",
    "postcss":       "^8.0.0",
    "autoprefixer":  "^10.0.0"
  }
}
```

---

## 4. File Structure

```
converterwordtopdf/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects          ← Cloudflare Pages SPA routing
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── lib/
│   │   ├── browser.js      ← browser detection + store URLs
│   │   ├── limits.js       ← localStorage usage tracking
│   │   └── crashguard.js   ← safe async wrapper
│   ├── converters/
│   │   ├── pdf.js          ← merge, split, rotate, compress, imagesToPdf
│   │   ├── docx.js         ← docx → pdf, pdf → docx
│   │   └── image.js        ← image conversion
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── DropZone.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── InstallBanner.jsx
│   │   ├── LimitModal.jsx
│   │   └── ToolCard.jsx
│   ├── pages/
│   │   ├── WordToPdf.jsx
│   │   ├── PdfToWord.jsx
│   │   ├── MergePdf.jsx
│   │   ├── SplitPdf.jsx
│   │   ├── CompressPdf.jsx
│   │   ├── RotatePdf.jsx
│   │   ├── ImagesToPdf.jsx
│   │   └── Blog.jsx
│   └── blog/
│       ├── index.js        ← blog post registry
│       └── posts/
│           ├── word-to-pdf-free.jsx
│           ├── merge-pdf-free.jsx
│           └── ... (50 posts total)
```

---

## 5. Vite Config

Paste into `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split pdf-lib into its own chunk — only loads when needed
        manualChunks: {
          'pdf-lib':   ['pdf-lib'],
          'pdfjs':     ['pdfjs-dist'],
          'mammoth':   ['mammoth'],
          'jszip':     ['jszip'],
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['pdfjs-dist']
  }
})
```

---

## 6. Tailwind Config

Paste into `tailwind.config.js`:

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fef2ee',
          100: '#fde3d9',
          500: '#c0410e',
          600: '#a8380c',
          900: '#0e0c0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      }
    }
  },
  plugins: []
}
```

Paste into `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

body {
  @apply bg-white text-gray-900 antialiased;
}
```

---

## 7. Browser Detection

Paste into `src/lib/browser.js`:

```javascript
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
```

---

## 8. Usage Limits

Paste into `src/lib/limits.js`:

```javascript
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
  'word-to-pdf':   'You\'ve converted 5 files today.',
  'pdf-to-word':   'You\'ve converted 3 files today.',
  'merge-pdf':     'You\'ve merged 3 times today.',
  'split-pdf':     'You\'ve reached the 10-page daily limit.',
  'compress-pdf':  'You\'ve compressed 5 files today.',
  'images-to-pdf': 'You\'ve converted 5 image sets today.',
}
```

---

## 9. Converter Modules

### src/converters/pdf.js

```javascript
import { PDFDocument, degrees } from 'pdf-lib'
import JSZip from 'jszip'

export async function merge(files, { onProgress } = {}) {
  const merged = await PDFDocument.create()
  for (let i = 0; i < files.length; i++) {
    onProgress?.(Math.round((i / files.length) * 80), `Merging file ${i + 1} of ${files.length}…`)
    const buf  = await files[i].arrayBuffer()
    const doc  = await PDFDocument.load(buf)
    const pgs  = await merged.copyPages(doc, doc.getPageIndices())
    pgs.forEach(p => merged.addPage(p))
  }
  onProgress?.(95, 'Saving…')
  const bytes = await merged.save()
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'merged.pdf' }
}

export async function split(file, pageRange, { onProgress } = {}) {
  const buf   = await file.arrayBuffer()
  const src   = await PDFDocument.load(buf)
  const total = src.getPageCount()
  const pages = parsePageRange(pageRange, total)
  const zip   = new JSZip()

  for (let i = 0; i < pages.length; i++) {
    onProgress?.(Math.round((i / pages.length) * 90), `Extracting page ${pages[i]}…`)
    const doc    = await PDFDocument.create()
    const [page] = await doc.copyPages(src, [pages[i] - 1])
    doc.addPage(page)
    zip.file(`page-${pages[i]}.pdf`, await doc.save())
  }

  onProgress?.(95, 'Zipping…')
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  return { blob: zipBlob, filename: 'split-pages.zip' }
}

export async function rotate(file, deg, { onProgress } = {}) {
  onProgress?.(20, 'Loading PDF…')
  const buf = await file.arrayBuffer()
  const doc = await PDFDocument.load(buf)
  onProgress?.(50, 'Rotating pages…')
  doc.getPages().forEach(p => p.setRotation(degrees(deg)))
  const bytes = await doc.save()
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'rotated.pdf' }
}

export async function compress(file, { onProgress } = {}) {
  onProgress?.(20, 'Loading PDF…')
  const buf  = await file.arrayBuffer()
  const doc  = await PDFDocument.load(buf, { updateMetadata: false })
  onProgress?.(60, 'Compressing…')
  const bytes = await doc.save({ useObjectStreams: true, addDefaultPage: false })
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'compressed.pdf' }
}

export async function imagesToPdf(files, { onProgress } = {}) {
  const doc = await PDFDocument.create()
  for (let i = 0; i < files.length; i++) {
    onProgress?.(Math.round((i / files.length) * 90), `Embedding image ${i + 1} of ${files.length}…`)
    const buf  = await files[i].arrayBuffer()
    let img

    if (files[i].type === 'image/jpeg') {
      img = await doc.embedJpg(buf)
    } else {
      const blob   = new Blob([buf], { type: files[i].type })
      const bitmap = await createImageBitmap(blob)
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      canvas.getContext('2d').drawImage(bitmap, 0, 0)
      bitmap.close()
      const pngBlob  = await canvas.convertToBlob({ type: 'image/png' })
      img = await doc.embedPng(await pngBlob.arrayBuffer())
    }

    const page = doc.addPage([img.width, img.height])
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
  }
  const bytes = await doc.save()
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'images.pdf' }
}

function parsePageRange(str, total) {
  const pages = new Set()
  str.split(',').forEach(part => {
    part = part.trim()
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number)
      for (let i = a; i <= Math.min(b, total); i++) pages.add(i)
    } else {
      const n = parseInt(part)
      if (n >= 1 && n <= total) pages.add(n)
    }
  })
  return Array.from(pages).sort((a, b) => a - b)
}
```

### src/lib/crashguard.js

```javascript
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
```

---

## 10. Components

### src/components/Header.jsx

```jsx
import { getInstallProps } from '../lib/browser'
import { Link } from 'react-router-dom'

const tools = [
  { label: 'Word → PDF',   path: '/' },
  { label: 'Merge PDF',    path: '/merge-pdf' },
  { label: 'Split PDF',    path: '/split-pdf' },
  { label: 'Compress PDF', path: '/compress-pdf' },
  { label: 'Rotate PDF',   path: '/rotate-pdf' },
  { label: 'PDF → Word',   path: '/pdf-to-word' },
  { label: 'Images → PDF', path: '/images-to-pdf' },
]

export default function Header() {
  const install = getInstallProps()

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to="/" className="font-bold text-lg text-brand-900">
          converter<span className="text-brand-500">wordtopdf</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm text-gray-600">
          {tools.map(t => (
            <Link key={t.path} to={t.path} className="hover:text-brand-500 transition-colors">
              {t.label}
            </Link>
          ))}
        </nav>

        {install.enabled ? (
          <a
            href={install.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors ${install.color}`}
          >
            {install.label}
          </a>
        ) : (
          <span className="text-xs text-gray-400 px-3 py-2 rounded-lg bg-gray-100">
            {install.label}
          </span>
        )}

      </div>

      {/* Mobile tool strip */}
      <div className="md:hidden overflow-x-auto flex gap-3 px-4 pb-2 text-xs text-gray-500">
        {tools.map(t => (
          <Link key={t.path} to={t.path} className="whitespace-nowrap hover:text-brand-500">
            {t.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
```

### src/components/InstallBanner.jsx

```jsx
import { getInstallProps } from '../lib/browser'

export default function InstallBanner() {
  const install = getInstallProps()

  return (
    <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-center justify-between gap-4 mt-8">
      <div>
        <p className="font-semibold text-sm text-brand-900">SmartPDF Extension — Free</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Unlimited conversions · Works offline · No uploads ever
        </p>
      </div>
      {install.enabled ? (
        <a
          href={install.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`shrink-0 text-white text-xs px-4 py-2 rounded-lg font-medium ${install.color}`}
        >
          {install.label}
        </a>
      ) : (
        <span className="text-xs text-gray-400">Available for Chrome, Firefox & Edge</span>
      )}
    </div>
  )
}
```

### src/components/LimitModal.jsx

```jsx
import { getInstallProps } from '../lib/browser'

export default function LimitModal({ tool, onClose }) {
  const install = getInstallProps()

  const messages = {
    'word-to-pdf':   "You've converted 5 Word files today.",
    'pdf-to-word':   "You've converted 3 PDFs today.",
    'merge-pdf':     "You've used 3 merges today.",
    'split-pdf':     "You've reached the 10-page split limit today.",
    'compress-pdf':  "You've compressed 5 files today.",
    'images-to-pdf': "You've converted 5 image sets today.",
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">

        <div className="text-3xl mb-3 text-center">⏰</div>
        <h3 className="font-bold text-lg text-center mb-1">Daily limit reached</h3>
        <p className="text-sm text-gray-500 text-center mb-4">
          {messages[tool] || "You've reached today's free limit."}
          {' '}Limit resets at midnight.
        </p>

        <p className="text-sm text-gray-700 text-center mb-5">
          Install the free <strong>SmartPDF extension</strong> for unlimited conversions —
          no account, no sign up.
        </p>

        {install.enabled ? (
          <a
            href={install.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center text-white py-3 rounded-xl font-semibold text-sm ${install.color}`}
          >
            {install.label}
          </a>
        ) : (
          <p className="text-center text-xs text-gray-400">
            Available for Chrome, Firefox & Edge
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600 py-2"
        >
          Maybe later
        </button>

      </div>
    </div>
  )
}
```

### src/components/DropZone.jsx

```jsx
import { useRef, useState } from 'react'

export default function DropZone({ onFiles, accept = '*/*', multiple = false, label = 'Drop file here or click to browse' }) {
  const inputRef    = useRef()
  const [over, setOver] = useState(false)

  const handle = (files) => {
    if (!files?.length) return
    onFiles(multiple ? Array.from(files) : [files[0]])
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files) }}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
        ${over ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-brand-400 bg-gray-50'}`}
    >
      <div className="text-4xl mb-3">📄</div>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-1">or click to browse</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={e => handle(e.target.files)}
      />
    </div>
  )
}
```

### src/components/ProgressBar.jsx

```jsx
export default function ProgressBar({ pct, status }) {
  return (
    <div className="mt-6">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{status}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
```

### src/components/Footer.jsx

```jsx
import { Link } from 'react-router-dom'
import { getInstallProps } from '../lib/browser'

export default function Footer() {
  const install = getInstallProps()

  return (
    <footer className="border-t border-gray-200 mt-20 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-sm">
          <div>
            <p className="font-semibold text-gray-700 mb-3">Tools</p>
            <div className="flex flex-col gap-2 text-gray-500">
              <Link to="/"               className="hover:text-brand-500">Word → PDF</Link>
              <Link to="/merge-pdf"      className="hover:text-brand-500">Merge PDF</Link>
              <Link to="/split-pdf"      className="hover:text-brand-500">Split PDF</Link>
              <Link to="/compress-pdf"   className="hover:text-brand-500">Compress PDF</Link>
              <Link to="/rotate-pdf"     className="hover:text-brand-500">Rotate PDF</Link>
              <Link to="/pdf-to-word"    className="hover:text-brand-500">PDF → Word</Link>
              <Link to="/images-to-pdf"  className="hover:text-brand-500">Images → PDF</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-3">Blog</p>
            <div className="flex flex-col gap-2 text-gray-500">
              <Link to="/blog" className="hover:text-brand-500">All posts</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-3">Extension</p>
            <div className="flex flex-col gap-2 text-gray-500">
              {install.enabled && (
                <a href={install.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500">
                  {install.label}
                </a>
              )}
              <span className="text-xs text-gray-400">SmartPDF Pro — $5.99</span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-3">Privacy</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              No files uploaded. No tracking. All conversions happen in your browser.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} converterwordtopdf.com</span>
          <span>No uploads · No sign up · No cost</span>
        </div>

      </div>
    </footer>
  )
}
```

---

## 11. Pages

### src/pages/WordToPdf.jsx

```jsx
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone      from '../components/DropZone'
import ProgressBar   from '../components/ProgressBar'
import InstallBanner from '../components/InstallBanner'
import LimitModal    from '../components/LimitModal'
import { isAtLimit, recordUsage } from '../lib/limits'
import { safeConvert } from '../lib/crashguard'

export default function WordToPdf() {
  const [file,     setFile]     = useState(null)
  const [progress, setProgress] = useState(null)   // { pct, status }
  const [result,   setResult]   = useState(null)   // { blob, filename }
  const [error,    setError]    = useState(null)
  const [showLimit,setShowLimit]= useState(false)

  const handleConvert = async () => {
    if (!file) return

    if (isAtLimit('word-to-pdf')) {
      setShowLimit(true)
      return
    }

    setProgress({ pct: 0, status: 'Loading engine…' })
    setResult(null)
    setError(null)

    const outcome = await safeConvert(async () => {
      const mammoth = (await import('mammoth')).default
      const jsPDF   = (await import('jspdf')).jsPDF

      setProgress({ pct: 20, status: 'Reading Word document…' })
      const buf  = await file.arrayBuffer()
      const res  = await mammoth.convertToHtml({ arrayBuffer: buf })

      setProgress({ pct: 60, status: 'Generating PDF…' })
      const doc  = new jsPDF()
      const div  = document.createElement('div')
      div.innerHTML = res.value
      const text = div.innerText
      const lines = doc.splitTextToSize(text, 180)
      doc.text(lines, 15, 20)

      setProgress({ pct: 90, status: 'Saving…' })
      const pdfBlob = new Blob([doc.output('arraybuffer')], { type: 'application/pdf' })
      return { blob: pdfBlob, filename: file.name.replace(/\.docx?$/i, '.pdf') }
    })

    if (outcome.error) {
      setError(outcome.message)
    } else {
      recordUsage('word-to-pdf')
      setResult(outcome)
    }
    setProgress(null)
  }

  const download = () => {
    const url = URL.createObjectURL(result.blob)
    const a   = Object.assign(document.createElement('a'), { href: url, download: result.filename })
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  return (
    <>
      <Helmet>
        <title>Convert Word to PDF Free — No Upload Needed | converterwordtopdf.com</title>
        <meta name="description" content="Convert Word DOCX files to PDF free in your browser. No upload, no sign up, 100% private. Works on Chrome, Firefox and Edge." />
        <link rel="canonical" href="https://converterwordtopdf.com/" />
      </Helmet>

      <main className="max-w-2xl mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Convert Word to PDF Free
        </h1>
        <p className="text-gray-500 mb-8">
          No upload. Works in your browser. Your files never leave your device.
        </p>

        {!result && !progress && (
          <>
            <DropZone
              accept=".doc,.docx"
              onFiles={files => setFile(files[0])}
              label="Drop your Word document here"
            />
            {file && (
              <div className="mt-3 text-sm text-gray-600">
                Selected: <strong>{file.name}</strong>
              </div>
            )}
            <button
              onClick={handleConvert}
              disabled={!file}
              className="mt-4 w-full bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Convert to PDF →
            </button>
          </>
        )}

        {progress && <ProgressBar pct={progress.pct} status={progress.status} />}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-semibold text-gray-800 mb-4">{result.filename} is ready</p>
            <button
              onClick={download}
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              ⬇ Download PDF
            </button>
            <button
              onClick={() => { setResult(null); setFile(null) }}
              className="mt-3 block w-full text-sm text-gray-400 hover:text-gray-600"
            >
              Convert another file
            </button>
          </div>
        )}

        <InstallBanner />

        {/* How it works */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">How to convert Word to PDF</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
            <li>Drop your .doc or .docx file into the box above</li>
            <li>Click <strong>Convert to PDF</strong></li>
            <li>Download your PDF — done in seconds</li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is my file uploaded to a server?',
                a: 'No. Everything happens in your browser. Your file never leaves your device.'
              },
              {
                q: 'Does it work without Microsoft Word?',
                a: 'Yes. You only need a browser — Chrome, Firefox, or Edge.'
              },
              {
                q: 'Will the formatting be preserved?',
                a: 'Basic text and headings are preserved. Complex layouts with custom fonts or columns may shift slightly.'
              },
              {
                q: 'Is there a file size limit?',
                a: 'Up to 50MB. Files are processed by your browser so the limit depends on your device RAM.'
              }
            ].map(({ q, a }) => (
              <div key={q} className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 mb-1">{q}</p>
                <p className="text-sm text-gray-500">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {showLimit && <LimitModal tool="word-to-pdf" onClose={() => setShowLimit(false)} />}
    </>
  )
}
```

### src/pages/MergePdf.jsx

```jsx
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone      from '../components/DropZone'
import ProgressBar   from '../components/ProgressBar'
import InstallBanner from '../components/InstallBanner'
import LimitModal    from '../components/LimitModal'
import { isAtLimit, recordUsage } from '../lib/limits'
import { safeConvert } from '../lib/crashguard'
import { merge } from '../converters/pdf'

export default function MergePdf() {
  const [files,     setFiles]     = useState([])
  const [progress,  setProgress]  = useState(null)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState(null)
  const [showLimit, setShowLimit] = useState(false)

  const handleMerge = async () => {
    if (files.length < 2) return alert('Add at least 2 PDF files.')

    if (isAtLimit('merge-pdf')) {
      setShowLimit(true)
      return
    }

    if (files.length > 3) {
      setShowLimit(true)
      return
    }

    setProgress({ pct: 0, status: 'Starting merge…' })
    setResult(null)
    setError(null)

    const outcome = await safeConvert(() =>
      merge(files, { onProgress: (pct, status) => setProgress({ pct, status }) })
    )

    if (outcome.error) {
      setError(outcome.message)
    } else {
      recordUsage('merge-pdf')
      setResult(outcome)
    }
    setProgress(null)
  }

  const download = () => {
    const url = URL.createObjectURL(result.blob)
    const a   = Object.assign(document.createElement('a'), { href: url, download: result.filename })
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  return (
    <>
      <Helmet>
        <title>Merge PDF Files Free — Combine PDFs Online | converterwordtopdf.com</title>
        <meta name="description" content="Merge PDF files free in your browser. No upload, no sign up. Combine multiple PDFs into one file instantly." />
        <link rel="canonical" href="https://converterwordtopdf.com/merge-pdf" />
      </Helmet>

      <main className="max-w-2xl mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDF Files Free</h1>
        <p className="text-gray-500 mb-8">Combine multiple PDFs into one. No upload. 100% private.</p>

        {!result && !progress && (
          <>
            <DropZone
              accept=".pdf"
              multiple={true}
              onFiles={f => setFiles(prev => [...prev, ...f])}
              label="Drop PDF files here (up to 3 free)"
            />
            {files.length > 0 && (
              <ul className="mt-3 space-y-1">
                {files.map((f, i) => (
                  <li key={i} className="text-sm text-gray-600 flex justify-between">
                    <span>{f.name}</span>
                    <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-400 text-xs">remove</button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handleMerge}
              disabled={files.length < 2}
              className="mt-4 w-full bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Merge PDFs →
            </button>
            <p className="text-xs text-gray-400 mt-2 text-center">Free: up to 3 PDFs per merge</p>
          </>
        )}

        {progress && <ProgressBar pct={progress.pct} status={progress.status} />}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-semibold text-gray-800 mb-4">merged.pdf is ready</p>
            <button onClick={download} className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold">
              ⬇ Download merged.pdf
            </button>
            <button onClick={() => { setResult(null); setFiles([]) }} className="mt-3 block w-full text-sm text-gray-400">
              Merge more files
            </button>
          </div>
        )}

        <InstallBanner />

      </main>

      {showLimit && <LimitModal tool="merge-pdf" onClose={() => setShowLimit(false)} />}
    </>
  )
}
```

### Other pages follow the same pattern

Create these files using the same structure as `MergePdf.jsx` above,
swapping the tool name, title, description, converter function, and limit key:

| File | Tool key | H1 | Converter |
|---|---|---|---|
| `SplitPdf.jsx` | `split-pdf` | Split PDF Files Free | `split()` |
| `CompressPdf.jsx` | `compress-pdf` | Compress PDF Free | `compress()` |
| `RotatePdf.jsx` | `rotate-pdf` | Rotate PDF Free | `rotate()` |
| `PdfToWord.jsx` | `pdf-to-word` | Convert PDF to Word Free | mammoth reverse |
| `ImagesToPdf.jsx` | `images-to-pdf` | Convert Images to PDF Free | `imagesToPdf()` |

Each page:
- Unique `<title>` and `<meta name="description">`
- Unique `<link rel="canonical">`
- Matching `isAtLimit()` and `recordUsage()` key
- `<InstallBanner />` below the tool
- FAQ section with 4 questions relevant to that tool

---

## 12. App Router

### src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
```

### src/App.jsx

```jsx
import { Routes, Route } from 'react-router-dom'
import Header      from './components/Header'
import Footer      from './components/Footer'
import WordToPdf   from './pages/WordToPdf'
import MergePdf    from './pages/MergePdf'
import SplitPdf    from './pages/SplitPdf'
import CompressPdf from './pages/CompressPdf'
import RotatePdf   from './pages/RotatePdf'
import PdfToWord   from './pages/PdfToWord'
import ImagesToPdf from './pages/ImagesToPdf'
import Blog        from './pages/Blog'
import BlogPost    from './pages/BlogPost'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/"              element={<WordToPdf />} />
          <Route path="/merge-pdf"     element={<MergePdf />} />
          <Route path="/split-pdf"     element={<SplitPdf />} />
          <Route path="/compress-pdf"  element={<CompressPdf />} />
          <Route path="/rotate-pdf"    element={<RotatePdf />} />
          <Route path="/pdf-to-word"   element={<PdfToWord />} />
          <Route path="/images-to-pdf" element={<ImagesToPdf />} />
          <Route path="/blog"          element={<Blog />} />
          <Route path="/blog/:slug"    element={<BlogPost />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
```

---

## 13. SEO Per Page

Each page must have these in `<Helmet>`:

```jsx
<Helmet>
  <title>{pageTitle} | converterwordtopdf.com</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`https://converterwordtopdf.com${path}`} />
  <meta property="og:title"       content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url"         content={`https://converterwordtopdf.com${path}`} />
  <meta property="og:type"        content="website" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type":    "WebApplication",
    "name":     pageTitle,
    "url":      `https://converterwordtopdf.com${path}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  })}</script>
</Helmet>
```

### SEO values per page

| Page | Title | Description |
|---|---|---|
| / | Convert Word to PDF Free — No Upload Needed | Convert Word DOCX files to PDF free in your browser. No upload, no sign up, 100% private. |
| /merge-pdf | Merge PDF Files Free — Combine PDFs Online | Merge PDF files free in your browser. Combine multiple PDFs into one. No upload required. |
| /split-pdf | Split PDF Files Free — Extract Pages Online | Split PDF into separate pages free. No upload, no sign up. Works in Chrome and Firefox. |
| /compress-pdf | Compress PDF Free — Reduce PDF File Size | Compress PDF files free in your browser. Reduce file size without losing quality. No upload. |
| /rotate-pdf | Rotate PDF Free — Fix PDF Page Orientation | Rotate PDF pages free online. Fix upside down or sideways PDFs instantly. No upload. |
| /pdf-to-word | Convert PDF to Word Free — PDF to DOCX | Convert PDF to editable Word document free. No upload, no Adobe needed. Works in browser. |
| /images-to-pdf | Convert Images to PDF Free — JPG PNG to PDF | Convert JPG, PNG, WebP images to PDF free. No upload. Combine multiple images into one PDF. |

---

## 14. Blog System

### src/pages/Blog.jsx

```jsx
import { Helmet }    from 'react-helmet-async'
import { Link }      from 'react-router-dom'
import { ALL_POSTS } from '../blog/index'

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>PDF Help & Guides | converterwordtopdf.com Blog</title>
        <meta name="description" content="Free guides on converting, merging, splitting and compressing PDF files. No software needed." />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">PDF Guides</h1>
        <p className="text-gray-500 mb-10">Free tutorials on working with PDF files.</p>

        <div className="space-y-6">
          {ALL_POSTS.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:bg-brand-50 transition-colors"
            >
              <span className="text-xs text-brand-500 font-medium uppercase tracking-wide">
                {post.category}
              </span>
              <h2 className="font-bold text-gray-900 mt-1 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
```

### src/pages/BlogPost.jsx

```jsx
import { useParams, Link } from 'react-router-dom'
import { Helmet }          from 'react-helmet-async'
import { ALL_POSTS }       from '../blog/index'
import InstallBanner       from '../components/InstallBanner'

export default function BlogPost() {
  const { slug } = useParams()
  const post     = ALL_POSTS.find(p => p.slug === slug)

  if (!post) return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Post not found</h1>
      <Link to="/blog" className="text-brand-500">← Back to blog</Link>
    </main>
  )

  const Content = post.component

  return (
    <>
      <Helmet>
        <title>{post.title} | converterwordtopdf.com</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://converterwordtopdf.com/blog/${post.slug}`} />
      </Helmet>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/blog" className="text-sm text-brand-500 mb-6 block">← All guides</Link>
        <span className="text-xs text-brand-500 font-medium uppercase tracking-wide">{post.category}</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-6">{post.title}</h1>
        <div className="prose prose-gray max-w-none text-sm leading-relaxed">
          <Content />
        </div>
        <InstallBanner />
      </main>
    </>
  )
}
```

### src/blog/index.js

```javascript
// Register all blog posts here
// Each post needs: slug, title, description, category, component

import WordToPdfPost    from './posts/word-to-pdf-free'
import MergePdfPost     from './posts/merge-pdf-free'
import CompressPdfPost  from './posts/compress-pdf'
import JpgToPdfPost     from './posts/jpg-to-pdf'
import SafeUploadPost   from './posts/safe-pdf-upload'
// ... import all 50 posts

export const ALL_POSTS = [
  {
    slug:        'word-to-pdf-free',
    title:       'How to Convert Word to PDF Free Without Losing Formatting',
    description: 'Three ways to convert DOCX to PDF for free — no software, no upload, no Adobe.',
    category:    'Word & PDF',
    component:   WordToPdfPost,
  },
  {
    slug:        'merge-pdf-free',
    title:       'How to Merge PDF Files Without Uploading Them Online',
    description: 'Combine multiple PDF files into one for free — all in your browser.',
    category:    'Merge & Split',
    component:   MergePdfPost,
  },
  {
    slug:        'compress-pdf',
    title:       'How to Compress a PDF Without Losing Quality',
    description: 'Reduce PDF file size for free without losing image or text quality.',
    category:    'Compress',
    component:   CompressPdfPost,
  },
  {
    slug:        'jpg-to-pdf',
    title:       'How to Convert JPG to PDF Free Without Uploading',
    description: 'Turn JPG, PNG and WebP images into a PDF in seconds — no upload needed.',
    category:    'Images & PDF',
    component:   JpgToPdfPost,
  },
  {
    slug:        'safe-pdf-upload',
    title:       'Is It Safe to Upload PDF Files to Online Converters',
    description: 'What really happens to your files when you use free PDF tools online.',
    category:    'Privacy',
    component:   SafeUploadPost,
  },
  // ... add all 50 posts
]
```

---

## 15. Blog Post Templates

Each post file is a React component in `src/blog/posts/`.
Below is the exact template and all 50 post outlines.

### Post Template

```jsx
// src/blog/posts/SLUG.jsx
import { Link } from 'react-router-dom'

export default function PostName() {
  return (
    <>
      {/* Intro — 2 paragraphs */}
      <p>Opening paragraph describing the problem the reader has.</p>
      <p>Second paragraph — what this guide covers.</p>

      {/* Method 1 — using the website */}
      <h2>Method 1: Using converterwordtopdf.com (Free, No Upload)</h2>
      <ol>
        <li>Go to <Link to="/">converterwordtopdf.com</Link></li>
        <li>Drop your file into the box</li>
        <li>Click Convert</li>
        <li>Download the result</li>
      </ol>
      <p>Your file never leaves your device. No sign up required.</p>

      {/* Method 2 — using the extension */}
      <h2>Method 2: Using the SmartPDF Chrome Extension</h2>
      <p>
        If you convert files regularly, install the free SmartPDF extension.
        It works offline and has no daily limits.
      </p>
      <p>
        <a href="https://chromewebstore.google.com/detail/YOUR_ID" target="_blank" rel="noopener noreferrer">
          Add SmartPDF to Chrome — Free →
        </a>
      </p>

      {/* Method 3 — native / offline method */}
      <h2>Method 3: Using [Word / Google Docs / Mac Preview]</h2>
      <ol>
        <li>Step 1…</li>
        <li>Step 2…</li>
        <li>Step 3…</li>
      </ol>

      {/* FAQ */}
      <h2>Frequently Asked Questions</h2>
      <h3>Question 1?</h3>
      <p>Answer.</p>
      <h3>Question 2?</h3>
      <p>Answer.</p>
      <h3>Question 3?</h3>
      <p>Answer.</p>

      {/* Conclusion */}
      <h2>Conclusion</h2>
      <p>
        The fastest way is to use <Link to="/">converterwordtopdf.com</Link> — free,
        no upload, works in any browser.
      </p>
    </>
  )
}
```

---

### All 50 Blog Posts — Titles, Slugs, Categories

#### Category 1 — Word & PDF

| # | Slug | Title |
|---|---|---|
| 1 | `word-to-pdf-free` | How to Convert Word to PDF Free Without Losing Formatting |
| 2 | `pdf-to-word` | How to Convert PDF to Word Without Losing Formatting |
| 3 | `word-to-pdf-mac` | How to Convert Word to PDF on Mac Without Adobe |
| 4 | `word-to-pdf-mobile` | How to Convert Word to PDF on iPhone and Android |
| 5 | `editable-pdf-free` | How to Make a PDF Editable Without Adobe Acrobat |
| 6 | `save-word-as-pdf` | How to Save a Word Document as PDF in 3 Seconds |
| 7 | `docx-vs-pdf` | DOCX vs PDF — Which Format Should You Use and When |

#### Category 2 — Merge & Split

| # | Slug | Title |
|---|---|---|
| 8 | `merge-pdf-free` | How to Merge PDF Files Without Uploading Them Online |
| 9 | `combine-pdf-mac-windows` | How to Combine PDF Files on Mac, Windows and Linux |
| 10 | `split-pdf-free` | How to Split a PDF Into Separate Pages for Free |
| 11 | `extract-pdf-page` | How to Extract One Page From a PDF Without Adobe |
| 12 | `merge-pdf-iphone` | How to Merge PDF Files on iPhone Without an App |
| 13 | `combine-pdf-windows-11` | How to Combine PDF Files on Windows 11 Without Software |
| 14 | `split-large-pdf` | How to Split a Large PDF Into Smaller Files |

#### Category 3 — Compress & Optimize

| # | Slug | Title |
|---|---|---|
| 15 | `compress-pdf` | How to Compress a PDF Without Losing Quality |
| 16 | `reduce-pdf-size-email` | How to Reduce PDF File Size for Email Attachments |
| 17 | `pdf-too-large` | Why Is My PDF So Large and How to Fix It |
| 18 | `compress-pdf-mac` | How to Compress a PDF on Mac Without Software |
| 19 | `pdf-too-large-email` | How to Send a PDF That Is Too Large for Email |

#### Category 4 — Images & PDF

| # | Slug | Title |
|---|---|---|
| 20 | `jpg-to-pdf` | How to Convert JPG to PDF Free Without Uploading |
| 21 | `png-to-pdf` | How to Convert PNG to PDF on Any Device |
| 22 | `images-to-pdf` | How to Convert Multiple Images to One PDF File |
| 23 | `pdf-to-image` | How to Convert a PDF Page to an Image or Screenshot |
| 24 | `scan-to-pdf` | How to Scan Documents to PDF With Your Phone Camera |

#### Category 5 — Privacy & Security

| # | Slug | Title |
|---|---|---|
| 25 | `safe-pdf-upload` | Is It Safe to Upload PDF Files to Online Converters |
| 26 | `online-pdf-tools-privacy` | What Happens to Your Files When You Use Online PDF Tools |
| 27 | `convert-pdf-without-upload` | How to Convert PDF Without Uploading to a Server |
| 28 | `pdf-privacy-risk` | Why You Should Never Upload Contracts to Free PDF Sites |
| 29 | `private-pdf-converter` | Best Private PDF Converter That Doesn't Store Your Files |

#### Category 6 — Rotate, Password & Other Tools

| # | Slug | Title |
|---|---|---|
| 30 | `rotate-pdf` | How to Rotate a PDF and Save It Permanently |
| 31 | `password-protect-pdf` | How to Password Protect a PDF for Free |
| 32 | `remove-pdf-password` | How to Remove Password From a PDF File |
| 33 | `watermark-pdf-free` | How to Add a Watermark to a PDF Without Adobe |
| 34 | `sign-pdf-free` | How to Sign a PDF Without Printing It |

#### Category 7 — Excel, CSV & Data

| # | Slug | Title |
|---|---|---|
| 35 | `excel-to-pdf` | How to Convert Excel to PDF Without Microsoft Office |
| 36 | `csv-to-excel` | How to Convert CSV to Excel in One Click |
| 37 | `excel-to-csv` | How to Convert Excel to CSV and Keep Formatting |
| 38 | `json-to-excel` | How to Convert JSON to Excel Without Coding |
| 39 | `pdf-table-to-excel` | How to Convert PDF Tables to Excel Spreadsheet |

#### Category 8 — Comparisons

| # | Slug | Title |
|---|---|---|
| 40 | `smallpdf-vs-ilovepdf` | SmallPDF vs iLovePDF vs SmartPDF — Which Is Best in 2025 |
| 41 | `adobe-acrobat-alternative` | Adobe Acrobat vs Free PDF Tools — Is Acrobat Worth It |
| 42 | `free-pdf-editor-no-signup` | Best Free PDF Editors That Don't Require Sign Up |
| 43 | `chrome-extension-pdf` | Best Chrome Extensions for PDF in 2025 |
| 44 | `free-pdf-tools` | Top 10 Free PDF Tools That Work Without an Account |

#### Category 9 — How PDF Works

| # | Slug | Title |
|---|---|---|
| 45 | `what-is-pdf` | What Is a PDF File and Why Is It the Standard Format |
| 46 | `pdf-looks-different` | Why PDF Files Look Different on Different Computers |
| 47 | `pdf-image-quality` | Why Your PDF Has Bad Quality Images and How to Fix It |
| 48 | `pdf-text-not-selectable` | Why PDF Text Is Not Selectable and How to Fix It |
| 49 | `what-is-ocr` | What Is OCR and How to Make Scanned PDFs Searchable |
| 50 | `pdf-vs-pdfa` | PDF vs PDF/A — What Is the Difference |

---

### Build order for posts

```
Week 1 (highest traffic):
  1, 8, 15, 20, 25

Week 2:
  2, 10, 16, 21, 26

Week 3:
  3, 9, 17, 22, 27

Continue at 5 posts/week until all 50 done.
```

---

## 16. robots.txt and sitemap.xml

### public/robots.txt

```
User-agent: *
Allow: /

Sitemap: https://converterwordtopdf.com/sitemap.xml
```

### public/sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://converterwordtopdf.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/merge-pdf</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/split-pdf</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/compress-pdf</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/rotate-pdf</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/pdf-to-word</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/images-to-pdf</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Blog posts — add one entry per post as you publish -->
  <url>
    <loc>https://converterwordtopdf.com/blog/word-to-pdf-free</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://converterwordtopdf.com/blog/merge-pdf-free</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- repeat for all 50 posts -->

</urlset>
```

### public/_redirects

Required for Cloudflare Pages SPA routing — without this, refreshing any page returns 404.

```
/*    /index.html    200
```

---

## 17. Deploy to Cloudflare Pages

```bash
# 1. Build the site
npm run build
# → dist/ folder created

# 2. Push to GitHub
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/converterwordtopdf
git push -u origin main

# 3. Go to pages.cloudflare.com
# Click: Create a project → Connect to Git
# Select your GitHub repo

# 4. Build settings:
#   Framework preset:  Vite
#   Build command:     npm run build
#   Build output dir:  dist
#   Node version:      18

# 5. Click Save and Deploy
# Cloudflare builds and hosts it
# URL: converterwordtopdf.pages.dev

# Future deploys: just git push — Cloudflare auto-rebuilds
```

---

## 18. Connect Custom Domain

```
1. Buy converterwordtopdf.com from Namecheap / Cloudflare Registrar (~$10/yr)

2. In Cloudflare Pages:
   Your project → Custom domains → Add custom domain
   Enter: converterwordtopdf.com

3. If domain is on Cloudflare Registrar:
   DNS updates automatically

4. If domain is on Namecheap:
   Add these DNS records in Namecheap:
   Type: CNAME
   Name: @
   Value: converterwordtopdf.pages.dev

5. SSL certificate: Cloudflare issues it automatically
   Wait 5–10 minutes → site live at https://converterwordtopdf.com
```

---

## 19. File Reference

```
converterwordtopdf/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── lib/
    │   ├── browser.js        ← browser detection + store URLs
    │   ├── limits.js         ← localStorage daily limit tracker
    │   └── crashguard.js     ← safe async wrapper
    │
    ├── converters/
    │   ├── pdf.js            ← merge, split, rotate, compress, imagesToPdf
    │   ├── docx.js           ← word → pdf, pdf → word
    │   └── image.js          ← image conversion
    │
    ├── components/
    │   ├── Header.jsx        ← nav + browser-detected install button
    │   ├── Footer.jsx        ← links + privacy note
    │   ├── DropZone.jsx      ← drag & drop file input
    │   ├── ProgressBar.jsx   ← animated progress indicator
    │   ├── InstallBanner.jsx ← sticky install CTA below each tool
    │   └── LimitModal.jsx    ← modal shown on limit hit
    │
    ├── pages/
    │   ├── WordToPdf.jsx     ← / (homepage)
    │   ├── MergePdf.jsx      ← /merge-pdf
    │   ├── SplitPdf.jsx      ← /split-pdf
    │   ├── CompressPdf.jsx   ← /compress-pdf
    │   ├── RotatePdf.jsx     ← /rotate-pdf
    │   ├── PdfToWord.jsx     ← /pdf-to-word
    │   ├── ImagesToPdf.jsx   ← /images-to-pdf
    │   ├── Blog.jsx          ← /blog
    │   └── BlogPost.jsx      ← /blog/:slug
    │
    └── blog/
        ├── index.js          ← post registry (slug, title, component)
        └── posts/            ← 50 .jsx files, one per post
            ├── word-to-pdf-free.jsx
            ├── merge-pdf-free.jsx
            └── ... (50 total)
```

---

## 20. Quick Reference

```bash
# 1. Setup
mkdir converterwordtopdf && cd converterwordtopdf
npm create vite@latest . -- --template react
npm install

# 2. Install deps
npm install react-router-dom react-helmet-async pdf-lib pdfjs-dist mammoth docx jszip
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Write all files (Sections 5–15 above)

# 4. Add store URLs
# src/lib/browser.js → STORE_URLS → paste Chrome/Firefox/Edge IDs
# after publishing extension to each store

# 5. Dev server
npm run dev
# → http://localhost:5173

# 6. Test every page
#   / → Word to PDF works
#   /merge-pdf → limit fires after 3 merges → LimitModal shows correct install button
#   /blog → posts list renders
#   /blog/word-to-pdf-free → post renders

# 7. Build
npm run build

# 8. Push to GitHub + deploy on Cloudflare Pages
# Build command: npm run build
# Output: dist

# 9. Add custom domain
# converterwordtopdf.com → Cloudflare Pages custom domain

# 10. Publish blog posts
# Write 5 posts/week in src/blog/posts/
# Register each in src/blog/index.js
# Update sitemap.xml with new URLs
# git push → auto-deploys
```

---

*converterwordtopdf.com — $0 hosting · unlimited traffic · drives extension installs*
