import BarPinggir from "@/components/BarPinggir";
import Provider from "@/components/Provider";
import React from "react";
import { checkRole } from "@/lib/actions/role";

const layout = ({ children }: { children: React.ReactNode }) => {
  checkRole();
  return (
    <>
      <Provider>
        <BarPinggir>{children}</BarPinggir>
      </Provider>
    </>
  );
};

export default layout;
