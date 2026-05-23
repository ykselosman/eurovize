import { Service, Testimonial, FAQ, SiteSettings, User } from '../types';

export const initialServices: Service[] = [
  {
    id: 's1',
    title: 'Almanya Çalışma Vizesi Danışmanlığı',
    description: 'Almanya\'da çalışmak isteyenler için tam kapsamlı vize danışmanlık hizmeti. Belge hazırlığından başvuru sürecine kadar yanınızdayız.',
    longDescription: 'Almanya, Türkiye\'den göçmek isteyenler için en popüler destinasyonlardan biridir. Güçlü ekonomisi, yüksek yaşam standartları ve kapsamlı sosyal güvenlik sistemi ile Almanya, her yıl binlerce Türk çalışanını ağırlamaktadır. EuroVize olarak, Almanya çalışma vizesi sürecinizin her adımında size profesyonel destek sunuyoruz.',
    country: 'Almanya',
    countryFlag: '🇩🇪',
    type: 'work',
    typeName: 'Çalışma Vizesi',
    price: '€2.500',
    duration: '3-6 ay',
    requirements: [
      'Geçerli pasaport (en az 6 ay geçerliliği olan)',
      'Dil yeterliliği belgesi (Almanca A2 veya üzeri tercih edilir)',
      'Eğitim diploması ve transkriptler',
      'İş deneyimi belgeleri',
      'Almanya\'dan iş teklif mektubu veya sözleşme',
      'Sağlık sigortası belgesi',
      'Vize başvuru formu (doldurulmuş)',
      'Biometrik fotoğraf (2 adet)',
      'Sabıka kaydı',
      'Mali yeterlilik belgesi'
    ],
    process: [
      { step: 1, title: 'İlk Danışmanlık', description: 'Uzmanlarımız ile durumunuzu değerlendiriyoruz.' },
      { step: 2, title: 'Belge Hazırlığı', description: 'Gerekli tüm belgeleri eksiksiz hazırlamanıza yardımcı oluyoruz.' },
      { step: 3, title: 'Başvuru Süreci', description: 'Vize başvurunuzu büyükelçilikte gerçekleştiriyoruz.' },
      { step: 4, title: 'Takip & Destek', description: 'Başvuru sürecini aktif olarak takip ediyoruz.' },
      { step: 5, title: 'Varış Desteği', description: 'Almanya\'ya varışınızda ilk adımlarınızda yardımcı oluyoruz.' }
    ],
    features: ['Birebir danışmanlık', 'Belge çeviri desteği', 'Büyükelçilik randevu takibi', 'Varış sonrası destek', '%97 başarı oranı'],
    isActive: true,
    order: 1
  },
  {
    id: 's2',
    title: 'Hollanda Yüksek Nitelikli Göçmen Vizesi',
    description: 'Hollanda\'nın yüksek nitelikli göçmen programı ile hızlı ve kolay şekilde çalışma izni alın.',
    longDescription: 'Hollanda, yüksek nitelikli profesyoneller için sunduğu özel göçmen programı ile Avrupa\'nın en cazip ülkelerinden biridir. 30% vergi indirimi avantajı, çok uluslu iş ortamı ve yaşam kalitesiyle Hollanda, kariyerinizi bir üst seviyeye taşımak için ideal bir seçimdir.',
    country: 'Hollanda',
    countryFlag: '🇳🇱',
    type: 'work',
    typeName: 'Çalışma Vizesi',
    price: '€3.000',
    duration: '2-4 ay',
    requirements: [
      'Geçerli pasaport',
      'Üniversite diploması veya eşdeğerlilik belgesi',
      'Asgari maaş şartını karşılayan iş sözleşmesi',
      'Sağlık sigortası',
      'Sabıka kaydı',
      'Biometrik fotoğraflar',
      'MVV başvuru formu',
      'İşverenin IND onayı'
    ],
    process: [
      { step: 1, title: 'Uygunluk Değerlendirmesi', description: 'Program şartlarını karşılama durumunuzu analiz ediyoruz.' },
      { step: 2, title: 'İşveren Koordinasyonu', description: 'İşvereninizle gerekli süreçleri koordine ediyoruz.' },
      { step: 3, title: 'IND Başvurusu', description: 'Göçmenlik Dairesi başvurusunu hazırlıyoruz.' },
      { step: 4, title: 'MVV Vize Başvurusu', description: 'Konsolosluk başvurusunu gerçekleştiriyoruz.' },
      { step: 5, title: 'Oturum İzni İşlemleri', description: 'Varış sonrası oturum kartı işlemlerinizi yapıyoruz.' }
    ],
    features: ['30% vergi indirimi danışmanlığı', 'İşveren ile koordinasyon', 'IND başvuru desteği', 'Hızlandırılmış süreç', 'Varış sonrası oturum kartı'],
    isActive: true,
    order: 2
  },
  {
    id: 's3',
    title: 'Fransa Öğrenci Vizesi Danışmanlığı',
    description: 'Fransa\'nın prestijli üniversitelerinde eğitim almak için öğrenci vizesi süreçlerinizi yönetiyoruz.',
    longDescription: 'Fransa, dünya çapında tanınan üniversiteleri ve eğitim kalitesiyle uluslararası öğrencilerin favori destinasyonlarından biridir. Campus France sürecinden vize başvurusuna kadar tüm adımlarda size rehberlik ediyoruz.',
    country: 'Fransa',
    countryFlag: '🇫🇷',
    type: 'student',
    typeName: 'Öğrenci Vizesi',
    price: '€1.800',
    duration: '2-3 ay',
    requirements: [
      'Geçerli pasaport',
      'Üniversite kabul mektubu',
      'Campus France kayıt onayı',
      'Mali yeterlilik belgesi (aylık €615 üzeri)',
      'Konaklama belgesi',
      'Sağlık sigortası',
      'Dil yeterliliği (DELF/DALF veya IELTS)',
      'Diploma ve transkriptler'
    ],
    process: [
      { step: 1, title: 'Üniversite Seçimi', description: 'Hedeflerinize uygun üniversite ve program seçiminde yardımcı oluyoruz.' },
      { step: 2, title: 'Campus France Süreci', description: 'Campus France kayıt ve mülakat sürecinizi yönetiyoruz.' },
      { step: 3, title: 'Belge Hazırlığı', description: 'Tüm gerekli belgeleri hazırlamanıza destek oluyoruz.' },
      { step: 4, title: 'Vize Başvurusu', description: 'Konsolosluk başvurunuzu gerçekleştiriyoruz.' }
    ],
    features: ['Campus France desteği', 'Üniversite başvuru yardımı', 'Burs danışmanlığı', 'Konaklık desteği', 'Dil sınavı hazırlık rehberi'],
    isActive: true,
    order: 3
  },
  {
    id: 's4',
    title: 'İspanya Altın Vize (Golden Visa) Programı',
    description: 'İspanya\'da gayrimenkul yatırımı ile oturum izni ve Avrupa\'da yaşama fırsatı sunuyoruz.',
    longDescription: 'İspanya Golden Visa programı, €500.000 üzeri gayrimenkul yatırımı yaparak İspanya oturum izni almanızı sağlar. Bu program, tüm Schengen bölgesinde serbest dolaşım hakkı sunarken, ailenizi de kapsayan bir çözümdür.',
    country: 'İspanya',
    countryFlag: '🇪🇸',
    type: 'golden',
    typeName: 'Altın Vize / Yatırımcı Vizesi',
    price: '€5.000',
    duration: '2-3 ay',
    requirements: [
      'Geçerli pasaport',
      '€500.000 üzeri gayrimenkul yatırımı',
      'Sağlık sigortası',
      'Sabıka kaydı',
      'Mali kaynak belgelendirme',
      'Nüfus kayıt örneği',
      'Evlilik/bekarlık belgesi'
    ],
    process: [
      { step: 1, title: 'Yatırım Danışmanlığı', description: 'Gayrimenkul yatırım seçeneklerini değerlendiriyoruz.' },
      { step: 2, title: 'Yatırım Gerçekleştirme', description: 'Yatırım sürecinizi güvenli şekilde tamamlıyoruz.' },
      { step: 3, title: 'Belge Hazırlığı', description: 'Vize başvurusu için gerekli tüm belgeleri hazırlıyoruz.' },
      { step: 4, title: 'NIE ve Oturum Başvurusu', description: 'Yabancı kimlik numarası ve oturum izni başvurusu yapıyoruz.' }
    ],
    features: ['Gayrimenkul danışmanlığı', 'Hukuki destek', 'NIE başvurusu', 'Aile dahil oturum izni', 'Schengen serbest dolaşım'],
    isActive: true,
    order: 4
  },
  {
    id: 's5',
    title: 'Belçika Aile Birleşimi Vizesi',
    description: 'Ailenizle Belçika\'da birleşmeniz için gerekli tüm vize ve oturum izni işlemlerinde yanınızdayız.',
    longDescription: 'Belçika\'da yaşayan eşiniz veya aile bireylerinizle birleşmek için aile birleşimi vizesi sürecinizi baştan sona yönetiyoruz. Belçika\'nın karmaşık bürokratik süreçlerinde size rehberlik ediyoruz.',
    country: 'Belçika',
    countryFlag: '🇧🇪',
    type: 'family',
    typeName: 'Aile Birleşimi',
    price: '€2.200',
    duration: '4-8 ay',
    requirements: [
      'Geçerli pasaport',
      'Aile birleşimi gerekçesi (evlilik, doğum vb.)',
      'Sponsor\'un Belçika oturum/çalışma izni',
      'Adequate housing belgesi',
      'Sağlık sigortası',
      'Gelir yeterliliği belgesi',
      'Aile ilişkisini kanıtlayan belgeler',
      'Medical sertifika'
    ],
    process: [
      { step: 1, title: 'Dosya Değerlendirmesi', description: 'Aile birleşimi şartlarını detaylı olarak inceliyoruz.' },
      { step: 2, title: 'Sponsor İşlemleri', description: 'Belçika\'daki sponsor bireyin belgelerini hazırlıyoruz.' },
      { step: 3, title: 'Başvuru Hazırlığı', description: 'Türkiye\'deki başvuru belgelerini eksiksiz hazırlıyoruz.' },
      { step: 4, title: 'Konsolosluk Başvurusu', description: 'Başvurunuzu konsolosluğa yapıyoruz.' },
      { step: 5, title: 'BEA Takibi', description: 'Belçika Göçmenlik Ofisi sürecini aktif takip ediyoruz.' }
    ],
    features: ['Tam hukuki destek', 'Sponsor koordinasyonu', 'BEA süreç takibi', 'Aile bireyleri dahil', 'Oturum kartı işlemleri'],
    isActive: true,
    order: 5
  },
  {
    id: 's6',
    title: 'Portekiz D7 Pasif Gelir Vizesi',
    description: 'Portekiz\'in popüler D7 vize programı ile pasif gelir sahipleri için Avrupa oturum izni.',
    longDescription: 'Portekiz D7 vizesi, emekli maaşı, kira geliri, yatırım geliri veya diğer pasif gelir kaynaklarına sahip kişiler için tasarlanmış özel bir oturum izni programıdır. Vergi avantajları ve yaşam kalitesiyle Portekiz, Avrupa\'da yaşamak isteyenlerin gözdesidir.',
    country: 'Portekiz',
    countryFlag: '🇵🇹',
    type: 'residence',
    typeName: 'Oturum İzni',
    price: '€2.800',
    duration: '3-6 ay',
    requirements: [
      'Geçerli pasaport',
      'Düzenli pasif gelir kanıtı (aylık €760 üzeri)',
      'Portekiz\'de konaklama belgesi',
      'Sağlık sigortası',
      'Sabıka kaydı',
      'Banka hesap dökümü',
      'NIF (Portekiz vergi numarası)',
      'NiB (Portekiz banka hesabı)'
    ],
    process: [
      { step: 1, title: 'Gelir Değerlendirmesi', description: 'Pasif gelir kaynaklarınızı analiz ediyoruz.' },
      { step: 2, title: 'Portekiz Hazırlıkları', description: 'NIF, banka hesabı ve konaklama düzenlemelerini yapıyoruz.' },
      { step: 3, title: 'SEF Başvurusu', description: 'Göçmenlik Servisi başvurusunu hazırlıyoruz.' },
      { step: 4, title: 'Konsolosluk Başvurusu', description: 'Türkiye\'deki konsolosluk başvurusunu gerçekleştiriyoruz.' },
      { step: 5, title: 'Varış & Kayıt', description: 'Portekiz\'e varışta SEF randevu ve kayıt işlemlerini yapıyoruz.' }
    ],
    features: ['NIF ve banka hesabı açılımı', 'Konaklık desteği', 'Vergi danışmanlığı', 'RNH (NIM) vergi rejimi', 'Aile dahil başvuru'],
    isActive: true,
    order: 6
  },
  {
    id: 's7',
    title: 'İtalya Elektrikçi Vizesi - Decreto Flussi',
    description: 'İtalya\'nın yıllık kota programı ile nitelikli ve yarı nitelikli işçiler için çalışma vizesi.',
    longDescription: 'İtalya Decreto Flussi programı, belirli meslek gruplarındaki yabancı çalışanlara yıllık kota ile çalışma izni verir. Özellikle teknisyen, usta ve nitelikli işçiler için mükemmel bir fırsat sunar.',
    country: 'İtalya',
    countryFlag: '🇮🇹',
    type: 'work',
    typeName: 'Çalışma Vizesi',
    price: '€2.000',
    duration: '3-5 ay',
    requirements: [
      'Geçerli pasaport',
      'İş teklif mektubu (İtalyan işveren)',
      'Mesleki yeterlilik belgesi',
      'Diploma ve sertifikalar',
      'Sağlık sigortası',
      'Sabıka kaydı',
      'Vize başvuru formu',
      'Biometrik fotoğraflar'
    ],
    process: [
      { step: 1, title: 'Uygunluk Kontrolü', description: 'Meslek grubunuzun kota kapsamında olup olmadığını kontrol ediyoruz.' },
      { step: 2, title: 'İşveren Koordinasyonu', description: 'İtalyan işveren ile gerekli belgeleri hazırlıyoruz.' },
      { step: 3, title: 'Nulla Osta Başvurusu', description: 'Çalışma izni onay sürecini başlatıyoruz.' },
      { step: 4, title: 'Vize Başvurusu', description: 'Konsolosluk vize başvurusunu gerçekleştiriyoruz.' }
    ],
    features: ['Meslek grubu analizi', 'İşveren ile koordinasyon', 'Nulla Osta takibi', 'Belge çevirisi', 'Varış sonrası Permesso'],
    isActive: true,
    order: 7
  },
  {
    id: 's8',
    title: 'Avusturya Kırmızı-Beyaz-Kırmızı Kartı',
    description: 'Avusturya\'nın puan bazlı göçmenlik sistemi ile çalışma ve oturum izni danışmanlığı.',
    longDescription: 'Avusturya\'nın Kırmızı-Beyaz-Kırmızı (Rot-Weiß-Rot) Kartı, puan bazlı bir sistemle nitelikli çalışanlara çalışma ve oturum izni sunar. Eğitim, deneyim, dil becerileri ve yaş gibi kriterlere göre puanlama yapılır.',
    country: 'Avusturya',
    countryFlag: '🇦🇹',
    type: 'work',
    typeName: 'Çalışma Vizesi',
    price: '€2.600',
    duration: '3-6 ay',
    requirements: [
      'Geçerli pasaport',
      'Yeterli puan (minimum 65 puan)',
      'Üniversite diploması veya mesleki eğitim',
      'İş deneyimi belgeleri',
      'Almanca/İngilizce dil yeterliliği',
      'İş teklif mektubu',
      'Sağlık sigortası',
      'Sabıka kaydı'
    ],
    process: [
      { step: 1, title: 'Puan Hesaplaması', description: 'Eğitim, deneyim ve dil puanlarınızı hesaplıyoruz.' },
      { step: 2, title: 'Eksiklik Giderme', description: 'Puanınızı artırmak için strateji geliştiriyoruz.' },
      { step: 3, title: 'Belge Hazırlığı', description: 'Tüm gerekli belgeleri hazırlıyoruz.' },
      { step: 4, title: 'AMA Başvurusu', description: 'İş Piyasası Servisi (AMS) başvurusunu yapıyoruz.' },
      { step: 5, title: 'Vize Başvurusu', description: 'Konsolosluk başvurusunu gerçekleştiriyoruz.' }
    ],
    features: ['Puan hesaplama aracı', 'Dil sınavı danışmanlığı', 'AMS başvuru desteği', 'Belge hazırlama', 'Varış sonrası destek'],
    isActive: true,
    order: 8
  },
  {
    id: 's9',
    title: 'İsveç Çalışma Vizesi Danışmanlığı',
    description: 'İsveç\'in güçlü iş piyasasında çalışmak için gerekli vize ve oturum izni süreçlerini yönetiyoruz.',
    longDescription: 'İsveç, yüksek yaşam kalitesi, güçlü sosyal refah sistemi ve iş-yaşam dengesi ile Avrupa\'nın en cazip çalışma destinasyonlarından biridir. Teknoloji, mühendislik ve sağlık sektörlerinde özellikle yabancı çalışanlara ihtiyaç duyulmaktadır.',
    country: 'İsveç',
    countryFlag: '🇸🇪',
    type: 'work',
    typeName: 'Çalışma Vizesi',
    price: '€2.400',
    duration: '2-4 ay',
    requirements: [
      'Geçerli pasaport',
      'İş teklif mektubu (asgari ücret şartını karşılayan)',
      'Üniversite diploması',
      'İş deneyimi belgeleri',
      'Sağlık sigortası',
      'Sabıka kaydı',
      'Biometrik fotoğraflar'
    ],
    process: [
      { step: 1, title: 'İş Teklifi Değerlendirmesi', description: 'İş teklifinizin vize şartlarını karşıladığını doğruluyoruz.' },
      { step: 2, title: 'Belge Hazırlığı', description: 'Gerekli tüm belgeleri eksiksiz hazırlıyoruz.' },
      { step: 3, title: 'Migrationsverket Başvurusu', description: 'İsveç Göçmenlik Dairesi online başvurusunu yapıyoruz.' },
      { step: 4, title: 'Konsolosluk Randevusu', description: 'Pasaport teslimi için konsolosluk randevusunu ayarlıyoruz.' }
    ],
    features: ['Online başvuru desteği', 'İş teklifi değerlendirmesi', 'Migrationsverket takibi', 'Hızlandırılmış süreç', 'Oturum kartı başvurusu'],
    isActive: true,
    order: 9
  },
  {
    id: 's10',
    title: 'Schengen Turistik Vize Danışmanlığı',
    description: 'Schengen bölgesine turistik seyahat için vize başvuru sürecinizi profesyonelce yönetiyoruz.',
    longDescription: 'Schengen turistik vizesi ile 26 Avrupa ülkesini tek bir vize ile ziyaret edebilirsiniz. Başvuru sürecinin karmaşıklığını ortadan kaldırarak size stressiz bir deneyim sunuyoruz.',
    country: 'Schengen Bölgesi',
    countryFlag: '🇪🇺',
    type: 'tourist',
    typeName: 'Turistik Vize',
    price: '€800',
    duration: '2-4 hafta',
    requirements: [
      'Geçerli pasaport (10 yıldan eski olmayan)',
      'Vize başvuru formu',
      'Biometrik fotoğraf (2 adet)',
      'Seyahat sağlık sigortası (€30.000 teminat)',
      'Uçak bileti rezervasyonu',
      'Otel rezervasyonu',
      'Mali yeterlilik belgesi',
      'İş/öğrenci belgesi',
      'Son 3 aylık banka hesap dökümü'
    ],
    process: [
      { step: 1, title: 'Belge Kontrolü', description: 'Mevcut belgelerinizi inceliyoruz ve eksikleri belirliyoruz.' },
      { step: 2, title: 'Başvuru Formu', description: 'Vize başvuru formunu hatasız dolduruyoruz.' },
      { step: 3, title: 'Randevu Ayarlama', description: 'Vize başvuru merkezinde randevunuzu ayarlıyoruz.' },
      { step: 4, title: 'Başvuru ve Takip', description: 'Başvuruya eşlik ediyor ve sonucu takip ediyoruz.' }
    ],
    features: ['Belge hazırlık desteği', 'Randevu ayarlama', 'Form doldurma yardımı', 'Seyahat planlaması', 'Acil durum desteği'],
    isActive: true,
    order: 10
  },
  {
    id: 's11',
    title: 'Danimarka Pozitif Liste Çalışma Vizesi',
    description: 'Danimarka\'nın Pozitif Liste programı ile ihtiyaç duyulan mesleklerde çalışma vizesi.',
    longDescription: 'Danimarka, belirli meslek gruplarında yaşanan iş gücü açığını kapatmak için Pozitif Liste programı sunmaktadır. Bu program, listedeki mesleklerde deneyime sahip kişilere hızlı çalışma izni imkanı tanır.',
    country: 'Danimarka',
    countryFlag: '🇩🇰',
    type: 'work',
    typeName: 'Çalışma Vizesi',
    price: '€2.300',
    duration: '2-3 ay',
    requirements: [
      'Geçerli pasaport',
      'Pozitif Liste\'de yer alan mesleğe ait deneyim',
      'İş teklif mektubu (asgari maaş şartını karşılayan)',
      'Diploma/sertifika belgeleri',
      'Sağlık sigortası',
      'Sabıka kaydı'
    ],
    process: [
      { step: 1, title: 'Meslek Değerlendirmesi', description: 'Mesleğinizin Pozitif Liste\'de olup olmadığını kontrol ediyoruz.' },
      { step: 2, title: 'Belge Hazırlığı', description: 'Gerekli belgeleri hazırlıyoruz.' },
      { step: 3, title: 'SIRI Başvurusu', description: 'Danimarka Göçmenlik Dairesi başvurusunu yapıyoruz.' },
      { step: 4, title: 'Vize Başvurusu', description: 'Konsolosluk başvurusunu gerçekleştiriyoruz.' }
    ],
    features: ['Meslek grubu analizi', 'Maaş şartı değerlendirmesi', 'SIRI online başvuru', 'Hızlı işlem süresi', 'Oturum izni desteği'],
    isActive: true,
    order: 11
  },
  {
    id: 's12',
    title: 'Norveç Uzman Çalışma Vizesi',
    description: 'Norveç\'te uzman olarak çalışmak isteyenler için tam kapsamlı vize danışmanlığı.',
    longDescription: 'Norveç, yüksek maaşlar, mükemmel çalışma koşulları ve yaşam kalitesiyle dikkat çeker. Uzman çalışma vizesi programı ile nitelikli profesyoneller Norveç\'te çalışma ve yaşama fırsatı bulur.',
    country: 'Norveç',
    countryFlag: '🇳🇴',
    type: 'work',
    typeName: 'Çalışma Vizesi',
    price: '€2.500',
    duration: '2-4 ay',
    requirements: [
      'Geçerli pasaport',
      'Uzmanlık alanında eğitim veya deneyim',
      'İş teklif mektubu',
      'Asgari maaş şartını karşılayan sözleşme',
      'Sağlık sigortası',
      'Sabıka kaydı'
    ],
    process: [
      { step: 1, title: 'Uzmanlık Değerlendirmesi', description: 'Uzmanlık alanınızı ve deneyiminizi değerlendiriyoruz.' },
      { step: 2, title: 'Belge Hazırlığı', description: 'Gerekli tüm belgeleri hazırlıyoruz.' },
      { step: 3, title: 'UDI Başvurusu', description: 'Norveç Göçmenlik Dairesi online başvurusunu yapıyoruz.' },
      { step: 4, title: 'Vize ve Varış', description: 'Konsolosluk başvurusu ve varış sonrası kayıt işlemleri.' }
    ],
    features: ['UDI online başvuru', 'Uzmanlık belgelendirmesi', 'İşveren koordinasyonu', 'Varış sonrası destek', 'Aile dahil başvuru'],
    isActive: true,
    order: 12
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ahmet Y.',
    country: 'Almanya',
    flag: '🇩🇪',
    service: 'Çalışma Vizesi',
    text: 'EuroVize sayesinde Almanya çalışma vizesimi hiç sorun yaşamadan aldım. Tüm süreçte profesyonel destek aldım, her adımda bilgilendirildim. Kesinlikle tavsiye ediyorum!',
    rating: 5,
    isActive: true
  },
  {
    id: 't2',
    name: 'Elif K.',
    country: 'Hollanda',
    flag: '🇳🇱',
    service: 'Yüksek Nitelikli Göçmen Vizesi',
    text: 'Hollanda\'ya taşınma hayalimi gerçekleştiren EuroVize ekibine çok teşekkür ederim. 30% vergi indirimi hakkında da çok faydalı bilgiler aldıM.',
    rating: 5,
    isActive: true
  },
  {
    id: 't3',
    name: 'Mehmet D.',
    country: 'Portekiz',
    flag: '🇵🇹',
    service: 'D7 Pasif Gelir Vizesi',
    text: 'Emekli olduktan sonra Portekiz\'de yaşamak istiyordum. EuroVize D7 vize sürecimi kusursuz yönetti. Artık Lizbon\'da yaşıyorum!',
    rating: 5,
    isActive: true
  },
  {
    id: 't4',
    name: 'Zeynep A.',
    country: 'İspanya',
    flag: '🇪🇸',
    service: 'Altın Vize Programı',
    text: 'Gayrimenkul yatırımı ile İspanya oturum izni aldık. Süreç boyunca hukuki destek ve yatırım danışmanlığı mükemmeldi.',
    rating: 5,
    isActive: true
  },
  {
    id: 't5',
    name: 'Burak S.',
    country: 'Fransa',
    flag: '🇫🇷',
    service: 'Öğrenci Vizesi',
    text: 'Sorbonne Üniversitesi\'nde master yapmak istiyordum. Campus France sürecinden vize başvurusuna kadar her şeyi EuroVize halletti.',
    rating: 4,
    isActive: true
  },
  {
    id: 't6',
    name: 'Ayşe M.',
    country: 'Belçika',
    flag: '🇧🇪',
    service: 'Aile Birleşimi',
    text: 'Eşimle Belçika\'da buluştuk. Karmaşık aile birleşimi sürecini EuroVize çok profesyonel bir şekilde yönetti. Sonsuza kadar minnettarız.',
    rating: 5,
    isActive: true
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq1',
    question: 'Avrupa vize başvurusu için ne kadar süre önceden başvurmalıyım?',
    answer: 'Schengen turistik vizesi için seyahat tarihinden en az 15 gün, en fazla 6 ay önce başvuru yapabilirsiniz. Çalışma ve oturum vizeleri için süreç daha uzun olup, ortalama 2-6 ay arasında değişmektedir. Erken başvuru yapmanız her zaman avantajlıdır.',
    order: 1,
    isActive: true
  },
  {
    id: 'faq2',
    question: 'Çalışma vizesi için dil yeterliliği şart mı?',
    answer: 'Ülkeye ve vize türüne göre değişmektedir. Almanya için Almanca bilgisi avantaj sağlarken, Hollanda ve İskandinav ülkelerinde İngilizce yeterli olabilmektedir. Bazı ülkelerde vize aşamasında dil şartı aranmazken, oturum izni uzatma aşamasında istenebilir.',
    order: 2,
    isActive: true
  },
  {
    id: 'faq3',
    question: 'Vize başvurum reddedilirse ne yapabilirim?',
    answer: 'Vize reddi durumunda itiraz hakkınız bulunmaktadır. Red nedenini dikkatlice inceleyerek, eksik belgeleri tamamlayıp tekrar başvuru yapabilir veya itiraz dilekçesi verebilirsiniz. EuroVize olarak ret sonrası itiraz sürecinizde de size profesyonel destek sunuyoruz.',
    order: 3,
    isActive: true
  },
  {
    id: 'faq4',
    question: 'Ailemi de yanıma alabilir miyim?',
    answer: 'Evet, çoğu Avrupa ülkesi aile birleşimi hakkı tanımaktadır. Çalışma veya oturum izni aldıktan sonra eşiniz ve çocuklarınız için aile birleşimi başvurusu yapılabilir. Bazı ülkeler bu başvuruyu aynı anda yapmanıza da olanak tanır.',
    order: 4,
    isActive: true
  },
  {
    id: 'faq5',
    question: 'Danışmanlık hizmetlerinizin ücretleri nasıl belirleniyor?',
    answer: 'Ücretler, vize türü, ülke ve sürecin karmaşıklığına göre değişmektedir. Her hizmetimiz için ilk danışmanlık ücretsizdir. Size özel fiyat teklifi için bizimle iletişime geçebilirsiniz.',
    order: 5,
    isActive: true
  },
  {
    id: 'faq6',
    question: 'Altın Vize (Golden Visa) nedir ve kimler başvurabilir?',
    answer: 'Altın Vize, belirli bir tutarda yatırım yaparak oturum izni almanızı sağlayan programdır. İspanya, Portekiz ve Yunanistan gibi ülkelerde gayrimenkul veya devlet tahvili yatırımı ile başvurulabilir. Yatırım tutarı ülkeden ülkeye değişir (€250.000 - €500.000 arası).',
    order: 6,
    isActive: true
  },
  {
    id: 'faq7',
    question: 'Başvuru sürecinde bana nasıl bilgi verilecek?',
    answer: 'Her başvuru sahibine özel bir takip numarası verilir. Online paneliniz üzerinden başvuru durumunuzu 7/24 takip edebilirsiniz. Ayrıca SMS, e-posta ve WhatsApp üzerinden her adımda bilgilendirilirsiniz.',
    order: 7,
    isActive: true
  },
  {
    id: 'faq8',
    question: 'Avrupa\'da çalışma izni aldığımda hangi haklara sahip olurum?',
    answer: 'Çalışma izni ile beraber oturum hakkı, sağlık hizmetlerine erişim, sosyal güvenlik kapsamı ve belirli şartlar altında aile birleşimi hakkı elde edersiniz. Bazı ülkelerde 5 yıl sonunda kalıcı oturum izni ve vatandaşlık başvurusu yapabilirsiniz.',
    order: 8,
    isActive: true
  }
];

