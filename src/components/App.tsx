import React from "react";
import { Devider } from "./elements/Devider.tsx";
import { Timeline } from "./elements/Timeline.tsx";
import { Heading } from "./elements/Heading.tsx";
import { TechStack } from "./elements/TechStack.tsx";
import classNames from "classnames";

export default () => {
  return (
    <>
      <div className="max-w-7xl p-10 mx-auto">
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
        <Devider />
        <Heading level="h2">Experience</Heading>
        <Timeline />
        <Devider />
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
      </div>
      <a
        href="./cv.pdf"
        download="cv-marienvanoverbeek.pdf"
        className={classNames(
          "fixed top-8 right-10 bg-white p-3 rounded-full hover:mt-1 shadow-lg hover:shadow-md  transition-all duration-100",
        )}
      >
        <img src="./pdf-download.svg" alt="Download as PDF" width="55" />
      </a>
    </>
  );
};
