import { POST } from "@/lib/api";
import {
  ForgotPasswordSchema,
  SignInSchema,
  SignUpSchema,
} from "@/schemas/auth.schemas";
import { AuthResponse, ServiceReturn } from "@/types";

type VerifyOtpPayload = {
  email: string;
  otpCode: string;
};

type ResetPasswordPayload = {
  email: string;
  resetCode: string;
  password: string;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const signIn = async (
  payload: SignInSchema,
): Promise<ServiceReturn<AuthResponse>> => {
  const response = await POST<SignInSchema, AuthResponse>(
    "/auth/sign-in",
    payload,
  );

  if (response instanceof Error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(response, "Unable to sign in."),
    };
  }

  return {
    data: response,
    success: true,
    message: "User logged in successfully.",
  };
};

export const signUp = async (payload: SignUpSchema): Promise<ServiceReturn> => {
  const response = await POST<SignUpSchema, null>("/auth/sign-up", payload);

  if (response instanceof Error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(response, "Unable to create account."),
    };
  }

  return {
    message: "Account created successfully.",
    success: true,
    data: response,
  };
};

export const verifyOtp = async (
  payload: VerifyOtpPayload,
): Promise<ServiceReturn> => {
  const response = await POST<VerifyOtpPayload, null>("/auth/verify-otp", payload);

  if (response instanceof Error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(response, "OTP verification failed."),
    };
  }

  return {
    message: "Account verified successfully.",
    success: true,
    data: response,
  };
};

export const forgotPassword = async (
  payload: ForgotPasswordSchema,
): Promise<ServiceReturn> => {
  const response = await POST<ForgotPasswordSchema, null>(
    "/auth/forgot-password",
    payload,
  );

  if (response instanceof Error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(response, "Unable to request password reset."),
    };
  }

  return {
    message: "Password reset instructions sent.",
    success: true,
    data: response,
  };
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<ServiceReturn> => {
  const response = await POST<ResetPasswordPayload, null>(
    "/auth/reset-password",
    payload,
  );

  if (response instanceof Error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(response, "Unable to reset password."),
    };
  }

  return {
    message: "Password reset successfully.",
    success: true,
    data: response,
  };
};
