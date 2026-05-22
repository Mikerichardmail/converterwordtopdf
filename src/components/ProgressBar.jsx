export default function ProgressBar({ pct, status }) {
  return (
    <div className="mt-8 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl animate-fade-in">
      <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping" />
          {status}
        </span>
        <span className="font-mono text-brand-600">{pct}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
