import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/form-field";
import { signInSchema, SignInSchema } from "@/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Link, PageComponent } from "rasengan";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
const SignInPage: PageComponent = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onSubmit = async (data: SignInSchema) => {};
  return (
    <main className="min-h-screen bg-accent flex items-center justify-center py-10 px-6">
      <div className="max-w-lg mx-auto w-full space-y-6">
        <div>
          <h3 className="text-xl font-semibold md:text-2xl">
            Welcome back to Summy 👋
          </h3>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <Button variant={"outline"} size={"lg"} className="w-full">
          <img src="/google-logo.png" alt="Google logo" className="w-4 h-4" />
          <span>Continue with google</span>
        </Button>
        <div className="flex items-center gap-4 lg:gap-6 w-full">
          <div className="h-px flex-1 shrink-0 bg-border" />
          <span className={"text-muted-foreground text-xs"}>OR</span>
          <div className="h-px flex-1 shrink-0 bg-border" />
        </div>
        <div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <InputField
                formReturn={form}
                name="email"
                label="E-mail"
                placeholder="Enter your email"
              />
              <div className="space-y-2">
                <InputField
                  formReturn={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Link
                  to={"/auth/forgot-password"}
                  className={
                    "hover:underline text-muted-foreground block text-sm text-right"
                  }
                >
                  I for got my password
                </Link>
              </div>
              <div className="flex gap-4 flex-col md:flex-row sm:items-center lg:gap-6">
                <Button
                  size={"lg"}
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                >
                  Continue
                  {form.formState.isSubmitting && (
                    <LoaderCircle className="animate-spin duration-1000" />
                  )}
                </Button>
                <div className="h-px w-full shrink-0 bg-border md:hidden" />
                <div className="hidden h-10 w-px shrink-0 bg-border md:block" />
                <div className="text-muted-foreground">
                  <Link
                    to={"/auth/sign-up"}
                    className={
                      " text-muted-foreground hover:text-foreground hover:underline"
                    }
                  >
                    I don't have an account
                  </Link>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

SignInPage.path = "/sign-in";
SignInPage.metadata = {
  title: "Summy - Sign In - Welcome back to Summy",
  description: "Sign in to your Summy account.",
};

export default SignInPage;
