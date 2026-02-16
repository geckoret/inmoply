import { LRUCache } from 'lru-cache';

type RateLimitRecord = {
  count: number;
  startTime: number;
};

// Configure cache to hold up to 500 IPs.
// TTL is set to 5 minutes to ensure records persist longer than the 1-minute rate limit window,
// but eventually get cleaned up if the IP stops making requests.
const options = {
  max: 500,
  ttl: 5 * 60 * 1000,
};

const cache = new LRUCache<string, RateLimitRecord>(options);

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60 * 1000) {
  const now = Date.now();
  let record = cache.get(ip);

  // Initialize if new
  if (!record) {
    record = { count: 0, startTime: now };
  }

  // Reset if window passed
  if (now - record.startTime > windowMs) {
    record = { count: 0, startTime: now };
  }

  // Check limit
  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: record.startTime + windowMs,
    };
  }

  // Increment and update
  record.count++;
  cache.set(ip, record);

  return {
    success: true,
    limit,
    remaining: limit - record.count,
    reset: record.startTime + windowMs,
  };
}
