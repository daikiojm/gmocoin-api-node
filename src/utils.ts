import crypto from 'crypto';
import * as querystring from 'querystring';
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
  const paramsAsString = params && Object.keys(params).length > 0 ? `?${querystring.stringify(params)}` : '';
  const bodyAsString = body ? JSON.stringify(body) : '';
  const text = `${timestamp}${method}${path}${paramsAsString}${bodyAsString}`;
  const signature = toSha256(secretKey, text);

  return {
    'API-KEY': apiKey,
    'API-TIMESTAMP': timestamp,
    'API-SIGN': signature,
  };
};
