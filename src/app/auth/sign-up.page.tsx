import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/form-field";
import { signUpSchema, SignUpSchema } from "@/schemas/auth.schemas";
import { signUp } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Link, PageComponent, useNavigate } from "rasengan";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage: PageComponent = () => {
  const navigate = useNavigate();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignUpSchema) => {
    setErrorMessage(null);
    const response = await signUp(data);

    if (!response.success) {
      setErrorMessage(response.message);
      return;
    }

    navigate(`/auth/otp?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <main className="min-h-screen bg-accent flex items-center justify-center py-6 px-4 md:py-10 md:px-6">
      <div className="max-w-lg mx-auto w-full space-y-6">
        <div>
          <h3 className="text-xl font-semibold md:text-2xl">
            Create your Summy account 😊
          </h3>
          <p className="text-muted-foreground">Get started in a few steps</p>
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
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  formReturn={form}
                  name="firstName"
                  label="First name"
                  placeholder="Enter your first name"
                />
                <InputField
                  formReturn={form}
                  name="lastName"
                  label="Last name"
                  placeholder="Enter your last name"
                />
              </div>
              <InputField
                formReturn={form}
                name="email"
                label="E-mail"
                placeholder="Enter your email"
              />
              <InputField
                formReturn={form}
                name="password"
                label="Password"
                type="password"
                placeholder="Create a password"
              />
              {errorMessage && (
                <p className="text-destructive text-sm">{errorMessage}</p>
              )}
              <div className="flex gap-4 flex-col md:flex-row sm:items-center lg:gap-6">
                <Button
                  size={"lg"}
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                >
                  Create account
                  {form.formState.isSubmitting && (
                    <LoaderCircle className="animate-spin duration-1000" />
                  )}
                </Button>
                <div className="h-px w-full shrink-0 bg-border md:hidden" />
                <div className="hidden h-10 w-px shrink-0 bg-border md:block" />
                <div className="text-muted-foreground">
                  <Link
                    to={"/auth/sign-in"}
                    className={
                      "text-muted-foreground hover:text-foreground hover:underline"
                    }
                  >
                    I already have an account
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

SignUpPage.path = "/sign-up";
SignUpPage.metadata = {
  title: "Summy - Sign Up - Create a Summy account",
  description: "Join Summy and start summarizing your life with AI.",
};

export default SignUpPage;
