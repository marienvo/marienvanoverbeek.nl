import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import cv from "../../src/content/cv.json";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const text = cv.jobs
  .map((job) => {
    return `${job.company} - ${job.position}`;
  })
  .join("\n");

// Create Document Component
const PdfDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1 aa</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
        <Text>{text}</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(
  <PdfDocument />,
  `${__dirname}/../../dist/cv-marienvanoverbeek.pdf`,
);
