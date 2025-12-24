// lib/backend/handlers/IssueHandler.ts

import { NextRequest, NextResponse } from "next/server";
import { IssueService } from "../services/IssueService";
import { IssueValidator } from "../validators/IssueValidator";
import { ApiResponse } from "@/lib/utils/response";
import { rateLimiter } from "../middleware/RateLimiter";
import { authenticateRequest } from "../middleware/AuthMiddleware";
import { connectDB } from "../database/connection";

export class IssueHandler {
  private issueService: IssueService;
  private issueValidator: IssueValidator;

  constructor() {
    this.issueService = new IssueService();
    this.issueValidator = new IssueValidator();
  }

  public async handleCreateIssue(request: NextRequest): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      const payload = await authenticateRequest(request);

      // Parse request body
      const body = await request.json();

      // Validate input
      const validatedData = this.issueValidator.validateCreateIssue(body);

      // Create issue
      const issue = await this.issueService.createIssue(
        payload.userId,
        validatedData
      );

      return ApiResponse.success(
        { issue },
        "Issue created successfully",
        201,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleGetIssues(request: NextRequest): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      const payload = await authenticateRequest(request);

      // Get query parameters
      const { searchParams } = await new URL(request.url);
      const type = searchParams.get("type");
      const status = searchParams.get("status");

      // Build filters
      const filters: any = {};
      if (type) {
        filters.type = await this.issueValidator.validateIssueType(type);
      }
      if (status) {
        filters.status = status;
      }

      // Get issues
      const issues = await this.issueService.getUserIssues(
        payload.userId,
        filters
      );

      return await ApiResponse.success(
        { issues, count: issues.length },
        "Issues retrieved successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleGetIssueById(
    request: NextRequest,
    issueId: string
  ): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      const payload = await authenticateRequest(request);

      // Get issue
      const issue = await this.issueService.getIssueById(
        issueId,
        payload.userId
      );

      return ApiResponse.success(
        { issue },
        "Issue retrieved successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleUpdateIssue(
    request: NextRequest,
    issueId: string
  ): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      const payload = await authenticateRequest(request);

      // Parse request body
      const body = await request.json();

      // Validate input
      const validatedData = this.issueValidator.validateUpdateIssue(body);

      // Update issue
      const issue = await this.issueService.updateIssue(
        issueId,
        payload.userId,
        validatedData
      );

      return ApiResponse.success(
        { issue },
        "Issue updated successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleDeleteIssue(
    request: NextRequest,
    issueId: string
  ): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      const payload = await authenticateRequest(request);

      // Delete issue
      await this.issueService.deleteIssue(issueId, payload.userId);

      return ApiResponse.success(
        null,
        "Issue deleted successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }
}
