import { advanceTo, clear, advanceBy } from 'jest-date-mock';

import { toSha256, makeAuthHeader } from './utils';

describe('utils', () => {
  describe('toSha256', () => {
    it('should get valid sha256 hash string', () => {
      const sha256 = toSha256('test', 'test');
      expect(typeof sha256).toBe('string');
      expect(sha256.length).toBe(64);
    });
  });

  describe('makeAuthHeader', () => {
    const apiKey = 'xxxxxxxx';
    const secretKey = 'yyyyyyyy';

    beforeEach(() => {
      clear();
    });

    afterEach(() => {
      clear();
    });

    it('should get valid auth headers', async () => {
      advanceTo(new Date());
      const method = 'GET';
      const path = '/v1/account/margin';

      const headers = makeAuthHeader(apiKey, secretKey, method, path);
      advanceBy(1000);
      const headers2 = makeAuthHeader(apiKey, secretKey, method, path);

      expect('API-KEY' in headers).toBeTruthy();
      expect('API-TIMESTAMP' in headers).toBeTruthy();
      expect('API-SIGN' in headers).toBeTruthy();

      expect(headers['API-KEY']).toBe(apiKey);
      expect(+headers2['API-TIMESTAMP']).toBeGreaterThan(+headers['API-TIMESTAMP']);
      expect(headers['API-SIGN']).not.toBe(headers2['API-SIGN']);
    });

    it('should get valid auth headers with params', () => {
      const method = 'GET';
      const path = '/v1/account/orders';
      const params = { orderId: 1 };

      const headers = makeAuthHeader(apiKey, secretKey, method, path, params);
      advanceBy(1000);
      const headers2 = makeAuthHeader(apiKey, secretKey, method, path, params);

      expect('API-KEY' in headers).toBeTruthy();
      expect('API-TIMESTAMP' in headers).toBeTruthy();
      expect('API-SIGN' in headers).toBeTruthy();

      expect(headers['API-KEY']).toBe(apiKey);
      expect(+headers2['API-TIMESTAMP']).toBeGreaterThan(+headers['API-TIMESTAMP']);
      expect(headers['API-SIGN']).not.toBe(headers2['API-SIGN']);
    });

    it('should get valid auth headers with body', () => {
      const method = 'POST';
      const path = '/v1/account/order';
      const data = { symbol: 'BTC', side: 'BUY', executionType: 'LIMIT', price: '801000', size: '0.001' };

      const headers = makeAuthHeader(apiKey, secretKey, method, path, {}, data);
      advanceBy(1000);
      const headers2 = makeAuthHeader(apiKey, secretKey, method, path, {}, data);

      expect('API-KEY' in headers).toBeTruthy();
      expect('API-TIMESTAMP' in headers).toBeTruthy();
      expect('API-SIGN' in headers).toBeTruthy();

      expect(headers['API-KEY']).toBe(apiKey);
      expect(+headers2['API-TIMESTAMP']).toBeGreaterThan(+headers['API-TIMESTAMP']);
      expect(headers['API-SIGN']).not.toBe(headers2['API-SIGN']);
    });
  });
});
