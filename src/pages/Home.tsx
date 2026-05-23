import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { FAQSection, HeroSection, ProcessSection, ServicesSection, StatsSection, TestimonialsSection, TrackingSection, WhyUsSection } from '../components/Sections';
import { SEO, seoHome } from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { pageUrl } from '../utils/site';

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'EuroVize Ana Sayfa',
    url: pageUrl('/'),
    description: seoHome.description,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EuroVize',
    url: pageUrl('/'),
    logo: pageUrl('/og-image.svg'),
    email: 'info@eurovize.com',
    telephone: '+90 212 555 0123',
  },
];

const Home: React.FC = () => (
  <main id="main-content" itemScope itemType="https://schema.org/WebPage">
    <SEO {...seoHome} schema={homeSchema} />
    <HeroSection />
    <ServicesSection />
    <ProcessSection />
    <StatsSection />
    <WhyUsSection />

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">SEO İçerik Merkezi</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0f2b5b]">
              Avrupa Vize Süreçleri İçin <span className="text-[#c9a84c]">Güncel Rehberler</span>
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">Arama motorlarında daha görünür olmak için kullanıcıların en çok sorduğu soruları rehber içeriklere dönüştürdük. Bu yazılar aynı zamanda hizmet sayfalarımıza güçlü iç link desteği sağlar.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#0f2b5b] font-bold hover:gap-3 transition-all">
            Tüm Rehberleri Gör <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map(post => (
            <article key={post.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c9a84c]">
                <span>{post.category}</span>
                <span className="text-gray-300">•</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#0f2b5b] leading-snug">{post.title}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-7">{post.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays size={14} /> {new Date(post.updatedAt).toLocaleDateString('tr-TR')}
              </div>
              <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f2b5b] hover:text-[#c9a84c] transition-colors">
                Yazıyı Oku <ChevronRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>

    <TestimonialsSection />
    <TrackingSection />
    <FAQSection />
  </main>
);

export default Home;
