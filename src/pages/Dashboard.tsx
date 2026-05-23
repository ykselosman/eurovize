import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Plus, Clock, CheckCircle, AlertCircle, Eye, X, User, Upload } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { statusColors } from '../data/initialData';

const Dashboard: React.FC = () => {
  const { currentUser, getUserApplications, services, createApplication, showToast } = useApp();
  const navigate = useNavigate();
  const [showNewApp, setShowNewApp] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [appStep, setAppStep] = useState(1);

  if (!currentUser) { navigate('/giris'); return null; }

  const apps = getUserApplications(currentUser.id);
  const selectedServiceData = services.find(s => s.id === selectedService);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: currentUser.name.split(' ')[0] || '',
    lastName: currentUser.name.split(' ').slice(1).join(' ') || '',
    birthDate: '',
    nationality: 'Türkiye',
    passportNumber: '',
    address: '',
  });
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const handleFileSimulate = (docName: string) => {
    if (!uploadedDocs.includes(docName)) {
      setUploadedDocs(prev => [...prev, docName]);
    }
  };

  const handleApply = () => {
    if (!selectedServiceData) return;
    const app = createApplication({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone,
      serviceId: selectedServiceData.id,
      serviceTitle: selectedServiceData.title,
      country: selectedServiceData.country,
      documents: uploadedDocs,
      personalInfo,
      additionalInfo,
    });
    showToast(`Başvurunuz başarıyla oluşturuldu! Takip No: ${app.trackingNumber}`, 'success');
    setShowNewApp(false);
    setSelectedService('');
    setAppStep(1);
    setAdditionalInfo('');
    setUploadedDocs([]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0f2b5b] to-[#1a4d8c] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#c9a84c]"><LayoutDashboard size={24} /></div>
              <div>
                <h1 className="text-xl font-bold text-white">Hoş Geldiniz, {currentUser.name}</h1>
                <p className="text-white/60 text-sm">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/profil" className="px-4 py-2.5 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 text-sm">
                <User size={16} /> Profilim
              </Link>
              <button onClick={() => { setShowNewApp(true); setAppStep(1); }} className="px-4 py-2.5 bg-[#c9a84c] text-[#0a1628] rounded-xl font-bold hover:bg-[#d4b65a] transition-colors flex items-center gap-2 text-sm">
                <Plus size={16} /> Yeni Başvuru
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Toplam Başvuru', value: apps.length, icon: <FileText size={20} />, color: 'bg-blue-50 text-blue-600' },
            { label: 'Beklemede', value: apps.filter(a => a.status === 'pending' || a.status === 'reviewing').length, icon: <Clock size={20} />, color: 'bg-yellow-50 text-yellow-600' },
            { label: 'Süreçte', value: apps.filter(a => a.status === 'processing').length, icon: <AlertCircle size={20} />, color: 'bg-purple-50 text-purple-600' },
            { label: 'Tamamlanan', value: apps.filter(a => a.status === 'completed' || a.status === 'approved').length, icon: <CheckCircle size={20} />, color: 'bg-green-50 text-green-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
              <div className="text-2xl font-extrabold text-[#0f2b5b]">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-[#0f2b5b] text-lg">Başvurularım</h2>
            <span className="text-sm text-gray-500">{apps.length} başvuru</span>
          </div>
          {apps.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Henüz başvurunuz yok</h3>
              <p className="text-gray-500 mb-6 text-sm">Yeni bir başvuru oluşturarak sürecinizi başlatın.</p>
              <button onClick={() => { setShowNewApp(true); setAppStep(1); }} className="px-6 py-3 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors inline-flex items-center gap-2">
                <Plus size={18} /> Yeni Başvuru Oluştur
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {apps.map(app => (
                <div key={app.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-[#0f2b5b] truncate">{app.serviceTitle}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${statusColors[app.status]}`}>{app.statusName}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        <span>📍 {app.country}</span>
                        <span>🔢 {app.trackingNumber}</span>
                        <span>📅 {new Date(app.createdAt).toLocaleDateString('tr-TR')}</span>
                        {app.documents.length > 0 && <span>📎 {app.documents.length} belge</span>}
                      </div>
                      {/* Mini Progress */}
                      <div className="flex items-center gap-1 mt-2">
                        {['pending', 'reviewing', 'processing', 'completed'].map((step, i) => {
                          const stepOrder = ['pending', 'reviewing', 'processing', 'approved', 'completed'];
                          const currentIndex = stepOrder.indexOf(app.status);
                          const isActive = i <= currentIndex || app.status === 'completed' || app.status === 'approved';
                          return <div key={step} className={`h-1.5 flex-1 rounded-full ${isActive ? 'bg-[#c9a84c]' : 'bg-gray-200'}`} />;
                        })}
                      </div>
                    </div>
                    <button onClick={() => setShowDetail(app.id)} className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1 shrink-0">
                      <Eye size={14} /> Detay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== NEW APPLICATION MODAL ===== */}
      {showNewApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="text-xl font-bold text-[#0f2b5b]">Yeni Başvuru Oluştur</h2>
                <p className="text-sm text-gray-500">Adım {appStep}/3</p>
              </div>
              <button onClick={() => setShowNewApp(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>

            {/* Step Indicator */}
            <div className="px-6 pt-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map(step => (
                  <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${appStep >= step ? 'bg-[#c9a84c] text-[#0a1628]' : 'bg-gray-200 text-gray-500'}`}>{step}</div>
                    {step < 3 && <div className={`flex-1 h-1 rounded ${appStep > step ? 'bg-[#c9a84c]' : 'bg-gray-200'}`} />}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Hizmet Seçin</span><span>Bilgileriniz</span><span>Belgeler</span>
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Select Service */}
              {appStep === 1 && (
                <div>
                  <h3 className="font-semibold text-[#0f2b5b] mb-4">Hizmet Seçin</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {services.filter(s => s.isActive).map(s => (
                      <button key={s.id} onClick={() => setSelectedService(s.id)} className={`text-left p-4 rounded-xl border-2 transition-all ${selectedService === s.id ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{s.countryFlag}</span>
                          <span className="font-semibold text-sm text-[#0f2b5b]">{s.country}</span>
                        </div>
                        <div className="text-xs text-gray-600">{s.typeName}</div>
                        <div className="text-xs text-gray-400 mt-1">{s.duration} • {s.price}</div>
                      </button>
                    ))}
                  </div>
                  <button disabled={!selectedService} onClick={() => setAppStep(2)} className={`w-full mt-6 px-6 py-3.5 rounded-xl font-bold text-lg transition-colors ${selectedService ? 'bg-[#0f2b5b] text-white hover:bg-[#1a3f7a]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    Devam Et
                  </button>
                </div>
              )}

              {/* Step 2: Personal Info */}
              {appStep === 2 && (
                <div>
                  <h3 className="font-semibold text-[#0f2b5b] mb-4">Kişisel Bilgiler</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ad *</label>
                      <input type="text" value={personalInfo.firstName} onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Soyad *</label>
                      <input type="text" value={personalInfo.lastName} onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihi *</label>
                      <input type="date" value={personalInfo.birthDate} onChange={e => setPersonalInfo({ ...personalInfo, birthDate: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Uyruk</label>
                      <input type="text" value={personalInfo.nationality} onChange={e => setPersonalInfo({ ...personalInfo, nationality: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pasaport No *</label>
                      <input type="text" value={personalInfo.passportNumber} onChange={e => setPersonalInfo({ ...personalInfo, passportNumber: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                      <input type="text" value={personalInfo.address} onChange={e => setPersonalInfo({ ...personalInfo, address: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ek Bilgiler / Notunuz</label>
                    <textarea rows={3} value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none" placeholder="Başvurunuzla ilgili eklemek istediğiniz bilgiler..." />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setAppStep(1)} className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">Geri</button>
                    <button onClick={() => setAppStep(3)} className="flex-1 px-6 py-3.5 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors">Devam Et</button>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {appStep === 3 && selectedServiceData && (
                <div>
                  <h3 className="font-semibold text-[#0f2b5b] mb-2">Gerekli Belgeler</h3>
                  <p className="text-sm text-gray-500 mb-4">Belgelerinizi yükleyin veya hazır olduğunu işaretleyin. Belgelerinizi daha sonra da yükleyebilirsiniz.</p>
                  <div className="space-y-2">
                    {selectedServiceData.requirements.map((req, i) => {
                      const isUploaded = uploadedDocs.includes(req);
                      return (
                        <div key={i} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isUploaded ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isUploaded ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                              {isUploaded ? <CheckCircle size={16} /> : <FileText size={16} />}
                            </div>
                            <span className={`text-sm ${isUploaded ? 'text-green-700 font-medium' : 'text-gray-700'}`}>{req}</span>
                          </div>
                          <button onClick={() => handleFileSimulate(req)} className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${isUploaded ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            <Upload size={12} /> {isUploaded ? 'Yüklendi' : 'Yükle'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm text-blue-700">
                    📎 <strong>{uploadedDocs.length}</strong>/{selectedServiceData.requirements.length} belge yüklendi. Eksik belgeleri daha sonra yükleyebilirsiniz.
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setAppStep(2)} className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">Geri</button>
                    <button onClick={handleApply} className="flex-1 px-6 py-3.5 bg-[#c9a84c] text-[#0a1628] rounded-xl font-bold hover:bg-[#d4b65a] transition-colors">
                      Başvuruyu Gönder
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== APPLICATION DETAIL MODAL ===== */}
      {showDetail && (() => {
        const app = apps.find(a => a.id === showDetail);
        if (!app) return null;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
                <div>
                  <h2 className="text-xl font-bold text-[#0f2b5b]">Başvuru Detayı</h2>
                  <p className="text-sm text-gray-500">Takip No: <span className="font-mono font-bold text-[#c9a84c]">{app.trackingNumber}</span></p>
                </div>
                <button onClick={() => setShowDetail(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-semibold text-[#0f2b5b]">{app.serviceTitle}</h3>
                    <p className="text-sm text-gray-500">📍 {app.country}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusColors[app.status]}`}>{app.statusName}</span>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  {['Beklemede', 'İnceleme', 'Süreçte', 'Tamamlandı'].map((label, i) => {
                    const stepOrder = ['pending', 'reviewing', 'processing', 'approved', 'completed'];
                    const currentIndex = stepOrder.indexOf(app.status);
                    const isActive = i <= currentIndex || app.status === 'completed' || app.status === 'approved';
                    return (
                      <div key={label} className="flex-1 text-center">
                        <div className={`h-2 rounded-full mb-1 ${isActive ? 'bg-[#c9a84c]' : 'bg-gray-200'}`} />
                        <span className={`text-xs ${isActive ? 'text-[#0f2b5b] font-semibold' : 'text-gray-400'}`}>{label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-semibold text-[#0f2b5b] mb-4">Süreç Zaman Çizelgesi</h4>
                  <div className="space-y-4">
                    {app.notes.map((note, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full shrink-0 ${i === app.notes.length - 1 ? 'bg-[#c9a84c] ring-4 ring-[#c9a84c]/20' : 'bg-gray-300'}`} />
                          {i < app.notes.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 min-h-[20px]" />}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm text-gray-700">{note.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(note.date).toLocaleDateString('tr-TR')} {new Date(note.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div>
                  <h4 className="font-semibold text-[#0f2b5b] mb-3">Kişisel Bilgiler</h4>
                  <div className="bg-gray-50 rounded-xl p-4 grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Ad Soyad:</span> <span className="font-medium">{app.personalInfo.firstName} {app.personalInfo.lastName}</span></div>
                    <div><span className="text-gray-500">Doğum Tarihi:</span> <span className="font-medium">{app.personalInfo.birthDate || '-'}</span></div>
                    <div><span className="text-gray-500">Uyruk:</span> <span className="font-medium">{app.personalInfo.nationality}</span></div>
                    <div><span className="text-gray-500">Pasaport No:</span> <span className="font-medium">{app.personalInfo.passportNumber || '-'}</span></div>
                    {app.personalInfo.address && <div className="sm:col-span-2"><span className="text-gray-500">Adres:</span> <span className="font-medium">{app.personalInfo.address}</span></div>}
                  </div>
                </div>

                {/* Documents */}
                {app.documents.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#0f2b5b] mb-3">Yüklenen Belgeler ({app.documents.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {app.documents.map((doc, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium">
                          <CheckCircle size={12} /> {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {app.additionalInfo && (
                  <div>
                    <h4 className="font-semibold text-[#0f2b5b] mb-2">Ek Bilgiler</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">{app.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
};

export default Dashboard;
