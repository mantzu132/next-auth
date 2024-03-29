"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getTokenByToken } from "@/lib/tokens";

export const newVerification = async (token: string) => {
  const existingToken = await getTokenByToken(token, "VERIFYEMAIL");

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email, // for changing email going to re-use
    },
  });

  await db.token.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
