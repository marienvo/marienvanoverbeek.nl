import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import cv from "../../content/cv.json";
import { styles } from "./PdfDocument.styles.tsx";

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
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
          <Text style={styles.description}>
            Software engineer specializing in TypeScript and React. Excels at
            creating well-thought-out design systems, seamless API integrations,
            and strong user experiences.
          </Text>
          <Text style={styles.paragraph}>
            Prefers to work in a team of senior front-end colleagues, while
            keeping close contact with the API team. Enjoys working on a product
            that is actively used by many people.
          </Text>
        </View>
        <View style={styles.columnRight}>
          <Text style={styles.caption}>Contact</Text>
          <Text>+31 (0)6 509 64 655</Text>
          <Text> </Text>
          <Text>cv@marienvanoverbeek.nl</Text>
          <Text>www.marienvanoverbeek.nl</Text>
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
              return ` (${years} yrs ${months} mos)`;
            }
            if (months) {
              return ` (${months} mos)`;
            }
            if (years) {
              return ` (${years} yrs)`;
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
                {startDate} – {endDate}
                {time}, {job.location}
              </Text>
              <Text style={styles.description}>{job.description}</Text>
              <Text>{job.skills.join(" · ")}</Text>
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
          <Text>• Quality assurance</Text>
          <Text>• Leadership</Text>
          <Text>• Communication</Text>
        </View>
      </View>
    </Page>
  </Document>
);
