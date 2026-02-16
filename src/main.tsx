import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/index.css";
import { type AppProps } from "rasengan";
export default function App({ Component, children }: AppProps) {
  return (
    <Component>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </Component>
  );
}
