import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronRight, Clock, MessageCircle, Phone, Search, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { blogPosts } from '../data/blogPosts';
import { typeColors } from '../data/initialData';
import { Breadcrumb, SEO, seoServiceDetail, seoServices } from '../components/SEO';
import { DEFAULT_OG_IMAGE, pageUrl } from '../utils/site';
import type { Service } from '../types';

const typeIntroMap: Record<Service['type'], string> = {
  work: 'Bu hizmet, Avrupa’da bir iş teklifi almış veya nitelikli çalışan olarak yurt dışında kariyer hedefleyen adaylar için uygundur.',
  student: 'Bu hizmet, Avrupa’da eğitim planlayan ve öğrenci vizesi sürecini eksiksiz yönetmek isteyen adaylara yöneliktir.',
  family: 'Bu hizmet, eş veya aile bireyleriyle Avrupa’da birlikte yaşamak için aile birleşimi başvurusu yapacak kişiler için hazırlanmıştır.',
  residence: 'Bu hizmet, belirli gelir veya yaşam planı üzerinden Avrupa’da yasal oturum hakkı elde etmek isteyen adaylara hitap eder.',
  tourist: 'Bu hizmet, Schengen veya kısa süreli seyahat amacıyla Avrupa’ya gitmek isteyen kişiler için dosya hazırlığı sağlar.',
  golden: 'Bu hizmet, yatırım yoluyla Avrupa’da oturum hakkı elde etmek isteyen yatırımcılara yöneliktir.',
  citizenship: 'Bu hizmet, uzun vadeli oturum ve vatandaşlık yolunda stratejik planlama yapmak isteyen adaylara uygundur.',
  business: 'Bu hizmet, iş kurma, ticari faaliyet veya şirket temelli vize süreçleriyle Avrupa’ya açılmak isteyen başvuru sahiplerine yöneliktir.',
};

const typeFaqMap: Record<Service['type'], { question: string; answer: string }[]> = {
  work: [
    { question: 'İş teklifi olmadan çalışma vizesi alınabilir mi?', answer: 'Birçok Avrupa ülkesinde çalışma vizesi için iş teklifi veya iş sözleşmesi temel gerekliliktir. Ülkeye göre farklı programlar bulunabilir.' },
    { question: 'Çalışma vizesi sonrası oturum alınır mı?', answer: 'Evet. Çoğu ülkede çalışma vizesi veya buna bağlı süreç, geçici/uzun süreli oturum hakkına dönüşür.' },
  ],
  student: [
    { question: 'Öğrenci vizesi için kabul mektubu zorunlu mu?', answer: 'Evet, neredeyse tüm öğrenci vizesi dosyalarında okul veya üniversite kabulü temel evraklardan biridir.' },
    { question: 'Öğrenci vizesi ile part-time çalışma mümkün mü?', answer: 'Ülkeye göre değişmekle birlikte çoğu Avrupa ülkesinde belirli saat sınırları içinde çalışma hakkı bulunur.' },
  ],
  family: [
    { question: 'Aile birleşiminde sponsorun geliri önemli mi?', answer: 'Evet. Sponsor kişinin gelir, konut ve yasal statü şartlarını karşılaması başvurunun en kritik unsurlarındandır.' },
    { question: 'Aile birleşimi ne kadar sürer?', answer: 'Dosyanın ülkeye ve aile yapısına göre değişmesine rağmen birkaç aydan daha uzun süren incelemeler görülebilir.' },
  ],
  residence: [
    { question: 'Oturum izni için ülkede fiziksel bulunma şartı var mı?', answer: 'Programa göre değişir. Bazı programlarda minimum kalış süresi veya kayıt zorunluluğu bulunur.' },
    { question: 'Oturum izni vatandaşlığa gider mi?', answer: 'Birçok ülkede uzun vadeli yasal ikamet sonrası kalıcı oturum veya vatandaşlık yolu açılabilir.' },
  ],
  tourist: [
    { question: 'Turistik vize ile çalışma yapılabilir mi?', answer: 'Hayır. Turistik vize sadece kısa süreli seyahat ve ziyaret amacıyla kullanılmalıdır.' },
    { question: 'Ret sonrası tekrar başvuru yapılabilir mi?', answer: 'Evet, ancak ret nedenini düzeltmeden yeniden başvuru yapmak başarı ihtimalini düşürür.' },
  ],
  golden: [
    { question: 'Golden Visa’da yatırım türü önemli mi?', answer: 'Evet. Uygun yatırım modeli ve tutar, ülkenin güncel program kurallarına tam uyumlu olmalıdır.' },
    { question: 'Aile bireyleri başvuruya dahil edilebilir mi?', answer: 'Birçok golden visa programında eş ve çocuklar da aynı dosyaya dahil edilebilir.' },
  ],
  citizenship: [
    { question: 'Vatandaşlık başvurusu için önce oturum gerekir mi?', answer: 'Çoğu ülkede evet. Vatandaşlık, genellikle belirli bir süre yasal ikametten sonra mümkündür.' },
    { question: 'Dil şartı olur mu?', answer: 'Birçok ülkede vatandaşlık aşamasında temel dil ve entegrasyon şartları görülebilir.' },
  ],
  business: [
    { question: 'Şirket kurmak tek başına vize almak için yeterli midir?', answer: 'Hayır. Ticari planın gerçekçi olması, finansal yapı ve iş modelinin başvuruya uygun olması gerekir.' },
    { question: 'İş planı gerekli mi?', answer: 'Evet. Birçok iş kurma ve girişimcilik dosyasında detaylı iş planı kritik rol oynar.' },
  ],
};

