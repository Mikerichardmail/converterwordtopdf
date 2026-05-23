// Register all blog posts here
// Each post needs: slug, title, description, category, component

import WordToPdfPost    from './posts/word-to-pdf-free'
import MergePdfPost     from './posts/merge-pdf-free'
import CompressPdfPost  from './posts/compress-pdf'
import JpgToPdfPost     from './posts/jpg-to-pdf'
import SafeUploadPost   from './posts/safe-pdf-upload'
import PdfToWordPost from './posts/pdf-to-word'
import WordToPdfMacPost from './posts/word-to-pdf-mac'
import WordToPdfMobilePost from './posts/word-to-pdf-mobile'
import EditablePdfFreePost from './posts/editable-pdf-free'
import SaveWordAsPdfPost from './posts/save-word-as-pdf'
import DocxVsPdfPost from './posts/docx-vs-pdf'
import CombinePdfMacWindowsPost from './posts/combine-pdf-mac-windows'
import SplitPdfFreePost from './posts/split-pdf-free'
import ExtractPdfPagePost from './posts/extract-pdf-page'
import MergePdfIphonePost from './posts/merge-pdf-iphone'
import CombinePdfWindows11Post from './posts/combine-pdf-windows-11'
import SplitLargePdfPost from './posts/split-large-pdf'
import ReducePdfSizeEmailPost from './posts/reduce-pdf-size-email'
import PdfTooLargePost from './posts/pdf-too-large'
import CompressPdfMacPost from './posts/compress-pdf-mac'
import PdfTooLargeEmailPost from './posts/pdf-too-large-email'
import PngToPdfPost from './posts/png-to-pdf'
import ImagesToPdfPost from './posts/images-to-pdf'
import PdfToImagePost from './posts/pdf-to-image'
import ScanToPdfPost from './posts/scan-to-pdf'
import OnlinePdfToolsPrivacyPost from './posts/online-pdf-tools-privacy'
import ConvertPdfWithoutUploadPost from './posts/convert-pdf-without-upload'
import PdfPrivacyRiskPost from './posts/pdf-privacy-risk'
import PrivatePdfConverterPost from './posts/private-pdf-converter'
import RotatePdfPost from './posts/rotate-pdf'
import PasswordProtectPdfPost from './posts/password-protect-pdf'
import RemovePdfPasswordPost from './posts/remove-pdf-password'
import WatermarkPdfFreePost from './posts/watermark-pdf-free'
import SignPdfFreePost from './posts/sign-pdf-free'
import ExcelToPdfPost from './posts/excel-to-pdf'
import CsvToExcelPost from './posts/csv-to-excel'
import ExcelToCsvPost from './posts/excel-to-csv'
import JsonToExcelPost from './posts/json-to-excel'
import PdfTableToExcelPost from './posts/pdf-table-to-excel'
import SmallpdfVsIlovepdfPost from './posts/smallpdf-vs-ilovepdf'
import AdobeAcrobatAlternativePost from './posts/adobe-acrobat-alternative'
import FreePdfEditorNoSignupPost from './posts/free-pdf-editor-no-signup'
import ChromeExtensionPdfPost from './posts/chrome-extension-pdf'
import FreePdfToolsPost from './posts/free-pdf-tools'
import WhatIsPdfPost from './posts/what-is-pdf'
import PdfLooksDifferentPost from './posts/pdf-looks-different'
import PdfImageQualityPost from './posts/pdf-image-quality'
import PdfTextNotSelectablePost from './posts/pdf-text-not-selectable'
import WhatIsOcrPost from './posts/what-is-ocr'
import PdfVsPdfaPost from './posts/pdf-vs-pdfa'

