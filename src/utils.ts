import crypto from 'crypto';
import { HttpHeader, ArrowedHttpMethod } from './types';

export const toSha256 = (key: string, value: string) =>
  crypto.createHmac('sha256', key).update(Buffer.from(value)).digest('hex').toString();

export const makeAuthHeader = (
  apiKey: string,
  secretKey: string,
  method: ArrowedHttpMethod,
  path: string,
  params?: {},
  body?: {},
): HttpHeader => {
  const timestamp = Date.now().toString();
  const bodyAsString = body ? JSON.stringify(body) : '';
  const text = `${timestamp}${method}${path}${bodyAsString}`;
  const signature = toSha256(secretKey, text);

  return {
    'API-KEY': apiKey,
    'API-TIMESTAMP': timestamp,
    'API-SIGN': signature,
  };
};
