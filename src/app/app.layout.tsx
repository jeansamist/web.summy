import { LayoutComponent, Outlet } from "rasengan";
import React from "react";

const AppLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

AppLayout.path = "/";

export default AppLayout;
