import { getInstallProps } from '../lib/browser'

export default function InstallBanner() {
  const install = getInstallProps()

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-50 to-brand-100/50 border border-brand-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 shadow-sm">
      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none select-none text-9xl">
        ⚡
      </div>
      
      <div className="relative z-10">
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
      
      <div className="shrink-0 relative z-10 w-full sm:w-auto">
        {install.enabled ? (
          <a
            href={install.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full sm:w-auto text-center text-white text-xs px-5 py-2.5 rounded-xl font-bold shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 ${install.color}`}
          >
            {install.label}
          </a>
        ) : (
          <span className="block text-center text-xs text-gray-400 bg-white/80 border border-gray-100 px-4 py-2.5 rounded-xl font-semibold">
            Available for Chrome, Firefox & Edge
          </span>
        )}
      </div>
    </div>
  )
}
