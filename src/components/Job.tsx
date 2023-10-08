import React, { type FC } from "react";
import cv from "../../content/cv.json";

export const Job: FC<JobProperties> = ({ job }) => {
  return (
    <div>
      <h3>
        {job.company} - {job.position}
      </h3>
      <p>date, location</p>
      <p>{job.description}</p>
      <p>{job.skills.join(" · ")}</p>
    </div>
  );
};

type CV = typeof cv;

export type Job = CV["jobs"][number];

type JobProperties = {
  job: Job;
};
