import React, { type FC } from "react";
import cv from "../../../content/cv.json";
import { getTime } from "./../helpers/getTime.ts";
import { Heading } from "./Heading.tsx";

export const Job: FC<JobProperties> = ({ job, isLast }) => {
  const { startDate, endDate, duration } = getTime(job);
  return (
    <li className="mb-10 ml-4 relative">
      <div className="absolute w-[11px] h-[11px] bg-gray-200 rounded-full -left-[22px] border-2 border-gray-50"></div>
      <div className="relative -top-2">
        <Heading level="h3">
          {job.company} - {job.position}
        </Heading>
        <div className="mb-3 mt-1 text-sm font-normal leading-none text-gray-500">
          {startDate} – {endDate}
          {duration}, {job.location}
        </div>
        <p className="mb-2 text-base font-normal text-gray-600">
          {job.description}
        </p>
        <p className="mb-4 text-sm font-normal text-gray-600">
          {job.skills.join(" · ")}
        </p>
      </div>
      {isLast && (
        <div className="absolute top-3 h-full bg-gray-50 w-3 -left-[22px]"></div>
      )}
    </li>
  );
};

type CV = typeof cv;

export type Job = CV["jobs"][number];

type JobProperties = {
  job: Job;
  isLast: boolean;
};
