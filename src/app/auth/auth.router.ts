import { RouterComponent, defineRouter } from "rasengan";
import AuthLayout from "./auth.layout";
import SignInPage from "./sign-in.page";

class AuthRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: AuthLayout,
  pages: [SignInPage],
})(AuthRouter);
