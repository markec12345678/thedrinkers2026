// Utility functions

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('sl-SI', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${day}. ${month} ${year}`;
}

export function formatPrice(price: number): string {
  return `${price.toFixed(2)}€`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getYoutubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

export function getSpotifyEmbedUrl(spotifyId: string, type: 'track' | 'album' = 'track'): string {
  return `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function isSoldOut(tourDate: { soldOut?: boolean }): boolean {
  return tourDate.soldOut ?? false;
}

export function hasTicketUrl(tourDate: { ticketUrl?: string }): boolean {
  return !!tourDate.ticketUrl;
}
