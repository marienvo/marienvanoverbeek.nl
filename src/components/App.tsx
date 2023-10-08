import React from "react";
import { Devider } from "./elements/Devider.tsx";
import { Timeline } from "./elements/Timeline.tsx";
import { Heading } from "./elements/Heading.tsx";
import { TechStack } from "./elements/TechStack.tsx";
import classNames from "classnames";
import { Section } from "./elements/Section.tsx";
import { Footer } from "./elements/Footer.tsx";

export default () => {
  return (
    <>
      <Section>
        <Heading level="h1">Marien van Overbeek</Heading>
        <Heading level="h2">Front-end developer</Heading>
        <p>
          Software engineer specializing in TypeScript and React. Excels at
          creating well-thought-out design systems, seamless API integrations,
          and strong user experiences.
        </p>
        <p>
          Prefers to work in a team of senior front-end colleagues, while
          keeping close contact with the API team. Enjoys working on a product
          that is actively used by many people.
        </p>
      </Section>
      <Devider />
      <Section>
        <Heading level="h2">Experience</Heading>
        <Timeline />
      </Section>
      <Devider />
      <Section>
        <Heading level="h2">EDUCATION</Heading>
        <Heading level="h3">
          HANZE UNIVERSITY OF APPLIED SCIENCES GRONINGEN
        </Heading>
        <p>Bachelor of Communication, Web & Mobile Services</p>
        <p>Sep 2008 - May 2013</p>
        <Heading level="h2">SKILLS</Heading>
        <ul>
          <li>Front-end implementation</li>
          <li>Quality assurance</li>
          <li>Leadership</li>
          <li>Communication</li>
        </ul>
        <TechStack />
      </Section>
      <Footer>
        <Section>
          <div className="inline-block float-right">
            <strong>Name:</strong> Marien van Overbeek
            <br />
            <strong>Born:</strong> June 30th, 1985
            <br />
            <strong>Hometown:</strong> Rotterdam
            <br />
            <strong>Employer:</strong> PAY.
          </div>
        </Section>
      </Footer>
      <a
        href="./cv.pdf"
        download="cv-marienvanoverbeek.pdf"
        className="fixed top-8 right-10 bg-white p-3 rounded-full hover:mt-1 shadow-lg hover:shadow-md  transition-all duration-100"
      >
        <img src="./pdf-download.svg" alt="Download as PDF" width="55" />
      </a>
    </>
  );
};
