export interface Composer {
  id: number;
  name: string;
  genre: string;
  initials: string;
  label: string;
}
export const composers: Composer[] = [
  {
    id: 100,
    name: "Ludwig Van Beethoven",
    genre: "Classical",
    initials: "LB",
    label: "BEETHOVEN",
  },
  {
    id: 101,
    name: "Johann Sebastian Bach",
    genre: "Classical",
    initials: "JB",
    label: "BACH",
  },
  {
    id: 102,
    name: "Wolfgang Amadeus Mozart",
    genre: "Classical",
    initials: "WM",
    label: "MOZART",
  },
  {
    id: 103,
    name: "Antonio Vivaldi",
    genre: "Classical",
    initials: "AV",
    label: "VIVALDI",
  },
  {
    id: 104,
    name: "Johannes Brahms",
    genre: "Classical",
    initials: "JB",
    label: "BRAHMS",
  },
];
export function searchComposers(query: string): Composer[] {
  const q = query.trim().toLocaleLowerCase();
  return composers.filter((c) => c.name.toLocaleLowerCase().includes(q));
}
export function findComposer(raw: string): Composer | undefined {
  return /^\d+$/.test(raw)
    ? composers.find((c) => c.id === Number(raw))
    : undefined;
}
