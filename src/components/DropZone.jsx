import { useRef, useState } from 'react'

export default function DropZone({ onFiles, accept = '*/*', multiple = false, label = 'Drop file here or click to browse' }) {
  const inputRef = useRef()
  const [over, setOver] = useState(false)

  const handle = (files) => {
    if (!files?.length) return
    onFiles(multiple ? Array.from(files) : [files[0]])
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files) }}
      className={`relative group border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 shadow-sm
        ${over 
          ? 'border-brand-500 bg-brand-50/50 scale-[1.01] shadow-md shadow-brand-500/5' 
          : 'border-gray-200 hover:border-brand-400 hover:bg-gray-50/50 bg-white'}`}
    >
      <div className="relative mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-brand-50 text-brand-500 group-hover:scale-110 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      
      <p className="font-semibold text-gray-700 text-base mb-1 group-hover:text-gray-900 transition-colors">
        {label}
      </p>
      <p className="text-sm text-gray-500 font-medium">
        or click to browse local files
      </p>
      
      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wide">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        100% Private (No Upload)
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={e => handle(e.target.files)}
      />
    </div>
  )
}
