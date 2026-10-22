import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { catalog } from "./catalog";
import { Book, Wish, filterBooks, validWish, parseBooks } from "./logic";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./app.html",
})
export class App {
  page = signal("browse");
  books = signal<Book[]>(catalog);
  query = "";
  wishlist = signal<Wish[]>([]);
  title = "";
  author = "";
  notice = signal("");
  status = signal("Saved catalog · Open Library");
  loading = signal(false);
  selected = signal<Book | null>(null);
  private opener: HTMLElement | null = null;
  get visible() {
    return filterBooks(this.books(), this.query);
  }
  constructor() {
    this.readHash();
    window.addEventListener("hashchange", () => this.readHash());
    try {
      const saved = JSON.parse(
        localStorage.getItem("reading-room-wishlist") || "[]",
      );
      if (Array.isArray(saved))
        this.wishlist.set(
          saved
            .filter(
              (v) =>
                v &&
                typeof v.title === "string" &&
                typeof v.authors === "string" &&
                validWish(v.title, v.authors),
            )
            .slice(0, 200),
        );
    } catch {}
  }
  readHash() {
    if (location.hash && !location.hash.startsWith("#/")) return;
    const p = location.hash.slice(2);
    this.page.set(["wishlist", "about", "contact"].includes(p) ? p : "browse");
    window.scrollTo(0, 0);
  }
  save() {
    try {
      localStorage.setItem(
        "reading-room-wishlist",
        JSON.stringify(this.wishlist()),
      );
    } catch {
      this.notice.set(
        "Your list is available this visit, but this browser could not save it.",
      );
    }
  }
  add(title = this.title, authors = this.author) {
    const item = validWish(title, authors);
    if (!item) {
      this.notice.set("Enter a title and author, each under 160 characters.");
      return;
    }
    if (this.wishlist().length >= 200) {
      this.notice.set(
        "Your wishlist holds up to 200 books. Remove a book before adding another.",
      );
      return;
    }
    if (
      this.wishlist().some(
        (w) =>
          w.title.toLowerCase() === item.title.toLowerCase() &&
          w.authors.toLowerCase() === item.authors.toLowerCase(),
      )
    ) {
      this.notice.set("That book is already on your wishlist.");
      return;
    }
    this.wishlist.update((v) => [...v, item]);
    this.title = "";
    this.author = "";
    this.notice.set(`${item.title} added to your wishlist.`);
    this.save();
  }
  remove(index: number) {
    this.wishlist.update((v) => v.filter((_, i) => i !== index));
    this.save();
  }
  show(book: Book) {
    this.opener = document.activeElement as HTMLElement;
    this.selected.set(book);
    const dialog = document.querySelector("dialog");
    dialog?.showModal();
  }
  close() {
    (document.querySelector("dialog") as HTMLDialogElement)?.close();
    this.selected.set(null);
    this.opener?.focus();
  }
  async refresh() {
    this.loading.set(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const keys = catalog.map((b) => `ISBN:${b.isbn}`).join(",");
      const res = await fetch(
        `https://openlibrary.org/api/books?bibkeys=${keys}&format=json&jscmd=data`,
        { signal: controller.signal },
      );
      if (!res.ok) throw Error();
      const fresh = parseBooks(await res.json());
      if (!fresh.length) throw Error();
      this.books.set(fresh);
      this.status.set("Updated just now · Open Library");
    } catch {
      this.status.set("Open Library unavailable. Showing the saved catalog.");
    } finally {
      clearTimeout(timeout);
      this.loading.set(false);
    }
  }
}
