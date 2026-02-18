import { PageComponent } from "rasengan";
const ResetPasswordPage: PageComponent = () => {
  return <main></main>;
};

ResetPasswordPage.path = "/reset-password";
ResetPasswordPage.metadata = {
  title: "Summy - Reset Password - Reset your password",
  description:
    "Reset your password by entering your new password and confirming it.",
};

export default ResetPasswordPage;
