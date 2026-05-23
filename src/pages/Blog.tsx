import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ChevronRight, Clock3, UserCircle2 } from 'lucide-react';
import { Breadcrumb, SEO } from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { useApp } from '../context/AppContext';
import type { BlogPost } from '../types';
import { DEFAULT_OG_IMAGE, pageUrl } from '../utils/site';

const blogDescription = 'Avrupa vize, çalışma izni, oturum izni, aile birleşimi ve Schengen süreçleri hakkında güncel içerikler ve rehberler.';

const articleSchema = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  image: DEFAULT_OG_IMAGE,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  author: {
    '@type': 'Organization',
    name: post.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'EuroVize',
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
    },
  },
  mainEntityOfPage: pageUrl(`/blog/${post.slug}`),
  keywords: post.keywords,
});

export const BlogPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'EuroVize Blog',
    description: blogDescription,
    url: pageUrl('/blog'),
    blogPost: blogPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: pageUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <main>
      <SEO
        title="Blog - Avrupa Vize ve Oturum İzni Rehberleri"
        description={blogDescription}
        keywords="avrupa vize rehberi, çalışma vizesi blog, oturum izni yazıları, schengen rehberi"
        canonical={pageUrl('/blog')}
        schema={schema}
      />

      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Breadcrumb items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Blog' }]} />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">Blog & Rehberler</h1>
          <p className="mt-4 text-white/70 text-lg max-w-3xl mx-auto">Avrupa vize ve oturum süreçlerinde en sık aranan sorular için hazırladığımız içeriklerle karar verme sürecinizi kolaylaştırın.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <article key={post.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#c9a84c] uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span className="text-gray-300">•</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-4 text-xl font-extrabold text-[#0f2b5b] leading-snug">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> {new Date(post.updatedAt).toLocaleDateString('tr-TR')}</span>
                  <span className="inline-flex items-center gap-1"><UserCircle2 size={14} /> {post.author}</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f2b5b] hover:text-[#c9a84c] transition-colors">
                  Yazıyı Oku <ChevronRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services } = useApp();
  const post = blogPosts.find(item => item.slug === slug);

  if (!post) {
    return (
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Yazı Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız içerik kaldırılmış veya bağlantı değişmiş olabilir.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b5b] text-white rounded-xl font-semibold hover:bg-[#1a3f7a] transition-colors">
            <ArrowLeft size={18} /> Bloga Dön
          </Link>
        </div>
      </main>
    );
  }

  const relatedServices = services.filter(service => post.relatedServiceIds.includes(service.id)).slice(0, 4);
  const relatedPosts = blogPosts.filter(item => item.slug !== post.slug && (item.category === post.category || item.relatedServiceIds.some(id => post.relatedServiceIds.includes(id)))).slice(0, 3);

  const faqSchema = post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const schema = faqSchema ? [articleSchema(post), faqSchema] : [articleSchema(post)];

  return (
    <main>
      <SEO
        title={post.title}
        description={post.description}
        keywords={post.keywords}
        canonical={pageUrl(`/blog/${post.slug}`)}
        ogImage={DEFAULT_OG_IMAGE}
        schema={schema}
      />

      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-[#c9a84c]">{post.category}</span>
            <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> {new Date(post.updatedAt).toLocaleDateString('tr-TR')}</span>
            <span className="inline-flex items-center gap-1"><Clock3 size={14} /> {post.readingTime}</span>
            <span className="inline-flex items-center gap-1"><UserCircle2 size={14} /> {post.author}</span>
          </div>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold text-white leading-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-white/75 max-w-4xl leading-8">{post.excerpt}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
          <article className="space-y-10">
            {post.sections.map(section => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-2xl font-extrabold text-[#0f2b5b]">{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-8">{paragraph}</p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {section.bullets.map(bullet => (
                      <li key={bullet} className="rounded-2xl bg-gray-50 px-4 py-4 text-sm font-medium text-gray-700">• {bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {post.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-5">Sık Sorulan Sorular</h2>
                <div className="space-y-4">
                  {post.faqs.map(faq => (
                    <div key={faq.question} className="rounded-2xl border border-gray-100 p-5 bg-gray-50">
                      <h3 className="font-bold text-[#0f2b5b] mb-2">{faq.question}</h3>
                      <p className="text-sm leading-7 text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            {relatedServices.length > 0 && (
              <div className="rounded-3xl bg-[#0f2b5b] p-6 text-white">
                <h2 className="text-lg font-bold text-[#c9a84c] mb-4">İlgili Hizmetler</h2>
                <div className="space-y-3">
                  {relatedServices.map(service => (
                    <Link key={service.id} to={`/hizmet/${service.slug || service.id}`} className="block rounded-2xl bg-white/10 px-4 py-4 hover:bg-white/15 transition-colors">
                      <div className="text-sm font-semibold">{service.countryFlag} {service.title}</div>
                      <div className="text-xs text-white/65 mt-1">{service.duration} • {service.price}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-gray-100 p-6 bg-gray-50">
              <h2 className="text-lg font-bold text-[#0f2b5b] mb-3">Danışmanlık Alın</h2>
              <p className="text-sm text-gray-600 leading-7">Bu yazıdaki konuyla ilgili profesyonel değerlendirme almak isterseniz iletişim formu veya WhatsApp üzerinden bizimle görüşebilirsiniz.</p>
              <div className="mt-5 flex flex-col gap-3">
                <Link to="/iletisim" className="inline-flex justify-center rounded-xl bg-[#0f2b5b] px-4 py-3 text-sm font-bold text-white hover:bg-[#1a3f7a] transition-colors">İletişime Geç</Link>
                <Link to="/hizmetler" className="inline-flex justify-center rounded-xl border border-[#0f2b5b] px-4 py-3 text-sm font-bold text-[#0f2b5b] hover:bg-blue-50 transition-colors">Hizmetleri Gör</Link>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="rounded-3xl border border-gray-100 p-6 bg-white">
                <h2 className="text-lg font-bold text-[#0f2b5b] mb-4">Benzer Yazılar</h2>
                <div className="space-y-3">
                  {relatedPosts.map(item => (
                    <Link key={item.id} to={`/blog/${item.slug}`} className="block rounded-2xl bg-gray-50 px-4 py-4 hover:bg-gray-100 transition-colors">
                      <div className="text-sm font-semibold text-[#0f2b5b] leading-6">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.readingTime}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
