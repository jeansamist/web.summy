import { ThemeProvider } from "@/components/theme-provider";
import { LayoutComponent, Outlet } from "rasengan";
import React from "react";

const AppLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Outlet />
      </ThemeProvider>
    </React.Fragment>
  );
};

AppLayout.path = "/";

export default AppLayout;
