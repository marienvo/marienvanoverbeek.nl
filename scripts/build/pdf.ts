import { jsPDF } from "jspdf";
import cv from "../../src/content/cv.json";

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

const text = cv.jobs
  .map((job) => {
    return `${job.company} - ${job.position}`;
  })
  .join("\n");

doc.text("Hello world!" + text, 10, 10);
doc.save("./dist/cv-marienvanoverbeek.pdf");
