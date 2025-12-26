import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo';
import blogData from '@/data/blog.json';
import Icon from '@/components/ui/Icon';
import { formatDate, getCategoryColorClasses } from '@/lib/utils';

export const metadata: Metadata = genMeta({
  title: 'Blog',
  description: 'Arsa satışı, yatırım, hukuki bilgiler ve piyasa analizleri hakkında güncel içerikler.',
  url: '/blog',
});

export default function BlogPage() {
  const featuredPosts = blogData.posts.filter((p) => p.isFeatured);
  const recentPosts = blogData.posts.slice(0, 6);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-background-light to-primary/5 py-12">
        <div className="container-custom">
          <h1 className="text-4xl sm:text-5xl font-black text-dark-charcoal tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-secondary-text max-w-2xl">
            Arsa satışı, yatırım tavsiyeleri, hukuki bilgiler ve piyasa analizleri hakkında güncel içerikler.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-gray-100 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            <Link href="/blog" className="badge bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Tümü
            </Link>
            {blogData.categories.map((cat) => {
              const colors = getCategoryColorClasses(cat.color);
              return (
                <Link
                  key={cat.id}
                  href={`/blog/kategori/${cat.slug}`}
                  className={`badge ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section bg-background-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => {
              const category = blogData.categories.find((c) => c.id === post.category);
              const colors = category ? getCategoryColorClasses(category.color) : getCategoryColorClasses('emerald');

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card card-hover overflow-hidden group">
                  {/* Image */}
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="article" className="!text-[48px] text-gray-300 group-hover:scale-110 transition-transform" />
                    </div>
                    {post.isFeatured && (
                      <span className="absolute top-3 left-3 badge-featured">
                        <Icon name="star" className="!text-[14px] mr-1" />
                        Öne Çıkan
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`badge ${colors.bg} ${colors.text}`}>{category?.name}</span>
                      <span className="text-xs text-secondary-text">{post.readTime} dk okuma</span>
                    </div>
                    <h2 className="font-bold text-dark-charcoal group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-secondary-text text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-secondary-text">
                      <span>{post.author.name}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
