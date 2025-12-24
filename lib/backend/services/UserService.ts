// lib/backend/services/UserService.ts

import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";
import { NotFoundError } from "../errors/CustomErrors";
import { IUser } from "@/lib/models/User";

export class UserService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  public async getUserById(userId: string): Promise<Partial<IUser>> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.sanitizeUser(user);
  }

  public async updateProfile(
    userId: string,
    updateData: {
      name?: string;
      company?: string;
      phone?: string;
    }
  ): Promise<Partial<IUser>> {
    // Remove undefined values
    const cleanData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(cleanData).length === 0) {
      throw new NotFoundError("No valid fields to update");
    }

    const updatedUser = await this.userRepository.update(
      userId,
      cleanData as Partial<IUser>
    );

    // Send notification email (non-blocking)
    this.emailService
      .sendProfileUpdateEmail(updatedUser.email, updatedUser.name)
      .catch((error) => {
        console.error("Failed to send profile update email:", error);
      });

    return this.sanitizeUser(updatedUser);
  }

  public async deleteAccount(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  public async getUserByEmail(email: string): Promise<Partial<IUser> | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return this.sanitizeUser(user);
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
}
