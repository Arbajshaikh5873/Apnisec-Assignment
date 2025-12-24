// lib/backend/validators/AuthValidator.ts

import { z } from "zod";
import { ValidationError } from "../errors/CustomErrors";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  company?: string;
  phone?: string;
}

export class AuthValidator {
  private registerSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password too long"),
    company: z
      .string()
      .max(100, "Company name cannot exceed 100 characters")
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone must be 10 digits")
      .optional(),
  });

  private loginSchema = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    password: z.string().min(1, "Password is required"),
  });

  private updateProfileSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim()
      .optional(),
    company: z
      .string()
      .max(100, "Company name cannot exceed 100 characters")
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone must be 10 digits")
      .optional(),
  });

  public validateRegister(data: unknown): RegisterData {
    try {
      return this.registerSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((err) => err.message).join(", ");
        throw new ValidationError(messages);
      }
      throw new ValidationError("Invalid registration data");
    }
  }

  public validateLogin(data: unknown): LoginData {
    try {
      return this.loginSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((err) => err.message).join(", ");
        throw new ValidationError(messages);
      }
      throw new ValidationError("Invalid login data");
    }
  }

  public validateUpdateProfile(data: unknown): UpdateProfileData {
    try {
      return this.updateProfileSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((err) => err.message).join(", ");
        throw new ValidationError(messages);
      }
      throw new ValidationError("Invalid profile data");
    }
  }
}
