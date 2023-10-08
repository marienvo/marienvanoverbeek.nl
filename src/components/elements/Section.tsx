import React, { type FC } from "react";

export const Section: FC<SectionProperties> = ({ children }) => {
  return <div className="max-w-7xl p-10 mx-auto overflow-auto">{children}</div>;
};

type SectionProperties = {
  children: React.ReactNode;
};
