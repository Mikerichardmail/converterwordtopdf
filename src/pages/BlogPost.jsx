import { useParams, Link } from 'react-router-dom'
import { Helmet }          from 'react-helmet-async'
import { ALL_POSTS }       from '../blog/index'
import InstallBanner       from '../components/InstallBanner'

export default function BlogPost() {
  const { slug } = useParams()
  const post     = ALL_POSTS.find(p => p.slug === slug)

  if (!post) return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-4xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
      <p className="text-gray-500 mb-6 font-medium">The article you are looking for does not exist or has been moved.</p>
      <Link to="/blog" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-xl transition-all inline-block shadow-md">
        Back to Blog Index
      </Link>
    </main>
  )

  const Content = post.component

  return (
    <>
      <Helmet>
        <title>{post.title} | converterwordtopdf.com</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://converterwordtopdf.com/blog/${post.slug}`} />
      </Helmet>

      <article className="max-w-2xl mx-auto px-4 py-16">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors mb-6">
          <span>←</span> Back to Guides
        </Link>
        
        <div>
          <span className="text-[10px] text-brand-500 font-extrabold uppercase tracking-widest bg-brand-50 px-2.5 py-1 rounded-md">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Blog Post Content styling overrides standard prose for nice formatting */}
        <div className="prose prose-brand max-w-none text-sm text-gray-600 font-medium leading-relaxed space-y-6 blog-content">
          <Content />
        </div>

        <InstallBanner />
      </article>
    </>
  )
}
