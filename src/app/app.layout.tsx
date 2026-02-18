import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { LayoutComponent, Link, Outlet } from "rasengan";
import React from "react";

const AppLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme="system" storageKey="summy-ui-theme">
        <div className="h-16 bg-accent">
          <div className="container flex items-center justify-between px-6 h-full mx-auto">
            <Link to="/" className="text-lg font-bold">
              <img src="/summy-logo.svg" alt="Summy Logo" className="h-8" />
            </Link>
            <Button size={"lg"} asChild>
              <Link to="/auth/sign-in">Get started</Link>
            </Button>
          </div>
        </div>
        <Outlet />
      </ThemeProvider>
    </React.Fragment>
  );
};

AppLayout.path = "/";

export default AppLayout;
