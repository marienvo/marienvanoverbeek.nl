import fs from "fs";
import React from "react";
import ReactPDF from "@react-pdf/renderer";

const buildPdf = (event: string, file: string | null) => {
  if (event !== "change") return;
  console.log(`${file} changed, rebuilding PDF...`);
  const pdfDocumentPath = "../../src/components/pdf/PdfDocument.tsx";
  delete require.cache[require.resolve(pdfDocumentPath)];
  delete require.cache[require.resolve("../../content/cv.json")];
  delete require.cache[
    require.resolve("../../src/components/helpers/getTime.ts")
  ];
  const PdfDocument = require(pdfDocumentPath).default;
  ReactPDF.render(
    React.createElement(PdfDocument, null),
    `${__dirname}/../../public/cv.pdf`,
  );
};

fs.watch("src/components/pdf/PdfDocument.tsx", buildPdf);
fs.watch("src/components/helpers/getTime.ts", buildPdf);
fs.watch("content/cv.json", buildPdf);
