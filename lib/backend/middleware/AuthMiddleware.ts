// lib/backend/middleware/AuthMiddleware.ts
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    ip?: string;
  }
}

import { AuthService, JWTPayload } from "../services/AuthService";
import { AuthenticationError } from "../errors/CustomErrors";

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async verifyRequest(request: NextRequest): Promise<JWTPayload> {
    // Extract token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("No token provided");
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      // Verify token
      const payload = await this.authService.verifyAccessToken(token);
      return payload;
    } catch (error) {
      throw new AuthenticationError("Invalid or expired token");
    }
  }

  public async verifyRequestWithUser(request: NextRequest) {
    const payload = await this.verifyRequest(request);
    const user = await this.authService.getUserFromToken(
      request.headers.get("authorization")!.substring(7)
    );

    return { payload, user };
  }

  public extractToken(request: NextRequest): string | null {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    return authHeader.substring(7);
  }
}

// Helper function for protected routes
export async function authenticateRequest(
  request: NextRequest
): Promise<JWTPayload> {
  (request as any).ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  const middleware = new AuthMiddleware();
  return middleware.verifyRequest(request);
}

// Helper to get user from request
export async function getUserFromRequest(request: NextRequest) {
  const middleware = new AuthMiddleware();
  return middleware.verifyRequestWithUser(request);
}
