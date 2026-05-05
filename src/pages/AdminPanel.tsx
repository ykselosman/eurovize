import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Star, HelpCircle, Settings, Shield, Plus, Trash2, Edit3, Eye, X, Save, CheckCircle, Clock, AlertCircle, MessageSquare, Menu, ChevronRight, Mail, Phone as PhoneIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { statusMap, statusColors } from '../data/initialData';
import type { AdminTab, Service, Testimonial, FAQ } from '../types';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, applications, services, testimonials, faqs, users,
    updateApplicationStatus, addApplicationNote, deleteApplication,
    addService, updateService, deleteService,
    addTestimonial, updateTestimonial, deleteTestimonial,
    addFAQ, updateFAQ, deleteFAQ,
    settings, updateSettings, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showNewService, setShowNewService] = useState(false);
  const [noteAppId, setNoteAppId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [showAppDetail, setShowAppDetail] = useState<string | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showNewFaq, setShowNewFaq] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showNewTestimonial, setShowNewTestimonial] = useState(false);

  if (!currentUser || currentUser.role !== 'admin') { navigate('/giris'); return null; }

  const tabs = [
    { id: 'dashboard' as AdminTab, label: 'Gösterge Paneli', icon: <LayoutDashboard size={18} /> },
    { id: 'services' as AdminTab, label: 'Hizmetler', icon: <FileText size={18} />, count: services.length },
    { id: 'applications' as AdminTab, label: 'Başvurular', icon: <FileText size={18} />, count: applications.length },
    { id: 'users' as AdminTab, label: 'Kullanıcılar', icon: <Users size={18} />, count: users.filter(u => u.role === 'user').length },
    { id: 'testimonials' as AdminTab, label: 'Referanslar', icon: <Star size={18} />, count: testimonials.length },
    { id: 'faq' as AdminTab, label: 'SSS', icon: <HelpCircle size={18} />, count: faqs.length },
    { id: 'settings' as AdminTab, label: 'Ayarlar', icon: <Settings size={18} /> },
  ];

  const pendingApps = applications.filter(a => a.status === 'pending').length;
  const processingApps = applications.filter(a => ['processing', 'reviewing'].includes(a.status)).length;
  const completedApps = applications.filter(a => ['completed', 'approved'].includes(a.status)).length;

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const handleAddNote = (appId: string) => {
    if (noteText.trim()) {
      addApplicationNote(appId, noteText);
      showToast('Not başarıyla eklendi');
      setNoteAppId(null);
      setNoteText('');
    }
  };

  const handleStatusChange = (appId: string, status: string) => {
    updateApplicationStatus(appId, status as typeof applications[0]['status']);
    showToast(`Durum güncellendi: ${statusMap[status]}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0f2b5b] to-[#1a4d8c] py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"><Menu size={20} /></button>
            <Shield className="text-[#c9a84c]" size={24} />
            <div>
              <h1 className="text-lg font-bold text-white">Admin Paneli</h1>
              <p className="text-white/50 text-xs hidden sm:block">EuroVize Yönetim Sistemi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setActiveTab(activeTab); }} className="lg:hidden px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm">{tabs.find(t => t.id === activeTab)?.label}</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#0f2b5b] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <span className="flex items-center gap-2.5">{tab.icon} {tab.label}</span>
                  {tab.count !== undefined && <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`}>{tab.count}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar - Mobile Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2"><Shield className="text-[#c9a84c]" size={20} /><span className="font-bold text-[#0f2b5b]">Admin Menü</span></div>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
                </div>
                <div className="p-2">
                  {tabs.map(tab => (
                    <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#0f2b5b] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                      <span className="flex items-center gap-2.5">{tab.icon} {tab.label}</span>
                      {tab.count !== undefined && <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`}>{tab.count}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* ===== DASHBOARD ===== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Toplam Başvuru', value: applications.length, icon: <FileText size={20} />, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Beklemede', value: pendingApps, icon: <Clock size={20} />, color: 'bg-yellow-50 text-yellow-600' },
                    { label: 'Süreçte', value: processingApps, icon: <AlertCircle size={20} />, color: 'bg-purple-50 text-purple-600' },
                    { label: 'Tamamlanan', value: completedApps, icon: <CheckCircle size={20} />, color: 'bg-green-50 text-green-600' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
                      <div className="text-2xl font-extrabold text-[#0f2b5b]">{s.value}</div>
                      <div className="text-sm text-gray-500">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[#0f2b5b]">Son Başvurular</h3>
                      <button onClick={() => setActiveTab('applications')} className="text-xs text-[#c9a84c] font-semibold flex items-center gap-1">Tümünü Gör <ChevronRight size={12} /></button>
                    </div>
                    {applications.length === 0 ? <p className="text-gray-400 text-sm">Henüz başvuru yok</p> : (
                      <div className="space-y-3">
                        {applications.slice(-5).reverse().map(app => (
                          <div key={app.id} className="flex items-center justify-between text-sm">
                            <div className="min-w-0">
                              <span className="font-medium text-gray-800 truncate block">{app.userName}</span>
                              <span className="text-gray-400 text-xs">{app.serviceTitle}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ml-2 ${statusColors[app.status]}`}>{app.statusName}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="font-bold text-[#0f2b5b] mb-4">Hızlı Bilgi</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Aktif Hizmetler:</span><span className="font-bold text-[#0f2b5b]">{services.filter(s => s.isActive).length}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Toplam Hizmet:</span><span className="font-bold text-[#0f2b5b]">{services.length}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Kayıtlı Kullanıcı:</span><span className="font-bold text-[#0f2b5b]">{users.filter(u => u.role === 'user').length}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Aktif Referanslar:</span><span className="font-bold text-[#0f2b5b]">{testimonials.filter(t => t.isActive).length}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Aktif SSS:</span><span className="font-bold text-[#0f2b5b]">{faqs.filter(f => f.isActive).length}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Son Başvuru:</span><span className="font-bold text-[#0f2b5b]">{applications.length > 0 ? new Date(applications[applications.length - 1].createdAt).toLocaleDateString('tr-TR') : '-'}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== SERVICES ===== */}
            {activeTab === 'services' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0f2b5b]">Hizmet Yönetimi</h2>
                  <button onClick={() => setShowNewService(true)} className="px-4 py-2 bg-[#0f2b5b] text-white rounded-xl text-sm font-bold hover:bg-[#1a3f7a] flex items-center gap-1.5"><Plus size={16} /> Yeni Hizmet</button>
                </div>
                <div className="space-y-3">
                  {services.map(s => (
                    <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl">{s.countryFlag}</span>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#0f2b5b] truncate">{s.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                            <span>{s.country} • {s.typeName}</span>
                            <span>{s.duration} • {s.price}</span>
                            <span>Sıra: {s.order}</span>
                            <span className={`px-1.5 py-0.5 rounded ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.isActive ? 'Aktif' : 'Pasif'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => setEditingService(s)} className="p-2 hover:bg-gray-100 rounded-lg text-blue-600" title="Düzenle"><Edit3 size={16} /></button>
                        <button onClick={() => { updateService(s.id, { isActive: !s.isActive }); showToast(s.isActive ? 'Hizmet pasif yapıldı' : 'Hizmet aktif yapıldı'); }} className={`p-2 hover:bg-gray-100 rounded-lg ${s.isActive ? 'text-yellow-600' : 'text-green-600'}`} title={s.isActive ? 'Pasif Yap' : 'Aktif Yap'}>
                          {s.isActive ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                        </button>
                        <button onClick={() => { if (confirm('Bu hizmeti silmek istediğinize emin misiniz?')) { deleteService(s.id); showToast('Hizmet silindi', 'info'); } }} className="p-2 hover:bg-gray-100 rounded-lg text-red-600" title="Sil"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== APPLICATIONS ===== */}
            {activeTab === 'applications' && (
              <div>
                <h2 className="text-xl font-bold text-[#0f2b5b] mb-6">Başvuru Yönetimi ({applications.length})</h2>
                {applications.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center"><FileText size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-500">Henüz başvuru bulunmamaktadır.</p></div>
                ) : (
                  <div className="space-y-3">
                    {applications.map(app => (
                      <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-semibold text-[#0f2b5b]">{app.userName}</h3>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>{app.statusName}</span>
                            </div>
                            <div className="text-sm text-gray-500 space-x-2 flex flex-wrap">
                              <span className="flex items-center gap-1"><Mail size={12} /> {app.userEmail}</span>
                              <span className="flex items-center gap-1"><PhoneIcon size={12} /> {app.userPhone || '-'}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-x-3">
                              <span>📋 {app.serviceTitle}</span>
                              <span className="font-mono">🔢 {app.trackingNumber}</span>
                              <span>📅 {new Date(app.createdAt).toLocaleDateString('tr-TR')}</span>
                              {app.documents.length > 0 && <span>📎 {app.documents.length} belge</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => setShowAppDetail(app.id)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="Detay"><Eye size={16} /></button>
                            <button onClick={() => setNoteAppId(app.id)} className="p-2 hover:bg-gray-100 rounded-lg text-blue-600" title="Not Ekle"><MessageSquare size={16} /></button>
                            <button onClick={() => { if (confirm('Silinsin mi?')) { deleteApplication(app.id); showToast('Başvuru silindi', 'info'); } }} className="p-2 hover:bg-gray-100 rounded-lg text-red-600" title="Sil"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-50 flex flex-wrap gap-1.5">
                          {Object.entries(statusMap).map(([key, name]) => (
                            <button key={key} onClick={() => handleStatusChange(app.id, key)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${app.status === key ? statusColors[key] + ' ring-2 ring-offset-1 ring-gray-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                              {name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===== USERS ===== */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-bold text-[#0f2b5b] mb-6">Kullanıcı Yönetimi</h2>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="text-left p-4 font-semibold text-[#0f2b5b]">Kullanıcı</th>
                          <th className="text-left p-4 font-semibold text-[#0f2b5b] hidden sm:table-cell">Telefon</th>
                          <th className="text-left p-4 font-semibold text-[#0f2b5b] hidden md:table-cell">Kayıt Tarihi</th>
                          <th className="text-left p-4 font-semibold text-[#0f2b5b]">Rol</th>
                          <th className="text-left p-4 font-semibold text-[#0f2b5b]">Başvuru</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${user.role === 'admin' ? 'bg-[#c9a84c]' : 'bg-[#0f2b5b]'}`}>
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-medium text-gray-900 truncate">{user.name}</div>
                                  <div className="text-xs text-gray-500 truncate">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-gray-600 hidden sm:table-cell">{user.phone || '-'}</td>
                            <td className="p-4 text-gray-600 hidden md:table-cell">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-blue-100 text-blue-700'}`}>
                                {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-[#0f2b5b]">{applications.filter(a => a.userId === user.id).length}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== TESTIMONIALS ===== */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0f2b5b]">Referans Yönetimi</h2>
                  <button onClick={() => setShowNewTestimonial(true)} className="px-4 py-2 bg-[#0f2b5b] text-white rounded-xl text-sm font-bold hover:bg-[#1a3f7a] flex items-center gap-1.5"><Plus size={16} /> Yeni Referans</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {testimonials.map(t => (
                    <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{t.flag}</span>
                          <div><div className="font-semibold text-[#0f2b5b]">{t.name}</div><div className="text-xs text-gray-500">{t.country} • {t.service}</div></div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{t.isActive ? 'Aktif' : 'Pasif'}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{t.text}</p>
                      <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < t.rating ? 'text-[#c9a84c] fill-[#c9a84c]' : 'text-gray-300'} />)}</div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => setEditingTestimonial(t)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium"><Edit3 size={12} className="inline mr-1" />Düzenle</button>
                        <button onClick={() => { updateTestimonial(t.id, { isActive: !t.isActive }); showToast(t.isActive ? 'Referans pasif yapıldı' : 'Referans aktif yapıldı'); }} className="px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-medium">{t.isActive ? 'Pasif Yap' : 'Aktif Yap'}</button>
                        <button onClick={() => { if (confirm('Silinsin mi?')) { deleteTestimonial(t.id); showToast('Referans silindi', 'info'); } }} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium"><Trash2 size={12} className="inline mr-1" />Sil</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== FAQ ===== */}
            {activeTab === 'faq' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0f2b5b]">SSS Yönetimi</h2>
                  <button onClick={() => setShowNewFaq(true)} className="px-4 py-2 bg-[#0f2b5b] text-white rounded-xl text-sm font-bold hover:bg-[#1a3f7a] flex items-center gap-1.5"><Plus size={16} /> Yeni Soru</button>
                </div>
                <div className="space-y-3">
                  {faqs.sort((a, b) => a.order - b.order).map(faq => (
                    <div key={faq.id} className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">#{faq.order}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${faq.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{faq.isActive ? 'Aktif' : 'Pasif'}</span>
                          </div>
                          <h3 className="font-semibold text-[#0f2b5b]">{faq.question}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => setEditingFaq(faq)} className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"><Edit3 size={16} /></button>
                          <button onClick={() => { updateFAQ(faq.id, { isActive: !faq.isActive }); }} className="p-2 hover:bg-gray-100 rounded-lg text-yellow-600"><AlertCircle size={16} /></button>
                          <button onClick={() => { if (confirm('Silinsin mi?')) { deleteFAQ(faq.id); showToast('SSS silindi', 'info'); } }} className="p-2 hover:bg-gray-100 rounded-lg text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== SETTINGS ===== */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold text-[#0f2b5b] mb-6">Site Ayarları</h2>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label><input type="text" value={settings.phone} onChange={e => updateSettings({ phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label><input type="email" value={settings.email} onChange={e => updateSettings({ email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Numarası</label><input type="text" value={settings.whatsapp} onChange={e => updateSettings({ whatsapp: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Çalışma Saatleri</label><input type="text" value={settings.workingHours} onChange={e => updateSettings({ workingHours: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Adres</label><input type="text" value={settings.address} onChange={e => updateSettings({ address: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                  <h3 className="font-semibold text-[#0f2b5b] pt-4">Sosyal Medya</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label><input type="url" value={settings.socialMedia.facebook} onChange={e => updateSettings({ socialMedia: { ...settings.socialMedia, facebook: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label><input type="url" value={settings.socialMedia.instagram} onChange={e => updateSettings({ socialMedia: { ...settings.socialMedia, instagram: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X</label><input type="url" value={settings.socialMedia.twitter} onChange={e => updateSettings({ socialMedia: { ...settings.socialMedia, twitter: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label><input type="url" value={settings.socialMedia.linkedin} onChange={e => updateSettings({ socialMedia: { ...settings.socialMedia, linkedin: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2"><Save size={16} /> Ayarlar otomatik olarak kaydedilmektedir.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MODALS ===== */}

      {/* Application Detail Modal */}
      {showAppDetail && (() => {
        const app = applications.find(a => a.id === showAppDetail);
        if (!app) return null;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-[#0f2b5b]">Başvuru Detayı</h2>
                <button onClick={() => setShowAppDetail(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <div><strong className="text-[#0f2b5b]">{app.userName}</strong><div className="text-sm text-gray-500">{app.userEmail} • {app.userPhone || '-'}</div></div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[app.status]}`}>{app.statusName}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm grid grid-cols-2 gap-2">
                  <div><span className="text-gray-500">Hizmet:</span> {app.serviceTitle}</div>
                  <div><span className="text-gray-500">Ülke:</span> {app.country}</div>
                  <div><span className="text-gray-500">Takip No:</span> <span className="font-mono font-bold">{app.trackingNumber}</span></div>
                  <div><span className="text-gray-500">Tarih:</span> {new Date(app.createdAt).toLocaleDateString('tr-TR')}</div>
                  <div><span className="text-gray-500">Ad:</span> {app.personalInfo.firstName}</div>
                  <div><span className="text-gray-500">Soyad:</span> {app.personalInfo.lastName}</div>
                  <div><span className="text-gray-500">Doğum:</span> {app.personalInfo.birthDate || '-'}</div>
                  <div><span className="text-gray-500">Pasaport:</span> {app.personalInfo.passportNumber || '-'}</div>
                </div>
                {app.documents.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#0f2b5b] mb-2">Belgeler ({app.documents.length})</h4>
                    <div className="flex flex-wrap gap-1.5">{app.documents.map((d, i) => <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">{d}</span>)}</div>
                  </div>
                )}
                {app.additionalInfo && <div><span className="text-gray-500 text-sm">Not:</span><p className="text-sm text-gray-700 mt-1">{app.additionalInfo}</p></div>}
                <div>
                  <h4 className="font-semibold text-[#0f2b5b] mb-2">Süreç Notları</h4>
                  <div className="space-y-2">{app.notes.map((n, i) => <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm"><p>{n.text}</p><span className="text-xs text-gray-400">{new Date(n.date).toLocaleString('tr-TR')}</span></div>)}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Add Note Modal */}
      {noteAppId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-[#0f2b5b] mb-4">Not Ekle</h3>
            <textarea rows={4} value={noteText} onChange={e => setNoteText(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" placeholder="Notunuzu yazın..." />
            <div className="flex gap-3">
              <button onClick={() => handleAddNote(noteAppId)} className="flex-1 px-4 py-3 bg-[#0f2b5b] text-white rounded-xl font-bold">Kaydet</button>
              <button onClick={() => { setNoteAppId(null); setNoteText(''); }} className="px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-700">İptal</button>
            </div>
          </div>
        </div>
      )}

      {/* Service Form Modal */}
      {(showNewService || editingService) && (
        <ServiceFormModal
          service={editingService}
          onSave={(s) => { if (editingService) { updateService(editingService.id, s); showToast('Hizmet güncellendi'); setEditingService(null); } else { addService(s as Service); showToast('Hizmet eklendi'); setShowNewService(false); } }}
          onClose={() => { setShowNewService(false); setEditingService(null); }}
        />
      )}

      {/* FAQ Modal */}
      {(showNewFaq || editingFaq) && (
        <FaqFormModal
          faq={editingFaq}
          onSave={(f) => { if (editingFaq) { updateFAQ(editingFaq.id, f); showToast('SSS güncellendi'); setEditingFaq(null); } else { addFAQ({ ...f, id: 'faq_' + Date.now() } as FAQ); showToast('SSS eklendi'); setShowNewFaq(false); } }}
          onClose={() => { setShowNewFaq(false); setEditingFaq(null); }}
        />
      )}

      {/* Testimonial Modal */}
      {(showNewTestimonial || editingTestimonial) && (
        <TestimonialFormModal
          testimonial={editingTestimonial}
          onSave={(t) => { if (editingTestimonial) { updateTestimonial(editingTestimonial.id, t); showToast('Referans güncellendi'); setEditingTestimonial(null); } else { addTestimonial({ ...t, id: 't_' + Date.now() } as Testimonial); showToast('Referans eklendi'); setShowNewTestimonial(false); } }}
          onClose={() => { setShowNewTestimonial(false); setEditingTestimonial(null); }}
        />
      )}
    </main>
  );
};

/* ============ SERVICE FORM MODAL ============ */
const ServiceFormModal: React.FC<{ service?: Service | null; onSave: (data: Partial<Service>) => void; onClose: () => void }> = ({ service, onSave, onClose }) => {
  const [form, setForm] = useState<Partial<Service>>(service || {
    title: '', description: '', longDescription: '', country: '', countryFlag: '', type: 'work', typeName: 'Çalışma Vizesi',
    price: '', duration: '', requirements: [], process: [], features: [], isActive: true, order: 0
  });
  const [reqText, setReqText] = useState('');
  const [featText, setFeatText] = useState('');
  const countryFlags: Record<string, string> = {
    'Almanya': '🇩🇪', 'Hollanda': '🇳🇱', 'Fransa': '🇫🇷', 'İspanya': '🇪🇸', 'Belçika': '🇧🇪',
    'Portekiz': '🇵🇹', 'İtalya': '🇮🇹', 'Avusturya': '🇦🇹', 'İsveç': '🇸🇪', 'Danimarka': '🇩🇰',
    'Norveç': '🇳🇴', 'Schengen Bölgesi': '🇪🇺'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-[#0f2b5b]">{service ? 'Hizmet Düzenle' : 'Yeni Hizmet'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label><input type="text" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Ülke *</label><input type="text" value={form.country || ''} onChange={e => setForm({ ...form, country: e.target.value, countryFlag: countryFlags[e.target.value] || '🌍' })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tür</label><select value={form.type || 'work'} onChange={e => setForm({ ...form, type: e.target.value as Service['type'] })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm">
              <option value="work">Çalışma Vizesi</option><option value="student">Öğrenci Vizesi</option><option value="tourist">Turistik Vize</option><option value="family">Aile Birleşimi</option><option value="residence">Oturum İzni</option><option value="golden">Altın Vize</option><option value="business">İş Vizesi</option><option value="citizenship">Vatandaşlık</option>
            </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tür Adı</label><input type="text" value={form.typeName || ''} onChange={e => setForm({ ...form, typeName: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Ücret</label><input type="text" value={form.price || ''} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Süre</label><input type="text" value={form.duration || ''} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label><input type="number" value={form.order || 0} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive !== false} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-5 h-5 rounded" /><span className="text-sm font-medium">Aktif</span></label></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama *</label><textarea rows={2} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Detaylı Açıklama</label><textarea rows={3} value={form.longDescription || ''} onChange={e => setForm({ ...form, longDescription: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" /></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gerekli Belgeler</label>
            <div className="flex gap-2 mb-2"><input type="text" value={reqText} onChange={e => setReqText(e.target.value)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm" placeholder="Belge ekle..." /><button onClick={() => { if (reqText.trim()) { setForm({ ...form, requirements: [...(form.requirements || []), reqText.trim()] }); setReqText(''); } }} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium">Ekle</button></div>
            <div className="flex flex-wrap gap-1.5">{(form.requirements || []).map((r, i) => <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs flex items-center gap-1">{r} <button onClick={() => setForm({ ...form, requirements: form.requirements?.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600">×</button></span>)}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Özellikler</label>
            <div className="flex gap-2 mb-2"><input type="text" value={featText} onChange={e => setFeatText(e.target.value)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm" placeholder="Özellik ekle..." /><button onClick={() => { if (featText.trim()) { setForm({ ...form, features: [...(form.features || []), featText.trim()] }); setFeatText(''); } }} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium">Ekle</button></div>
            <div className="flex flex-wrap gap-1.5">{(form.features || []).map((f, i) => <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs flex items-center gap-1">{f} <button onClick={() => setForm({ ...form, features: form.features?.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600">×</button></span>)}</div>
          </div>
          <button onClick={() => { if (form.title && form.country) onSave(form); }} className="w-full px-6 py-4 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a]"><Save size={16} className="inline mr-2" />{service ? 'Güncelle' : 'Kaydet'}</button>
        </div>
      </div>
    </div>
  );
};

/* ============ FAQ FORM MODAL ============ */
const FaqFormModal: React.FC<{ faq?: FAQ | null; onSave: (data: Partial<FAQ>) => void; onClose: () => void }> = ({ faq, onSave, onClose }) => {
  const [form, setForm] = useState({ question: faq?.question || '', answer: faq?.answer || '', order: faq?.order || 0, isActive: faq?.isActive ?? true });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <h3 className="text-lg font-bold text-[#0f2b5b] mb-4">{faq ? 'SSS Düzenle' : 'Yeni SSS'}</h3>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Soru *</label><input type="text" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Cevap *</label><textarea rows={4} value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label><input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-5 h-5 rounded" /><span className="text-sm">Aktif</span></label>
          <div className="flex gap-3">
            <button onClick={() => { if (form.question && form.answer) onSave(form); }} className="flex-1 px-4 py-3 bg-[#0f2b5b] text-white rounded-xl font-bold">Kaydet</button>
            <button onClick={onClose} className="px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-700">İptal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============ TESTIMONIAL FORM MODAL ============ */
const TestimonialFormModal: React.FC<{ testimonial?: Testimonial | null; onSave: (data: Partial<Testimonial>) => void; onClose: () => void }> = ({ testimonial, onSave, onClose }) => {
  const [form, setForm] = useState({ name: testimonial?.name || '', country: testimonial?.country || '', flag: testimonial?.flag || '🌍', service: testimonial?.service || '', text: testimonial?.text || '', rating: testimonial?.rating || 5, isActive: testimonial?.isActive ?? true });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <h3 className="text-lg font-bold text-[#0f2b5b] mb-4">{testimonial ? 'Referans Düzenle' : 'Yeni Referans'}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Ülke *</label><input type="text" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Bayrak</label><input type="text" value={form.flag} onChange={e => setForm({ ...form, flag: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Hizmet</label><input type="text" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Yorum *</label><textarea rows={3} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Puan</label><div className="flex gap-1">{[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => setForm({ ...form, rating: n })}><Star size={24} className={n <= form.rating ? 'text-[#c9a84c] fill-[#c9a84c]' : 'text-gray-300'} /></button>)}</div></div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-5 h-5 rounded" /><span className="text-sm">Aktif</span></label>
          <div className="flex gap-3">
            <button onClick={() => { if (form.name && form.text) onSave(form); }} className="flex-1 px-4 py-3 bg-[#0f2b5b] text-white rounded-xl font-bold">Kaydet</button>
            <button onClick={onClose} className="px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-700">İptal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
