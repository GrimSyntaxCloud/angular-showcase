import { Component, signal, DestroyRef, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { composers, Composer, searchComposers, findComposer } from "./logic";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./app.html",
})
export class App {
  page = signal("directory");
  selected = signal<Composer | undefined>(undefined);
  search = new FormControl("", { nonNullable: true });
  results = signal(composers);
  private destroy = inject(DestroyRef);
  constructor() {
    this.route();
    const listener = () => this.route();
    window.addEventListener("hashchange", listener);
    this.destroy.onDestroy(() =>
      window.removeEventListener("hashchange", listener),
    );
    this.search.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.results.set(searchComposers(value)));
  }
  route() {
    if (location.hash && !location.hash.startsWith("#/")) return;
    const path = location.hash.replace(/^#\/?/, "");
    if (path.startsWith("composer/")) {
      this.selected.set(findComposer(path.split("/")[1] || ""));
      this.page.set("details");
    } else
      this.page.set(["about", "contact"].includes(path) ? path : "directory");
    window.scrollTo(0, 0);
  }
  clear() {
    this.search.setValue("");
  }
}
