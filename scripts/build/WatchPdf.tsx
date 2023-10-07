import fs from "fs";
import React from "react";
import ReactPDF from "@react-pdf/renderer";

fs.watch("scripts/build/PdfDocument.tsx", (event, filename) => {
  if (event === "change") {
    console.log("PdfDocument.tsx changed, rebuilding PDF...");
    delete require.cache[require.resolve("./PdfDocument.tsx")];
    const PdfDocument = require("./PdfDocument.tsx").default;
    ReactPDF.render(
      React.createElement(PdfDocument, null),
      `${__dirname}/../../dist/cv-marienvanoverbeek.pdf`,
    );
  }
});
