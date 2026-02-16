import "@/styles/index.css";
import { type AppProps } from "rasengan";
import { ThemeProvider } from "./components/theme-provider";
export default function App({ Component, children }: AppProps) {
  return (
    <Component>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </Component>
  );
}
