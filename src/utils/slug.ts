export const slugify = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

export const buildServiceSlug = (country: string, title: string, fallback?: string) => {
  const countryPart = slugify(country || 'avrupa');
  const titlePart = slugify(title || fallback || 'vize-danismanligi');
  const slug = titlePart.startsWith(countryPart) ? titlePart : `${countryPart}-${titlePart}`;
  return slug.replace(/-{2,}/g, '-').slice(0, 110);
};
