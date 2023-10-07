import fs from "fs";
import React from "react";
import ReactPDF from "@react-pdf/renderer";

const buildPdf = (event: string, file: string | null) => {
  if (event !== "change") return;
  console.log(`${file} changed, rebuilding PDF...`);
  delete require.cache[require.resolve("./PdfDocument.tsx")];
  delete require.cache[require.resolve("../../src/content/cv.json")];
  const PdfDocument = require("./PdfDocument.tsx").default;
  ReactPDF.render(
    React.createElement(PdfDocument, null),
    `${__dirname}/../../dist/cv-marienvanoverbeek.pdf`,
  );
};

fs.watch("scripts/build/PdfDocument.tsx", buildPdf);
fs.watch("src/content/cv.json", buildPdf);
