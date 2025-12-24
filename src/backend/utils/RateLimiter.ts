export interface RateLimitResult {
  isExceeded: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export class RateLimiter {
  private static instance: RateLimiter;
  private storage: Map<string, { count: number; resetTime: number }>;

  private constructor() {
    this.storage = new Map();
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  /**
   * Checks if the rate limit is exceeded for a given key.
   * @param key Unique identifier (IP, user ID, etc.)
   * @param limit Max requests allowed in the window
   * @param windowMs Time window in milliseconds
   */
  public check(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const entry = this.storage.get(key);

    if (!entry || now > entry.resetTime) {
      // New window or expired window
      const resetTime = now + windowMs;
      this.storage.set(key, { count: 1, resetTime });
      return {
        isExceeded: false,
        limit,
        remaining: limit - 1,
        reset: Math.ceil(resetTime / 1000),
      };
    }

    if (entry.count >= limit) {
      return {
        isExceeded: true,
        limit,
        remaining: 0,
        reset: Math.ceil(entry.resetTime / 1000),
      };
    }

    entry.count += 1;
    this.storage.set(key, entry);

    return {
      isExceeded: false,
      limit,
      remaining: limit - entry.count,
      reset: Math.ceil(entry.resetTime / 1000),
    };
  }

  /**
   * Periodically cleans up expired entries to prevent memory leaks.
   */
  public cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key);
      }
    }
  }
}
