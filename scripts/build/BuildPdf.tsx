import React from "react";
import ReactPDF from "@react-pdf/renderer";
import PdfDocument from "../../src/components/pdf/PdfDocument";

ReactPDF.render(<PdfDocument />, `${__dirname}/../../public/cv.pdf`);
