import React from "react";
import ReactPDF from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument.tsx";

ReactPDF.render(
  <PdfDocument />,
  `${__dirname}/../../dist/cv-marienvanoverbeek.pdf`,
);
