import React from "react";
import cv from "../../content/cv.json";

export default () => {
  return (
    <div>
      <h1>Todo</h1>
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
      <h2>Jobs</h2>
      <ul>
        {cv.jobs.map((item) => (
          <li key={item.id}>{item.company}</li>
        ))}
      </ul>
    </div>
  );
};
