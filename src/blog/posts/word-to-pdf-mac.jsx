import { Link } from 'react-router-dom'

export default function WordToPdfMacPost() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Learn how to export Word documents as PDFs on macOS for free. Having access to local, secure document tools is critical for speed and privacy. In this guide, we break down how to handle this task quickly and efficiently.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step Guide</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
        <li>Open your Word document in Microsoft Word on macOS.</li>
        <li>Click File on the top menu and select Save As.</li>
        <li>Choose PDF from the file format dropdown menu, or use <Link to="/" className="text-brand-500 hover:underline font-semibold">our homepage</Link> for instant browser conversion.</li>
        <li>Save the PDF to your desired directory.</li>
      </ol>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Local Processing Matters</h2>
      <p className="text-gray-600">
        Using web utilities that run directly inside your browser sandbox guarantees that your sensitive files never touch external servers or third-party storage databases. This prevents potential data leakage and speeds up processing time.
      </p>

      <div className="p-5 bg-brand-50 rounded-2xl border border-brand-100 my-6">
        <p className="font-bold text-brand-900 text-sm mb-1">SmartPDF Desktop Extension — Free</p>
        <p className="text-xs text-gray-500 mb-3">Unlimited conversions · Works completely offline · No sign up required</p>
        <a 
          href="https://chromewebstore.google.com/detail/smartpdf/YOUR_CHROME_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-brand-500 hover:bg-brand-600 text-white text-xs px-4 py-2.5 rounded-xl font-semibold transition-colors"
        >
          Add to Browser
        </a>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Do I need Adobe Acrobat on Mac?</h3>
          <p className="text-gray-500 text-xs mt-1">No, macOS has native PDF engines built-in. You can use native features or our free web tool.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Will custom fonts be preserved?</h3>
          <p className="text-gray-500 text-xs mt-1">Yes, if you use standard fonts. For exotic custom fonts, convert them to outlines or embed them before exporting.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
      <p className="text-gray-600">
        Managing your documents efficiently shouldn't mean sacrificing data privacy. Use the local tools on <Link to="/" className="text-brand-500 hover:underline font-semibold">converterwordtopdf.com</Link> or install the desktop extension for offline ease.
      </p>
    </div>
  )
}
