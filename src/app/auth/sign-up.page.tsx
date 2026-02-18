import { PageComponent } from "rasengan";
const SignUpPage: PageComponent = () => {
  return <main className="min-h-screen bg-accent"></main>;
};

SignUpPage.path = "/sign-up";
SignUpPage.metadata = {
  title: "Summy - Sign Up - Create a Summy account",
  description: "Join Summy and start summarizing your life with AI.",
};

export default SignUpPage;
