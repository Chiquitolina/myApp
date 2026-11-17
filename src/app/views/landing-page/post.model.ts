export type LocalizedCopy = { es: string; en: string };

export interface LinkedInPostCard {
  id: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
  category: LocalizedCopy;
  publishedAt?: string; // ISO YYYY-MM-DD; ordenar por fecha descendente
  imageUrl?: string;      // URL pública o /assets/... si subís una imagen
  linkedInUrl?: string;   // URL específica de la publicación en LinkedIn
  featured?: boolean;
  example?: boolean;      // Tarjetas de ejemplo: no representan publicaciones reales
  icon?: 'code' | 'book';
}
