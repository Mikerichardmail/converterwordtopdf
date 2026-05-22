import { Helmet }    from 'react-helmet-async'
import { Link }      from 'react-router-dom'
import { ALL_POSTS } from '../blog/index'

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>PDF Help & Guides | converterwordtopdf.com Blog</title>
        <meta name="description" content="Free guides on converting, merging, splitting and compressing PDF files. No software needed." />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
            Knowledge Center
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">PDF Guides & Help</h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto">Free, step-by-step tutorials on working with PDF, Word, and Image files client-side.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ALL_POSTS.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block border border-gray-100 rounded-2xl p-6 bg-white hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span className="text-[10px] text-brand-500 font-extrabold uppercase tracking-widest bg-brand-50 px-2.5 py-1 rounded-md">
                {post.category}
              </span>
              <h2 className="font-bold text-gray-900 text-lg mt-3.5 mb-2 group-hover:text-brand-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-brand-500 font-bold text-xs">
                <span>Read Guide</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
