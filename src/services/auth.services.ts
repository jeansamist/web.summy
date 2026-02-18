import { SignInSchema } from "@/schemas/auth.schemas";
import { AuthResponse } from "@/types";

export const signIn = async (
  payload: SignInSchema,
): Promise<AuthResponse> => {};
