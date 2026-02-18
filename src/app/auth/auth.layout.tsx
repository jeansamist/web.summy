import { LayoutComponent, Outlet } from "rasengan";
import React from "react";

const AuthLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

AuthLayout.path = "/auth";

export default AuthLayout;
