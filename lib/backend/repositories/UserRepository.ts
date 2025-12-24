// lib/backend/repositories/UserRepository.ts

import User, { IUser } from "@/lib/models/User";
import { DatabaseError, NotFoundError } from "../errors/CustomErrors";
import { connectDB } from "../database/connection";

export class UserRepository {
  constructor() {
    // Ensure database connection
    connectDB().catch(console.error);
  }

  public async create(userData: Partial<IUser>): Promise<IUser> {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new DatabaseError("Email already exists");
      }
      console.error("Error creating user:", error);
      throw new DatabaseError("Failed to create user");
    }
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email }).select("+password");
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new DatabaseError("Failed to find user");
    }
  }

  public async findById(userId: string): Promise<IUser | null> {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new DatabaseError("Failed to find user");
    }
  }

  public async findByIdWithPassword(userId: string): Promise<IUser | null> {
    try {
      const user = await User.findById(userId).select("+password");
      return user;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new DatabaseError("Failed to find user");
    }
  }

  public async update(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error("Error updating user:", error);
      throw new DatabaseError("Failed to update user");
    }
  }

  public async delete(userId: string): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        throw new NotFoundError("User not found");
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error("Error deleting user:", error);
      throw new DatabaseError("Failed to delete user");
    }
  }

  public async exists(email: string): Promise<boolean> {
    try {
      const count = await User.countDocuments({ email });
      return count > 0;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new DatabaseError("Failed to check user existence");
    }
  }

  public async count(): Promise<number> {
    try {
      return await User.countDocuments();
    } catch (error) {
      console.error("Error counting users:", error);
      throw new DatabaseError("Failed to count users");
    }
  }
}
