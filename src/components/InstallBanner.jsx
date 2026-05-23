import { getInstallProps, STORE_URLS } from '../lib/browser'

const browserOptions = [
  { key: 'chrome', label: 'Chrome', color: 'bg-blue-600 hover:bg-blue-700' },
  { key: 'edge', label: 'Edge', color: 'bg-blue-700 hover:bg-blue-800' },
  { key: 'firefox', label: 'Firefox', color: 'bg-orange-500 hover:bg-orange-600' },
  { key: 'opera', label: 'Opera', color: 'bg-red-600 hover:bg-red-700' },
  { key: 'brave', label: 'Brave', color: 'bg-orange-600 hover:bg-orange-700' },
]

export default function InstallBanner() {
  const install = getInstallProps()

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-50 to-brand-100/50 border border-brand-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-12 shadow-sm">
      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none select-none text-9xl">
        ⚡
      </div>
      
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
            Highly Recommended
          </span>
          <p className="font-bold text-gray-900 text-sm">SmartPDF Extension</p>
        </div>
        <p className="text-xs text-gray-500 font-medium">
          Get unlimited conversions, offline support, and zero file size limits. Works entirely locally on your device.
        </p>
      </div>
      
      <div className="shrink-0 relative z-10 w-full md:max-w-md flex flex-row flex-wrap justify-start md:justify-end gap-2">
        {browserOptions.map(opt => {
          const isCurrent = install.browser === opt.key
          const url = STORE_URLS[opt.key]
          if (!url) return null
          
          return (
            <a
              key={opt.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-center text-[11px] px-3.5 py-2 rounded-xl font-bold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                isCurrent 
                  ? `text-white ${opt.color} ring-2 ring-brand-500/10` 
                  : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              {isCurrent ? `Add to ${opt.label} — Free` : `Install for ${opt.label}`}
            </a>
          )
        })}
      </div>
    </div>
  )
}

