import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import cv from "../../src/content/cv.json";

// Font.register({
//   family: "Montserrat Light",
//   src: "/home/marienvanoverbeek/WebstormProjects/marienvanoverbeek.nl/scripts/build/normal.woff2",
// });

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

const text = cv.jobs
  .map((job) => {
    return `${job.company} - ${job.position}`;
  })
  .join("\n");

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    color: "#555",
    fontSize: 10,
    lineHeight: 1.3,
    fontFamily: "Helvetica",
    paddingBottom: 50,
    paddingTop: 40,
  },
  columns: {
    flexDirection: "row",
    paddingLeft: 60,
    paddingRight: 60,
  },
  heading: {
    textTransform: "uppercase",
    color: "#bf0041",
    fontFamily: "Helvetica-Bold",
    fontSize: 60,
    paddingTop: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 10,
    lineHeight: 1,
  },
  caption: {
    marginBottom: 5,
    textTransform: "uppercase",
    color: "#bf0041",
    fontFamily: "Helvetica-Bold",
  },
  title: {
    marginBottom: 5,
    color: "#282828",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 20,
  },
  columnLeft: {
    width: 340,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    flexGrow: 1,
  },
  columnRight: {
    width: 200,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    flexGrow: 1,
  },
  section: {
    width: 450,
    marginLeft: 70,
    marginRight: 70,
    padding: 10,
    flexGrow: 0,
  },
});

export default () => (
  <Document>
    <Page size="A4" style={styles.root}>
      <View style={styles.heading}>
        <Text>Marien van Overbeek</Text>
      </View>
      <View style={styles.columns}>
        <View style={styles.columnLeft}>
          <Text style={styles.caption}>Front-end developer</Text>
          <Text>
            Software engineer specializing in TypeScript and React. Excels at
            creating well-thought-out design systems, seamless API integrations,
            and strong user experiences.
          </Text>
        </View>
        <View style={styles.columnRight}>
          <Text style={styles.caption}>Contact</Text>
          <Text>(+31) 6 509 64 655</Text>
          <Text>cv@marienvanoverbeek.nl</Text>
          <Text>www.marienvanoverbeek.nl</Text>
          <Text>Rotterdam, NL</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.caption}>Experience</Text>
        {cv.jobs.map((job) => {
          const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
          const options = { year: "numeric", month: "short" } as const;
          const startDate = new Date(job.startDate).toLocaleDateString(
            undefined,
            options,
          );
          const getTime = (years: number | null, months: number) => {
            if (years && months) {
              return `(${years} yrs ${months} mos)`;
            }
            if (months) {
              return `(${months} mos)`;
            }
            if (years) {
              return `(${years} yrs)`;
            }
          };
          const endDate = job.endDate
            ? new Date(job.endDate).toLocaleDateString(undefined, options)
            : "Current";
          const duration = job.endDate
            ? new Date(job.endDate).getTime() -
              new Date(job.startDate).getTime()
            : null;
          const differenceInMonths =
            duration && Math.ceil(duration / oneMonthInMilliseconds + 0.5);
          const years =
            differenceInMonths && Math.floor(differenceInMonths / 12);
          const time =
            differenceInMonths && getTime(years, differenceInMonths % 12);

          return (
            <View style={styles.paragraph} key={job.id}>
              <Text style={styles.title}>
                {job.company} - {job.position}
              </Text>
              <Text style={styles.subtitle}>
                {startDate} – {endDate} {time}
              </Text>
              <Text>{job.description}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.columns}>
        <View style={styles.columnLeft}>
          <Text style={styles.caption}>EDUCATION</Text>
          <Text style={styles.title}>
            HANZE UNIVERSITY OF APPLIED SCIENCES GRONINGEN
          </Text>
          <Text>Bachelor of Communication, Web & Mobile Services</Text>
          <Text style={styles.subtitle}>Sep 2008 - May 2013</Text>
        </View>
        <View style={styles.columnRight}>
          <Text style={styles.caption}>SKILLS</Text>
          <Text>• Front-end implementation</Text>
          <Text>• Leadership</Text>
          <Text>• Communication</Text>
        </View>
      </View>
    </Page>
  </Document>
);
