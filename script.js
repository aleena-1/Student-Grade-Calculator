const subjectsList = document.querySelector("#subjectsList");
const addSubjectButton = document.querySelector("#addSubject");
const resetButton = document.querySelector("#resetForm");
const form = document.querySelector("#gradeForm");

const totalMarks = document.querySelector("#totalMarks");
const averageMarks = document.querySelector("#averageMarks");
const gradeBadge = document.querySelector("#gradeBadge");
const statusText = document.querySelector("#statusText");
const feedbackText = document.querySelector("#feedbackText");

const defaultSubjects = ["English", "Mathematics", "Science"];

function createSubjectRow(name = "", mark = "") {
  const row = document.createElement("div");
  row.className = "subject-row";

  const subjectLabel = document.createElement("label");
  subjectLabel.textContent = "Subject";

  const subjectInput = document.createElement("input");
  subjectInput.className = "subject-name";
  subjectInput.type = "text";
  subjectInput.value = name;
  subjectInput.placeholder = "Subject name";
  subjectInput.required = true;
  subjectLabel.appendChild(subjectInput);

  const markLabel = document.createElement("label");
  markLabel.textContent = "Marks";

  const markInput = document.createElement("input");
  markInput.className = "subject-mark";
  markInput.type = "number";
  markInput.value = mark;
  markInput.min = "0";
  markInput.max = "100";
  markInput.placeholder = "0-100";
  markInput.required = true;
  markLabel.appendChild(markInput);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-subject";
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", "Remove subject");
  removeButton.title = "Remove subject";
  removeButton.textContent = "x";

  removeButton.addEventListener("click", () => {
    if (subjectsList.children.length > 1) {
      row.remove();
    }
  });

  row.append(subjectLabel, markLabel, removeButton);
  subjectsList.appendChild(row);
}

function getGrade(average) {
  if (average >= 90) return "A";
  if (average >= 80) return "B";
  if (average >= 70) return "C";
  if (average >= 60) return "D";
  if (average >= 40) return "E";
  return "F";
}

function getFeedback(grade, average) {
  const messages = {
    A: "Excellent performance. The student is comfortably above distinction level.",
    B: "Very good work. The student has a strong overall result.",
    C: "Good result. A little more consistency can lift the average further.",
    D: "Satisfactory result. More focused revision would help.",
    E: "Passed, but the score is close to the minimum threshold.",
    F: "Needs improvement. Review the low-scoring subjects and recalculate after updates."
  };

  return `${messages[grade]} Average score: ${average.toFixed(2)}%.`;
}

function calculateGrade(event) {
  event.preventDefault();

  const marks = [...document.querySelectorAll(".subject-mark")].map((input) => Number(input.value));
  const invalidMark = marks.some((mark) => Number.isNaN(mark) || mark < 0 || mark > 100);

  if (invalidMark) {
    feedbackText.textContent = "Please enter valid marks between 0 and 100 for every subject.";
    feedbackText.classList.add("error");
    return;
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const average = total / marks.length;
  const grade = getGrade(average);

  totalMarks.textContent = total.toString();
  averageMarks.textContent = `${average.toFixed(2)}%`;
  gradeBadge.textContent = grade;
  statusText.textContent = grade === "F" ? "Needs improvement" : "Passed";
  feedbackText.textContent = getFeedback(grade, average);
  feedbackText.classList.remove("error");
}

function resetCalculator() {
  subjectsList.innerHTML = "";
  defaultSubjects.forEach((subject) => createSubjectRow(subject));
  totalMarks.textContent = "0";
  averageMarks.textContent = "0%";
  gradeBadge.textContent = "--";
  statusText.textContent = "Enter marks";
  feedbackText.textContent = "Add marks from 0 to 100, then calculate the average and grade.";
  feedbackText.classList.remove("error");
}

addSubjectButton.addEventListener("click", () => createSubjectRow());
resetButton.addEventListener("click", resetCalculator);
form.addEventListener("submit", calculateGrade);

resetCalculator();
