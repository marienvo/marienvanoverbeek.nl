import React, { type FC } from "react";
import cv from "../../../content/cv.json";
import { getTime } from "./../helpers/getTime.ts";

export const Job: FC<JobProperties> = ({ job }) => {
  const { startDate, endDate, duration } = getTime(job);
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {startDate} – {endDate}
        {duration}, {job.location}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {job.company} - {job.position}
      </h3>
      <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
        {job.description}
      </p>
      <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
        {job.skills.join(" · ")}
      </p>
    </li>
  );
};

type CV = typeof cv;

export type Job = CV["jobs"][number];

type JobProperties = {
  job: Job;
};
