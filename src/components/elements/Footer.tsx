import React, { type FC } from "react";
import { Section } from "./Section.tsx";

export const Footer: FC = () => {
  return (
    <div className="w-full bg-gray-800 text-gray-50">
      <Section isTransparent>
        <div className="inline-block pr-10">
          <strong>Name:</strong> Marien van Overbeek
          <br />
          <strong>Born:</strong> June 30th, 1985
          <br />
          <strong>Hometown:</strong> Rotterdam
          <br />
          <strong>LinkedIn:</strong>{" "}
          <a href="https://www.linkedin.com/in/marienvanoverbeek">
            marienvanoverbeek
          </a>
        </div>
      </Section>
    </div>
  );
};
