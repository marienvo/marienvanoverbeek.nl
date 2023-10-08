import React, { type FC } from "react";

export const Footer: FC<FooterProperties> = ({ children }) => {
  return <div className="w-full bg-gray-800 text-gray-50">{children}</div>;
};

type FooterProperties = {
  children: React.ReactNode;
};
