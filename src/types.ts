export type HttpHeader = { [name: string]: string | string[] };

export type ArrowedHttpMethod = 'GET' | 'POST' | 'PUT';

export type ApiConfig = {
  endPoints?: {
    public: string;
    private: string;
  };
  keepAlive?: boolean;
  timeout?: number;
  apiKey?: string;
  secretKey?: string;
};

export type Symbol = 'BTC' | 'ETH' | 'BCH' | 'LTC' | 'XRP' | 'BTC_JPY' | 'ETH_JPY' | 'BCH_JPY' | 'LTC_JPY' | 'XRP_JPY';

export type Message = {
  message_code: string;
  message_string: string;
};

export type ResponseRoot<T> = {
  status: 0 | 1;
  messages?: Message[];
  data: T;
  responsetime: string;
};

export type StatusResponse = {
  status: 'MAINTENANCE' | 'PREOPEN' | 'OPEN';
};

export type Pagination = {
  currentPage: number;
  count: number;
};

export type Ticker = {
  ask: string;
  bid: string;
  high: string;
  last: string;
  low: string;
  symbol: Symbol;
  timestamp: string;
  volume: string;
};

export type TickerResponse = Ticker[];

export type Book = {
  price: string;
  size: string;
};

export type OrderBooksResponse = {
  asks: Book[];
  bids: Book[];
  symbol: Symbol;
};

export type Trade = {
  price: string;
  side: 'BUY' | 'SELL';
  size: string;
  timestamp: string;
};

export type TradesResponse = {
  pagination: Pagination;
  list: Trade[];
};
