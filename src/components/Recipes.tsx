import { Section } from "./elements/Section.tsx";
import { Heading } from "./elements/Heading.tsx";
import React from "react";
import { Devider } from "./elements/Devider.tsx";

export default () => {
  return (
    <>
      <Section>
        <Heading level="h1">Recipes</Heading>
        <Heading level="h2">subtiltle</Heading>
        <div className="max-w-[400px]">
          <p>123</p>
        </div>
      </Section>
      <Devider />
      <Section>
        <Heading level="h2">blabal</Heading>
        sdf
      </Section>
    </>
  );
};
