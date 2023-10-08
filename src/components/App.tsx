import React from "react";
import cv from "../../content/cv.json";
import { Job } from "./Job.tsx";

export default () => {
  return (
    <div>
      <h1>Marien van Overbeek</h1>
      <ul>
        <li>
          Files & setup
          <ul>
            <li>Replace favicon</li>
          </ul>
        </li>
        <li>
          Design Site
          <ul>
            <li>Add components from current CV site</li>
          </ul>
        </li>
        <li>
          Design PDF
          <ul>
            <li>🚧 Design generated PDF 🚧</li>
          </ul>
        </li>
        <li>
          Content
          <ul>
            <li>Add content from CV site, and render in both site and PDF</li>
          </ul>
        </li>
      </ul>
      <h2>Experience</h2>
      {cv.jobs.map((job) => (
        <Job job={job} />
      ))}
    </div>
  );
};
