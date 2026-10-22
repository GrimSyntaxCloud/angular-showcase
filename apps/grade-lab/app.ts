import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  gradePoints,
  Entry,
  validStudent,
  validEntry,
  calculateGpa,
} from "./logic";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./app.html",
})
export class App {
  student = signal("");
  studentId = "";
  error = signal("");
  entries = signal<Entry[]>([]);
  course = "";
  grade = "A";
  grades = Object.keys(gradePoints);
  score = signal<number | null>(null);
  message = signal("");
  showScale = signal(false);
  signIn() {
    if (!validStudent(this.studentId)) {
      this.error.set("Choose a demo student ID from 1007 through 1012.");
      return;
    }
    this.student.set(this.studentId.trim());
    this.error.set("");
    this.studentId = "";
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  signOut() {
    this.student.set("");
    this.entries.set([]);
    this.score.set(null);
    this.course = "";
    this.grade = "A";
    this.message.set("");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  add() {
    const entry = validEntry(this.course, this.grade);
    if (!entry) {
      this.message.set(
        "Enter a course name, up to 80 characters, and select a grade.",
      );
      return;
    }
    this.entries.update((list) => [...list, entry]);
    this.course = "";
    this.score.set(null);
    this.message.set(`${entry.course} added. Calculate to update your GPA.`);
  }
  remove(i: number) {
    this.entries.update((v) => v.filter((_, index) => index !== i));
    this.score.set(null);
    this.message.set("Course removed. Calculate to update your GPA.");
  }
  calculate() {
    this.score.set(calculateGpa(this.entries()));
    this.message.set(
      this.entries().length
        ? "GPA calculated. Each course has equal weight."
        : "Add a course to calculate your GPA.",
    );
  }
  clear() {
    this.entries.set([]);
    this.score.set(null);
    this.message.set("Transcript cleared.");
  }
  points(grade: string) {
    return gradePoints[grade].toFixed(2);
  }
}
