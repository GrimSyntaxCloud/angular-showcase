export const gradePoints: Record<string, number> = {
  A: 4,
  "A-": 3.7,
  "B+": 3.33,
  B: 3,
  "B-": 2.7,
  "C+": 2.3,
  C: 2,
  "C-": 1.7,
  "D+": 1.3,
  D: 1,
  "D-": 0.7,
  F: 0,
};
export interface Entry {
  course: string;
  grade: string;
}
export function validStudent(value: string): boolean {
  return /^(1007|1008|1009|1010|1011|1012)$/.test(value.trim());
}
export function validEntry(course: string, grade: string): Entry | null {
  const name = course.trim();
  return name && name.length <= 80 && Object.hasOwn(gradePoints, grade)
    ? { course: name, grade }
    : null;
}
export function calculateGpa(entries: Entry[]): number {
  if (!entries.length) return 0;
  if (entries.some((e) => !validEntry(e.course, e.grade)))
    throw new Error("Invalid transcript entry");
  return (
    entries.reduce((sum, e) => sum + gradePoints[e.grade], 0) / entries.length
  );
}
