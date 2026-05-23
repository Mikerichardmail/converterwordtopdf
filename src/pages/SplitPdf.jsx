import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone      from '../components/DropZone'
import ProgressBar   from '../components/ProgressBar'
import InstallBanner from '../components/InstallBanner'
import LimitModal    from '../components/LimitModal'
import { isAtLimit, recordUsage } from '../lib/limits'
import { safeConvert } from '../lib/crashguard'
import { split } from '../converters/pdf'

export default function SplitPdf() {
  const [file,      setFile]      = useState(null)
  const [range,     setRange]     = useState('')
  const [progress,  setProgress]  = useState(null)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState(null)
  const [showLimit, setShowLimit] = useState(false)

  const getPageCountFromRange = (str) => {
    const pages = new Set()
    str.split(',').forEach(part => {
      part = part.trim()
      if (part.includes('-')) {
        const [a, b] = part.split('-').map(Number)
        if (!isNaN(a) && !isNaN(b)) {
          for (let i = a; i <= b; i++) pages.add(i)
        }
      } else {
        const n = parseInt(part)
        if (!isNaN(n)) pages.add(n)
      }
    })
    return pages.size
  }

  const handleSplit = async () => {
    if (!file) return
    if (!range.trim()) return alert('Please enter a page range (e.g. 1-3, 5).')

    const pagesToExtract = getPageCountFromRange(range)
    if (pagesToExtract <= 0) return alert('Please enter a valid page range.')

    if (isAtLimit('split-pdf', pagesToExtract)) {
      setShowLimit(true)
      return
    }

    setProgress({ pct: 0, status: 'Initializing split engine…' })
    setResult(null)
    setError(null)

    const outcome = await safeConvert(() =>
      split(file, range, { onProgress: (pct, status) => setProgress({ pct, status }) })
    )

    if (outcome.error) {
      setError(outcome.message)
    } else {
      recordUsage('split-pdf', pagesToExtract)
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
        <title>Split PDF Files Free — Extract Pages Online | converterwordtopdf.com</title>
        <meta name="description" content="Split PDF into separate pages free. No upload, no sign up. Works in Chrome and Firefox." />
        <link rel="canonical" href="https://converterwordtopdf.com/split-pdf" />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
            Extract PDF Pages
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">Split PDF Files Free</h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto">Extract specific page ranges into a downloaded ZIP file. Zero server uploads.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-100/40">
          {!result && !progress && (
            <>
              <DropZone
                accept=".pdf"
                onFiles={files => setFile(files[0])}
                label="Drop PDF file here to split"
              />
              {file && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📄</span>
                      <span className="font-semibold text-gray-800 break-all">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => { setFile(null); setRange('') }} 
                      className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase"
                    >
                      Clear
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 px-1">
                      Enter Page Range to Extract
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1-3, 5, 8-10"
                      value={range}
                      onChange={e => setRange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 font-semibold text-sm transition-colors text-gray-700 placeholder-gray-400"
                    />
                    <p className="text-[11px] text-gray-400 mt-1.5 px-1 font-medium leading-relaxed">
                      Use commas to separate pages and dashes for ranges. E.g., "1-3, 5" extracts pages 1, 2, 3, and 5.
                    </p>
                  </div>
                </div>
              )}
              <button
                onClick={handleSplit}
                disabled={!file || !range.trim()}
                className="mt-6 w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-2xl shadow-md shadow-brand-500/10 hover:scale-[1.01] disabled:scale-100 active:scale-[0.99] transition-all duration-200"
              >
                Split PDF
              </button>
              <p className="text-[11px] text-gray-400 mt-3 text-center font-semibold">Free Limits: up to 10 split pages daily</p>
            </>
          )}

          {progress && <ProgressBar pct={progress.pct} status={progress.status} />}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-semibold">{error}</div>
          )}

          {result && (
            <div className="mt-6 p-8 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl mb-3">
                ✓
              </div>
              <p className="font-bold text-gray-800 text-base mb-4">{result.filename} is ready</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={download} 
                  className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Download ZIP
                </button>
                <button 
                  onClick={() => { setResult(null); setFile(null); setRange('') }} 
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]"
                >
                  Split Another File
                </button>
              </div>
            </div>
          )}
        </div>

        <InstallBanner />

        {/* How it works */}
        <section className="mt-16 bg-gray-50/50 border border-gray-100 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-brand-500 inline-block" />
            How to split PDF files client-side
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Upload PDF', desc: 'Drag and drop or browse to add the PDF document you want to split.' },
              { step: '2', title: 'Enter Page Range', desc: 'Input the specific page ranges or commas for separate pages (e.g. 1-3, 5).' },
              { step: '3', title: 'Extract Pages', desc: 'Click Split PDF. Your extracted pages will download as a ZIP file instantly.' }
            ].map(s => (
              <div key={s.step} className="relative p-5 bg-white rounded-2xl border border-gray-100">
                <span className="absolute right-4 top-2 text-4xl font-extrabold text-gray-50/70 select-none font-mono">
                  0{s.step}
                </span>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-brand-500 inline-block" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What page range syntax is supported?',
                a: 'Use dashes for ranges and commas to separate distinct pages. For example, "1-3, 5, 8-10" will split out pages 1, 2, 3, 5, 8, 9, and 10 as separate PDF files.'
              },
              {
                q: 'Will the split pages keep their hyperlinks and formatting?',
                a: 'Yes. The extraction engine copies page stream data directly, preserving all embedded links, high-res images, and text formats without alteration.'
              },
              {
                q: 'Why are split pages exported as a ZIP file?',
                a: 'Zipping is done to bundle the newly separated files together, preventing your browser from opening multiple simultaneous download windows.'
              },
              {
                q: 'Is there a page extraction limit?',
                a: 'Free web conversions allow up to 10 split pages daily. Install our free SmartPDF desktop extension for unlimited, offline page extraction.'
              }
            ].map(({ q, a }) => (
              <div key={q} className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors">
                <p className="font-bold text-sm text-gray-800 mb-2">{q}</p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showLimit && <LimitModal tool="split-pdf" onClose={() => setShowLimit(false)} />}
    </>
  )
}
