import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es obligatorio",
  })
  .min(2, { message: "El nombre de usuario debe tener al menos 2 caracteres" })
  ,
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  username: z
    .string({ required_error: "El nombre de usuario es obligatorio" })
    .min(2, { message: "El nombre de usuario debe tener al menos 2 caracteres" }),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const profileSchema = z.object({
  fullname: z
    .string({
      required_error: "fullname is required",
    })
    .min(3, {
      message: "fullname must be at least 3 characters long",
    }),

  email: z
    .string({required_error: "Email is required",})
    .email({
      message: "Invalid email address",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .optional(), // Optional field, only used if the user wants to update the password
});
