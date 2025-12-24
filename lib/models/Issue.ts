import mongoose, { Document, Schema, Types } from "mongoose";

export enum IssueType {
  CLOUD_SECURITY = "cloud-security",
  RETEAM_ASSESSMENT = "reteam-assessment",
  VAPT = "vapt",
}

export enum IssuePriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum IssueStatus {
  OPEN = "open",
  IN_PROGRESS = "in-progress",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

export interface IIssue extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: IssueType;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(IssueType),
      required: [true, "Issue type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    priority: {
      type: String,
      enum: Object.values(IssuePriority),
      default: IssuePriority.MEDIUM,
    },
    status: {
      type: String,
      enum: Object.values(IssueStatus),
      default: IssueStatus.OPEN,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
issueSchema.index({ userId: 1, type: 1 });
issueSchema.index({ userId: 1, status: 1 });
issueSchema.index({ createdAt: -1 });

// Prevent model recompilation in development
const Issue =
  mongoose.models.Issue || mongoose.model<IIssue>("Issue", issueSchema);

export default Issue;
