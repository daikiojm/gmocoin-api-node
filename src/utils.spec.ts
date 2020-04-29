import { toSha256 } from './utils';

describe('utils', () => {
  describe('toSha256', () => {
    it('should get valid sha256 hash string', () => {
      const sha256 = toSha256('test', 'test');
      expect(typeof sha256).toBe('string');
      expect(sha256.length).toBe(64);
    });
  });
});
