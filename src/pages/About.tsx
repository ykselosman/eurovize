import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, MessageCircle, Users, Award, Shield, Globe, CheckCircle, Heart, User as UserIcon, Lock as LockIcon, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEO, Breadcrumb, seoAbout, seoContact } from '../components/SEO';

/* ============ ABOUT PAGE ============ */
export const AboutPage: React.FC = () => {
  const { settings } = useApp();
 
  return (
    <main id="main-content" itemScope itemType="https://schema.org>AboutPage">
      <SEO {...seoAbout} />
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16" aria-label="Hakkımızda başlık">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4"><Breadcrumb items={[{label:'Ana Sayfa', href:'#/'}, {label:'Hakkımızda'}]} /></div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">Hakkımızda</h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">Avrupa hayallerinizi gerçekleştiren güvenilir danışmanlık ortağınız</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-white/50 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight size={14} /><span>Hakkımızda</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Biz Kimiz?</span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0f2b5b]">
                EuroVize <span className="text-[#c9a84c]">Danışmanlık</span>
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {settings.companyInfo.longDesc}
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ekibimiz; göç mevzuatı uzmanları, uluslararası hukuk danışmanları ve deneyimli vize uzmanlarından oluşmaktadır. Her müvekkilimize özel çözümler sunarak, süreç boyunca birebir ilgi ve destek sağlıyoruz.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {settings.whyUs.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-[#c9a84c]"><CheckCircle size={20} /></span> {item.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: settings.stats.totalApplications, label: 'Başarılı Başvuru', icon: <CheckCircle size={28} /> },
                { value: settings.stats.countries, label: 'Avrupa Ülkesi', icon: <Globe size={28} /> },
                { value: settings.stats.successRate, label: 'Başarı Oranı', icon: <Award size={28} /> },
                { value: settings.team.length + '+', label: 'Uzman Danışman', icon: <Users size={28} /> },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#0f2b5b] mx-auto mb-3">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-[#0f2b5b]">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Ekibimiz</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0f2b5b]">Uzman <span className="text-[#c9a84c]">Kadromuz</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0f2b5b] to-[#1a4d8c] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-[#0f2b5b]">{member.name}</h3>
                <p className="text-[#c9a84c] text-sm font-medium mt-1">{member.role}</p>
                <p className="text-gray-500 text-xs mt-2">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider">Değerlerimiz</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0f2b5b]">Bizi <span className="text-[#c9a84c]">Farklı Kılan</span></h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={32} />, title: 'Güvenilirlik', desc: 'Tüm süreçlerimiz şeffaf ve güvenilirdir. Müvekkillerimizin haklarını ve çıkarlarını her zaman ön planda tutuyoruz.' },
              { icon: <Award size={32} />, title: 'Profesyonellik', desc: 'Alanında uzman kadromuz ile her müvekkilimize en yüksek profesyonellik standardında hizmet sunuyoruz.' },
              { icon: <Heart size={32} />, title: 'Müşteri Memnuniyeti', desc: 'Her başarılı başvuru, bize duyulan güvenin bir göstergesidir. Müşteri memnuniyeti önceliğimizdir.' },
            ].map((v, i) => (
              <div key={i} className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-[#0f2b5b] mx-auto mb-4">{v.icon}</div>
                <h3 className="font-bold text-[#0f2b5b] text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

/* ============ CONTACT PAGE ============ */
export const ContactPage: React.FC = () => {
  const { settings } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <main id="main-content">
      <SEO {...seoContact} />
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16" aria-label="İletişim başlık">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4"><Breadcrumb items={[{label:'Ana Sayfa', href:'#/'}, {label:'İletişim'}]} /></div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">İletişim</h1>
          <p className="mt-4 text-white/70 text-lg">Avrupa hayalleriniz için ilk adımı atın, bize ulaşın</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">İletişim Bilgileri</h2>
              <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#0f2b5b] shrink-0"><MapPin size={20} /></div>
                <div><h3 className="font-semibold text-[#0f2b5b]">Adres</h3><p className="text-gray-600 text-sm mt-1">{settings.address}</p></div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#0f2b5b] shrink-0"><Phone size={20} /></div>
                <div><h3 className="font-semibold text-[#0f2b5b]">Telefon</h3><a href={`tel:${settings.phone}`} className="text-gray-600 text-sm mt-1 block">{settings.phone}</a></div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#0f2b5b] shrink-0"><Mail size={20} /></div>
                <div><h3 className="font-semibold text-[#0f2b5b]">E-posta</h3><a href={`mailto:${settings.email}`} className="text-gray-600 text-sm mt-1 block">{settings.email}</a></div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#0f2b5b] shrink-0"><Clock size={20} /></div>
                <div><h3 className="font-semibold text-[#0f2b5b]">Çalışma Saatleri</h3><p className="text-gray-600 text-sm mt-1">{settings.workingHours}</p></div>
              </div>
              <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-green-500 text-white rounded-2xl p-5 hover:bg-green-600 transition-colors">
                <MessageCircle size={24} />
                <div><h3 className="font-semibold">WhatsApp İletişim</h3><p className="text-white/80 text-sm">Hızlı yanıt için WhatsApp kullanın</p></div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h2 className="text-2xl font-extrabold text-[#0f2b5b] mb-6">Bize Yazın</h2>
                {sent && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                    ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Konu *</label>
                      <select required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]">
                        <option value="">Seçiniz</option>
                        <option>Çalışma Vizesi Danışmanlığı</option>
                        <option>Öğrenci Vizesi</option>
                        <option>Oturum İzni</option>
                        <option>Aile Birleşimi</option>
                        <option>Altın Vize / Yatırımcı</option>
                        <option>Turistik Vize</option>
                        <option>Diğer</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız *</label>
                    <textarea required rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none" placeholder="Mesajınızı buraya yazın..." />
                  </div>
                  <button type="submit" className="w-full px-6 py-3.5 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors text-lg">
                    Mesaj Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ============ AUTH PAGES ============ */
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (await login(email, password)) {
      navigate('/panel');
    } else {
      setError('E-posta veya şifre hatalı!');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    if (await googleLogin()) {
      navigate('/panel');
    } else {
      setError('Google ile giriş başarısız oldu.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0f2b5b] to-[#1e4d8c] rounded-lg flex items-center justify-center">
              <Globe className="text-white" size={22} />
            </div>
            <span className="text-2xl font-extrabold text-[#0f2b5b]">Euro<span className="text-[#c9a84c]">Vize</span></span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-extrabold text-[#0f2b5b] text-center mb-2">Giriş Yap</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Hesabınıza giriş yaparak başvurunuzu takip edin</p>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

          {/* Google Sign In */}
          <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all mb-4 disabled:opacity-50">
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            {loading ? 'Giriş yapılıyor...' : 'Google ile Giriş Yap'}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">veya</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input type="email" required value={email} onChange={e => { setEmail(e.target.value); setError(''); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" placeholder="ornek@email.com" disabled={loading} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input type="password" required value={password} onChange={e => { setPassword(e.target.value); setError(''); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" placeholder="••••••••" disabled={loading} />
            </div>
            <button type="submit" disabled={loading} className="w-full px-6 py-3.5 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors disabled:opacity-50">
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Hesabınız yok mu? <Link to="/kayit" className="text-[#0f2b5b] font-semibold hover:underline">Kayıt Olun</Link>
          </p>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700 text-center">
          <strong>Demo Admin:</strong> admin@eurovize.com / admin123
        </div>
      </div>
    </main>
  );
};

/* ============ PROFILE PAGE ============ */
export const ProfilePage: React.FC = () => {
  const { currentUser, updateUser, updatePassword, showToast, getUserApplications } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'info' | 'password'>('info');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');

  if (!currentUser) { navigate('/giris'); return null; }
  const apps = getUserApplications(currentUser.id);

  const handleSaveInfo = () => {
    if (!name.trim() || !email.trim()) { showToast('Ad ve e-posta zorunludur', 'error'); return; }
    updateUser(currentUser.id, { name, email, phone });
    showToast('Profil bilgileriniz güncellendi');
  };

  const handleChangePassword = async () => {
    setPassError('');
    if (!oldPass || !newPass || !confirmPass) { setPassError('Tüm alanları doldurun'); return; }
    if (newPass.length < 6) { setPassError('Yeni şifre en az 6 karakter olmalıdır'); return; }
    if (newPass !== confirmPass) { setPassError('Yeni şifreler eşleşmiyor'); return; }
    if (await updatePassword(currentUser.id, oldPass, newPass)) {
      showToast('Şifreniz başarıyla değiştirildi');
      setOldPass(''); setNewPass(''); setConfirmPass('');
    } else {
      setPassError('Mevcut şifre hatalı');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0f2b5b] to-[#1a4d8c] py-8">
        <div className="max-w-3xl mx-auto px-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{currentUser.name}</h1>
            <p className="text-white/60 text-sm">{currentUser.email}</p>
            <p className="text-white/40 text-xs mt-0.5">Üye since {new Date(currentUser.createdAt).toLocaleDateString('tr-TR')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-extrabold text-[#0f2b5b]">{apps.length}</div>
            <div className="text-xs text-gray-500">Toplam Başvuru</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-extrabold text-green-600">{apps.filter(a => a.status === 'completed' || a.status === 'approved').length}</div>
            <div className="text-xs text-gray-500">Tamamlanan</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-extrabold text-yellow-600">{apps.filter(a => a.status === 'pending' || a.status === 'reviewing').length}</div>
            <div className="text-xs text-gray-500">Beklemede</div>
          </div>
        </div>

        {/* Tab Switch */}
        <div className="flex gap-2">
          <button onClick={() => setActiveSection('info')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'info' ? 'bg-[#0f2b5b] text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
            <UserIcon size={16} className="inline mr-1.5" /> Profil Bilgileri
          </button>
          <button onClick={() => setActiveSection('password')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'password' ? 'bg-[#0f2b5b] text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
            <LockIcon size={16} className="inline mr-1.5" /> Şifre Değiştir
          </button>
        </div>

        {/* Profile Info */}
        {activeSection === 'info' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-[#0f2b5b] text-lg mb-4">Profil Bilgileri</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" placeholder="+90 5XX XXX XXXX" /></div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <div className="flex items-center justify-between"><span className="text-gray-500">Hesap Türü:</span><span className={`font-semibold ${currentUser.role === 'admin' ? 'text-[#c9a84c]' : 'text-[#0f2b5b]'}`}>{currentUser.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</span></div>
                <div className="flex items-center justify-between mt-2"><span className="text-gray-500">Kayıt Tarihi:</span><span className="font-medium text-[#0f2b5b]">{new Date(currentUser.createdAt).toLocaleDateString('tr-TR')}</span></div>
              </div>
              <button onClick={handleSaveInfo} className="w-full px-6 py-3.5 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors">
                <Save size={16} className="inline mr-2" /> Bilgileri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Change Password */}
        {activeSection === 'password' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-[#0f2b5b] text-lg mb-4">Şifre Değiştir</h2>
            {passError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{passError}</div>}
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre *</label><input type="password" value={oldPass} onChange={e => { setOldPass(e.target.value); setPassError(''); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre *</label><input type="password" value={newPass} onChange={e => { setNewPass(e.target.value); setPassError(''); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" placeholder="En az 6 karakter" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre Tekrar *</label><input type="password" value={confirmPass} onChange={e => { setConfirmPass(e.target.value); setPassError(''); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" /></div>
              <button onClick={handleChangePassword} className="w-full px-6 py-3.5 bg-[#c9a84c] text-[#0a1628] rounded-xl font-bold hover:bg-[#d4b65a] transition-colors">
                <LockIcon size={16} className="inline mr-2" /> Şifreyi Değiştir
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { register } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Şifreler eşleşmiyor!'); return; }
    if (password.length < 6) { setError('Şifre en az 6 karakter olmalıdır!'); return; }
    if (await register(name, email, password, phone)) {
      navigate('/panel');
    } else {
      setError('Bu e-posta adresi zaten kayıtlı!');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0f2b5b] to-[#1e4d8c] rounded-lg flex items-center justify-center">
              <Globe className="text-white" size={22} />
            </div>
            <span className="text-2xl font-extrabold text-[#0f2b5b]">Euro<span className="text-[#c9a84c]">Vize</span></span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-extrabold text-[#0f2b5b] text-center mb-2">Kayıt Ol</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Hesap oluşturarak başvuru sürecinizi başlatın</p>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" placeholder="+90 5XX XXX XXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre *</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" placeholder="En az 6 karakter" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrar *</label>
              <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
            </div>
            <button type="submit" className="w-full px-6 py-3.5 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors">Kayıt Ol</button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Zaten hesabınız var mı? <Link to="/giris" className="text-[#0f2b5b] font-semibold hover:underline">Giriş Yapın</Link>
          </p>
        </div>
      </div>
    </main>
  );
};
