import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, ChevronRight, CheckCircle, Clock, Phone, MessageCircle, ArrowLeft, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { typeColors } from '../data/initialData';
import { SEO, Breadcrumb, seoServices, seoServiceDetail } from '../components/SEO';

/* ============ SERVICES LIST PAGE ============ */
export const ServicesPage: React.FC = () => {
  const { services } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const activeServices = services.filter(s => s.isActive);

  const types = [
    { value: 'all', label: 'Tümü', icon: '🌍' },
    { value: 'work', label: 'Çalışma', icon: '💼' },
    { value: 'student', label: 'Öğrenci', icon: '🎓' },
    { value: 'family', label: 'Aile', icon: '❤️' },
    { value: 'residence', label: 'Oturum', icon: '🏠' },
    { value: 'golden', label: 'Altın Vize', icon: '⭐' },
    { value: 'tourist', label: 'Turistik', icon: '✈️' },
  ];

  let filtered = filter === 'all' ? activeServices : activeServices.filter(s => s.type === filter);
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      s.typeName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  }

  return (
    <main id="main-content" itemScope itemType="https://schema.org/CollectionPage">
      <SEO {...seoServices} />
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16" aria-label="Hizmetler başlık">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Breadcrumb items={[{label:'Ana Sayfa', href:'#/'}, {label:'Hizmetler'}]} />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">Hizmetlerimiz</h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">12+ Avrupa ülkesinde vize, çalışma izni, oturum izni ve göç danışmanlığı</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-white/50 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight size={14} /><span>Hizmetler</span>
          </div>

          {/* Search */}
          <div className="max-w-lg mx-auto mt-8 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ülke, hizmet türü veya anahtar kelime ile arayın..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl text-sm bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {types.map(t => (
              <button key={t.value} onClick={() => setFilter(t.value)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === t.value ? 'bg-[#0f2b5b] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <span className="mr-1.5">{t.icon}</span> {t.label}
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
              <Link key={service.id} to={`/hizmet/${service.id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                    {service.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-[#0f2b5b] rounded text-xs">{f}</span>
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

/* ============ SERVICE DETAIL PAGE ============ */
export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getService, services, settings } = useApp();
  const service = getService(id || '');
  const seo = seoServiceDetail(service?.title || 'Vize Danışmanlığı', service?.country || 'Avrupa');

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

  // Related services: same type or same country, excluding current
  const relatedServices = services.filter(s => s.isActive && s.id !== service.id && (s.type === service.type || s.country === service.country)).slice(0, 3);

  return (
    <main id="main-content" itemScope itemType="https://schema.org/Service">
      <SEO {...seo} />
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16" aria-label={`${service.title} detay`}>
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{label:'Ana Sayfa', href:'#/'}, {label:'Hizmetler', href:'#/hizmetler'}, {label:service.title}]} />
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

              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">Başvuru Süreci</h2>
                <div className="space-y-4">
                  {service.process.map((step) => (
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
                  {service.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">Hizmete Dahil Olanlar</h2>
                <div className="flex flex-wrap gap-3">
                  {service.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-[#0f2b5b] rounded-xl text-sm font-medium">
                      <CheckCircle size={16} className="text-[#c9a84c]" /> {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">İlgili Hizmetler</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedServices.map(s => (
                      <Link key={s.id} to={`/hizmet/${s.id}`} className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-[#c9a84c]/30 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{s.countryFlag}</span>
                          <span className="font-semibold text-[#0f2b5b] text-sm">{s.country}</span>
                        </div>
                        <h3 className="font-semibold text-[#0f2b5b] text-sm mb-1 group-hover:text-[#c9a84c] transition-colors">{s.typeName}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
                        <div className="mt-2 text-xs text-[#c9a84c] font-medium">{s.price} • {s.duration}</div>
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

              {/* Trust Badges */}
              <div className="bg-[#0f2b5b] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4 text-[#c9a84c]">Neden EuroVize?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm"><span className="text-[#c9a84c]"><Star size={16} /></span><span className="text-white/80">{settings.stats.successRate} Başarı Oranı</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="text-[#c9a84c]"><CheckCircle size={16} /></span><span className="text-white/80">{settings.stats.totalApplications} Başarılı Başvuru</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="text-[#c9a84c]"><Clock size={16} /></span><span className="text-white/80">{settings.stats.supportHours} Destek</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
