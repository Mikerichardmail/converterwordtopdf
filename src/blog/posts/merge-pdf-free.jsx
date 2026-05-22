import { Link } from 'react-router-dom'

export default function MergePdfFree() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Merging multiple PDF files is one of the most common administrative tasks. Whether you are assembling a job application package, uniting monthly invoices, or putting together chapters of a report, you frequently need to combine PDFs.
      </p>
      <p className="text-gray-600">
        Most free PDF utilities require you to upload your files to their remote server. This guide shows you how to merge your PDF files safely and instantly, directly in your browser.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 1: Combine PDFs Locally on converterwordtopdf.com</h2>
      <p className="text-gray-600">
        Using client-side WebAssembly, our website allows you to merge documents right inside your browser. No files are ever sent to a server.
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
        <li>Go to the <Link to="/merge-pdf" className="text-brand-500 hover:underline font-semibold">Merge PDF Tool</Link>.</li>
        <li>Drag and drop your PDF files into the container.</li>
        <li>Arrange files in the desired order (or remove files you don't need).</li>
        <li>Click <strong>Merge PDFs</strong> to combine the files, then click <strong>Download merged.pdf</strong>.</li>
      </ol>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 2: Using the SmartPDF Extension</h2>
      <p className="text-gray-600">
        If you regularly merge sensitive contracts or financial paperwork, installing the free SmartPDF extension is highly recommended.
      </p>
      <p className="text-gray-600">
        The extension runs 100% offline, requires no registration, and removes all daily file size and merge limits.
      </p>
      <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 my-4">
        <a 
          href="https://chromewebstore.google.com/detail/smartpdf/YOUR_CHROME_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-brand-600 font-bold hover:underline"
        >
          Install SmartPDF Extension (Free) →
        </a>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 3: Native PDF Merging on macOS (Preview)</h2>
      <p className="text-gray-600">
        If you are using a Mac, you can combine PDFs offline without downloading any tools using the built-in Preview app:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
        <li>Open the first PDF file in <strong>Preview</strong>.</li>
        <li>Click <strong>View</strong> and select <strong>Thumbnails</strong> to show the sidebar.</li>
        <li>Select a page thumbnail where you want to insert the other PDF.</li>
        <li>Click <strong>Edit</strong> → <strong>Insert</strong> → <strong>Page from File</strong>.</li>
        <li>Select the second PDF document, then click Open and save the file.</li>
      </ol>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Is there a file size limit for merging?</h3>
          <p className="text-gray-500 text-xs mt-1">Our web tool supports files up to 50MB. If you are handling extremely large documents, use the browser extension for unlimited size matching.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Can I rearrange pages inside a single PDF?</h3>
          <p className="text-gray-500 text-xs mt-1">Yes. You can extract specific page ranges first with our <Link to="/split-pdf" className="text-brand-500 hover:underline">Split PDF Tool</Link> and then merge them back together in your preferred order.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
      <p className="text-gray-600">
        You do not need to take risks with your document security just to merge files. The local client merge on <Link to="/merge-pdf" className="text-brand-500 hover:underline font-semibold">converterwordtopdf.com</Link> keeps your data safe on your device while merging instantly.
      </p>
    </div>
  )
}
