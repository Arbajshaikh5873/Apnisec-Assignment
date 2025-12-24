// lib/backend/services/IssueService.ts

import { IssueRepository, IssueFilters } from "../repositories/IssueRepository";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";
import { NotFoundError } from "../errors/CustomErrors";
import { IIssue, IssueType } from "@/lib/models/Issue";

export class IssueService {
  private issueRepository: IssueRepository;
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.issueRepository = new IssueRepository();
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  public async createIssue(
    userId: string,
    issueData: {
      type: IssueType;
      title: string;
      description: string;
      priority?: string;
      status?: string;
    }
  ): Promise<IIssue> {
    // Verify user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Create issue
    const issue = await this.issueRepository.create({
      ...issueData,
      userId: user._id as any,
    } as IIssue);

    // Send notification email (non-blocking)
    this.emailService
      .sendIssueCreatedEmail(user.email, user.name, issue)
      .catch((error) => {
        console.error("Failed to send issue notification email:", error);
      });

    return issue;
  }

  public async getIssueById(issueId: string, userId: string): Promise<IIssue> {
    const issue = await this.issueRepository.findById(issueId);

    if (!issue) {
      throw new NotFoundError("Issue not found");
    }

    // Verify ownership
    if (issue.userId.toString() !== userId) {
      throw new NotFoundError("Issue not found or unauthorized");
    }

    return issue;
  }

  public async getUserIssues(
    userId: string,
    filters?: IssueFilters
  ): Promise<IIssue[]> {
    // Verify user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.issueRepository.findByUserId(userId, filters);
  }

  public async updateIssue(
    issueId: string,
    userId: string,
    updateData: {
      title?: string;
      description?: string;
      priority?: string;
      status?: string;
    }
  ): Promise<IIssue> {
    // Remove undefined values
    const cleanData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(cleanData).length === 0) {
      throw new NotFoundError("No valid fields to update");
    }

    const updatedIssue = await this.issueRepository.update(
      issueId,
      userId,
      cleanData as Partial<IIssue>
    );

    return updatedIssue;
  }

  public async deleteIssue(issueId: string, userId: string): Promise<void> {
    await this.issueRepository.delete(issueId, userId);
  }

  public async getIssuesByType(
    userId: string,
    type: IssueType
  ): Promise<IIssue[]> {
    // Verify user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.issueRepository.findByUserIdAndType(userId, type);
  }

  public async getIssueCount(userId: string): Promise<number> {
    return this.issueRepository.countByUserId(userId);
  }
}
