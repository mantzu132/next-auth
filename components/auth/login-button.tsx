"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export const LoginButton = ({
  children,
  mode = "redirect",
}: LoginButtonProps) => {
  const router = useRouter();
  function onClick() {
    router.push("/auth/login");
  }

  if (mode === "modal") {
    return <span>// TODO: IMPLEMENT MODAL</span>;
  }

  return <span onClick={onClick}>{children}</span>;
};
