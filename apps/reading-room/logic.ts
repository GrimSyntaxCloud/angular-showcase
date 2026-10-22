export interface Book {
  isbn: string;
  title: string;
  authors: string;
  pages: number;
  description: string;
  year: string;
}
export interface Wish {
  title: string;
  authors: string;
}
export function filterBooks(books: Book[], query: string): Book[] {
  const q = query.trim().toLocaleLowerCase();
  return books.filter((b) =>
    `${b.title} ${b.authors} ${b.isbn}`.toLocaleLowerCase().includes(q),
  );
}
export function validWish(title: string, authors: string): Wish | null {
  title = title.trim();
  authors = authors.trim();
  return title && authors && title.length <= 160 && authors.length <= 160
    ? { title, authors }
    : null;
}
export function parseBooks(data: unknown): Book[] {
  if (!data || typeof data !== "object") return [];
  return Object.entries(data).flatMap(([key, value]) => {
    const v = value as Record<string, any>;
    if (!v || typeof v["title"] !== "string" || !/^ISBN:\d{10,13}$/.test(key))
      return [];
    return [
      {
        isbn: key.slice(5),
        title: v["title"],
        authors: Array.isArray(v["authors"])
          ? v["authors"]
              .map((a: any) => (typeof a?.name === "string" ? a.name : ""))
              .filter(Boolean)
              .join(", ")
          : "Author unavailable",
        pages:
          typeof v["number_of_pages"] === "number" ? v["number_of_pages"] : 0,
        description:
          typeof v["subtitle"] === "string"
            ? v["subtitle"]
            : "No description supplied for this edition.",
        year:
          typeof v["publish_date"] === "string" ? v["publish_date"] : "Unknown",
      },
    ];
  });
}
