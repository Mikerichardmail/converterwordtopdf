import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone      from '../components/DropZone'
import ProgressBar   from '../components/ProgressBar'
import InstallBanner from '../components/InstallBanner'
import LimitModal    from '../components/LimitModal'
import { isAtLimit, recordUsage } from '../lib/limits'
import { safeConvert } from '../lib/crashguard'
import { imagesToPdf } from '../converters/pdf'

export default function ImagesToPdf() {
  const [files,     setFiles]     = useState([])
  const [progress,  setProgress]  = useState(null)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState(null)
  const [showLimit, setShowLimit] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) return alert('Please add at least 1 image file.')

    if (isAtLimit('images-to-pdf')) {
      setShowLimit(true)
      return
    }

    setProgress({ pct: 0, status: 'Initializing image compilation…' })
    setResult(null)
    setError(null)

    const outcome = await safeConvert(() =>
      imagesToPdf(files, { onProgress: (pct, status) => setProgress({ pct, status }) })
    )

    if (outcome.error) {
      setError(outcome.message)
    } else {
      recordUsage('images-to-pdf')
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
        <title>Convert Images to PDF Free — JPG PNG to PDF | converterwordtopdf.com</title>
        <meta name="description" content="Convert JPG, PNG, WebP images to PDF free. No upload. Combine multiple images into one PDF." />
        <link rel="canonical" href="https://converterwordtopdf.com/images-to-pdf" />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
            Image compiler
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">Convert Images to PDF Free</h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto">Convert JPG, PNG, WebP, and other image formats into a single PDF file entirely locally.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-100/40">
          {!result && !progress && (
            <>
              <DropZone
                accept="image/*"
                multiple={true}
                onFiles={f => setFiles(prev => [...prev, ...f])}
                label="Drop image files here to convert"
              />
              {files.length > 0 && (
                <div className="mt-6 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wide px-1">
                    <span>Images to Convert ({files.length})</span>
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
                          <span className="flex-shrink-0 text-xl">🖼️</span>
                          <span className="font-semibold text-gray-800 break-all truncate">{f.name}</span>
                          <span className="text-[10px] text-gray-400 font-bold bg-white px-2 py-0.5 border border-gray-100 rounded-md">
                            {(f.size / 1024).toFixed(0)} KB
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
                onClick={handleConvert}
                disabled={files.length === 0}
                className="mt-6 w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-2xl shadow-md shadow-brand-500/10 hover:scale-[1.01] disabled:scale-100 active:scale-[0.99] transition-all duration-200"
              >
                Convert Images to PDF
              </button>
              <p className="text-[11px] text-gray-400 mt-3 text-center font-semibold">Free Limits: up to 5 image conversions daily</p>
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
              <p className="font-bold text-gray-800 text-base mb-4">images.pdf is ready</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={download} 
                  className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Download PDF
                </button>
                <button 
                  onClick={() => { setResult(null); setFiles([]) }} 
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]"
                >
                  Convert More Images
                </button>
              </div>
            </div>
          )}
        </div>

        <InstallBanner />
      </main>

      {showLimit && <LimitModal tool="images-to-pdf" onClose={() => setShowLimit(false)} />}
    </>
  )
}
