import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Globe, Award, Shield, Clock, MapPin, Plane, BookOpen, Heart, Building2, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { PublicTracking } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  tourist: <Plane size={24} />,
  work: <Building2 size={24} />,
  student: <BookOpen size={24} />,
  family: <Heart size={24} />,
  residence: <MapPin size={24} />,
  citizenship: <Award size={24} />,
  business: <Building2 size={24} />,
  golden: <Star size={24} />,
};

/* ============ HERO SECTION ============ */
export const HeroSection: React.FC = () => {
  const { settings, services } = useApp();
  const activeServices = services.filter(s => s.isActive).slice(0, 4);

  return (
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2b5b] to-[#1a4d8c]">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">{settings.companyInfo.foundedYear}'den beri {settings.stats.totalApplications} başarılı başvuru</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Türkiye'den <br />
            <span className="text-[#c9a84c]">Avrupa'ya</span> Vize <br />
            Danışmanlık
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
            {settings.companyInfo.shortDesc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/hizmetler" className="px-8 py-4 bg-[#c9a84c] text-[#0a1628] rounded-xl font-bold hover:bg-[#d4b65a] transition-all text-lg flex items-center gap-2 justify-center shadow-lg shadow-[#c9a84c]/20">
              Hizmetleri Keşfet <ArrowRight size={20} />
            </Link>
            <Link to="/iletisim" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/20 transition-all text-lg border border-white/20 flex items-center gap-2 justify-center">
              Ücretsiz Danışmanlık
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-8 justify-center lg:justify-start">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{settings.stats.countries}</div>
              <div className="text-sm text-white/50">Avrupa Ülkesi</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{settings.stats.successRate}</div>
              <div className="text-sm text-white/50">Başarı Oranı</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{settings.stats.supportHours}</div>
              <div className="text-sm text-white/50">Destek</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">🇪🇺 Popüler Hizmetler</h3>
              {activeServices.map((s) => (
                <Link key={s.id} to={`/hizmet/${s.slug || s.id}`} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.countryFlag}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{s.country}</div>
                      <div className="text-white/50 text-xs">{s.typeName}</div>
                    </div>
                  </div>
                  <span className="text-[#c9a84c] text-xs font-medium">{s.duration}</span>
                </Link>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-xl px-4 py-3 text-sm font-bold shadow-lg shadow-green-500/20 flex items-center gap-2">
              <Phone size={16} /> Ücretsiz İlk Görüşme
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 80V60C240 20 480 0 720 20C960 40 1200 60 1440 40V80H0Z" fill="white" />
      </svg>
    </div>
  </section>
  );
};

/* ============ SERVICES SECTION ============ */
export const ServicesSection: React.FC = () => {
  const { services } = useApp();
  const activeServices = services.filter(s => s.isActive).slice(0, 6);

  return (
    <section className="py-20 bg-white" id="hizmetler">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Hizmetlerimiz</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0f2b5b]">
            Avrupa'da Hayal Ettiğiniz Hayat İçin <span className="text-[#c9a84c]">Doğru Adres</span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            12 Avrupa ülkesinde vize, çalışma izni, oturum izni ve göç danışmanlığı hizmetlerimizi keşfedin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map(service => (
            <Link key={service.id} to={`/hizmet/${service.slug || service.id}`} className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-[#c9a84c]/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0f2b5b] group-hover:bg-[#0f2b5b] group-hover:text-white transition-colors">
                  {iconMap[service.type] || <Globe size={24} />}
                </div>
                <span className="text-3xl">{service.countryFlag}</span>
              </div>
              <h3 className="font-bold text-[#0f2b5b] text-lg leading-snug mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{service.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-500">Süre:</span>
                  <span className="text-sm font-semibold text-[#0f2b5b] ml-1">{service.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-[#c9a84c] font-semibold text-sm group-hover:gap-2 transition-all">
                  Detay <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/hizmetler" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors">
            Tüm Hizmetleri Görüntüle <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ============ WHY US SECTION ============ */
export const WhyUsSection: React.FC = () => {
  const { settings } = useApp();

  const featureIconMap: Record<string, React.ReactNode> = {
    shield: <Shield size={28} />,
    users: <Users size={28} />,
    check: <CheckCircle size={28} />,
    clock: <Clock size={28} />,
    globe: <Globe size={28} />,
    award: <Award size={28} />,
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Neden Biz?</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0f2b5b]">
              Avrupa Göç Sürecinizde <span className="text-[#c9a84c]">Güvenilir Ortağınız</span>
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              EuroVize olarak, Türkiye'den Avrupa'ya göçmek isteyen her bireye özel, kapsamlı ve profesyonel danışmanlık hizmeti sunuyoruz. Sürecin her adımında yanınızdayız.
            </p>
            <div className="mt-8">
              <Link to="/hakkimizda" className="inline-flex items-center gap-2 text-[#0f2b5b] font-bold hover:gap-3 transition-all">
                Daha Fazla Bilgi <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {settings.whyUs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0f2b5b] mb-4">
                  {featureIconMap[f.icon] || <Shield size={28} />}
                </div>
                <h3 className="font-bold text-[#0f2b5b] mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============ STATS SECTION ============ */
export const StatsSection: React.FC = () => {
  const { settings } = useApp();
  const [counts, setCounts] = useState({ apps: 0, countries: 0, success: 0, years: 0 });
  const targets = { apps: settings.stats.totalApplicationsNum, countries: settings.stats.countriesNum, success: settings.stats.successRateNum, years: settings.stats.yearsNum };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        apps: Math.round(targets.apps * ease),
        countries: Math.round(targets.countries * ease),
        success: Math.round(targets.success * ease),
        years: Math.round(targets.years * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: counts.apps.toLocaleString('tr-TR') + '+', label: 'Başarılı Başvuru', icon: <CheckCircle size={24} /> },
    { value: counts.countries + '+', label: 'Avrupa Ülkesi', icon: <Globe size={24} /> },
    { value: '%' + counts.success, label: 'Başarı Oranı', icon: <Award size={24} /> },
    { value: counts.years + '+', label: 'Yıllık Deneyim', icon: <Clock size={24} /> },
  ].map(s => s);

  return (
    <section className="py-16 bg-gradient-to-r from-[#0f2b5b] to-[#1a4d8c]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#c9a84c] mx-auto mb-4">
                {s.icon}
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-white">{s.value}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============ TESTIMONIALS SECTION ============ */
export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();
  const activeTestimonials = testimonials.filter(t => t.isActive);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % activeTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTestimonials.length]);

  if (activeTestimonials.length === 0) return null;
  const t = activeTestimonials[current];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Referanslar</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0f2b5b]">
            Müvekkillerimizin <span className="text-[#c9a84c]">Başarı Hikayeleri</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center relative">
            <div className="text-5xl text-[#c9a84c]/30 absolute top-4 left-8">"</div>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < t.rating ? 'text-[#c9a84c] fill-[#c9a84c]' : 'text-gray-300'} />
              ))}
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-8 max-w-2xl mx-auto">"{t.text}"</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-[#0f2b5b] text-white rounded-full flex items-center justify-center text-lg font-bold">
                {t.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-bold text-[#0f2b5b]">{t.name}</div>
                <div className="text-sm text-gray-500">{t.flag} {t.country} • {t.service}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {activeTestimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-[#c9a84c] w-8' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============ FAQ SECTION ============ */
export const FAQSection: React.FC = () => {
  const { faqs } = useApp();
  const activeFaqs = faqs.filter(f => f.isActive).sort((a, b) => a.order - b.order);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">SSS</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0f2b5b]">
            Sıkça Sorulan <span className="text-[#c9a84c]">Sorular</span>
          </h2>
          <p className="mt-4 text-gray-600">Avrupa vize ve oturum izni süreçleri hakkında merak edilenler.</p>
        </div>

        <div className="space-y-3">
          {activeFaqs.map((faq, i) => (
            <div key={faq.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-[#0f2b5b] pr-4">{faq.question}</span>
                <span className={`text-[#c9a84c] text-2xl leading-none transition-transform shrink-0 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============ TRACKING SECTION ============ */
export const TrackingSection: React.FC = () => {
  const { getApplicationByTracking } = useApp();
  const [trackingNo, setTrackingNo] = useState('');
  const [result, setResult] = useState<PublicTracking | undefined | null>(undefined);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNo.trim()) {
      setSearching(true);
      const app = await getApplicationByTracking(trackingNo.trim().toUpperCase());
      setResult(app);
      setSearched(true);
      setSearching(false);
    }
  };

  const statusColor: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-50',
    reviewing: 'text-blue-600 bg-blue-50',
    approved: 'text-green-600 bg-green-50',
    rejected: 'text-red-600 bg-red-50',
    processing: 'text-purple-600 bg-purple-50',
    completed: 'text-emerald-600 bg-emerald-50',
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Başvuru Takip</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0f2b5b]">
            Başvurunuzu <span className="text-[#c9a84c]">Takip Edin</span>
          </h2>
          <p className="mt-4 text-gray-600">Başvuru sırasında aldığınız takip numarasını girerek durumunuzu kontrol edin.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
          <input
            type="text"
            value={trackingNo}
            onChange={e => setTrackingNo(e.target.value)}
            placeholder="Takip No: EV-XXXXXX"
            className="flex-1 px-5 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent"
            disabled={searching}
          />
          <button type="submit" disabled={searching} className="px-6 py-3.5 bg-[#0f2b5b] text-white rounded-xl font-semibold hover:bg-[#1a3f7a] transition-colors shrink-0 disabled:opacity-50">
            {searching ? 'Aranıyor...' : 'Sorgula'}
          </button>
        </form>

        {searched && (
          <div className="mt-8 bg-gray-50 rounded-2xl p-6">
            {result ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-[#0f2b5b]">{result.serviceTitle}</h3>
                    <p className="text-sm text-gray-500">{result.country} • {result.trackingNumber}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[result.status] || ''}`}>
                    {result.statusName}
                  </span>
                </div>
                <div className="space-y-3">
                  {result.notes.map((note: { date: string; text: string }, i: number) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-gray-400 shrink-0">{new Date(note.date).toLocaleDateString('tr-TR')}</span>
                      <span className="text-gray-700">{note.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-red-500 font-medium">Bu takip numarasıyla eşleşen başvuru bulunamadı.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

/* ============ PROCESS SECTION ============ */
export const ProcessSection: React.FC = () => {
  const steps = [
    { step: 1, title: 'İletişime Geçin', desc: 'Telefon, WhatsApp veya form doldurarak bize ulaşın.', icon: <MessageCircle size={28} /> },
    { step: 2, title: 'Ücretsiz Değerlendirme', desc: 'Uzmanlarımız durumunuzu değerlendirir ve en uygun yolu belirler.', icon: <Users size={28} /> },
    { step: 3, title: 'Belge Hazırlığı', desc: 'Gerekli tüm belgeleri eksiksiz hazırlamanıza yardımcı oluruz.', icon: <CheckCircle size={28} /> },
    { step: 4, title: 'Başvuru ve Takip', desc: 'Başvurunuzu gerçekleştirir ve süreci aktif olarak takip ederiz.', icon: <Globe size={28} /> },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Süreç</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0f2b5b]">
            4 Adımda <span className="text-[#c9a84c]">Avrupa'ya</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-[#c9a84c] text-white rounded-full flex items-center justify-center text-sm font-bold">
                {s.step}
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0f2b5b] mx-auto mb-4 mt-3">
                {s.icon}
              </div>
              <h3 className="font-bold text-[#0f2b5b] mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
