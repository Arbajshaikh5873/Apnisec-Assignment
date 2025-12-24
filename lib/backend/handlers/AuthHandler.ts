// lib/backend/handlers/AuthHandler.ts

import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "../services/AuthService";
import { AuthValidator } from "../validators/AuthValidator";
import { ApiResponse } from "@/lib/utils/response";
import { rateLimiter } from "../middleware/RateLimiter";
import { authenticateRequest } from "../middleware/AuthMiddleware";
import { connectDB } from "../database/connection";

export class AuthHandler {
  private authService: AuthService;
  private authValidator: AuthValidator;

  constructor() {
    this.authService = new AuthService();
    this.authValidator = new AuthValidator();
  }

  public async handleRegister(request: NextRequest): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Parse request body
      const body = await request.json();

      // Validate input
      const validatedData = this.authValidator.validateRegister(body);

      // Register user
      const result = await this.authService.register(
        validatedData.name,
        validatedData.email,
        validatedData.password,
        validatedData.company,
        validatedData.phone
      );

      return ApiResponse.success(
        result,
        "Registration successful",
        201,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleLogin(request: NextRequest): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Parse request body
      const body = await request.json();

      // Validate input
      const validatedData = this.authValidator.validateLogin(body);

      // Login user
      const result = await this.authService.login(
        validatedData.email,
        validatedData.password
      );

      return ApiResponse.success(
        result,
        "Login successful",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleLogout(request: NextRequest): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Verify authentication
      await authenticateRequest(request);

      // In a JWT-based system, logout is handled client-side by removing the token
      // For a more robust solution, you could maintain a token blacklist

      return ApiResponse.success(
        null,
        "Logout successful",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleGetCurrentUser(
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

      // Get user data
      const token = request.headers.get("authorization")!.substring(7);
      const user = await this.authService.getUserFromToken(token);

      return ApiResponse.success(
        { user },
        "User retrieved successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }

  public async handleRefreshToken(request: NextRequest): Promise<NextResponse> {
    try {
      // Connect to database
      await connectDB();

      // Check rate limit
      const clientId = request.ip || "anonymous";
      const rateLimitHeaders = await rateLimiter.checkRequest(clientId);

      // Parse request body
      const body = await request.json();
      const { refreshToken } = body;

      if (!refreshToken) {
        return ApiResponse.error("Refresh token is required", 400);
      }

      // Refresh access token
      const tokens = await this.authService.refreshAccessToken(refreshToken);

      return ApiResponse.success(
        { tokens },
        "Token refreshed successfully",
        200,
        rateLimitHeaders
      );
    } catch (error: any) {
      return ApiResponse.handleError(error);
    }
  }
}
