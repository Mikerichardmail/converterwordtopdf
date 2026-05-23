import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone      from '../components/DropZone'
import ProgressBar   from '../components/ProgressBar'
import InstallBanner from '../components/InstallBanner'
import { safeConvert } from '../lib/crashguard'
import { rotate } from '../converters/pdf'

export default function RotatePdf() {
  const [file,      setFile]      = useState(null)
  const [degrees,   setDegrees]   = useState(90)
  const [progress,  setProgress]  = useState(null)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState(null)

  const handleRotate = async () => {
    if (!file) return

    setProgress({ pct: 0, status: 'Initializing rotation engine…' })
    setResult(null)
    setError(null)

    const outcome = await safeConvert(() =>
      rotate(file, degrees, { onProgress: (pct, status) => setProgress({ pct, status }) })
    )

    if (outcome.error) {
      setError(outcome.message)
    } else {
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
        <title>Rotate PDF Free — Fix PDF Page Orientation | converterwordtopdf.com</title>
        <meta name="description" content="Rotate PDF pages free online. Fix upside down or sideways PDFs instantly. No upload." />
        <link rel="canonical" href="https://converterwordtopdf.com/rotate-pdf" />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
            Unlimited Free Rotations
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">Rotate PDF Free</h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto">Permanently rotate your PDF pages and save the modified file locally. 100% free and private.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-100/40">
          {!result && !progress && (
            <>
              <DropZone
                accept=".pdf"
                onFiles={files => setFile(files[0])}
                label="Drop PDF file here to rotate"
              />
              {file && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📄</span>
                      <span className="font-semibold text-gray-800 break-all">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => { setFile(null); setDegrees(90) }} 
                      className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase"
                    >
                      Clear
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 px-1">
                      Rotation Angle
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[90, 180, 270].map((deg) => (
                        <button
                          key={deg}
                          type="button"
                          onClick={() => setDegrees(deg)}
                          className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
                            degrees === deg
                              ? 'border-brand-500 bg-brand-50 text-brand-600 ring-2 ring-brand-500/10'
                              : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                          }`}
                        >
                          +{deg}° Clockwise
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleRotate}
                disabled={!file}
                className="mt-6 w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-2xl shadow-md shadow-brand-500/10 hover:scale-[1.01] disabled:scale-100 active:scale-[0.99] transition-all duration-200"
              >
                Rotate PDF
              </button>
              <p className="text-[11px] text-gray-400 mt-3 text-center font-semibold">Free Limits: Unlimited rotations daily</p>
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
                  Download PDF
                </button>
                <button 
                  onClick={() => { setResult(null); setFile(null); setDegrees(90) }} 
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]"
                >
                  Rotate Another File
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
            How to rotate PDF files client-side
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Upload PDF', desc: 'Drag and drop or browse to add the PDF document you want to rotate.' },
              { step: '2', title: 'Pick Angle', desc: 'Choose between 90°, 180°, or 270° clockwise rotation angles.' },
              { step: '3', title: 'Rotate & Save', desc: 'Click Rotate PDF. Your permanently oriented PDF is ready to download in seconds.' }
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
                q: 'Does rotating my PDF alter text or reduce image quality?',
                a: 'No. The rotation adjusts coordinate metadata at the page level. No rendering compression takes place, so text outlines and image fidelity are perfectly preserved.'
              },
              {
                q: 'Will the page rotation save permanently?',
                a: 'Yes. Once rotated and downloaded, the pages will display at their new angle permanently across all web browsers, desktop readers, and print pipelines.'
              },
              {
                q: 'Can I select and rotate a single page instead of the entire file?',
                a: 'The web utility rotates all pages in the PDF together. For advanced page-level editing, extraction, and individual page rotation, use our free SmartPDF desktop extension.'
              },
              {
                q: 'Is PDF rotation subject to daily limits?',
                a: 'No, page rotation is completely free and unrestricted. You can rotate as many documents as you need without hitting any limits.'
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
    </>
  )
}
