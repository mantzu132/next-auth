"use server";

import { z } from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendConfirmationEmail } from "@/lib/mail";

export const login = async (
  values: z.infer<typeof loginSchema>,
): Promise<{ error?: string; success?: string }> => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendConfirmationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      error: "Email not verified! Check your email we a verification link!",
    };
  }

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
