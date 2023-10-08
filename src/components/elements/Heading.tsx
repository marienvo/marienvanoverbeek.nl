import React, { type FC } from "react";
import classNames from "classnames";

export const Heading: FC<HeadingProperties> = ({ level, children }) => {
  const Element = level;
  const dd = <div className="text-7xl"></div>;
  return (
    <Element
      className={classNames("uppercase font-bold", {
        "text-4xl sm:text-5xl md:text-7xl lg:text-9xl sm:text-accent-100 text-accent-200 sm:-ml-5 sm:mb-20 mb-8":
          level === "h1",
        "text-accent-200 mb-3": level === "h2",
        "text-lg uppercase font-semibold text-gray-900 dark:text-white":
          level === "h3",
      })}
    >
      {children}
    </Element>
  );
};

type Level = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProperties = {
  level: Level;
  children: React.ReactNode;
};
