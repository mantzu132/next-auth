import { db } from "@/lib/db";

import { v4 as uuidv4 } from "uuid";
import { TokenType } from "@prisma/client";

export const getTokenByToken = async (token: string, type: TokenType) => {
  try {
    const verificationToken = await db.token.findUnique({
      where: { token, type },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getTokenByEmail = async (email: string, type: TokenType) => {
  try {
    const verificationToken = await db.token.findFirst({
      where: { email, type },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
export const generateToken = async (email: string, type: TokenType) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTokenByEmail(email, type);

  if (existingToken) {
    await db.token.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const Token = await db.token.create({
    data: {
      email,
      token,
      type,
      expires,
    },
  });

  return Token;
};
