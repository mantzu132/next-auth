import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(2),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
