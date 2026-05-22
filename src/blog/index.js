// Register all blog posts here
// Each post needs: slug, title, description, category, component

import WordToPdfPost    from './posts/word-to-pdf-free'
import MergePdfPost     from './posts/merge-pdf-free'
import CompressPdfPost  from './posts/compress-pdf'
import JpgToPdfPost     from './posts/jpg-to-pdf'
import SafeUploadPost   from './posts/safe-pdf-upload'

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
]
