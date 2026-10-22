import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateGpa,
  validStudent,
  validEntry,
  gradePoints,
} from "../apps/grade-lab/logic.ts";
import {
  filterBooks,
  validWish,
  parseBooks,
} from "../apps/reading-room/logic.ts";
import {
  composers,
  searchComposers,
  findComposer,
} from "../apps/opus/logic.ts";
test("C counts as 2.0 and mixed original-scale grades average correctly", () => {
  assert.equal(calculateGpa([{ course: "Math", grade: "C" }]), 2);
  assert.equal(
    calculateGpa([
      { course: "A", grade: "A" },
      { course: "B", grade: "C" },
    ]),
    3,
  );
  assert.equal(calculateGpa([{ course: "A", grade: "B+" }]), 3.33);
});
test("empty transcript yields zero, all grades map and invalid records reject", () => {
  assert.equal(calculateGpa([]), 0);
  for (const [grade, value] of Object.entries(gradePoints))
    assert.equal(calculateGpa([{ course: "Test", grade }]), value);
  assert.throws(() => calculateGpa([{ course: "", grade: "A" }]));
  assert.throws(() => calculateGpa([{ course: "x", grade: "A+" }]));
});
test("course validation trims and rejects whitespace, long names and unsupported grades", () => {
  assert.deepEqual(validEntry(" Math ", "B"), { course: "Math", grade: "B" });
  assert.equal(validEntry(" ", "A"), null);
  assert.equal(validEntry("x".repeat(81), "A"), null);
  assert.equal(validEntry("Math", "toString"), null);
});
test("demo IDs accept only entire known IDs, rejecting old parseInt bypass", () => {
  for (let id = 1007; id <= 1012; id++)
    assert.equal(validStudent(String(id)), true);
  for (const id of ["1007abc", "1007.0", "1006", "1013", "", "1e3", "01007"])
    assert.equal(validStudent(id), false);
});
const books = [
  {
    isbn: "0345339681",
    title: "The Hobbit",
    authors: "J.R.R. Tolkien",
    pages: 310,
    description: "",
    year: "1937",
  },
];
test("book search is case insensitive and supports title, author and ISBN", () => {
  for (const q of ["HOBBIT", " tolkien ", "0345339681", ""])
    assert.equal(filterBooks(books, q).length, 1);
  assert.equal(filterBooks(books, "dune").length, 0);
});
test("wishlist requires title and author and preserves text without HTML rendering", () => {
  assert.equal(validWish(" ", "Author"), null);
  assert.equal(validWish("Title", ""), null);
  assert.equal(validWish("x".repeat(161), "Author"), null);
  assert.deepEqual(validWish(" <b>Title</b> ", " Author "), {
    title: "<b>Title</b>",
    authors: "Author",
  });
});
test("API catalog handles missing fields, malformed entries and ISBN normalization", () => {
  const data = {
    "ISBN:0345339681": {
      title: "The Hobbit",
      authors: [{ name: "Tolkien" }],
      number_of_pages: 310,
    },
    bad: { title: "Bad" },
    "ISBN:1234567890": { noTitle: true },
  };
  assert.deepEqual(parseBooks(data), [
    {
      isbn: "0345339681",
      title: "The Hobbit",
      authors: "Tolkien",
      pages: 310,
      description: "No description supplied for this edition.",
      year: "Unknown",
    },
  ]);
  assert.deepEqual(parseBooks(null), []);
});
test("all original composers remain; search filters and clearing restores collection", () => {
  assert.equal(composers.length, 5);
  assert.equal(searchComposers(" bach ")[0].id, 101);
  assert.equal(searchComposers("MOZART")[0].id, 102);
  assert.equal(searchComposers("missing").length, 0);
  assert.equal(searchComposers("").length, 5);
});
test("composer detail resolves fields and unknown or partially numeric IDs fail safely", () => {
  assert.equal(findComposer("103").name, "Antonio Vivaldi");
  assert.equal(findComposer("103abc"), undefined);
  assert.equal(findComposer("999"), undefined);
});
