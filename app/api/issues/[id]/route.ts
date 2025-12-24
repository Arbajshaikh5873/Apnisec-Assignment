import { NextRequest } from "next/server";
import { IssueHandler } from "@/lib/backend/handlers/IssueHandler";

const issueHandler = new IssueHandler();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return issueHandler.handleGetIssueById(request, id);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return issueHandler.handleUpdateIssue(request, id);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return issueHandler.handleDeleteIssue(request, id);
}
