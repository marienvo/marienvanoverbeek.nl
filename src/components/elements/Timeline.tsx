import React from "react";
import cv from "../../../content/cv.json";
import { Job } from "./Job.tsx";

export const Timeline = () => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-8">
      {cv.jobs.map((job, index) => (
        <Job job={job} isLast={index === cv.jobs.length - 1} />
      ))}
    </ol>
  );
};
