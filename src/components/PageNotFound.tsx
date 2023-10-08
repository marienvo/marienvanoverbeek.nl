import React from "react";
import { Devider } from "./elements/Devider.tsx";
import { Timeline } from "./elements/Timeline.tsx";
import { Heading } from "./elements/Heading.tsx";
import { TechStack } from "./elements/TechStack.tsx";
import classNames from "classnames";
import { Section } from "./elements/Section.tsx";
import { Footer } from "./elements/Footer.tsx";
import { Columns } from "./elements/Columns.tsx";

export default () => {
  return (
    <>
      <Section>
        <Heading level="h1">
          404
          <br />
          Page not found
        </Heading>
        <p>Maybe it's off networking somewhere.</p>
      </Section>
      <Devider />
      <Footer />
    </>
  );
};
