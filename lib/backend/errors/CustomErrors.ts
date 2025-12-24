// lib/backend/errors/CustomErrors.ts

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Unauthorized access") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Resource already exists") {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfter: number;

  constructor(retryAfter: number) {
    super("Too many requests. Please try again later.", 429);
    this.retryAfter = retryAfter;
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Database operation failed") {
    super(message, 500, false);
  }
}

export class ErrorHandler {
  static handle(error: Error) {
    if (error instanceof AppError) {
      return {
        success: false,
        error: {
          message: error.message,
          statusCode: error.statusCode,
        },
      };
    }

    // Log unexpected errors
    console.error("Unexpected error:", error);

    return {
      success: false,
      error: {
        message: "Internal server error",
        statusCode: 500,
      },
    };
  }
}
