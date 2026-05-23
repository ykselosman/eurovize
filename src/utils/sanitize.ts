export const sanitizeText = (value: string, maxLength = 500) =>
  value.replace(/\s+/g, ' ').trim().slice(0, maxLength);

export const sanitizeTextarea = (value: string, maxLength = 3000) =>
  value
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim()
    .slice(0, maxLength);

export const sanitizeEmail = (value: string) => sanitizeText(value, 120).toLowerCase();

export const sanitizePhone = (value: string) => value.replace(/[^\d+()\-\s]/g, '').trim().slice(0, 30);

export const sanitizePassport = (value: string) => value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 20);
