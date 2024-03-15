"use server";

import { z } from "zod";
import { loginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (
  values: z.infer<typeof loginSchema>,
): Promise<{ error?: string; success?: string }> => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });

    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
      }
    }
    throw error;
  }
};
