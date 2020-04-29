import axios, { AxiosRequestConfig } from 'axios';
import { ApiConfig, ResponseRoot, StatusResponse, TickerResponse, OrderBooksResponse, TradesResponse } from './types';
import { makeAuthHeader } from './utils';
import { httpPublicEndPoint, httpPrivateEndPoint } from './constants';

type ArrowedHttpMethod = 'GET' | 'POST' | 'PUT';
type HttpHeader = { [name: string]: string | string[] };

const defaultTimeout = 3000;

export class GmoCoinApi {
  private readonly endPoints: {
    public: string;
    private: string;
  } = {
    public: httpPublicEndPoint,
    private: httpPrivateEndPoint,
  };
  private readonly timeout!: number;
  private readonly apiKey?: string;
  private readonly secretKey?: string;

  constructor(config: ApiConfig) {
    if (config.endPoints) {
      this.endPoints = config.endPoints;
    }
    this.timeout = config.timeout || defaultTimeout;
    this.apiKey = config.apiKey;
    this.secretKey = config.secretKey;
  }

  async getStatus() {
    return this.get<StatusResponse>('/v1/status');
  }

  async getTicker(params: { symbol?: Symbol }) {
    return this.get<TickerResponse>('/v1/ticker', params);
  }

  async getOrderBooks(params: { symbol: Symbol }) {
    return this.get<OrderBooksResponse>('/v1/orderbooks', params);
  }

  async getTrades(params: { symbol: Symbol; page?: number; count?: number }) {
    return this.get<TradesResponse>('/v1/trades', params);
  }

  async get<T>(path: string, params?: {}) {
    return this.request<T>(this.endPoints.public, 'GET', path, params);
  }

  async getWithAuth<T>(path: string, params?: {}) {
    return this.requestWithAuth<T>(this.endPoints.private, 'GET', path, params);
  }

  async postWithAuth<T>(path: string, data?: {}) {
    return this.requestWithAuth<T>(this.endPoints.private, 'GET', path, {}, data);
  }

  private async request<T>(baseUrl: string, method: ArrowedHttpMethod, path: string, params?: {}, data?: {}, headers?: HttpHeader) {
    let options: AxiosRequestConfig = {
      method,
      baseURL: baseUrl,
      url: path,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
      } as HttpHeader,
    };

    if (params && Object.keys(params).length > 0) {
      options = {
        ...options,
        params,
      };
    }

    if (data && Object.keys(data).length > 0) {
      options = {
        ...options,
        data,
      };
    }

    if (headers && Object.keys(headers).length > 0) {
      options = {
        ...options,
        headers,
      };
    }

    const response = await axios.request<ResponseRoot<T>>(options);
    if (response.data && response.data.messages) {
      const errors = response.data.messages;
      // here we throw the first error we can identify
      for (const error of errors) {
        throw new Error(error.message_string);
      }
    }

    return response.data;
  }

  private async requestWithAuth<T>(baseUrl: string, method: ArrowedHttpMethod, path: string, params?: {}, data?: {}) {
    if (!this.apiKey) {
      throw new Error('You need to pass an API Key to create this instance.');
    }

    if (!this.secretKey) {
      throw new Error('You need to pass an API Secret to create this instance.');
    }

    const headers = makeAuthHeader(this.apiKey, this.secretKey, method, path, params, data);

    return this.request<T>(baseUrl, method, path, params, data, headers);
  }
}
