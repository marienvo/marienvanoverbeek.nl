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
    lineHeight: 1,
  },
  caption: {
    textTransform: "uppercase",
    color: "#bf0041",
    fontFamily: "Helvetica-Bold",
  },
  title: {
    color: "#282828",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  column: {
    width: 270,
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section: {
    width: 450,
    margin: 70,
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
        <View style={styles.column}>
          <Text style={styles.caption}>Front-end developer</Text>
          <Text>
            JavaScript developer specializing in React. I excel at creating
            well-thought-out design systems, seamless API integrations, and
            strong user experiences.{" "}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.caption}>Contact</Text>
          <Text style={styles.title}>title</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec
            lobortis justo, ut volutpat odio. In hac habitasse platea dictumst.
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec
            lobortis justo, ut volutpat odio. In hac habitasse platea dictumst.
            Pellentesque rhoncus sagittis posuere. Vestibulum vitae ornare
            libero. Vestibulum diam elit, dignissim vel ornare a, efficitur in
            quam. In hac habitasse platea dictumst. Praesent iaculis mi turpis,
            sed
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        {cv.jobs.map((job) => {
          return <Text>{job.company}</Text>;
        })}
      </View>
    </Page>
  </Document>
);
