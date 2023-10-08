import { StyleSheet } from "@react-pdf/renderer";

const paddingBottom = 80;
const paddingBottomHeader = 50;

export const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    color: "#555",
    fontSize: 10,
    lineHeight: 1.3,
    fontFamily: "Helvetica",
    paddingBottom,
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
    paddingBottom: paddingBottomHeader,
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
  description: {
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 25,
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
