import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/form-field";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/auth.schemas";
import { forgotPassword } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Link, PageComponent } from "rasengan";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const ForgotPasswordPage: PageComponent = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const response = await forgotPassword(data);

    if (!response.success) {
      setErrorMessage(response.message);
      return;
    }

    setSuccessMessage(response.message);
  };

  return (
    <main className="min-h-screen bg-accent flex items-center justify-center py-6 px-4 md:py-10 md:px-6">
      <div className="max-w-lg mx-auto w-full space-y-6">
        <div>
          <h3 className="text-xl font-semibold md:text-2xl">
            Forgot your password?
          </h3>
          <p className="text-muted-foreground">
            Enter your email to receive a reset code
          </p>
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
              {errorMessage && (
                <p className="text-destructive text-sm">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-sm text-green-700 dark:text-green-400">
                  {successMessage}
                </p>
              )}
              <div className="flex gap-4 flex-col md:flex-row sm:items-center lg:gap-6">
                <Button
                  size={"lg"}
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                >
                  Send reset code
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
                    Back to sign in
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

ForgotPasswordPage.path = "/forgot-password";
ForgotPasswordPage.metadata = {
  title: "Summy - Forgot Password - Reset your password",
  description: "Reset your password by entering your email address.",
};

export default ForgotPasswordPage;
