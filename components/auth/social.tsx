"use client";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="flex-1" variant="outline">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="flex-1" variant="outline">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
