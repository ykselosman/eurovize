import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, User, LogOut, LayoutDashboard, Shield, Globe, MessageCircle, XCircle, CheckCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

/* ============ TOAST NOTIFICATIONS ============ */
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();
  if (toasts.length === 0) return null;

  const icons = { success: <CheckCircle size={18} />, error: <XCircle size={18} />, info: <Info size={18} /> };
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-[slideIn_0.3s_ease-out] ${colors[t.type]}`}>
          <span className="shrink-0">{icons[t.type]}</span>
          <p className="text-sm font-medium flex-1">{t.message}</p>
          <button onClick={() => removeToast(t.id)} className="shrink-0 opacity-60 hover:opacity-100"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
};

/* ============ WHATSAPP FLOATING BUTTON ============ */
export const WhatsAppButton: React.FC = () => {
  const { settings } = useApp();
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
      {tooltip && (
        <div className="absolute bottom-16 right-0 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap">
          WhatsApp ile yazın 👋
        </div>
      )}
      <a
        href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all hover:scale-110"
        aria-label="WhatsApp İletişim"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
};

/* ============ KVKK BANNER ============ */
export const KVKKBanner: React.FC = () => {
  const [accepted, setAccepted] = useState(() => {
    try { return localStorage.getItem('ev_kvkk') === 'true'; } catch { return false; }
  });

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a1628] text-white p-4 shadow-2xl border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/80 text-center sm:text-left">
          🍪 Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. Siteyi kullanmaya devam ederek <Link to="/kvkk-aydinlatma" className="text-[#c9a84c] underline">KVKK Aydınlatma Metni</Link> ve <Link to="/cerez-politikasi" className="text-[#c9a84c] underline">Çerez Politikası</Link>'nı kabul etmiş olursunuz.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => { setAccepted(true); localStorage.setItem('ev_kvkk', 'true'); }} className="px-5 py-2 bg-[#c9a84c] text-[#0a1628] rounded-lg font-bold text-sm hover:bg-[#d4b65a] transition-colors">
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============ HEADER ============ */
export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, settings, services: allServices } = useApp();
  const activeServices = allServices.filter(s => s.isActive).slice(0, 6);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Ana Sayfa' },
    { to: '/hizmetler', label: 'Hizmetler' },
    { to: '/hakkimizda', label: 'Hakkımızda' },
    { to: '/blog', label: 'Blog' },
    { to: '/iletisim', label: 'İletişim' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0a1628] text-white/80 text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} /> {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} /> {settings.email}
            </a>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {settings.workingHours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <MessageCircle size={13} /> WhatsApp
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> İstanbul
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0f2b5b] to-[#1e4d8c] rounded-lg flex items-center justify-center">
                <Globe className="text-white" size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-[#0f2b5b] leading-tight tracking-tight">Euro<span className="text-[#c9a84c]">Vize</span></span>
                <span className="text-[10px] text-gray-500 leading-tight hidden sm:block">Avrupa Vize & Oturum Danışmanlık</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <div key={link.to} className="relative"
                  onMouseEnter={() => link.label === 'Hizmetler' && setServicesOpen(true)}
                  onMouseLeave={() => link.label === 'Hizmetler' && setServicesOpen(false)}
                >
                  <Link to={link.to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${isActive(link.to) ? 'bg-[#0f2b5b] text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-[#0f2b5b]'}`}>
                    {link.label}
                    {link.label === 'Hizmetler' && <ChevronDown size={14} />}
                  </Link>
                  {link.label === 'Hizmetler' && (
                    <div className={`absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="p-2">
                        <Link to="/hizmetler" className="block px-4 py-2.5 text-sm font-semibold text-[#0f2b5b] hover:bg-blue-50 rounded-lg transition-colors">
                          Tüm Hizmetleri Görüntüle →
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                        {activeServices.map(s => (
                          <Link key={s.id} to={`/hizmet/${s.slug || s.id}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="text-lg">{s.countryFlag}</span>
                            <div>
                              <div className="font-medium text-gray-900">{s.country} - {s.typeName}</div>
                              <div className="text-xs text-gray-500">{s.duration}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {currentUser ? (
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium">
                    <div className="w-7 h-7 bg-[#0f2b5b] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block max-w-24 truncate">{currentUser.name}</span>
                    <ChevronDown size={14} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      <div className="p-1">
                        {currentUser.role === 'admin' ? (
                          <Link to="/admin" className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                            <Shield size={16} /> Admin Paneli
                          </Link>
                        ) : (
                          <>
                            <Link to="/panel" className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                              <LayoutDashboard size={16} /> Panelim
                            </Link>
                            <Link to="/profil" className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                              <User size={16} /> Profilim
                            </Link>
                          </>
                        )}
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg text-left">
                          <LogOut size={16} /> Çıkış Yap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/giris" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#0f2b5b] text-white rounded-lg text-sm font-medium hover:bg-[#1a3f7a] transition-colors">
                  <User size={16} /> Giriş Yap
                </Link>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[600px] border-t border-gray-100' : 'max-h-0'}`}>
          <div className="px-4 py-4 space-y-1 bg-white">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={`block px-4 py-3 rounded-lg text-sm font-medium ${isActive(link.to) ? 'bg-[#0f2b5b] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                {link.label}
              </Link>
            ))}
            {!currentUser && (
              <Link to="/giris" className="block px-4 py-3 bg-[#0f2b5b] text-white rounded-lg text-sm font-medium text-center mt-2">
                Giriş Yap / Kayıt Ol
              </Link>
            )}
            {currentUser && (
              <>
                {currentUser.role === 'admin' ? (
                  <Link to="/admin" className="block px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium">🛡️ Admin Paneli</Link>
                ) : (
                  <>
                    <Link to="/panel" className="block px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium">📊 Panelim</Link>
                    <Link to="/profil" className="block px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium">👤 Profilim</Link>
                  </>
                )}
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 text-sm font-medium">Çıkış Yap</button>
              </>
            )}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-gray-600 px-4 py-1"><Phone size={14} /> {settings.phone}</a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-gray-600 px-4 py-1"><Mail size={14} /> {settings.email}</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

/* ============ FOOTER ============ */
export const Footer: React.FC = () => {
  const { settings, services } = useApp();
  const activeServices = services.filter(s => s.isActive).slice(0, 5);

  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="bg-gradient-to-r from-[#0f2b5b] to-[#1e4d8c]">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Avrupa Hayallerinize İlk Adımı Atın</h2>
            <p className="text-white/70 mt-2">Ücretsiz danışmanlık için hemen bize ulaşın.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2 justify-center">
              <MessageCircle size={18} /> WhatsApp İletişim
            </a>
            <Link to="/iletisim" className="px-6 py-3 bg-[#c9a84c] text-[#0a1628] rounded-lg font-semibold hover:bg-[#d4b65a] transition-colors flex items-center gap-2 justify-center">
              <Mail size={18} /> Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#c9a84c] to-[#e8c95a] rounded-lg flex items-center justify-center"><Globe className="text-[#0a1628]" size={22} /></div>
              <span className="text-xl font-extrabold">Euro<span className="text-[#c9a84c]">Vize</span></span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {settings.companyInfo.shortDesc} {settings.companyInfo.foundedYear}'den beri binlerce müvekkilimize hizmet veriyoruz.
            </p>
            <div className="flex gap-3">
              {settings.socialMedia.facebook && <a href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#0a1628] transition-all text-sm font-bold">f</a>}
              {settings.socialMedia.instagram && <a href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#0a1628] transition-all text-sm font-bold">ig</a>}
              {settings.socialMedia.twitter && <a href={settings.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#0a1628] transition-all text-sm font-bold">X</a>}
              {settings.socialMedia.linkedin && <a href={settings.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#0a1628] transition-all text-sm font-bold">in</a>}
            </div>
          </div>
          <div>
            <h3 className="text-[#c9a84c] font-bold mb-4 text-sm uppercase tracking-wider">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {activeServices.map(s => (
                <li key={s.id}><Link to={`/hizmet/${s.slug || s.id}`} className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2"><span>{s.countryFlag}</span> {s.country} {s.typeName}</Link></li>
              ))}
              <li><Link to="/hizmetler" className="text-[#c9a84c] hover:text-[#e8c95a] transition-colors text-sm font-medium">Tüm Hizmetler →</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#c9a84c] font-bold mb-4 text-sm uppercase tracking-wider">Hızlı Erişim</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors text-sm">Ana Sayfa</Link></li>
              <li><Link to="/hakkimizda" className="text-white/60 hover:text-white transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="text-white/60 hover:text-white transition-colors text-sm">İletişim</Link></li>
              <li><Link to="/blog" className="text-white/60 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/giris" className="text-white/60 hover:text-white transition-colors text-sm">Giriş Yap</Link></li>
              <li><Link to="/kayit" className="text-white/60 hover:text-white transition-colors text-sm">Kayıt Ol</Link></li>
              <li><Link to="/panel" className="text-white/60 hover:text-white transition-colors text-sm">Başvuru Takip</Link></li>
              <li><Link to="/gizlilik-politikasi" className="text-white/60 hover:text-white transition-colors text-sm">Gizlilik Politikası</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#c9a84c] font-bold mb-4 text-sm uppercase tracking-wider">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-[#c9a84c] mt-0.5 shrink-0" /><span className="text-white/60 text-sm">{settings.address}</span></li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-[#c9a84c] shrink-0" /><a href={`tel:${settings.phone}`} className="text-white/60 hover:text-white transition-colors text-sm">{settings.phone}</a></li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-[#c9a84c] shrink-0" /><a href={`mailto:${settings.email}`} className="text-white/60 hover:text-white transition-colors text-sm">{settings.email}</a></li>
              <li className="flex items-center gap-3"><Clock size={18} className="text-[#c9a84c] shrink-0" /><span className="text-white/60 text-sm">{settings.workingHours}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} EuroVize Danışmanlık. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6 text-white/40 text-sm flex-wrap justify-center">
            <Link to="/gizlilik-politikasi" className="hover:text-white/60 transition-colors">Gizlilik Politikası</Link>
            <Link to="/kullanim-kosullari" className="hover:text-white/60 transition-colors">Kullanım Koşulları</Link>
            <Link to="/kvkk-aydinlatma" className="hover:text-white/60 transition-colors">KVKK Aydınlatma</Link>
            <Link to="/cerez-politikasi" className="hover:text-white/60 transition-colors">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