export const ALL_POSTS = [
  {
    slug:        'word-to-pdf-free',
    title:       'How to Convert Word to PDF Free Without Losing Formatting',
    description: 'Three ways to convert DOCX to PDF for free — no software, no upload, no Adobe.',
    category:    'Word & PDF',
    component:   WordToPdfPost,
  },
  {
    slug:        'merge-pdf-free',
    title:       'How to Merge PDF Files Without Uploading Them Online',
    description: 'Combine multiple PDF files into one for free — all in your browser.',
    category:    'Merge & Split',
    component:   MergePdfPost,
  },
  {
    slug:        'compress-pdf',
    title:       'How to Compress a PDF Without Losing Quality',
    description: 'Reduce PDF file size for free without losing image or text quality.',
    category:    'Compress',
    component:   CompressPdfPost,
  },
  {
    slug:        'jpg-to-pdf',
    title:       'How to Convert JPG to PDF Free Without Uploading',
    description: 'Turn JPG, PNG and WebP images into a PDF in seconds — no upload needed.',
    category:    'Images & PDF',
    component:   JpgToPdfPost,
  },
  {
    slug:        'safe-pdf-upload',
    title:       'Is It Safe to Upload PDF Files to Online Converters',
    description: 'What really happens to your files when you use free PDF tools online.',
    category:    'Privacy',
    component:   SafeUploadPost,
  },
  {
    slug:        'pdf-to-word',
    title:       'How to Convert PDF to Word Without Losing Formatting',
    description: 'Convert PDF back to editable DOCX document easily inside your browser.',
    category:    'Word & PDF',
    component:   PdfToWordPost,
  },
  {
    slug:        'word-to-pdf-mac',
    title:       'How to Convert Word to PDF on Mac Without Adobe',
    description: 'Learn how to export Word documents as PDFs on macOS for free.',
    category:    'Word & PDF',
    component:   WordToPdfMacPost,
  },
  {
    slug:        'word-to-pdf-mobile',
    title:       'How to Convert Word to PDF on iPhone and Android',
    description: 'Easy ways to convert DOCX files to PDF on mobile devices.',
    category:    'Word & PDF',
    component:   WordToPdfMobilePost,
  },
  {
    slug:        'editable-pdf-free',
    title:       'How to Make a PDF Editable Without Adobe Acrobat',
    description: 'How to edit PDF files for free using browser-based solutions.',
    category:    'Word & PDF',
    component:   EditablePdfFreePost,
  },
  {
    slug:        'save-word-as-pdf',
    title:       'How to Save a Word Document as PDF in 3 Seconds',
    description: 'The quickest methods to save Word files as PDFs.',
    category:    'Word & PDF',
    component:   SaveWordAsPdfPost,
  },
  {
    slug:        'docx-vs-pdf',
    title:       'DOCX vs PDF — Which Format Should You Use and When',
    description: 'Understand the differences between Word documents and PDF files.',
    category:    'Word & PDF',
    component:   DocxVsPdfPost,
  },
  {
    slug:        'combine-pdf-mac-windows',
    title:       'How to Combine PDF Files on Mac, Windows and Linux',
    description: 'Cross-platform guide to merge multiple PDF files safely.',
    category:    'Merge & Split',
    component:   CombinePdfMacWindowsPost,
  },
  {
    slug:        'split-pdf-free',
    title:       'How to Split a PDF Into Separate Pages for Free',
    description: 'Extract pages from a PDF document with zero upload.',
    category:    'Merge & Split',
    component:   SplitPdfFreePost,
  },
  {
    slug:        'extract-pdf-page',
    title:       'How to Extract One Page From a PDF Without Adobe',
    description: 'Quickly save a single page of your PDF as a separate file.',
    category:    'Merge & Split',
    component:   ExtractPdfPagePost,
  },
  {
    slug:        'merge-pdf-iphone',
    title:       'How to Merge PDF Files on iPhone Without an App',
    description: 'Combine PDF pages directly on iOS devices.',
    category:    'Merge & Split',
    component:   MergePdfIphonePost,
  },
  {
    slug:        'combine-pdf-windows-11',
    title:       'How to Combine PDF Files on Windows 11 Without Software',
    description: 'Merge PDFs on Windows 11 using built-in browser tools.',
    category:    'Merge & Split',
    component:   CombinePdfWindows11Post,
  },
  {
    slug:        'split-large-pdf',
    title:       'How to Split a Large PDF Into Smaller Files',
    description: 'Divide large PDFs into small documents for easier handling.',
    category:    'Merge & Split',
    component:   SplitLargePdfPost,
  },
  {
    slug:        'reduce-pdf-size-email',
    title:       'How to Reduce PDF File Size for Email Attachments',
    description: 'Shrink PDF document size to bypass email attachment limits.',
    category:    'Compress',
    component:   ReducePdfSizeEmailPost,
  },
  {
    slug:        'pdf-too-large',
    title:       'Why Is My PDF So Large and How to Fix It',
    description: 'Understand why PDFs get large and how to optimize them.',
    category:    'Compress',
    component:   PdfTooLargePost,
  },
  {
    slug:        'compress-pdf-mac',
    title:       'How to Compress a PDF on Mac Without Software',
    description: 'Reduce PDF sizes on macOS using native utility features.',
    category:    'Compress',
    component:   CompressPdfMacPost,
  },
  {
    slug:        'pdf-too-large-email',
    title:       'How to Send a PDF That Is Too Large for Email',
    description: 'Solutions for sending oversized PDFs securely.',
    category:    'Compress',
    component:   PdfTooLargeEmailPost,
  },
  {
    slug:        'png-to-pdf',
    title:       'How to Convert PNG to PDF on Any Device',
    description: 'Convert PNG images into clean PDF documents on the fly.',
    category:    'Images & PDF',
    component:   PngToPdfPost,
  },
  {
    slug:        'images-to-pdf',
    title:       'How to Convert Multiple Images to One PDF File',
    description: 'Merge several JPG, PNG, or WebP images into a single PDF.',
    category:    'Images & PDF',
    component:   ImagesToPdfPost,
  },
  {
    slug:        'pdf-to-image',
    title:       'How to Convert a PDF Page to an Image or Screenshot',
    description: 'Export PDF pages as individual image files easily.',
    category:    'Images & PDF',
    component:   PdfToImagePost,
  },
  {
    slug:        'scan-to-pdf',
    title:       'How to Scan Documents to PDF With Your Phone Camera',
    description: 'Scan paper documents directly to PDF with mobile devices.',
    category:    'Images & PDF',
    component:   ScanToPdfPost,
  },
  {
    slug:        'online-pdf-tools-privacy',
    title:       'What Happens to Your Files When You Use Online PDF Tools',
    description: 'A review of data privacy risks in web-based PDF converters.',
    category:    'Privacy',
    component:   OnlinePdfToolsPrivacyPost,
  },
  {
    slug:        'convert-pdf-without-upload',
    title:       'How to Convert PDF Without Uploading to a Server',
    description: 'Step-by-step to process PDFs offline on your own device.',
    category:    'Privacy',
    component:   ConvertPdfWithoutUploadPost,
  },
  {
    slug:        'pdf-privacy-risk',
    title:       'Why You Should Never Upload Contracts to Free PDF Sites',
    description: 'Avoid security threats when uploading legal documents online.',
    category:    'Privacy',
    component:   PdfPrivacyRiskPost,
  },
  {
    slug:        'private-pdf-converter',
    title:       'Best Private PDF Converter That Doesn\'t Store Your Files',
    description: 'How local PDF conversion preserves sensitive data.',
    category:    'Privacy',
    component:   PrivatePdfConverterPost,
  },
  {
    slug:        'rotate-pdf',
    title:       'How to Rotate a PDF and Save It Permanently',
    description: 'Fix upside down PDF pages and save rotation permanently.',
    category:    'Rotate & Password',
    component:   RotatePdfPost,
  },
  {
    slug:        'password-protect-pdf',
    title:       'How to Password Protect a PDF for Free',
    description: 'Add password security to your files without paid tools.',
    category:    'Rotate & Password',
    component:   PasswordProtectPdfPost,
  },
  {
    slug:        'remove-pdf-password',
    title:       'How to Remove Password From a PDF File',
    description: 'Unlock password protected PDF documents for editing.',
    category:    'Rotate & Password',
    component:   RemovePdfPasswordPost,
  },
  {
    slug:        'watermark-pdf-free',
    title:       'How to Add a Watermark to a PDF Without Adobe',
    description: 'Add secure text or image watermarks to your PDF.',
    category:    'Rotate & Password',
    component:   WatermarkPdfFreePost,
  },
  {
    slug:        'sign-pdf-free',
    title:       'How to Sign a PDF Without Printing It',
    description: 'Add electronic signatures to your contracts for free.',
    category:    'Rotate & Password',
    component:   SignPdfFreePost,
  },
  {
    slug:        'excel-to-pdf',
    title:       'How to Convert Excel to PDF Without Microsoft Office',
    description: 'Transform spreadsheets to printable PDF format easily.',
    category:    'Excel & Data',
    component:   ExcelToPdfPost,
  },
  {
    slug:        'csv-to-excel',
    title:       'How to Convert CSV to Excel in One Click',
    description: 'Open CSV data correctly in Excel format without mess.',
    category:    'Excel & Data',
    component:   CsvToExcelPost,
  },
  {
    slug:        'excel-to-csv',
    title:       'How to Convert Excel to CSV and Keep Formatting',
    description: 'Export Excel tables to CSV files cleanly.',
    category:    'Excel & Data',
    component:   ExcelToCsvPost,
  },
  {
    slug:        'json-to-excel',
    title:       'How to Convert JSON to Excel Without Coding',
    description: 'Read JSON structure in Excel spreadsheets without code.',
    category:    'Excel & Data',
    component:   JsonToExcelPost,
  },
  {
    slug:        'pdf-table-to-excel',
    title:       'How to Convert PDF Tables to Excel Spreadsheet',
    description: 'Extract tables from PDF files into editable spreadsheets.',
    category:    'Excel & Data',
    component:   PdfTableToExcelPost,
  },
  {
    slug:        'smallpdf-vs-ilovepdf',
    title:       'SmallPDF vs iLovePDF vs SmartPDF — Which Is Best in 2025',
    description: 'Compare top PDF utilities on speed, safety, and price.',
    category:    'Comparisons',
    component:   SmallpdfVsIlovepdfPost,
  },
  {
    slug:        'adobe-acrobat-alternative',
    title:       'Adobe Acrobat vs Free PDF Tools — Is Acrobat Worth It',
    description: 'Compare expensive Acrobat subscription with free alternatives.',
    category:    'Comparisons',
    component:   AdobeAcrobatAlternativePost,
  },
  {
    slug:        'free-pdf-editor-no-signup',
    title:       'Best Free PDF Editors That Don\'t Require Sign Up',
    description: 'Quick PDF editing tools with no account registration required.',
    category:    'Comparisons',
    component:   FreePdfEditorNoSignupPost,
  },
  {
    slug:        'chrome-extension-pdf',
    title:       'Best Chrome Extensions for PDF in 2025',
    description: 'Discover top extension-based PDF utilities for Chrome.',
    category:    'Comparisons',
    component:   ChromeExtensionPdfPost,
  },
  {
    slug:        'free-pdf-tools',
    title:       'Top 10 Free PDF Tools That Work Without an Account',
    description: 'Run PDF modifications with no subscription or email required.',
    category:    'Comparisons',
    component:   FreePdfToolsPost,
  },
  {
    slug:        'what-is-pdf',
    title:       'What Is a PDF File and Why Is It the Standard Format',
    description: 'Understand the history and components of Portable Document Format.',
    category:    'PDF Knowledge',
    component:   WhatIsPdfPost,
  },
  {
    slug:        'pdf-looks-different',
    title:       'Why PDF Files Look Different on Different Computers',
    description: 'Fix font discrepancies and layout shifts in PDFs.',
    category:    'PDF Knowledge',
    component:   PdfLooksDifferentPost,
  },
  {
    slug:        'pdf-image-quality',
    title:       'Why Your PDF Has Bad Quality Images and How to Fix It',
    description: 'Learn why PDF images get pixelated and how to resolve it.',
    category:    'PDF Knowledge',
    component:   PdfImageQualityPost,
  },
  {
    slug:        'pdf-text-not-selectable',
    title:       'Why PDF Text Is Not Selectable and How to Fix It',
    description: 'Fix non-selectable text issues on scanned PDF documents.',
    category:    'PDF Knowledge',
    component:   PdfTextNotSelectablePost,
  },
  {
    slug:        'what-is-ocr',
    title:       'What Is OCR and How to Make Scanned PDFs Searchable',
    description: 'Learn optical character recognition for paper document scans.',
    category:    'PDF Knowledge',
    component:   WhatIsOcrPost,
  },
  {
    slug:        'pdf-vs-pdfa',
    title:       'PDF vs PDF/A — What Is the Difference',
    description: 'Understand the difference between standard and archival PDF.',
    category:    'PDF Knowledge',
    component:   PdfVsPdfaPost,
  },
]
