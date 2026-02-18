import { RouterComponent, defineRouter } from "rasengan";
import AuthLayout from "./auth.layout";
import ForgotPasswordPage from "./forgot-password.page";
import OtpPage from "./otp.page";
import ResetPasswordPage from "./reset-password.page";
import SignInPage from "./sign-in.page";
import SignUpPage from "./sign-up.page";

class AuthRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: AuthLayout,
  pages: [
    SignInPage,
    SignUpPage,
    OtpPage,
    ForgotPasswordPage,
    ResetPasswordPage,
  ],
})(AuthRouter);
