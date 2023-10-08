import React, { type FC } from "react";

export const Section: FC<SectionProperties> = ({ children }) => {
  return <div className="max-w-7xl sm:p-28 p-10 mx-auto">{children}</div>;
};

type SectionProperties = {
  children: React.ReactNode;
};
