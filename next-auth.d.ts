import "next-auth";
import { UserRole } from "@prisma/client";
import { DateTime } from "@auth/core/providers/kakao";

declare module "next-auth" {
  interface User {
    /** The user's role. */
    role?: UserRole;
    emailVerified?: DateTime;
  }

  interface Session {
    user?: {
      id?: string;
      role?: UserRole;
    };
  }
}