export const ServicesPage: React.FC = () => {
  const { services } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const activeServices = services.filter(service => service.isActive);

  const filtered = useMemo(() => {
    const byType = filter === 'all' ? activeServices : activeServices.filter(service => service.type === filter);
    if (!searchQuery.trim()) return byType;
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR');
    return byType.filter(service =>
      service.title.toLocaleLowerCase('tr-TR').includes(q) ||
      service.country.toLocaleLowerCase('tr-TR').includes(q) ||
      service.typeName.toLocaleLowerCase('tr-TR').includes(q) ||
      service.description.toLocaleLowerCase('tr-TR').includes(q)
    );
  }, [activeServices, filter, searchQuery]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'EuroVize Hizmetler',
    url: pageUrl('/hizmetler'),
    mainEntity: filtered.slice(0, 12).map(service => ({
      '@type': 'Service',
      name: service.title,
      description: service.description,
      areaServed: service.country,
      provider: { '@type': 'Organization', name: 'EuroVize' },
      url: pageUrl(`/hizmet/${service.slug || service.id}`),
    })),
  };

  const types = [
    { value: 'all', label: 'Tümü', icon: '🌍' },
    { value: 'work', label: 'Çalışma', icon: '💼' },
    { value: 'student', label: 'Öğrenci', icon: '🎓' },
    { value: 'family', label: 'Aile', icon: '❤️' },
    { value: 'residence', label: 'Oturum', icon: '🏠' },
    { value: 'golden', label: 'Altın Vize', icon: '⭐' },
    { value: 'tourist', label: 'Turistik', icon: '✈️' },
  ];

  return (
    <main id="main-content" itemScope itemType="https://schema.org/CollectionPage">
      <SEO {...seoServices} schema={collectionSchema} />
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16" aria-label="Hizmetler başlık">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Breadcrumb items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler' }]} />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">Hizmetlerimiz</h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">Avrupa’da çalışma, eğitim, oturum ve aile birleşimi hedeflerinize uygun danışmanlık paketlerini inceleyin.</p>

          <div className="max-w-lg mx-auto mt-8 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ülke, hizmet türü veya anahtar kelime ile arayın..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl text-sm bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
              maxLength={120}
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {types.map(type => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === type.value ? 'bg-[#0f2b5b] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <span className="mr-1.5">{type.icon}</span> {type.label}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="text-center text-gray-500 mb-6">
              "<strong>{searchQuery}</strong>" için {filtered.length} sonuç bulundu
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(service => (
              <Link key={service.id} to={`/hizmet/${service.slug || service.id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-[#0f2b5b] to-[#1a4d8c] p-6 text-white">
                  <div className="flex items-start justify-between">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${typeColors[service.type] || 'bg-gray-100 text-gray-800'}`}>{service.typeName}</span>
                    <span className="text-3xl">{service.countryFlag}</span>
                  </div>
                  <h3 className="font-bold text-lg mt-3 leading-snug">{service.title}</h3>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                    <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
                    <span className="font-semibold text-[#c9a84c]">{service.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-0.5 bg-blue-50 text-[#0f2b5b] rounded text-xs">{feature}</span>
                    ))}
                    {service.features.length > 3 && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">+{service.features.length - 3}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Sonuç bulunamadı</p>
              <p className="text-gray-400 text-sm">Farklı anahtar kelimeler veya filtreler deneyin.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export const ServiceDetailPage: React.FC = () => {
  const params = useParams<{ slug?: string; id?: string }>();
  const key = params.slug || params.id || '';
  const { getService, services, settings } = useApp();
  const service = getService(key);
  const seo = seoServiceDetail(service?.title || 'Vize Danışmanlığı', service?.country || 'Avrupa', service?.slug);

  if (!service) {
    return (
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hizmet Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız hizmet mevcut değil veya kaldırılmış olabilir.</p>
          <Link to="/hizmetler" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b5b] text-white rounded-xl font-semibold hover:bg-[#1a3f7a] transition-colors">
            <ArrowLeft size={18} /> Hizmetlere Dön
          </Link>
        </div>
      </main>
    );
  }

  const relatedServices = services
    .filter(item => item.isActive && item.id !== service.id && (item.type === service.type || item.country === service.country))
    .slice(0, 3);

  const relatedPosts = blogPosts.filter(post => post.relatedServiceIds.includes(service.id) || post.title.toLocaleLowerCase('tr-TR').includes(service.country.toLocaleLowerCase('tr-TR'))).slice(0, 3);

  const serviceFaqs = [
    {
      question: `${service.country} için ${service.typeName.toLowerCase()} başvurusu ne kadar sürer?`,
      answer: `${service.country} için bu başvuru tipi ortalama ${service.duration} içinde sonuçlanabilir. Resmi kurum yoğunluğu ve dosya kalitesi süreyi etkileyebilir.`,
    },
    {
      question: `${service.title} için en önemli evraklar nelerdir?`,
      answer: `Geçerli pasaport, başvuru formu ve başvuru türüne uygun ana destekleyici evraklar kritik öneme sahiptir. Bu hizmet özelinde temel belgeler yukarıda listelenmiştir.`,
    },
    ...typeFaqMap[service.type],
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      areaServed: service.country,
      provider: { '@type': 'Organization', name: 'EuroVize' },
      offers: { '@type': 'Offer', priceCurrency: 'EUR', price: service.price.replace(/[^\d,.]/g, '') || undefined },
      url: pageUrl(`/hizmet/${service.slug || service.id}`),
      image: DEFAULT_OG_IMAGE,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: pageUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: pageUrl('/hizmetler') },
        { '@type': 'ListItem', position: 3, name: service.title, item: pageUrl(`/hizmet/${service.slug || service.id}`) },
      ],
    },
    faqSchema,
  ];

  return (
    <main id="main-content" itemScope itemType="https://schema.org/Service">
      <SEO {...seo} schema={schema} />
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16" aria-label={`${service.title} detay`}>
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: service.title }]} />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{service.countryFlag}</span>
                <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-white/20 text-white">{service.typeName}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">{service.title}</h1>
              <p className="mt-3 text-white/70 max-w-2xl">{service.description}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 min-w-[260px]">
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-white/60">Ülke:</span><span className="text-white font-semibold">{service.country}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Başvuru Süresi:</span><span className="text-white font-semibold">{service.duration}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Danışmanlık Ücreti:</span><span className="text-[#c9a84c] font-bold text-lg">{service.price}</span></div>
                <div className="h-px bg-white/20" />
                <Link to="/giris" className="block w-full text-center px-4 py-3 bg-[#c9a84c] text-[#0a1628] rounded-xl font-bold hover:bg-[#d4b65a] transition-colors">Başvuru Yap</Link>
                <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                  <MessageCircle size={16} /> WhatsApp İletişim
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-4">Hizmet Detayı</h2>
                <p className="text-gray-700 leading-relaxed">{service.longDescription}</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-4">Kimler İçin Uygun?</h2>
                <p className="text-gray-700 leading-8">{typeIntroMap[service.type]}</p>
                <p className="text-gray-700 leading-8 mt-4">{service.country} için bu süreçte başarı şansını artırmak adına başvuru niyetinizin net, belgelerinizin tutarlı ve zaman planınızın gerçekçi olması gerekir.</p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">Başvuru Süreci</h2>
                <div className="space-y-4">
                  {service.process.map(step => (
                    <div key={step.step} className="flex gap-4 bg-gray-50 rounded-xl p-5">
                      <div className="w-10 h-10 bg-[#c9a84c] text-white rounded-xl flex items-center justify-center font-bold shrink-0">{step.step}</div>
                      <div>
                        <h3 className="font-bold text-[#0f2b5b]">{step.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">Gerekli Belgeler</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">Hizmete Dahil Olanlar</h2>
                <div className="flex flex-wrap gap-3">
                  {service.features.map((feature, index) => (
                    <span key={index} className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-[#0f2b5b] rounded-xl text-sm font-medium">
                      <CheckCircle size={16} className="text-[#c9a84c]" /> {feature}
                    </span>
                  ))}
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">İlgili Rehber Yazılar</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedPosts.map(post => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-[#c9a84c]/30 transition-all">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#c9a84c]">{post.category}</span>
                        <h3 className="mt-2 font-semibold text-[#0f2b5b] text-sm mb-2 group-hover:text-[#c9a84c] transition-colors">{post.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-3">{post.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">Sık Sorulan Sorular</h2>
                <div className="space-y-3">
                  {serviceFaqs.map(faq => (
                    <div key={faq.question} className="rounded-2xl border border-gray-100 p-5 bg-gray-50">
                      <h3 className="font-bold text-[#0f2b5b] mb-2">{faq.question}</h3>
                      <p className="text-sm leading-7 text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">İlgili Hizmetler</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedServices.map(item => (
                      <Link key={item.id} to={`/hizmet/${item.slug || item.id}`} className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-[#c9a84c]/30 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{item.countryFlag}</span>
                          <span className="font-semibold text-[#0f2b5b] text-sm">{item.country}</span>
                        </div>
                        <h3 className="font-semibold text-[#0f2b5b] text-sm mb-1 group-hover:text-[#c9a84c] transition-colors">{item.typeName}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                        <div className="mt-2 text-xs text-[#c9a84c] font-medium">{item.price} • {item.duration}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-[#0f2b5b] text-lg mb-4">Hızlı İletişim</h3>
                <div className="space-y-3">
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm hover:shadow-md transition-shadow">
                    <Phone size={18} className="text-[#0f2b5b]" />
                    <div><div className="text-gray-500 text-xs">Telefon</div><div className="font-semibold text-[#0f2b5b]">{settings.phone}</div></div>
                  </a>
                  <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm hover:shadow-md transition-shadow">
                    <MessageCircle size={18} className="text-green-500" />
                    <div><div className="text-gray-500 text-xs">WhatsApp</div><div className="font-semibold text-green-600">Hemen Yazın</div></div>
                  </a>
                </div>
                <Link to="/giris" className="block w-full mt-4 px-4 py-3 bg-[#0f2b5b] text-white rounded-xl font-bold text-center hover:bg-[#1a3f7a] transition-colors">Online Başvuru Yap</Link>
                <Link to="/iletisim" className="block w-full mt-2 px-4 py-3 border border-[#0f2b5b] text-[#0f2b5b] rounded-xl font-bold text-center hover:bg-blue-50 transition-colors">İletişim Formu</Link>
              </div>

              <div className="bg-[#0f2b5b] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4 text-[#c9a84c]">Neden EuroVize?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm"><span className="text-[#c9a84c]"><Star size={16} /></span><span className="text-white/80">{settings.stats.successRate} Başarı Oranı</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="text-[#c9a84c]"><CheckCircle size={16} /></span><span className="text-white/80">{settings.stats.totalApplications} Başarılı Başvuru</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="text-[#c9a84c]"><Clock size={16} /></span><span className="text-white/80">{settings.stats.supportHours} Destek</span></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-[#0f2b5b] text-lg mb-3">Yerel ve Online Danışmanlık</h3>
                <p className="text-sm text-gray-600 leading-7">İstanbul merkezli danışmanlık altyapımızla Türkiye geneline ve yurt dışından başvuru yapan adaylara online destek sunuyoruz. Bu sayede hem yerel aramalarda hem de ülke bazlı hizmet aramalarında görünürlüğümüz güçlenir.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
