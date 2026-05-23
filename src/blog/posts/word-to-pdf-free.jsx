import { Link } from 'react-router-dom'

export default function WordToPdfFree() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Converting a Word document to a PDF is a daily task for millions of professionals, students, and freelancers. However, many free online converters require you to upload your confidential files to a third-party server, creating significant privacy risks.
      </p>
      <p className="text-gray-600">
        This step-by-step guide explains how to convert Word documents (.docx and .doc) to PDF for free without losing formatting, and—most importantly—without ever uploading your documents to an external server.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 1: Using converterwordtopdf.com (Free, Local Sandbox)</h2>
      <p className="text-gray-600">
        The fastest and most secure method is using our free web-based tool. Rather than uploading your file to a database, our tool utilizes a local browser sandbox to parse the file structure on your computer.
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
        <li>Navigate to the <Link to="/" className="text-brand-500 hover:underline font-semibold">Word to PDF Converter</Link>.</li>
        <li>Drag and drop your .docx or .doc file into the designated upload area.</li>
        <li>Click the <strong>Convert to PDF</strong> button.</li>
        <li>Wait a few seconds for the layout rendering to complete, and click <strong>Download PDF</strong>.</li>
      </ol>
      <p className="text-gray-600">
        Because the process runs locally in your browser, it is instantaneous, extremely secure, and works 100% offline.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 2: Using the SmartPDF Chrome/Firefox Extension</h2>
      <p className="text-gray-600">
        For users who handle PDF conversions regularly, installing a lightweight browser extension is a highly efficient option.
      </p>
      <p className="text-gray-600">
        The SmartPDF extension adds file conversion features directly to your browser toolbar. It works offline, supports larger files, and bypasses any daily limits enforced by web tools.
      </p>
      <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 my-4">
        <a 
          href="https://chromewebstore.google.com/detail/smartpdf-%E2%80%94-merge-split-pd/obhdifdgiompbmngalkgclidickpebka" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-brand-600 font-bold hover:underline"
        >
          Add SmartPDF to Chrome (Free) →
        </a>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 3: Native Offline Export in Microsoft Word</h2>
      <p className="text-gray-600">
        If you have Microsoft Word installed, you can save any document directly as a PDF without any external software:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
        <li>Open your file in Microsoft Word.</li>
        <li>Click <strong>File</strong> in the top-left menu.</li>
        <li>Select <strong>Save As</strong> (or <strong>Export</strong> on Mac).</li>
        <li>Choose <strong>PDF (*.pdf)</strong> from the file type dropdown menu and click Save.</li>
      </ol>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 font-sans">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Will my document look exactly the same after conversion?</h3>
          <p className="text-gray-500 text-xs mt-1">Yes. Basic formatting, paragraphs, fonts, lists, and tables are fully preserved. Custom fonts that are not installed on your system might experience slight line shifts.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Are my files kept private?</h3>
          <p className="text-gray-500 text-xs mt-1">Absolutely. Our tool processes your files client-side. Unlike other converters, we never receive, store, or view your documents.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Can I convert PDF back to Word?</h3>
          <p className="text-gray-500 text-xs mt-1">Yes, you can use our <Link to="/pdf-to-word" className="text-brand-500 hover:underline">PDF to Word Converter</Link> to extract text and rebuild your document format.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
      <p className="text-gray-600">
        Using <Link to="/" className="text-brand-500 hover:underline font-semibold">converterwordtopdf.com</Link> is the easiest, safest way to handle conversions on the fly. It gives you professional-quality results instantly without compromising your personal document safety.
      </p>
    </div>
  )
}
