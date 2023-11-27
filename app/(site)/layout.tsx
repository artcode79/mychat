import BarPinggir from "@/components/BarPinggir";
import Provider from "@/components/Provider";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider>
        <BarPinggir>{children}</BarPinggir>
      </Provider>
    </>
  );
};

export default layout;
