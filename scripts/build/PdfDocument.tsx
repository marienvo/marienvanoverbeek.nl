import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import cv from "../../src/content/cv.json";

const text = cv.jobs
  .map((job) => {
    return `${job.company} - ${job.position}`;
  })
  .join("\n");

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    maxWidth: 270,
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #22</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
        <Text>{text}</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec
          lobortis justo, ut volutpat odio. In hac habitasse platea dictumst.
          Pellentesque rhoncus sagittis posuere. Vestibulum vitae ornare libero.
          Vestibulum diam elit, dignissim vel ornare a, efficitur in quam. In
          hac habitasse platea dictumst. Praesent iaculis mi turpis, sed
          eleifend diam condimentum vitae. Suspendisse accumsan nisl tempus,
          auctor nulla cursus, hendrerit odio. Nulla tristique cursus lobortis.
          Nunc et blandit erat. Fusce quam neque, aliquam in lorem ultricies,
          auctor porta elit. Quisque at massa in ante laoreet tempor ac vitae
          nisi. Suspendisse interdum leo in blandit vulputate. Praesent quis
          diam dapibus, rhoncus mi quis, tincidunt dolor. Ut sit amet nibh quis
          leo fringilla rhoncus. In laoreet euismod nisi eu finibus. Etiam
          malesuada cursus sollicitudin. Vivamus neque nunc, gravida sed mauris
          nec, elementum venenatis est. Nam metus erat, commodo at tellus in,
          egestas egestas mauris. Vestibulum mollis diam dignissim, aliquet enim
          ac, ullamcorper turpis. Cras et orci a metus vulputate finibus nec vel
          nunc. Nam sodales a enim nec tempor. Curabitur vel diam a tortor
          dictum lacinia. Etiam suscipit ut dolor ac congue. Vivamus ultrices,
          ligula et porta aliquam, neque sapien gravida nunc, in mollis mi elit
          ut metus. Duis dui ex, placerat nec sagittis sed, vestibulum id lacus.
          Donec id risus odio. Nullam ornare tellus vitae bibendum sollicitudin.
          Proin quis augue egestas, luctus ipsum sit amet, pulvinar massa.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Aliquam aliquet odio ut felis feugiat mattis
          quis at nisi. Mauris convallis lectus ac dolor lacinia pretium. Etiam
          molestie, tellus nec auctor pretium, lorem magna pretium metus, ac
          vehicula purus augue vel risus. Integer ut rutrum tellus, vel
          ullamcorper erat. Donec fermentum neque vel pellentesque dapibus.
          Nulla ultrices, sapien id lobortis auctor, dolor justo sollicitudin
          urna, quis tincidunt augue massa quis elit. Nam sit amet diam ac mi
          sollicitudin molestie. Mauris egestas turpis ut lacinia hendrerit.
          Etiam vulputate, leo sit amet vulputate consectetur, libero ante
          condimentum quam, nec aliquet diam ex ut urna. Vestibulum id metus
          eget metus rhoncus porta et in sapien. Proin ut laoreet dolor.
          Phasellus ut dui in massa posuere tempus. Ut blandit magna et auctor
          sollicitudin. Maecenas tempor ligula a ipsum dictum, ut eleifend diam
          fringilla. Fusce laoreet purus ac egestas vulputate. Maecenas nec
          lorem sit amet sapien vulputate mollis. Maecenas aliquet imperdiet
          est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
          volutpat nisl. Cras erat purus, tempor id magna in, pharetra
          pellentesque risus. Integer ultricies blandit scelerisque. Etiam eget
          neque vitae dui condimentum commodo imperdiet consectetur sapien.
        </Text>
      </View>
    </Page>
  </Document>
);
