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

export type SpotSymbol = 'BTC' | 'ETH' | 'BCH' | 'LTC' | 'XRP';

export type LeverageSymbol = 'ETH_JPY' | 'BCH_JPY' | 'LTC_JPY' | 'XRP_JPY';

export type Symbol = SpotSymbol | LeverageSymbol;

export type OrderSide = 'BUY' | 'SELL';

export type OrderType = 'NORMAL' | 'LOSSCUT';

export type ExecutionType = 'MARKET' | 'LIMIT' | 'STOP';

export type SettleType = 'OPEN' | 'CLOSE';

export type OrderStatus = 'WAITING' | 'ORDERED' | 'MODIFYING' | 'CANCELLING' | 'CANCELED' | 'EXECUTED' | 'EXPIRED';

export type TimeInForce = 'FAK' | 'FAS';

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

export type ResponseList<T> = {
  list: T[];
};

export type ResponseListWithPagination<T, P = Pagination> = ResponseList<T> & {
  pagination: P;
};

// https://api.coin.z.com/docs/#status
export type StatusResponse = {
  status: 'MAINTENANCE' | 'PREOPEN' | 'OPEN';
};

export type Pagination = {
  currentPage: number;
  count: number;
};

// https://api.coin.z.com/docs/#ticker
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

// https://api.coin.z.com/docs/#ticker
export type TickerResponse = Ticker[];

// https://api.coin.z.com/docs/#orderbooks
export type Book = {
  price: string;
  size: string;
};

// https://api.coin.z.com/docs/#orderbooks
export type OrderBooksResponse = {
  asks: Book[];
  bids: Book[];
  symbol: Symbol;
};

// https://api.coin.z.com/docs/#trades
export type Trade = {
  price: string;
  side: 'BUY' | 'SELL';
  size: string;
  timestamp: string;
};

// https://api.coin.z.com/docs/#trades
export type TradesResponse = ResponseListWithPagination<Trade>;

// https://api.coin.z.com/docs/#margin
export type AccountMarginResponse = {
  actualProfitLoss: string;
  availableAmount: string;
  margin: string;
  profitLoss: string;
};

// https://api.coin.z.com/docs/#assets
export type Asset = {
  amount: string;
  available: string;
  conversionRate: string;
  symbol: SpotSymbol;
};

// https://api.coin.z.com/docs/#assets
export type AccountAssetsResponse = Asset[];

// https://api.coin.z.com/docs/#orders
export type Order = {
  rootOrderId: number;
  orderId: number;
  symbol: Symbol;
  side: OrderSide;
  orderType: OrderType;
  executionType: ExecutionType;
  settleType: SettleType;
  size: string;
  executedSize: string;
  price: string;
  status: OrderStatus;
  timeInForce: TimeInForce;
  timestamp: string;
};

// https://api.coin.z.com/docs/#orders
export type OrdersResponse = ResponseList<Order>;

// https://api.coin.z.com/docs/#active-orders
export type ActiveOrdersResponse = ResponseListWithPagination<Order>;

// https://api.coin.z.com/docs/#executions
export type Execution = {
  executionId: number;
  orderId: number;
  symbol: Symbol;
  side: OrderSide;
  settleType: SettleType;
  size: string;
  price: string;
  lossGain: string;
  fee: string;
  timestamp: string;
};

// https://api.coin.z.com/docs/#executions
export type ExecutionsResponse = ResponseList<Execution>;

// https://api.coin.z.com/docs/#latest-executions
export type LatestExecutionsResponse = ResponseListWithPagination<Execution>;

// https://api.coin.z.com/docs/#open-positions
export type Position = {
  positionId: number;
  symbol: LeverageSymbol;
  side: OrderSide;
  size: string;
  // typo?
  orderdSize: string;
  price: string;
  lossGain: string;
  losscutPrice: string;
  timestamp: string;
};

// https://api.coin.z.com/docs/#open-positions
export type OpenPositionsResponse = ResponseListWithPagination<Position>;

// https://api.coin.z.com/docs/#position-summary
export type PositionSummary = {
  averagePositionRate: string;
  positionLossGain: string;
  side: OrderSide;
  sumOrderQuantity: string;
  sumPositionQuantity: string;
  symbol: string;
};

// https://api.coin.z.com/docs/#position-summary
export type PositionSummaryResponse = ResponseList<PositionSummary>;

// https://api.coin.z.com/docs/#order
export type OrderRequest = {
  symbol: Symbol;
  side: OrderSide;
  executionType: ExecutionType;
  price?: string;
  size: string;
};

// https://api.coin.z.com/docs/#order
export type OrderResponse = string;

// https://api.coin.z.com/docs/#close-order
export type CloseOrderRequest = {
  symbol: Symbol;
  side: OrderSide;
  executionType: ExecutionType;
  price?: string;
  settlePosition: {
    positionId: number;
    size: string;
  }[];
};

// https://api.coin.z.com/docs/#close-order
export type CloseOrderResponse = string;

// https://api.coin.z.com/docs/#close-bulk-order
export type CloseBulkOrderRequest = {
  symbol: Symbol;
  side: OrderSide;
  executionType: ExecutionType;
  price?: string;
};

// https://api.coin.z.com/docs/#close-bulk-order
export type CloseBulkOrderResponse = string;
