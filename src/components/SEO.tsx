import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonical, ogType = 'website', ogImage, schema }) => {
  useEffect(() => {
    // Title
    document.title = `${title} | EuroVize`;

    // Helper
    const set = (attr: string, val: string, prop = 'name') => {
      let el = document.querySelector(`meta[${prop}="${attr}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement('meta'); el.setAttribute(prop, attr); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };

    // Standard
    set('description', description);
    if (keywords) set('keywords', keywords);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
      link.href = canonical;
    }

    // Open Graph
    set('og:title', title, 'property');
    set('og:description', description, 'property');
    set('og:type', ogType, 'property');
    if (canonical) set('og:url', canonical, 'property');
    if (ogImage) set('og:image', ogImage, 'property');

    // Twitter
    set('twitter:title', title);
    set('twitter:description', description);
    if (ogImage) set('twitter:image', ogImage);

    // Schema
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s, i) => {
        const id = `schema-${i}`;
        let el = document.getElementById(id) as HTMLScriptElement;
        if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = id; document.head.appendChild(el); }
        el.textContent = JSON.stringify(s);
      });
      // Clean up extra schema tags from previous page
      const existing = document.querySelectorAll('script[data-seo-schema]');
      existing.forEach(el => el.remove());
    }
  }, [title, description, keywords, canonical, ogType, ogImage, schema]);

  return null;
};

/* ─── Reusable Breadcrumb ─── */
interface BreadcrumbItem { label: string; href?: string }

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 py-3">
    <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          {i > 0 && <span className="text-gray-300" aria-hidden="true">/</span>}
          {item.href ? (
            <a href={item.href} itemProp="item" className="hover:text-[#0f2b5b] transition-colors">
              <span itemProp="name">{item.label}</span>
            </a>
          ) : (
            <span itemProp="name" className="text-[#0f2b5b] font-medium" aria-current="page">{item.label}</span>
          )}
          <meta itemProp="position" content={String(i + 1)} />
        </li>
      ))}
    </ol>
  </nav>
);

/* ─── Pre-built SEO configs for each page ─── */
export const seoHome = {
  title: 'Avrupa Vize ve Oturum İzni Danışmanlık Merkezi',
  description: 'Türkiye\'den Avrupa\'ya vize ve oturum izni başvurularında profesyonel danışmanlık. Almanya, Hollanda, Fransa, İspanya ve 12+ Avrupa ülkesi için çalışma izni, oturum izni, aile birleşimi ve göç danışmanlığı. %97 başarı oranı.',
  keywords: 'avrupa vize başvurusu, çalışma izni avrupa, oturum izni avrupa, schengen vizesi, avrupa göç danışmanlığı, vize danışmanlık merkezi',
  canonical: 'https://eurovize.com'
};

export const seoServices = {
  title: 'Hizmetlerimiz - Avrupa Vize, Çalışma İzni ve Oturum Danışmanlığı',
  description: 'Almanya çalışma vizesi, Hollanda yüksek nitelikli göçmen, İspanya altın vize, Portekiz D7 vize, Fransa öğrenci vizesi ve daha fazlası. 12+ Avrupa ülkesinde profesyonel danışmanlık.',
  keywords: 'almanya çalışma vizesi, hollanda vize başvurusu, ispanya golden visa, portekiz d7 vize, fransa öğrenci vizesi, belçika aile birleşimi, avusturya kırmızı beyaz kırmızı kart',
  canonical: 'https://eurovize.com/hizmetler'
};

export const seoAbout = {
  title: 'Hakkımızda - EuroVize Danışmanlık',
  description: 'EuroVize Danışmanlık olarak 2018\'den beri Türkiye\'den Avrupa\'ya göçmek isteyen binlerce müvekkilimize profesyonel vize ve oturum izni danışmanlığı sunuyoruz.',
  keywords: 'eurovize, vize danışmanlık firması, avrupa göç danışmanlığı, vize başvuru merkezi istanbul',
  canonical: 'https://eurovize.com/hakkimizda'
};

export const seoContact = {
  title: 'İletişim - Avrupa Vize Danışmanlığı',
  description: 'Avrupa vize ve oturum izni danışmanlığı için bizimle iletişime geçin. Ücretsiz ilk görüşme. Telefon, WhatsApp, e-posta veya form ile ulaşın.',
  keywords: 'vize danışmanlık iletişim, avrupa vize başvuru merkezi telefon, vize danışmanlık whatsapp',
  canonical: 'https://eurovize.com/iletisim'
};

export const seoServiceDetail = (title: string, country: string) => ({
  title: `${title} - ${country} Vize Danışmanlığı`,
  description: `${country} ${title.toLowerCase().includes('çalışma') ? 'çalışma vizesi' : title.toLowerCase().includes('öğrenci') ? 'öğrenci vizesi' : title.toLowerCase().includes('altın') ? 'altın vize' : title.toLowerCase().includes('aile') ? 'aile birleşimi' : title.toLowerCase().includes('oturum') ? 'oturum izni' : 'vize'} başvurusu için profesyonel danışmanlık. Gerekli belgeler, süreç adımları ve fiyat bilgisi.`,
  keywords: `${country.toLowerCase()} vize başvurusu, ${country.toLowerCase()} çalışma izni, ${country.toLowerCase()} oturum izni, ${country.toLowerCase()} vize nasıl alınır`,
  canonical: 'https://eurovize.com/hizmetler'
});
