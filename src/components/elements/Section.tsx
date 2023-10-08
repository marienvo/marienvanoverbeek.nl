import React, { type FC } from "react";

export const Section: FC<SectionProperties> = ({ children, isTransparent }) => {
  return (
    <div className={isTransparent ? "" : "bg-gray-50"}>
      <div className="max-w-7xl sm:p-28 p-10 mx-auto">{children}</div>
    </div>
  );
};

type SectionProperties = {
  children: React.ReactNode;
  isTransparent?: boolean;
};
