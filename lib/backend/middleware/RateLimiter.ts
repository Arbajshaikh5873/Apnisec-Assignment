import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  time: number;
};

class RateLimiter {
  private requests = new Map<string, RateLimitEntry>();
  private readonly WINDOW = 60 * 1000; // 1 minute
  private readonly LIMIT = 10;

  async checkRequest(clientId: string) {
    const now = Date.now();
    const data = this.requests.get(clientId);

    if (!data || now - data.time > this.WINDOW) {
      this.requests.set(clientId, { count: 1, time: now });
      return {};
    }

    if (data.count >= this.LIMIT) {
      throw NextResponse.json(
        { success: false, message: "Too many requests" },
        { status: 429 }
      );
    }

    data.count++;
    return {};
  }
}

export const rateLimiter = new RateLimiter();
