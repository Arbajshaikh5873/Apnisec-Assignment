// lib/backend/services/AuthService.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";
import {
  AuthenticationError,
  ConflictError,
  ValidationError,
} from "../errors/CustomErrors";
import { IUser } from "@/lib/models/User";

export interface JWTPayload {
  userId: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: Partial<IUser>;
  tokens: AuthTokens;
}

export class AuthService {
  private userRepository: UserRepository;
  private emailService: EmailService;
  private jwtSecret: string;
  private jwtRefreshSecret: string;
  private jwtExpiresIn: string;
  private jwtRefreshExpiresIn: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();

    // Get JWT secrets from environment
    this.jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    this.jwtRefreshSecret =
      process.env.JWT_REFRESH_SECRET || "your-refresh-secret";
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
    this.jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

    if (!process.env.JWT_SECRET) {
      console.warn("JWT_SECRET not set in environment variables");
    }
  }

  public async register(
    name: string,
    email: string,
    password: string,
    company?: string,
    phone?: string
  ): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      company,
      phone,
    } as IUser);

    // Send welcome email (non-blocking)
    this.emailService.sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    // Generate tokens
    const tokens = this.generateTokens({
      userId: user._id,
      email: user.email,
    });

    // Return user without password
    const userResponse = this.sanitizeUser(user);

    return {
      user: userResponse,
      tokens,
    };
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    // Find user with password
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await this.verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid email or password");
    }

    // Generate tokens
    const tokens = this.generateTokens({
      userId: user._id,
      email: user.email,
    });

    // Return user without password
    const userResponse = this.sanitizeUser(user);

    return {
      user: userResponse,
      tokens,
    };
  }

  public async verifyAccessToken(token: string): Promise<JWTPayload> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JWTPayload;
      return decoded;
    } catch (error) {
      throw new AuthenticationError("Invalid or expired token");
    }
  }

  public async verifyRefreshToken(token: string): Promise<JWTPayload> {
    try {
      const decoded = jwt.verify(token, this.jwtRefreshSecret) as JWTPayload;
      return decoded;
    } catch (error) {
      throw new AuthenticationError("Invalid or expired refresh token");
    }
  }

  public async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    // Verify refresh token
    const payload = await this.verifyRefreshToken(refreshToken);

    // Verify user still exists
    const user = await this.userRepository.findById(payload.userId);
    if (!user) {
      throw new AuthenticationError("User not found");
    }

    // Generate new tokens
    return this.generateTokens({
      userId: user._id,
      email: user.email,
    });
  }

  public async getUserFromToken(token: string): Promise<Partial<IUser>> {
    const payload = await this.verifyAccessToken(token);
    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    return this.sanitizeUser(user);
  }

  private generateTokens(payload: JWTPayload): AuthTokens {
    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });

    const refreshToken = jwt.sign(payload, this.jwtRefreshSecret, {
      expiresIn: this.jwtRefreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private sanitizeUser(user: IUser): Partial<IUser> {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
  }
}
