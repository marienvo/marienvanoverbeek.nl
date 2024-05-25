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
          Marien van
          <br />
          Overbeek
        </Heading>
        <Heading level="h2">Front-end developer Rotterdam</Heading>
        <div className="max-w-[400px]">
          <p>
            I am a software engineer specializing in TypeScript and React. I
            have a strong background in creating well-thought-out design
            systems, seamless API integrations, and strong user experiences.
          </p>
          <p>
            I prefer working in a team of front-end colleagues who are
            passionate about learning and creating beautiful, functional
            products, while maintaining close contact with both the API team and
            designers.
          </p>
        </div>
      </Section>
      <Devider />
      <Section>
        <Heading level="h2">Experience</Heading>
        <Timeline />
      </Section>
      <Devider />
      <Section>
        <Columns>
          <div>
            <Heading level="h2">EDUCATION</Heading>
            <Heading level="h3">
              HANZE UNIVERSITY OF APPLIED SCIENCES GRONINGEN
            </Heading>
            <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
              Bachelor of Communication, Web & Mobile Services
            </p>
            <p className="mb-1 text-sm font-normal leading-none text-gray-500">
              Sep 2008 – May 2013
            </p>
          </div>
          <div>
            <Heading level="h2">SKILLS</Heading>
            <ul>
              <li>Front-end implementation</li>
              <li>Design systems</li>
              <li>Leadership</li>
              <li>Communication</li>
            </ul>
          </div>
        </Columns>
        {/*<TechStack />*/}
      </Section>
      <Footer />
      <a
        href="./cv.pdf"
        download="cv-marienvanoverbeek.pdf"
        className="fixed top-8 right-10 bg-white p-3 rounded-full hover:mt-1 shadow-lg hover:shadow-md  transition-all duration-100 hidden sm:block"
      >
        <img src="./pdf-download.svg" alt="Download as PDF" width="55" />
      </a>
    </>
  );
};
