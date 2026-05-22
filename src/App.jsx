import { Routes, Route } from 'react-router-dom'
import Header      from './components/Header'
import Footer      from './components/Footer'
import WordToPdf   from './pages/WordToPdf'
import MergePdf    from './pages/MergePdf'
import SplitPdf    from './pages/SplitPdf'
import CompressPdf from './pages/CompressPdf'
import RotatePdf   from './pages/RotatePdf'
import PdfToWord   from './pages/PdfToWord'
import ImagesToPdf from './pages/ImagesToPdf'
import Blog        from './pages/Blog'
import BlogPost    from './pages/BlogPost'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
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
      </main>
      <Footer />
    </div>
  )
}
