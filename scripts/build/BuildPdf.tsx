import React from "react";
import ReactPDF from "@react-pdf/renderer";
import PdfDocument from "../../src/components/pdf/PdfDocument.tsx";

ReactPDF.render(
  <PdfDocument />,
  `${__dirname}/../../dist/cv-marienvanoverbeek.pdf`,
);
