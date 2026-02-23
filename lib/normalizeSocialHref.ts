const normalizeEmailHref = (value: string): string => {
  const trimmed = (value || '').toString().trim();
  if (!trimmed) return '';
  if (/^mailto:/i.test(trimmed)) return trimmed;
  return `mailto:${trimmed}`;
};

const normalizeExternalHref = (value: string): string => {
  const trimmed = (value || '').toString().trim();
  if (!trimmed) return '';
  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
};

export const normalizeSocialHref = (type: string, value: string): string => {
  const raw = (value || '').toString().trim();
  if (!raw) return '';
  if (type === 'email') return normalizeEmailHref(raw);
  if (/^https?:\/\//i.test(raw)) return raw;
  if (type === 'linkedin') {
    if (/linkedin\.com\//i.test(raw)) return `https://${raw.replace(/^https?:\/\//i, '')}`;
    return `https://www.linkedin.com/in/${raw.replace(/^@/, '')}`;
  }
  if (type === 'github') {
    if (/github\.com\//i.test(raw)) return `https://${raw.replace(/^https?:\/\//i, '')}`;
    return `https://github.com/${raw.replace(/^@/, '')}`;
  }
  return normalizeExternalHref(raw);
};
