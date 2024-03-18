"use client";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="flex-1"
        variant="outline"
        onClick={() =>
          signIn("github", { callbackUrl: DEFAULT_LOGIN_REDIRECT })
        }
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
