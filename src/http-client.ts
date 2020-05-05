import axios, { AxiosRequestConfig } from 'axios';
import {
  ApiConfig,
  ResponseRoot,
  StatusResponse,
  TickerResponse,
  OrderBooksResponse,
  TradesResponse,
  AccountMarginResponse,
  AccountAssetsResponse,
  OrdersResponse,
  Symbol,
  ActiveOrdersResponse,
  ExecutionsResponse,
  LatestExecutionsResponse,
  LeverageSymbol,
  OpenPositionsResponse,
  PositionSummaryResponse,
  OrderRequest,
  OrderResponse,
  CloseOrderRequest,
  CloseOrderResponse,
  CloseBulkOrderRequest,
  CloseBulkOrderResponse,
} from './types';
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

  async getAccountMargin() {
    return this.getWithAuth<AccountMarginResponse>('/v1/account/margin');
  }

  async getAccountAsset() {
    return this.getWithAuth<AccountAssetsResponse>('/v1/account/assets');
  }

  async getOrders(params: { orderId: number }) {
    return this.getWithAuth<OrdersResponse>('/v1/orders', params);
  }

  async getActiveOrders(params: { symbol: Symbol; page?: number; count?: number }) {
    return this.getWithAuth<ActiveOrdersResponse>('/v1/activeOrders', params);
  }

  async getExecutions(params: { orderId?: number; executionId?: number }) {
    return this.getWithAuth<ExecutionsResponse>('/v1/executions', params);
  }

  async getLatestExecutions(params: { symbol: Symbol; page?: number; count?: number }) {
    return this.getWithAuth<LatestExecutionsResponse>('/v1/latestExecutions', params);
  }

  async getOpenPositions(params: { symbol: LeverageSymbol; page?: number; count?: number }) {
    return this.getWithAuth<OpenPositionsResponse>('/v1/openPositions', params);
  }

  async getPositionSummary(params: { symbol: LeverageSymbol }) {
    return this.getWithAuth<PositionSummaryResponse>('/v1/positionSummary', params);
  }

  async postOrder(params: OrderRequest) {
    return this.postWithAuth<OrderResponse>('/v1/order', params);
  }

  async postChangeOrder(params: { orderId: number; price: string }) {
    // todo: fix type
    return this.postWithAuth<{}>('/v1/changeOrder', params);
  }

  async postCancelOrder(params: { orderId: number }) {
    // todo: fix type
    return this.postWithAuth<{}>('/v1/cancelOrder', params);
  }

  async postCloseOrder(params: CloseOrderRequest) {
    return this.postWithAuth<CloseOrderResponse>('/v1/closeOrder', params);
  }

  async postCloseBulkOrder(params: CloseBulkOrderRequest) {
    return this.postWithAuth<CloseBulkOrderResponse>('/v1/closeBulkOrder', params);
  }

  async postChangeLosscutPrice(params: { positionId: number; losscutPrice: string }) {
    // todo: fix type
    return this.postWithAuth<{}>('/v1/changeLosscutPrice', params);
  }

  private async get<T>(path: string, params?: {}) {
    return this.request<T>(this.endPoints.public, 'GET', path, params);
  }

  private async getWithAuth<T>(path: string, params?: {}) {
    return this.requestWithAuth<T>(this.endPoints.private, 'GET', path, params);
  }

  private async postWithAuth<T>(path: string, data?: {}) {
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
