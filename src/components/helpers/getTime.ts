import type { Job } from "../Job.tsx";

const getDuration = (years: number | null, months: number) => {
  if (years && months) {
    return ` (${years} yrs ${months} mos)`;
  }
  if (months) {
    return ` (${months} mos)`;
  }
  if (years) {
    return ` (${years} yrs)`;
  }
};

export const getTime = (job: Job) => {
  const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  const options = { year: "numeric", month: "short" } as const;
  const startDate = new Date(job.startDate).toLocaleDateString(
    undefined,
    options,
  );
  const endDate = job.endDate
    ? new Date(job.endDate).toLocaleDateString(undefined, options)
    : "Current";
  const durationTime = job.endDate
    ? new Date(job.endDate).getTime() - new Date(job.startDate).getTime()
    : null;
  const differenceInMonths =
    durationTime && Math.ceil(durationTime / oneMonthInMilliseconds + 0.5);
  const years = differenceInMonths && Math.floor(differenceInMonths / 12);
  const duration =
    differenceInMonths && getDuration(years, differenceInMonths % 12);
  return { startDate, endDate, duration };
};
