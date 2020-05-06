import { GmoCoinApi } from './http-client';

describe('http-client', () => {
  // TODO: test

  describe('Public API', () => {
    it('should init', () => {
      const onlyPublicInstance = new GmoCoinApi({});
      expect(onlyPublicInstance).toBeTruthy();
    });
  });

  describe('Private API', () => {
    const apiKey = 'xxxxxxxx';
    const secretKey = 'yyyyyyyy';

    it('should init', () => {
      const onlyPublicInstance = new GmoCoinApi({ apiKey, secretKey });
      expect(onlyPublicInstance).toBeTruthy();
    });
  });
});
