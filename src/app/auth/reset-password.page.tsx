import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/form-field";
import { resetPasswordSchema, ResetPasswordSchema } from "@/schemas/auth.schemas";
import { resetPassword } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Link, PageComponent, useNavigate, useSearchParams } from "rasengan";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const ResetPasswordPage: PageComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const resetCode = searchParams.get("resetCode") ?? "";
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ResetPasswordSchema) => {
    if (!email || !resetCode) {
      setErrorMessage("Invalid reset link. Missing email or reset code.");
      return;
    }

    setErrorMessage(null);
    const response = await resetPassword({
      email,
      resetCode,
      password: data.password,
    });

    if (!response.success) {
      setErrorMessage(response.message);
      return;
    }

    navigate("/auth/sign-in");
  };

  return (
    <main className="min-h-screen bg-accent flex items-center justify-center py-10 px-6">
      <div className="max-w-lg mx-auto w-full space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold md:text-2xl">Reset password</h3>
          <p className="text-muted-foreground">
            Set your new password for:
          </p>
          <p className="font-medium break-all">{email || "No email provided"}</p>
        </div>
        <div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <InputField
                formReturn={form}
                name="password"
                label="New password"
                type="password"
                placeholder="Enter your new password"
              />
              <InputField
                formReturn={form}
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Confirm your new password"
              />
              {errorMessage && (
                <p className="text-destructive text-sm">{errorMessage}</p>
              )}
              <div className="flex gap-4 flex-col md:flex-row sm:items-center lg:gap-6">
                <Button
                  size={"lg"}
                  disabled={
                    form.formState.isSubmitting ||
                    !form.formState.isValid ||
                    !email ||
                    !resetCode
                  }
                >
                  Reset password
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

ResetPasswordPage.path = "/reset-password";
ResetPasswordPage.metadata = {
  title: "Summy - Reset Password - Reset your password",
  description:
    "Reset your password by entering your new password and confirming it.",
};

export default ResetPasswordPage;
