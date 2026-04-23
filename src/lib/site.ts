function normalizeSiteUrl(raw: string | undefined): string {
  const fallback = "https://symptom.fursbliss.com";
  if (!raw) return fallback;
  const trimmed = raw.trim().replace(/^["']|["']$/g, "");
  try {
    const u = new URL(trimmed);
    return u.origin;
  } catch {
    return fallback;
  }
}

/** Public site URL for canonical, Open Graph, and JSON-LD. */
export const SITE_URL = normalizeSiteUrl(
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_APP_URL : undefined
);

export const SITE_NAME = "Symptom Checker Lab";

export const EDITORIAL_ATTRIBUTION = "Symptom Checker Lab Editorial Team";

/** Last substantive review of the homepage overview (ISO date). Update when content changes. */
export const HOME_PAGE_UPDATED = "2026-04-18";

/** Last review of symptom hub / landing content (ISO date). */
export const SYMPTOM_CONTENT_UPDATED = "2026-04-18";

/** Last substantive review of the dog shaking / not eating guide (ISO date). Update when content changes. */
export const DOG_SHAKING_NOT_EATING_UPDATED = "2026-04-11";

export function absoluteUrl(path: string) {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
