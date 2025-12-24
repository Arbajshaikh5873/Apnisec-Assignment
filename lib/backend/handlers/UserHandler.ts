// lib/backend/handlers/UserHandler.ts

import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../services/UserService";
import { AuthValidator } from "../validators/AuthValidator";
import { ApiResponse } from "@/lib/utils/response";
import { rateLimiter } from "../middleware/RateLimiter";
import { authenticateRequest } from "../middleware/AuthMiddleware";
import { connectDB } from "../database/connection";

export class UserHandler {
  private userService: UserService;
  private authValidator: AuthValidator;

  constructor() {
    this.userService = new UserService();
    this.authValidator = new AuthValidator();
  }

  public async handleGetProfile(request: NextRequest): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      const payload = await authenticateRequest(request);

      // Get user profile
      const user = await this.userService.getUserById(payload.userId);

      return ApiResponse.success(
        { user },
        "Profile retrieved successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleUpdateProfile(
    request: NextRequest
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
      const validatedData = this.authValidator.validateUpdateProfile(body);

      // Update profile
      const user = await this.userService.updateProfile(
        payload.userId,
        validatedData
      );

      return ApiResponse.success(
        { user },
        "Profile updated successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleDeleteAccount(
    request: NextRequest
  ): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      const payload = await authenticateRequest(request);

      // Delete account
      await this.userService.deleteAccount(payload.userId);

      return ApiResponse.success(
        null,
        "Account deleted successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }
}
