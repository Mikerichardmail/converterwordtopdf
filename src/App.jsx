import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header      from './components/Header'
import Footer      from './components/Footer'
import WordToPdf   from './pages/WordToPdf'

const MergePdf    = lazy(() => import('./pages/MergePdf'))
const SplitPdf    = lazy(() => import('./pages/SplitPdf'))
const CompressPdf = lazy(() => import('./pages/CompressPdf'))
const RotatePdf   = lazy(() => import('./pages/RotatePdf'))
const PdfToWord   = lazy(() => import('./pages/PdfToWord'))
const ImagesToPdf = lazy(() => import('./pages/ImagesToPdf'))
const Blog        = lazy(() => import('./pages/Blog'))
const BlogPost    = lazy(() => import('./pages/BlogPost'))


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/"              element={<WordToPdf />} />
            <Route path="/merge-pdf"     element={<MergePdf />} />
            <Route path="/split-pdf"     element={<SplitPdf />} />
            <Route path="/compress-pdf"  element={<CompressPdf />} />
            <Route path="/rotate-pdf"    element={<RotatePdf />} />
            <Route path="/pdf-to-word"   element={<PdfToWord />} />
            <Route path="/images-to-pdf" element={<ImagesToPdf />} />
            <Route path="/blog"          element={<Blog />} />
            <Route path="/blog/:slug"    element={<BlogPost />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
