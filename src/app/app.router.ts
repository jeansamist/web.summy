import AppLayout from "@/app/app.layout";
import Home from "@/app/home.page";
import { RouterComponent, defineRouter } from "rasengan";
import authRouter from "./auth/auth.router";

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [authRouter],
  layout: AppLayout,
  pages: [Home],
})(AppRouter);
