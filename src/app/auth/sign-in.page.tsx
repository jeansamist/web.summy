import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageComponent } from "rasengan";
const SignInPage: PageComponent = () => {
  return (
    <main className="min-h-screen bg-accent flex items-center justify-center py-10 px-6">
      <Card className="max-w-lg mx-auto w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Welcome back to Summy 👋
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" className="space-y-6"></form>
        </CardContent>
      </Card>
    </main>
  );
};

SignInPage.path = "/sign-in";
SignInPage.metadata = {
  title: "Summy - Sign In - Welcome back to Summy",
  description: "Sign in to your Summy account.",
};

export default SignInPage;
