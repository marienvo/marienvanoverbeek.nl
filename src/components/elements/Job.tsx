import React, { type FC } from "react";
import cv from "../../../content/cv.json";
import { getTime } from "./../helpers/getTime.ts";

export const Job: FC<JobProperties> = ({ job }) => {
  const { startDate, endDate, duration } = getTime(job);
  return (
    <div>
      <h3>
        {job.company} - {job.position}
      </h3>
      <p>
        {startDate} – {endDate}
        {duration}, {job.location}
      </p>
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
