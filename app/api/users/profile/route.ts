import { NextRequest } from "next/server";
import { UserHandler } from "@/lib/backend/handlers/UserHandler";

const userHandler = new UserHandler();

export async function GET(request: NextRequest) {
  return userHandler.handleGetProfile(request);
}

export async function PUT(request: NextRequest) {
  return userHandler.handleUpdateProfile(request);
}
