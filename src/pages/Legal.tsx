import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, SEO } from '../components/SEO';
import { pageUrl } from '../utils/site';

const LegalLayout: React.FC<{
  title: string;
  description: string;
  canonical: string;
  children: React.ReactNode;
}> = ({ title, description, canonical, children }) => (
  <main>
    <SEO title={title} description={description} canonical={canonical} />
    <section className="bg-gradient-to-br from-[#0a1628] to-[#1a4d8c] py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <Breadcrumb items={[{ label: 'Ana Sayfa', href: '/' }, { label: title }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">{title}</h1>
        <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="prose prose-slate max-w-none prose-headings:text-[#0f2b5b] prose-a:text-[#0f2b5b] prose-strong:text-[#0f2b5b]">
          {children}
        </div>
        <div className="mt-10 rounded-2xl bg-gray-50 p-5 text-sm text-gray-600">
          Bu metin genel bilgilendirme amaçlıdır. Şirket unvanı, MERSİS, vergi no ve resmi iletişim detaylarınızı canlı yayına çıkmadan önce güncellemeniz önerilir.
        </div>
      </div>
    </section>
  </main>
);

export const PrivacyPolicyPage: React.FC = () => (
  <LegalLayout
    title="Gizlilik Politikası"
    description="EuroVize web sitesinde paylaşılan kişisel verilerin nasıl işlendiği ve korunduğu hakkında bilgilendirme."
    canonical={pageUrl('/gizlilik-politikasi')}
  >
    <p>EuroVize, kullanıcı gizliliğini korumayı öncelik kabul eder. Bu politika; web sitemiz, iletişim formları ve danışmanlık süreçlerinde toplanan verilerin hangi amaçlarla işlendiğini açıklar.</p>
    <h2>Toplanan Veriler</h2>
    <ul>
      <li>Ad, soyad, telefon, e-posta ve iletişim içerikleri</li>
      <li>Başvuru sürecine ilişkin kullanıcı tarafından paylaşılan bilgiler</li>
      <li>Teknik kullanım verileri ve çerez tercihleri</li>
    </ul>
    <h2>İşleme Amaçları</h2>
    <ul>
      <li>Danışmanlık hizmeti sunmak</li>
      <li>Başvuru süreçlerini takip etmek</li>
      <li>Kullanıcı taleplerine dönüş yapmak</li>
      <li>Site güvenliği ve hizmet kalitesini geliştirmek</li>
    </ul>
    <h2>Haklarınız</h2>
    <p>KVKK ve ilgili mevzuat kapsamında verilerinize erişme, düzeltme, silme ve işlenmesine itiraz etme hakkına sahipsiniz. Talepleriniz için <a href="mailto:info@eurovize.com">info@eurovize.com</a> adresine yazabilirsiniz.</p>
  </LegalLayout>
);

export const TermsPage: React.FC = () => (
  <LegalLayout
    title="Kullanım Koşulları"
    description="EuroVize web sitesinin kullanımına ilişkin temel şartlar ve sorumluluklar."
    canonical={pageUrl('/kullanim-kosullari')}
  >
    <p>Bu web sitesini kullanan herkes aşağıdaki kullanım koşullarını kabul etmiş sayılır.</p>
    <h2>Bilgilendirme Niteliği</h2>
    <p>Sitede yer alan içerikler genel bilgilendirme amaçlıdır. Nihai başvuru koşulları ilgili konsolosluk, göç idaresi veya resmi kurumların güncel uygulamalarına göre değişebilir.</p>
    <h2>Kullanıcı Sorumluluğu</h2>
    <ul>
      <li>Girilen bilgilerin doğru ve güncel olması gerekir.</li>
      <li>Hesap güvenliği kullanıcı sorumluluğundadır.</li>
      <li>Platformun kötüye kullanımı, spam veya hukuka aykırı kullanım yasaktır.</li>
    </ul>
    <h2>Fikri Mülkiyet</h2>
    <p>Metin, tasarım, marka unsurları ve içeriklerin tüm hakları EuroVize’ye veya ilgili hak sahiplerine aittir. Yazılı izin olmadan kopyalanamaz.</p>
  </LegalLayout>
);

export const CookiesPage: React.FC = () => (
  <LegalLayout
    title="Çerez Politikası"
    description="EuroVize web sitesinde kullanılan çerez türleri ve kullanıcı tercihleri hakkında açıklama."
    canonical={pageUrl('/cerez-politikasi')}
  >
    <p>Bu web sitesi kullanıcı deneyimini geliştirmek, güvenlik sağlamak ve temel işlevleri sunmak için sınırlı çerezler kullanır.</p>
    <h2>Çerez Türleri</h2>
    <ul>
      <li><strong>Zorunlu çerezler:</strong> Oturum ve temel site işlevleri için gereklidir.</li>
      <li><strong>Tercih çerezleri:</strong> KVKK/çerez onayı gibi kullanıcı tercihlerini hatırlar.</li>
      <li><strong>Analitik çerezler:</strong> İleride etkinleştirilirse performans ölçümü için kullanılabilir.</li>
    </ul>
    <h2>Çerez Yönetimi</h2>
    <p>Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak bazı işlevler sınırlı çalışabilir.</p>
  </LegalLayout>
);

export const KvkkPage: React.FC = () => (
  <LegalLayout
    title="KVKK Aydınlatma Metni"
    description="6698 sayılı KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni."
    canonical={pageUrl('/kvkk-aydinlatma')}
  >
    <p>Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu olarak EuroVize tarafından hazırlanmıştır.</p>
    <h2>Veri Sorumlusu</h2>
    <p>EuroVize Danışmanlık – iletişim için <a href="mailto:info@eurovize.com">info@eurovize.com</a> üzerinden bize ulaşabilirsiniz.</p>
    <h2>İşlenen Veri Kategorileri</h2>
    <ul>
      <li>Kimlik ve iletişim bilgileri</li>
      <li>Başvuru süreci kapsamında paylaşılan mesleki ve kişisel bilgiler</li>
      <li>İşlem güvenliği kayıtları</li>
    </ul>
    <h2>Aktarım ve Saklama</h2>
    <p>Veriler, hizmetin yürütülmesi için gereken ölçüde yetkili personel, iş ortakları ve ilgili resmi kurumlarla paylaşılabilir. Saklama süreleri mevzuata ve hizmet gerekliliklerine göre belirlenir.</p>
    <h2>Başvuru Hakkı</h2>
    <p>KVKK m.11 kapsamındaki taleplerinizi yazılı olarak veya kayıtlı e-posta ile iletebilirsiniz.</p>
    <p className="mt-8"><Link to="/iletisim" className="font-semibold">İletişim sayfasına dön</Link></p>
  </LegalLayout>
);
