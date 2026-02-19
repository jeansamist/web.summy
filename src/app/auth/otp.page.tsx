import { Button } from "@/components/ui/button";
import { InputOTPField } from "@/components/ui/form-field";
import { otpSchema, OtpSchema } from "@/schemas/auth.schemas";
import { verifyOtp } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Link, PageComponent, useNavigate, useSearchParams } from "rasengan";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const OtpPage: PageComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const form = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: OtpSchema) => {
    if (!email) {
      setErrorMessage("Missing email in verification link.");
      return;
    }

    setErrorMessage(null);
    const response = await verifyOtp({
      email,
      otpCode: data.otpCode,
    });

    if (!response.success) {
      setErrorMessage(response.message);
      return;
    }

    navigate("/auth/sign-in");
  };

  return (
    <main className="min-h-screen bg-accent flex items-center justify-center py-6 px-4 md:py-10 md:px-6">
      <div className="max-w-lg mx-auto w-full space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold md:text-2xl">
            Verify your account
          </h3>
          <p className="text-muted-foreground">
            Enter the 6-digit OTP sent to:
          </p>
          <p className="font-medium break-all">
            {email || "No email provided"}
          </p>
        </div>
        <div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <InputOTPField
                formReturn={form}
                name="otpCode"
                label="One-time password"
              />
              {errorMessage && (
                <p className="text-destructive text-sm text-center">
                  {errorMessage}
                </p>
              )}
              <div className="flex gap-4 flex-col md:flex-row sm:items-center lg:gap-6">
                <Button
                  size={"lg"}
                  disabled={
                    form.formState.isSubmitting ||
                    !form.formState.isValid ||
                    !email
                  }
                >
                  Verify OTP
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
                      "text-muted-foreground hover:text-foreground hover:underline"
                    }
                  >
                    Create account again
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

OtpPage.path = "/otp";
OtpPage.metadata = {
  title: "Summy - OTP - Verify your account",
  description: "Verify your account with the OTP sent to your email.",
};

export default OtpPage;
