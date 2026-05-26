import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone      from '../components/DropZone'
import ProgressBar   from '../components/ProgressBar'
import InstallBanner from '../components/InstallBanner'
import LimitModal    from '../components/LimitModal'
import { isAtLimit, recordUsage } from '../lib/limits'
import { safeConvert } from '../lib/crashguard'

export default function PdfToWord() {
  const [file,      setFile]      = useState(null)
  const [progress,  setProgress]  = useState(null)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState(null)
  const [showLimit, setShowLimit] = useState(false)

  const handleConvert = async () => {
    if (!file) return

    if (isAtLimit('pdf-to-word')) {
      setShowLimit(true)
      return
    }

    setProgress({ pct: 0, status: 'Initializing PDF extraction…' })
    setResult(null)
    setError(null)

    const { convertPdfToWord } = await import('../converters/docx')
    const outcome = await safeConvert(() =>
      convertPdfToWord(file, { onProgress: (pct, status) => setProgress({ pct, status }) })
    )

    if (outcome.error) {
      setError(outcome.message)
    } else {
      recordUsage('pdf-to-word')
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
        <title>Convert PDF to Word Free — PDF to DOCX | converterwordtopdf.com</title>
        <meta name="description" content="Convert PDF to editable Word document free. No upload, no Adobe needed. Works in browser." />
        <link rel="canonical" href="https://converterwordtopdf.com/pdf-to-word" />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
            PDF to Document
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">Convert PDF to Word Free</h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto">Convert your PDF files to editable Word documents (.docx) client-side. Zero data upload risks.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-100/40">
          {!result && !progress && (
            <>
              <DropZone
                accept=".pdf"
                onFiles={files => setFile(files[0])}
                label="Drop PDF file here to convert to Word"
              />
              {file && (
                <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-sm text-gray-600 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📄</span>
                    <span className="font-semibold text-gray-800 break-all">{file.name}</span>
                  </div>
                  <button 
                    onClick={() => setFile(null)} 
                    className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase"
                  >
                    Clear
                  </button>
                </div>
              )}
              <button
                onClick={handleConvert}
                disabled={!file}
                className="mt-6 w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-2xl shadow-md shadow-brand-500/10 hover:scale-[1.01] disabled:scale-100 active:scale-[0.99] transition-all duration-200"
              >
                Convert to Word
              </button>
              <p className="text-[11px] text-gray-400 mt-3 text-center font-semibold">Free Limits: up to 3 files daily</p>
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
              <p className="font-bold text-gray-800 text-base mb-4 break-all">{result.filename}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={download} 
                  className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Download Word File
                </button>
                <button 
                  onClick={() => { setResult(null); setFile(null) }} 
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]"
                >
                  Convert Another File
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
            How to convert PDF to Word client-side
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Add PDF', desc: 'Drag and drop or browse to select the PDF file you want to make editable.' },
              { step: '2', title: 'Extract Text', desc: 'Click Convert to Word. Our parser scans PDF coordinates and drafts an editable document.' },
              { step: '3', title: 'Download DOCX', desc: 'Download your editable Word file (.docx) and open it in Microsoft Word or Google Docs.' }
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
                q: 'Will the original document formatting be preserved?',
                a: 'Standard text flows, alignment, paragraphs, and list indices are successfully mapped to DOCX formatting. Complex multi-column grid layouts or overlapping text structures may shift and require manual alignment.'
              },
              {
                q: 'Can I convert scanned PDFs or flat image documents?',
                a: 'This web-based tool extracts digital text elements directly from the PDF container. For flat image scans or handwritten notes, installing the free SmartPDF extension enables full OCR support.'
              },
              {
                q: 'Is there a size or file conversion limit?',
                a: 'The free browser tool supports up to 3 conversions per day. For unlimited conversions, multi-gigabyte files support, and offline processing, you can install the free SmartPDF extension.'
              },
              {
                q: 'Are my private files protected?',
                a: 'Yes. The extraction process is performed entirely locally inside your browser sandbox on your machine RAM. No file contents are uploaded to any server.'
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

      {showLimit && <LimitModal tool="pdf-to-word" onClose={() => setShowLimit(false)} />}
    </>
  )
}
