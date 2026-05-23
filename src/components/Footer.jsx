import { Link } from 'react-router-dom'
import { STORE_URLS } from '../lib/browser'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24 py-16 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div>
            <p className="font-bold text-gray-800 mb-4 tracking-wide uppercase text-xs">PDF Tools</p>
            <div className="flex flex-col gap-3 text-gray-500 font-medium">
              <Link to="/"               className="hover:text-brand-500 transition-colors">Word → PDF</Link>
              <Link to="/merge-pdf"      className="hover:text-brand-500 transition-colors">Merge PDF</Link>
              <Link to="/split-pdf"      className="hover:text-brand-500 transition-colors">Split PDF</Link>
              <Link to="/compress-pdf"   className="hover:text-brand-500 transition-colors">Compress PDF</Link>
              <Link to="/rotate-pdf"     className="hover:text-brand-500 transition-colors">Rotate PDF</Link>
              <Link to="/pdf-to-word"    className="hover:text-brand-500 transition-colors">PDF → Word</Link>
              <Link to="/images-to-pdf"  className="hover:text-brand-500 transition-colors">Images → PDF</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-800 mb-4 tracking-wide uppercase text-xs">Resources</p>
            <div className="flex flex-col gap-3 text-gray-500 font-medium">
              <Link to="/blog" className="hover:text-brand-500 transition-colors">Guides & Tutorials</Link>
              <Link to="/blog/word-to-pdf-free" className="hover:text-brand-500 transition-colors">Word to PDF Guide</Link>
              <Link to="/blog/safe-pdf-upload" className="hover:text-brand-500 transition-colors">Online Tool Safety</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-800 mb-4 tracking-wide uppercase text-xs">Extension</p>
            <div className="flex flex-col gap-3 text-gray-500 font-medium">
              {STORE_URLS.chrome && (
                <a href={STORE_URLS.chrome} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
                  Add to Chrome — Free
                </a>
              )}
              {STORE_URLS.edge && (
                <a href={STORE_URLS.edge} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
                  Add to Edge — Free
                </a>
              )}
              {STORE_URLS.firefox && (
                <a href={STORE_URLS.firefox} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
                  Add to Firefox — Free
                </a>
              )}
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded w-fit">SmartPDF Pro — $5.99</span>
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-800 mb-4 tracking-wide uppercase text-xs">Privacy & Trust</p>
            <div className="space-y-3">
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                All conversions are processed locally inside your browser's sandbox. No files are ever uploaded to a server. 100% private.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-600 uppercase">Local sandbox active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
          <span>© {new Date().getFullYear()} converterwordtopdf.com</span>
          <div className="flex gap-4">
            <span>No uploads</span>
            <span>·</span>
            <span>No account required</span>
            <span>·</span>
            <span>100% Client-Side</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
