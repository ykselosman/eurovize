import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header, Footer, ToastContainer, WhatsAppButton, KVKKBanner } from './components/Layout';
import Home from './pages/Home';
import { ServicesPage, ServiceDetailPage } from './pages/Services';
import { AboutPage, ContactPage, LoginPage, RegisterPage, ProfilePage } from './pages/About';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

const NotFound: React.FC = () => (
  <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="text-center">
      <h1 className="text-8xl font-extrabold text-[#0f2b5b]">404</h1>
      <p className="text-xl text-gray-600 mt-4 mb-2">Aradığınız sayfa bulunamadı</p>
      <p className="text-gray-400 text-sm mb-8">Sayfa taşınmış veya kaldırılmış olabilir.</p>
      <a href="#/" className="inline-block px-6 py-3 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors">Ana Sayfaya Dön</a>
    </div>
  </main>
);

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAuth = location.pathname === '/giris' || location.pathname === '/kayit';
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <ScrollToTop />
      <ToastContainer />
      {!isAuth && !isAdmin && <Header />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hizmetler" element={<ServicesPage />} />
          <Route path="/hizmet/:id" element={<ServiceDetailPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="/giris" element={<LoginPage />} />
          <Route path="/kayit" element={<RegisterPage />} />
          <Route path="/panel" element={<Dashboard />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isAuth && !isAdmin && <Footer />}
      {!isAuth && !isAdmin && <WhatsAppButton />}
      {!isAuth && !isAdmin && <KVKKBanner />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </HashRouter>
  );
};

export default App;
