type RateLimitRecord = {
  count: number;
  startTime: number;
};

const cache = new Map<string, RateLimitRecord>();

// Simple cleanup mechanism: clean up every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  for (const [ip, record] of cache.entries()) {
    if (now - record.startTime > CLEANUP_INTERVAL) {
      cache.delete(ip);
    }
  }
  lastCleanup = now;
}

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60 * 1000) {
  const now = Date.now();

  cleanup(); // Occasional cleanup

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
