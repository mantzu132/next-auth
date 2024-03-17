import "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    /** The user's role. */
    role?: UserRole;
  }

  interface Session {
    user?: {
      id?: string;
      role?: UserRole;
    };
  }
}
