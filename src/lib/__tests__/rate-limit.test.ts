import { expect, test, describe } from 'bun:test';
import { rateLimit } from '../rate-limit';

describe('Rate Limiter', () => {
  const limit = 3;
  const windowMs = 1000;

  test('should allow requests under the limit', () => {
    // Reset by using a new IP
    const testIp = '1.2.3.4';

    // First request
    let result = rateLimit(testIp, limit, windowMs);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(limit - 1);

    // Second request
    result = rateLimit(testIp, limit, windowMs);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(limit - 2);
  });

  test('should block requests over the limit', () => {
    const testIp = '5.6.7.8';

    // Consume all tokens
    for (let i = 0; i < limit; i++) {
      expect(rateLimit(testIp, limit, windowMs).success).toBe(true);
    }

    // Next request should fail
    const result = rateLimit(testIp, limit, windowMs);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  test('should reset after window expires', async () => {
    const testIp = '9.10.11.12';
    const shortWindow = 100; // 100ms

    // Consume tokens
    rateLimit(testIp, limit, shortWindow);
    rateLimit(testIp, limit, shortWindow);
    rateLimit(testIp, limit, shortWindow);

    // Verify blocked
    expect(rateLimit(testIp, limit, shortWindow).success).toBe(false);

    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, shortWindow + 50));

    // Should be allowed again
    const result = rateLimit(testIp, limit, shortWindow);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(limit - 1);
  });
});
