import { Link } from 'react-router-dom'

export default function JpgToPdfPost() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Turning images into PDFs is extremely common when submitting scanned IDs, compiling receipts for expense reports, or putting together digital portfolios. However, uploading high-resolution photos to web servers uses massive bandwidth and exposes your personal images.
      </p>
      <p className="text-gray-600">
        In this guide, we show you how to convert JPG, PNG, and WebP images to a single, beautifully formatted PDF document entirely locally in your browser.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 1: Compile Images locally on converterwordtopdf.com</h2>
      <p className="text-gray-600">
        Our local compiler embeds your image files into a clean PDF document directly inside your browser cache.
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
        <li>Navigate to the <Link to="/images-to-pdf" className="text-brand-500 hover:underline font-semibold">Images to PDF Converter</Link>.</li>
        <li>Select the images (JPG, PNG, or WebP) you want to compile.</li>
        <li>Arrange or review the file list.</li>
        <li>Click <strong>Convert Images to PDF</strong> and download the compiled file.</li>
      </ol>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 2: Use the SmartPDF Toolbar Extension</h2>
      <p className="text-gray-600">
        For power users who convert photo galleries or print collections to PDF regularly, the SmartPDF extension offers high-speed offline operations.
      </p>
      <p className="text-gray-600">
        It integrates with your system filesystem, converting images of any file size instantly without consuming network bandwidth.
      </p>
      <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 my-4">
        <a 
          href="https://chromewebstore.google.com/detail/smartpdf/YOUR_CHROME_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-brand-600 font-bold hover:underline"
        >
          Add SmartPDF Extension to Chrome (Free) →
        </a>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Method 3: Native Image to PDF Export on Windows and Mac</h2>
      <p className="text-gray-600">
        Both major operating systems have built-in utilities to save selected photos as a PDF:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
        <li><strong>On Windows:</strong> Select your images, right-click, select <strong>Print</strong>, choose <strong>Microsoft Print to PDF</strong> as the printer, and click Print.</li>
        <li><strong>On Mac:</strong> Open the images in <strong>Preview</strong>, select all images in the sidebar, click <strong>File</strong> → <strong>Export as PDF</strong>.</li>
      </ol>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Will my images lose quality during conversion?</h3>
          <p className="text-gray-500 text-xs mt-1">No. The image resolution is preserved when embed-coded into the PDF document container, preventing compression artifacts.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Can I combine different image formats?</h3>
          <p className="text-gray-500 text-xs mt-1">Yes. You can upload a mix of JPG, PNG, and WebP files together; the converter will compile them sequentially into a single PDF.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
      <p className="text-gray-600">
        Compiling photos into document formats shouldn't cost you your privacy. Using <Link to="/images-to-pdf" className="text-brand-500 hover:underline font-semibold">converterwordtopdf.com</Link> keeps your photos secure on your machine while completing the compilation.
      </p>
    </div>
  )
}
