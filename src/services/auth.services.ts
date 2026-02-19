import { SignInSchema, SignUpSchema } from "@/schemas/auth.schemas";
import { AuthResponse, ServiceReturn } from "@/types";

export const signIn = async (
  payload: SignInSchema,
): Promise<ServiceReturn<AuthResponse>> => {
  return {
    data: null,
    success: true,
    message: "User logged in succesfuly",
  };
};

export const signUp = async (payload: SignUpSchema): Promise<ServiceReturn> => {
  return {
    message: "User created successfuly",
    success: true,
    data: null,
  };
};
