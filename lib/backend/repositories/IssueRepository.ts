// lib/backend/repositories/IssueRepository.ts

import Issue, { IIssue, IssueType } from "@/lib/models/Issue";
import { DatabaseError, NotFoundError } from "../errors/CustomErrors";
import { connectDB } from "../database/connection";

export interface IssueFilters {
  type?: IssueType;
  status?: string;
}

export class IssueRepository {
  constructor() {
    connectDB().catch(console.error);
  }

  public async create(issueData: Partial<IIssue>): Promise<IIssue> {
    try {
      const issue = await Issue.create(issueData);
      return issue;
    } catch (error) {
      console.error("Error creating issue:", error);
      throw new DatabaseError("Failed to create issue");
    }
  }

  public async findById(issueId: string): Promise<IIssue | null> {
    try {
      const issue = await Issue.findById(issueId).populate(
        "userId",
        "name email"
      );
      return issue;
    } catch (error) {
      console.error("Error finding issue:", error);
      throw new DatabaseError("Failed to find issue");
    }
  }

  public async findByUserId(
    userId: string,
    filters?: IssueFilters
  ): Promise<IIssue[]> {
    try {
      const query: any = { userId };

      if (filters?.type) {
        query.type = filters.type;
      }

      if (filters?.status) {
        query.status = filters.status;
      }

      const issues = await Issue.find(query)
        .sort({ createdAt: -1 })
        .populate("userId", "name email");

      return issues;
    } catch (error) {
      console.error("Error finding issues:", error);
      throw new DatabaseError("Failed to find issues");
    }
  }

  public async update(
    issueId: string,
    userId: string,
    updateData: Partial<IIssue>
  ): Promise<IIssue> {
    try {
      const issue = await Issue.findOneAndUpdate(
        { _id: issueId, userId },
        { $set: updateData },
        { new: true, runValidators: true }
      ).populate("userId", "name email");

      if (!issue) {
        throw new NotFoundError("Issue not found or unauthorized");
      }

      return issue;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error("Error updating issue:", error);
      throw new DatabaseError("Failed to update issue");
    }
  }

  public async delete(issueId: string, userId: string): Promise<void> {
    try {
      const issue = await Issue.findOneAndDelete({ _id: issueId, userId });

      if (!issue) {
        throw new NotFoundError("Issue not found or unauthorized");
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error("Error deleting issue:", error);
      throw new DatabaseError("Failed to delete issue");
    }
  }

  public async countByUserId(userId: string): Promise<number> {
    try {
      return await Issue.countDocuments({ userId });
    } catch (error) {
      console.error("Error counting issues:", error);
      throw new DatabaseError("Failed to count issues");
    }
  }

  public async findByUserIdAndType(
    userId: string,
    type: IssueType
  ): Promise<IIssue[]> {
    try {
      const issues = await Issue.find({ userId, type })
        .sort({ createdAt: -1 })
        .populate("userId", "name email");

      return issues;
    } catch (error) {
      console.error("Error finding issues by type:", error);
      throw new DatabaseError("Failed to find issues");
    }
  }

  public async exists(issueId: string, userId: string): Promise<boolean> {
    try {
      const count = await Issue.countDocuments({ _id: issueId, userId });
      return count > 0;
    } catch (error) {
      console.error("Error checking issue existence:", error);
      throw new DatabaseError("Failed to check issue existence");
    }
  }
}
