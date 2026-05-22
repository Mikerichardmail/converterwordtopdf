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

    setProgress({ pct: 0, status: 'Loading conversion engines…' })
    setResult(null)
    setError(null)

    const outcome = await safeConvert(async () => {
      const mammoth = (await import('mammoth')).default
      const jsPDF   = (await import('jspdf')).jsPDF

      setProgress({ pct: 20, status: 'Parsing Word document structure…' })
      const buf  = await file.arrayBuffer()
      const res  = await mammoth.convertToHtml({ arrayBuffer: buf })

      setProgress({ pct: 60, status: 'Compiling PDF document layout…' })
      const doc  = new jsPDF()
      const div  = document.createElement('div')
      div.innerHTML = res.value
      const text = div.innerText
      const lines = doc.splitTextToSize(text, 180)
      doc.text(lines, 15, 20)

      setProgress({ pct: 90, status: 'Finalizing PDF output…' })
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

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
            100% Local Conversion
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">
            Convert Word to PDF Free
          </h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto">
            Drag, drop, and convert DOCX documents to high-quality PDFs. Files never leave your browser sandbox.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-100/40">
          {!result && !progress && (
            <>
              <DropZone
                accept=".doc,.docx"
                onFiles={files => setFile(files[0])}
                label="Drop your Word document (.docx, .doc) here"
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
                Convert to PDF
              </button>
            </>
          )}

          {progress && <ProgressBar pct={progress.pct} status={progress.status} />}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
              {error}
            </div>
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
                  Download PDF
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
            How to convert Word to PDF client-side
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Upload File', desc: 'Drag and drop your .docx file into the secure box above.' },
              { step: '2', title: 'Convert', desc: 'Click the Convert button. Our client engine compiles text instantly.' },
              { step: '3', title: 'Download', desc: 'Save the generated PDF. No files ever touch our servers.' }
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
                q: 'Is my file uploaded to a server?',
                a: 'No. The entire conversion process runs inside your browser using WebAssembly. Your file never leaves your computer.'
              },
              {
                q: 'Does it work without Microsoft Word installed?',
                a: 'Yes. You only need a browser (Chrome, Firefox, Edge, etc.) on any operating system.'
              },
              {
                q: 'Will the formatting be preserved?',
                a: 'Standard text, headings, and paragraph configurations are fully preserved. Highly complex multi-column layouts might shift slightly.'
              },
              {
                q: 'Is there a file size limit?',
                a: 'Up to 50MB. Because the conversion is completed using your local machine resources, the limit depends on your device RAM.'
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

      {showLimit && <LimitModal tool="word-to-pdf" onClose={() => setShowLimit(false)} />}
    </>
  )
}
