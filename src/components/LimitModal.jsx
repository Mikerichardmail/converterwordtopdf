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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 transform scale-100 transition-transform duration-300">
        
        <div className="w-16 h-16 mx-auto mb-5 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl animate-bounce">
          ⏰
        </div>
        
        <h3 className="font-extrabold text-xl text-gray-900 text-center mb-1">
          Daily Free Limit Reached
        </h3>
        
        <p className="text-sm font-medium text-gray-400 text-center mb-6">
          {messages[tool] || "You've reached today's free limit."}{' '}
          Resets automatically at midnight.
        </p>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 text-center">
          <p className="text-sm font-semibold text-gray-700 leading-relaxed">
            Install the free <strong className="text-brand-500 font-extrabold">SmartPDF extension</strong> for unlimited conversions.
          </p>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            No signup · 100% private · Works offline
          </p>
        </div>

        {install.enabled ? (
          <a
            href={install.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center text-white py-3.5 rounded-2xl font-bold text-sm shadow-md shadow-brand-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${install.color}`}
          >
            {install.label}
          </a>
        ) : (
          <p className="text-center text-xs font-semibold text-gray-400 bg-gray-50 py-3 rounded-2xl border border-gray-100">
            Available for Chrome, Firefox & Edge
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors py-2"
        >
          Maybe later
        </button>

      </div>
    </div>
  )
}
