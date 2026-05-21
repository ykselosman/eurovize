export const SITE_NAME = 'EuroVize';
export const SITE_TITLE = 'EuroVize | Avrupa Vize ve Oturum İzni Danışmanlığı';
export const SITE_URL = 'https://eurovize.vercel.app';
export const SITE_DESCRIPTION = 'Türkiye’den Avrupa’ya vize, çalışma izni, oturum izni, aile birleşimi ve göç danışmanlığı. Almanya, Hollanda, Fransa, İspanya, Portekiz ve diğer Avrupa ülkeleri için profesyonel destek.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;
export const CONTACT_EMAIL = 'info@eurovize.com';
export const ADMIN_EMAILS = ['admin@eurovize.com'];

export const pageUrl = (path = '/') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
};

export const isAdminEmail = (email?: string | null) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
};
