import { NextRequest } from "next/server";
import { AuthHandler } from "@/lib/backend/handlers/AuthHandler";

const authHandler = new AuthHandler();

export async function GET(request: NextRequest) {
  return authHandler.handleGetCurrentUser(request);
}
