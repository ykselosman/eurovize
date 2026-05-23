import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Footer, Header, KVKKBanner, ToastContainer, WhatsAppButton } from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/Services').then(module => ({ default: module.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/Services').then(module => ({ default: module.ServiceDetailPage })));
const BlogPage = lazy(() => import('./pages/Blog').then(module => ({ default: module.BlogPage })));
const BlogDetailPage = lazy(() => import('./pages/Blog').then(module => ({ default: module.BlogDetailPage })));
const AboutPage = lazy(() => import('./pages/About').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/About').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/About').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/About').then(module => ({ default: module.RegisterPage })));
const ProfilePage = lazy(() => import('./pages/About').then(module => ({ default: module.ProfilePage })));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const PrivacyPolicyPage = lazy(() => import('./pages/Legal').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/Legal').then(module => ({ default: module.TermsPage })));
const CookiesPage = lazy(() => import('./pages/Legal').then(module => ({ default: module.CookiesPage })));
const KvkkPage = lazy(() => import('./pages/Legal').then(module => ({ default: module.KvkkPage })));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="text-center">
      <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-[#c9a84c]/30 border-t-[#0f2b5b]" />
      <p className="text-sm font-medium text-[#0f2b5b]">EuroVize yükleniyor...</p>
    </div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser, loading } = useApp();
  if (loading) return <LoadingScreen />;
  if (!currentUser) return <Navigate to="/giris" replace />;
  return children;
};

const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser, loading } = useApp();
  if (loading) return <LoadingScreen />;
  if (!currentUser) return <Navigate to="/giris" replace />;
  if (currentUser.role !== 'admin') return <Navigate to="/panel" replace />;
  return children;
};

const NotFound: React.FC = () => (
  <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="text-center">
      <h1 className="text-8xl font-extrabold text-[#0f2b5b]">404</h1>
      <p className="text-xl text-gray-600 mt-4 mb-2">Aradığınız sayfa bulunamadı</p>
      <p className="text-gray-400 text-sm mb-8">Sayfa taşınmış, kaldırılmış veya bağlantı hatalı olabilir.</p>
      <Link to="/" className="inline-block px-6 py-3 bg-[#0f2b5b] text-white rounded-xl font-bold hover:bg-[#1a3f7a] transition-colors">
        Ana Sayfaya Dön
      </Link>
    </div>
  </main>
);

const PageLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ['/giris', '/kayit'].includes(location.pathname);
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <ScrollToTop />
      <ToastContainer />
      {!isAuthPage && !isAdminPage && <Header />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<PageLoader><Home /></PageLoader>} />
          <Route path="/hizmetler" element={<PageLoader><ServicesPage /></PageLoader>} />
          <Route path="/hizmet/:slug" element={<PageLoader><ServiceDetailPage /></PageLoader>} />
          <Route path="/hizmet/id/:id" element={<PageLoader><ServiceDetailPage /></PageLoader>} />
          <Route path="/blog" element={<PageLoader><BlogPage /></PageLoader>} />
          <Route path="/blog/:slug" element={<PageLoader><BlogDetailPage /></PageLoader>} />
          <Route path="/hakkimizda" element={<PageLoader><AboutPage /></PageLoader>} />
          <Route path="/iletisim" element={<PageLoader><ContactPage /></PageLoader>} />
          <Route path="/giris" element={<PageLoader><LoginPage /></PageLoader>} />
          <Route path="/kayit" element={<PageLoader><RegisterPage /></PageLoader>} />
          <Route path="/panel" element={<ProtectedRoute><PageLoader><Dashboard /></PageLoader></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><PageLoader><ProfilePage /></PageLoader></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><PageLoader><AdminPanel /></PageLoader></AdminRoute>} />
          <Route path="/gizlilik-politikasi" element={<PageLoader><PrivacyPolicyPage /></PageLoader>} />
          <Route path="/kullanim-kosullari" element={<PageLoader><TermsPage /></PageLoader>} />
          <Route path="/cerez-politikasi" element={<PageLoader><CookiesPage /></PageLoader>} />
          <Route path="/kvkk-aydinlatma" element={<PageLoader><KvkkPage /></PageLoader>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isAuthPage && !isAdminPage && <Footer />}
      {!isAuthPage && !isAdminPage && <WhatsAppButton />}
      {!isAuthPage && !isAdminPage && <KVKKBanner />}
    </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <AppLayout />
    </AppProvider>
  </BrowserRouter>
);

export default App;
