import { NextRequest } from "next/server";
import { IssueHandler } from "@/lib/backend/handlers/IssueHandler";

const issueHandler = new IssueHandler();

export async function GET(request: NextRequest) {
  return issueHandler.handleGetIssues(request);
}

export async function POST(request: NextRequest) {
  return issueHandler.handleCreateIssue(request);
}
