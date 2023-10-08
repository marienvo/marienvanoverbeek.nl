import React, { type FC } from "react";

export const Columns: FC<ColumnsProperties> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
      {children}
    </div>
  );
};

export type ColumnsProperties = {
  children: React.ReactNode;
};
