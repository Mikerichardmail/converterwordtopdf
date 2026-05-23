import { getInstallProps } from '../lib/browser'
import { Link, useLocation } from 'react-router-dom'

const tools = [
  { label: 'Word → PDF',   path: '/' },
  { label: 'Merge PDF',    path: '/merge-pdf' },
  { label: 'Split PDF',    path: '/split-pdf' },
  { label: 'Compress PDF', path: '/compress-pdf' },
  { label: 'Rotate PDF',   path: '/rotate-pdf' },
  { label: 'PDF → Word',   path: '/pdf-to-word' },
  { label: 'Images → PDF', path: '/images-to-pdf' },
]

export default function Header() {
  const install = getInstallProps()
  const location = useLocation()

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5 group">
          <img 
            src="/websiteiconnew.png" 
            alt="converterwordtopdf logo" 
            className="w-6 h-6 object-contain group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="font-bold text-lg text-brand-900 tracking-tight">
            converter<span className="text-brand-500 font-extrabold">wordtopdf</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600">
          {tools.map(t => {
            const isActive = location.pathname === t.path
            return (
              <Link 
                key={t.path} 
                to={t.path} 
                className={`transition-all duration-200 relative py-1 hover:text-brand-500 ${
                  isActive ? 'text-brand-500 font-semibold' : 'hover:scale-[1.02]'
                }`}
              >
                {t.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full animate-fade-in" />
                )}
              </Link>
            )
          })}
          <Link 
            to="/blog" 
            className={`transition-all duration-200 relative py-1 hover:text-brand-500 ${
              location.pathname.startsWith('/blog') ? 'text-brand-500 font-semibold' : ''
            }`}
          >
            Blog
            {location.pathname.startsWith('/blog') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full animate-fade-in" />
            )}
          </Link>
        </nav>

        {install.enabled && (
          <div className="flex items-center gap-3">
            <a
              href={install.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white text-xs px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${install.color}`}
            >
              {install.label}
            </a>
          </div>
        )}

      </div>

      {/* Mobile tool strip */}
      <div className="lg:hidden overflow-x-auto flex gap-4 px-4 pb-3 pt-1 text-xs font-semibold text-gray-500 scrollbar-none border-t border-gray-50 bg-gray-50/50">
        {tools.map(t => {
          const isActive = location.pathname === t.path
          return (
            <Link 
              key={t.path} 
              to={t.path} 
              className={`whitespace-nowrap transition-colors py-1 px-2.5 rounded-lg ${
                isActive ? 'bg-brand-500 text-white' : 'hover:text-brand-500 bg-white border border-gray-100'
              }`}
            >
              {t.label}
            </Link>
          )}
        )}
        <Link 
          to="/blog" 
          className={`whitespace-nowrap transition-colors py-1 px-2.5 rounded-lg ${
            location.pathname.startsWith('/blog') ? 'bg-brand-500 text-white' : 'hover:text-brand-500 bg-white border border-gray-100'
          }`}
        >
          Blog
        </Link>
      </div>
    </header>
  )
}
