// lib/backend/validators/IssueValidator.ts

import { z } from "zod";
import { ValidationError } from "../errors/CustomErrors";
import { IssueType, IssuePriority, IssueStatus } from "@/lib/models/Issue";

export interface CreateIssueData {
  type: IssueType;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
}

export interface UpdateIssueData {
  title?: string;
  description?: string;
  priority?: IssuePriority;
  status?: IssueStatus;
}

export class IssueValidator {
  private createIssueSchema = z.object({
    type: z
      .nativeEnum(IssueType)
      .refine((val) => Object.values(IssueType).includes(val), {
        message: "Invalid issue type",
      }),
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title cannot exceed 200 characters")
      .trim(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description cannot exceed 2000 characters")
      .trim(),
    priority: z
      .nativeEnum(IssuePriority)
      .optional()
      .default(IssuePriority.MEDIUM),
    status: z.nativeEnum(IssueStatus).optional().default(IssueStatus.OPEN),
  });

  private updateIssueSchema = z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title cannot exceed 200 characters")
      .trim()
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description cannot exceed 2000 characters")
      .trim()
      .optional(),
    priority: z.nativeEnum(IssuePriority).optional(),
    status: z.nativeEnum(IssueStatus).optional(),
  });

  public validateCreateIssue(data: unknown): CreateIssueData {
    try {
      return this.createIssueSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((err) => err.message).join(", ");
        throw new ValidationError(messages);
      }
      throw new ValidationError("Invalid issue data");
    }
  }

  public validateUpdateIssue(data: unknown): UpdateIssueData {
    try {
      const validated = this.updateIssueSchema.parse(data);

      // Ensure at least one field is being updated
      if (Object.keys(validated).length === 0) {
        throw new ValidationError(
          "At least one field must be provided for update"
        );
      }

      return validated;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((err) => err.message).join(", ");
        throw new ValidationError(messages);
      }
      throw error;
    }
  }

  public validateIssueType(type: unknown): IssueType {
    if (!type || typeof type !== "string") {
      throw new ValidationError("Issue type must be a string");
    }

    const issueType = type as IssueType;
    if (!Object.values(IssueType).includes(issueType)) {
      throw new ValidationError("Invalid issue type");
    }

    return issueType;
  }
}