export const initialSettings: SiteSettings = {
  phone: '+90 212 555 0123',
  email: 'info@eurovize.com',
  address: 'İstiklal Caddesi No: 45, Kat: 3, Beyoğlu / İstanbul',
  whatsapp: '+905551234567',
  workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
  socialMedia: {
    facebook: 'https://facebook.com/eurovize',
    instagram: 'https://instagram.com/eurovize',
    twitter: 'https://twitter.com/eurovize',
    linkedin: 'https://linkedin.com/company/eurovize'
  },
  companyInfo: {
    foundedYear: '2018',
    shortDesc: 'Türkiye\'den Avrupa\'ya vize ve oturum izni başvurularında güvenilir danışmanlık hizmeti.',
    longDesc: 'Türkiye\'den Avrupa\'ya göçmek isteyen bireylere ve ailelere profesyonel danışmanlık hizmeti sunmaktadır. Almanya, Hollanda, Fransa, İspanya, Portekiz, Belçika, İtalya, Avusturya, İsveç, Danimarka, Norveç ve Schengen bölgesi genelinde kapsamlı vize, çalışma izni, oturum izni ve göç danışmanlığı hizmetlerimiz bulunmaktadır.'
  },
  stats: {
    totalApplications: '10.000+',
    countries: '12+',
    successRate: '%97',
    supportHours: '7/24',
    totalApplicationsNum: 10000,
    countriesNum: 12,
    successRateNum: 97,
    yearsNum: 7
  },
  team: [
    { id: 'tm1', name: 'Ahmet Özkan', role: 'Kurucu & Genel Müdür', exp: '15+ yıl göç danışmanlığı' },
    { id: 'tm2', name: 'Elif Demir', role: 'Almanya & Avusturya Uzmanı', exp: '10+ yıl Almanya vize süreçleri' },
    { id: 'tm3', name: 'Mehmet Kaya', role: 'Hollanda & Belçika Uzmanı', exp: '8+ yıl Benelüks göç mevzuatı' },
    { id: 'tm4', name: 'Zeynep Arslan', role: 'İspanya & Portekiz Uzmanı', exp: '7+ yıl İber yarımadası yatırımları' }
  ],
  whyUs: [
    { icon: 'shield', title: 'Güvenilir Hizmet', desc: 'Güvenilir ve şeffaf danışmanlık hizmeti sunuyoruz.' },
    { icon: 'users', title: 'Deneyimli Ekip', desc: 'Avrupa göç mevzuatında uzman danışman kadromuz.' },
    { icon: 'check', title: 'Yüksek Başarı Oranı', desc: 'Sektörün en yüksek başarı oranlarından biri.' },
    { icon: 'clock', title: '7/24 Destek', desc: 'WhatsApp, telefon ve e-posta ile kesintisiz destek.' },
    { icon: 'globe', title: 'Geniş Ülke Ağı', desc: 'Kapsamlı Avrupa ülke ağı ve güncel mevzuat bilgisi.' },
    { icon: 'award', title: 'Birebir Danışmanlık', desc: 'Her müvekiliye özel atanmış danışman ve takip sistemi.' }
  ]
};

export const defaultAdmin: User = {
  id: 'admin',
  name: 'Admin',
  email: 'admin@eurovize.com',
  password: '',
  phone: '+90 212 555 0123',
  role: 'admin',
  createdAt: '2024-01-01'
};

export const statusMap: Record<string, string> = {
  pending: 'Beklemede',
  reviewing: 'Belge İncelemesi',
  approved: 'Onaylandı',
  rejected: 'Reddedildi',
  processing: 'Süreç Devam Ediyor',
  completed: 'Tamamlandı'
};

export const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  processing: 'bg-purple-100 text-purple-800',
  completed: 'bg-emerald-100 text-emerald-800'
};

export const typeColors: Record<string, string> = {
  tourist: 'bg-sky-100 text-sky-800',
  work: 'bg-blue-100 text-blue-800',
  student: 'bg-violet-100 text-violet-800',
  family: 'bg-pink-100 text-pink-800',
  residence: 'bg-emerald-100 text-emerald-800',
  citizenship: 'bg-amber-100 text-amber-800',
  business: 'bg-indigo-100 text-indigo-800',
  golden: 'bg-yellow-100 text-yellow-800'
};
