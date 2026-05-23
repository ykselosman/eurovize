import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, SITE_NAME, pageUrl } from '../utils/site';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  schema,
  noindex = false,
}) => {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    const setMeta = (attr: string, val: string, prop = 'name') => {
      let el = document.querySelector(`meta[${prop}="${attr}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(prop, attr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow, noarchive' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('googlebot', noindex ? 'noindex, nofollow, noarchive' : 'index, follow, max-snippet:-1, max-image-preview:large');
    if (keywords) setMeta('keywords', keywords);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', 'tr_TR', 'property');
    if (canonical) setMeta('og:url', canonical, 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (ogImage) setMeta('twitter:image', ogImage);

    document.querySelectorAll('script[data-seo-schema="true"]').forEach(el => el.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((item) => {
        const el = document.createElement('script');
        el.type = 'application/ld+json';
        el.dataset.seoSchema = 'true';
        el.textContent = JSON.stringify(item);
        document.head.appendChild(el);
      });
    }

    return () => {
      document.querySelectorAll('script[data-seo-schema="true"]').forEach(el => el.remove());
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schema, noindex]);

  return null;
};

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 py-3">
    <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
      {items.map((item, i) => (
        <li key={`${item.label}-${i}`} className="flex items-center gap-1.5" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          {i > 0 && <span className="text-gray-300" aria-hidden="true">/</span>}
          {item.href ? (
            <Link to={item.href} itemProp="item" className="hover:text-[#0f2b5b] transition-colors">
              <span itemProp="name">{item.label}</span>
            </Link>
          ) : (
            <span itemProp="name" className="text-[#0f2b5b] font-medium" aria-current="page">{item.label}</span>
          )}
          <meta itemProp="position" content={String(i + 1)} />
        </li>
      ))}
    </ol>
  </nav>
);

export const seoHome = {
  title: 'Avrupa Vize ve Oturum İzni Danışmanlık Merkezi',
  description: 'Türkiye’den Avrupa’ya vize, çalışma izni, oturum izni, aile birleşimi ve göç danışmanlığı. Almanya, Hollanda, Fransa, İspanya, Portekiz ve 12+ Avrupa ülkesi için profesyonel destek.',
  keywords: 'avrupa vize başvurusu, avrupa oturum izni, almanya çalışma vizesi, hollanda çalışma izni, portekiz d7 vizesi, ispanya golden visa, aile birleşimi danışmanlığı',
  canonical: pageUrl('/'),
};

export const seoServices = {
  title: 'Hizmetlerimiz - Avrupa Vize, Çalışma İzni ve Oturum Danışmanlığı',
  description: 'Almanya çalışma vizesi, Hollanda yüksek nitelikli göçmen, Fransa öğrenci vizesi, İspanya golden visa, Portekiz D7 ve Schengen başvuruları için profesyonel danışmanlık.',
  keywords: 'avrupa vize danışmanlığı hizmetleri, almanya çalışma vizesi danışmanlığı, hollanda göçmen vizesi, portekiz d7 danışmanlığı',
  canonical: pageUrl('/hizmetler'),
};

export const seoAbout = {
  title: 'Hakkımızda - EuroVize Danışmanlık',
  description: 'EuroVize olarak Avrupa vize ve oturum izni süreçlerinde bireysel danışmanlık, belge yönetimi ve başvuru takibi sunuyoruz.',
  keywords: 'eurovize hakkında, vize danışmanlık firması, avrupa göç danışmanlığı istanbul',
  canonical: pageUrl('/hakkimizda'),
};

export const seoContact = {
  title: 'İletişim - Avrupa Vize Danışmanlığı',
  description: 'Avrupa vize, çalışma izni ve oturum danışmanlığı için bizimle iletişime geçin. Telefon, WhatsApp ve e-posta ile ücretsiz ön değerlendirme alın.',
  keywords: 'vize danışmanlık iletişim, avrupa göç danışmanlığı telefon, vize danışmanlık whatsapp',
  canonical: pageUrl('/iletisim'),
};

export const seoServiceDetail = (title: string, country: string, slug?: string) => ({
  title: `${title} - ${country} Vize Danışmanlığı`,
  description: `${country} için ${title.toLowerCase()} başvuru süreci, gerekli belgeler, süre ve danışmanlık kapsamı hakkında detaylı bilgi alın.`,
  keywords: `${country.toLowerCase()} vizesi, ${country.toLowerCase()} çalışma izni, ${country.toLowerCase()} oturum izni, ${country.toLowerCase()} vize danışmanlığı`,
  canonical: pageUrl(slug ? `/hizmet/${slug}` : '/hizmetler'),
});
