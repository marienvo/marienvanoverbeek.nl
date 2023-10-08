import React from "react";
import cv from "../../content/cv.json";
import { Job } from "./Job.tsx";

export default () => {
  return (
    <div>
      <h1>Marien van Overbeek</h1>
      <ul>
        <li>Replace favicon</li>
        <li>Design site</li>
        <li>Add PDF download button</li>
      </ul>
      <h2>Front-end developer</h2>
      <p>
        Software engineer specializing in TypeScript and React. Excels at
        creating well-thought-out design systems, seamless API integrations, and
        strong user experiences.
      </p>
      <p>
        Prefers to work in a team of senior front-end colleagues, while keeping
        close contact with the API team. Enjoys working on a product that is
        actively used by many people.
      </p>
      <h2>Experience</h2>
      {cv.jobs.map((job) => (
        <Job job={job} />
      ))}
      <h2>EDUCATION</h2>
      <p>HANZE UNIVERSITY OF APPLIED SCIENCES GRONINGEN</p>
      <p>Bachelor of Communication, Web & Mobile Services</p>
      <p> Sep 2008 - May 2013</p>
      <h2>SKILLS</h2>
      <ul>
        <li>Front-end implementation</li>
        <li>Quality assurance</li>
        <li>Leadership</li>
        <li>Communication</li>
      </ul>
    </div>
  );
};
