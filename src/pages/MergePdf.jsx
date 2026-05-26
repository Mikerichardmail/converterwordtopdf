import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone      from '../components/DropZone'
import ProgressBar   from '../components/ProgressBar'
import InstallBanner from '../components/InstallBanner'
import LimitModal    from '../components/LimitModal'
import { isAtLimit, recordUsage } from '../lib/limits'
import { safeConvert } from '../lib/crashguard'

export default function MergePdf() {
  const [files,     setFiles]     = useState([])
  const [progress,  setProgress]  = useState(null)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState(null)
  const [showLimit, setShowLimit] = useState(false)

  const handleMerge = async () => {
    if (files.length < 2) return alert('Please add at least 2 PDF files to merge.')

    if (isAtLimit('merge-pdf')) {
      setShowLimit(true)
      return
    }

    if (files.length > 3) {
      setShowLimit(true)
      return
    }

    setProgress({ pct: 0, status: 'Initializing PDF merge engine…' })
    setResult(null)
    setError(null)

    const { merge } = await import('../converters/pdf')
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

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
            Combine Files Locally
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">Merge PDF Files Free</h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto">Combine multiple PDFs into one document in seconds. 100% private processing in browser.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-100/40">
          {!result && !progress && (
            <>
              <DropZone
                accept=".pdf"
                multiple={true}
                onFiles={f => setFiles(prev => [...prev, ...f])}
                label="Drop PDF files here (up to 3 files free)"
              />
              {files.length > 0 && (
                <div className="mt-6 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wide px-1">
                    <span>Documents to Merge ({files.length})</span>
                    <button 
                      onClick={() => setFiles([])} 
                      className="text-red-500 hover:text-red-700 transition-colors uppercase"
                    >
                      Remove All
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {files.map((f, i) => (
                      <li key={i} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 hover:border-gray-200 transition-colors animate-fade-in">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span className="flex-shrink-0 text-xl">📄</span>
                          <span className="font-semibold text-gray-800 break-all truncate">{f.name}</span>
                          <span className="text-[10px] text-gray-400 font-bold bg-white px-2 py-0.5 border border-gray-100 rounded-md">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <button 
                          onClick={() => setFiles(files.filter((_, j) => j !== i))} 
                          className="flex-shrink-0 p-1 hover:bg-gray-200/50 rounded-lg text-red-500 hover:text-red-700 transition-colors text-xs font-bold uppercase"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={handleMerge}
                disabled={files.length < 2}
                className="mt-6 w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-2xl shadow-md shadow-brand-500/10 hover:scale-[1.01] disabled:scale-100 active:scale-[0.99] transition-all duration-200"
              >
                Merge PDFs
              </button>
              <p className="text-[11px] text-gray-400 mt-3 text-center font-semibold">Free Limits: up to 3 PDFs per merge</p>
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
              <p className="font-bold text-gray-800 text-base mb-4">merged.pdf is ready</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={download} 
                  className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Download merged.pdf
                </button>
                <button 
                  onClick={() => { setResult(null); setFiles([]) }} 
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]"
                >
                  Merge More Files
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
            How to merge PDF files client-side
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Add PDF Files', desc: 'Drag and drop or browse to add the PDF documents you want to merge.' },
              { step: '2', title: 'Arrange Files', desc: 'Adjust or remove items in the list to achieve your desired merge order.' },
              { step: '3', title: 'Combine & Save', desc: 'Click Merge PDFs. The combined PDF is generated on your device immediately.' }
            ].map(s => (
              <div key={s.step} className="relative p-5 bg-white rounded-2xl border border-gray-100">
                <span className="absolute right-4 top-2 text-4xl font-extrabold text-gray-200 select-none font-mono">
                  0{s.step}
                </span>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{s.desc}</p>
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
                q: 'Will the combined PDF lose text or image quality?',
                a: 'No. The merging engine joins the file structure streams directly. All vector paths, images, and fonts maintain their original full-resolution quality.'
              },
              {
                q: 'Can I rearrange the order of pages within a PDF?',
                a: 'This utility merges entire documents in the order they are listed. To extract individual pages or split files apart first, use our Split PDF page.'
              },
              {
                q: 'Is there a page or file limit when combining?',
                a: 'The free browser tool supports merging up to 3 files together. For unlimited document merges and offline support, install our free SmartPDF desktop extension.'
              },
              {
                q: 'Are my private files safe from servers?',
                a: 'Yes. The entire merging process runs on WebAssembly inside your browser. No files are uploaded to any server or cloud databases.'
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

      {showLimit && <LimitModal tool="merge-pdf" onClose={() => setShowLimit(false)} />}
    </>
  )
}
