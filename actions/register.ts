"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateToken } from "@/lib/tokens";
import { sendConfirmationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPass = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  const user = await db.user.create({
    data: { name, email, password: hashedPass },
  });

  const verificationToken = await generateToken(email, "VERIFYEMAIL");
  await sendConfirmationEmail(verificationToken.email, verificationToken.token);

  // TODO : SEND verification token email

  return { success: "Confirmation email sent ! " };
};
