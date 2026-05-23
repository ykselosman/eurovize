# Vercel Deploy Notları

## Proje Ayarları
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `20.x`

## Vercel Dashboard
1. GitHub repo'yu Vercel'e bağlayın.
2. Project Settings > Build & Development Settings bölümünde:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy edin.

## Route Desteği
Bu projede `BrowserRouter` kullanılıyor. Bu nedenle `vercel.json` içindeki rewrite kuralı zorunludur. Dosya zaten eklidir.

## Güvenlik / Header'lar
`vercel.json` içinde şu ayarlar hazırdır:
- CSP
- HSTS
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- asset cache policy

## Firebase Notu
Deploy sonrası şu adımları ayrıca tamamlayın:
1. Firebase Console > Firestore Rules kısmına güncel rules yükleyin.
2. Admin olarak kullanılacak e-posta adresi `src/utils/site.ts` ve `firestore.rules` içinde kontrol edilir.
3. Gerekirse bu admin e-postasını production hesabınıza göre değiştirin.

## Canlı Kontrol Listesi
- `/` açılıyor mu?
- `/hizmetler` açılıyor mu?
- sayfa yenilemede 404 olmuyor mu?
- giriş / kayıt akışı çalışıyor mu?
- tracking sorgusu çalışıyor mu?
- robots ve sitemap erişilebilir mi?
  - `/robots.txt`
  - `/sitemap.xml`
