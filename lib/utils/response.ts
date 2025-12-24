// lib/utils/response.ts

import { NextResponse } from "next/server";
import { AppError } from "../backend/errors/CustomErrors";
import { RateLimitHeaders } from "../backend/middleware/RateLimiter";

export class ApiResponse {
  public static success<T>(
    data: T,
    message?: string,
    statusCode: number = 200,
    headers?: RateLimitHeaders
  ): NextResponse {
    const response = {
      success: true,
      message,
      data,
    };

    const nextResponse = NextResponse.json(response, { status: statusCode });

    // Add rate limit headers if provided
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        nextResponse.headers.set(key, value);
      });
    }

    return nextResponse;
  }

  public static error(
    message: string,
    statusCode: number = 500,
    errors?: any
  ): NextResponse {
    const response = {
      success: false,
      message,
      errors,
    };

    return NextResponse.json(response, { status: statusCode });
  }

  public static handleError(error: Error | AppError): NextResponse {
    console.error("API Error:", error);

    if (error instanceof AppError) {
      return this.error(error.message, error.statusCode);
    }

    // Generic error
    return this.error("Internal server error", 500);
  }

  public static validationError(errors: any): NextResponse {
    return this.error("Validation failed", 400, errors);
  }

  public static unauthorized(message: string = "Unauthorized"): NextResponse {
    return this.error(message, 401);
  }

  public static forbidden(message: string = "Forbidden"): NextResponse {
    return this.error(message, 403);
  }

  public static notFound(message: string = "Resource not found"): NextResponse {
    return this.error(message, 404);
  }

  public static conflict(
    message: string = "Resource already exists"
  ): NextResponse {
    return this.error(message, 409);
  }

  public static rateLimitExceeded(retryAfter: number): NextResponse {
    const response = NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again later.",
      },
      { status: 429 }
    );

    response.headers.set("Retry-After", retryAfter.toString());

    return response;
  }
}
