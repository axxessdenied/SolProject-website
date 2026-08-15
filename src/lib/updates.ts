import type { CollectionEntry } from 'astro:content';

export type UpdateEntry = CollectionEntry<'updates'>;

export function compareUpdates(a: UpdateEntry, b: UpdateEntry): number {
  const dateOrder = b.data.publishedAt.localeCompare(a.data.publishedAt);
  return dateOrder || a.data.slug.localeCompare(b.data.slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
