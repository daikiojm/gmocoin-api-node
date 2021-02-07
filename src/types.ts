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

export type CancelType =
  | 'USER'
  | 'POSITION_LOSSCUT'
  | 'INSUFFICIENT_BALANCE'
  | 'INSUFFICIENT_MARGIN'
  | 'ACCOUNT_LOSSCUT'
  | 'EXPIRED_FAK'
  | 'EXPIRED_FOK'
  | 'EXPIRED_SOK';

export type TimeInForce = 'FAK' | 'FAS' | 'FOK' | 'SOK';

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

/**
 * Response of Service Status.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#status | Service Status}
 */
export type StatusResponse = {
  status: 'MAINTENANCE' | 'PREOPEN' | 'OPEN';
};

export type Pagination = {
  currentPage: number;
  count: number;
};

/**
 * Ticker.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#ticker | Ticker}
 */
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

/**
 * Response of Ticker.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#orderbooks | Order Books}
 */
export type TickerResponse = Ticker[];

/**
 * Book
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#orderbooks | Order Books}
 */
export type Book = {
  price: string;
  size: string;
};

/**
 * Response of OrderBooks.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#orderbooks | Order Books}
 */
export type OrderBooksResponse = {
  asks: Book[];
  bids: Book[];
  symbol: Symbol;
};

/**
 * Trade
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#trades | Trade History}
 */
export type Trade = {
  price: string;
  side: 'BUY' | 'SELL';
  size: string;
  timestamp: string;
};

/**
 * Response of Trades.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#trades | Trade History}
 */
export type TradesResponse = ResponseListWithPagination<Trade>;

/**
 * Response of Margin.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#margin | Margin}
 */
export type AccountMarginResponse = {
  actualProfitLoss: string;
  availableAmount: string;
  margin: string;
  profitLoss: string;
};

/**
 * Asset
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#assets | Assets}
 */
export type Asset = {
  amount: string;
  available: string;
  conversionRate: string;
  symbol: SpotSymbol;
};

/**
 * Response of Assets
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#assets | Assets}
 */
export type AccountAssetsResponse = Asset[];

/**
 * Order
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#orders | Orders}
 */
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
  cancelType?: CancelType;
  timeInForce: TimeInForce;
  timestamp: string;
};

/**
 * Response of Orders.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#orders | Orders}
 */
export type OrdersResponse = ResponseList<Order>;

/**
 * Response of Active Orders
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#active-orders | Active Orders}
 */
export type ActiveOrdersResponse = ResponseListWithPagination<Order>;

/**
 * Execution
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#executions | Executions}
 */
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

/**
 * Response of Executions.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#executions | Executions}
 */
export type ExecutionsResponse = ResponseList<Execution>;

/**
 * Response of Latest Executions.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#latest-executions | Latest Executions}
 */
export type LatestExecutionsResponse = ResponseListWithPagination<Execution>;

/**
 * Position
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#open-positions | Open Positions}
 */
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

/**
 * Response of Open Positions.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#open-positions | Open Positions}
 */
export type OpenPositionsResponse = ResponseListWithPagination<Position>;

/**
 * PositionSummary
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#position-summary | Position Summary}
 */
export type PositionSummary = {
  averagePositionRate: string;
  positionLossGain: string;
  side: OrderSide;
  sumOrderQuantity: string;
  sumPositionQuantity: string;
  symbol: string;
};

/**
 * Response of Position Summary.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#position-summary | Position Summary}
 */
export type PositionSummaryResponse = ResponseList<PositionSummary>;

/**
 * Request of Order.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#order | Order}
 */
export type OrderRequest = {
  symbol: Symbol;
  side: OrderSide;
  executionType: ExecutionType;
  timeInForce?: TimeInForce;
  price?: string;
  losscutPrice?: string;
  size: string;
  cancelBefore?: boolean;
};

/**
 * Request of ChangeOrder.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/#change-order | Order}
 */
export type ChangeOrderRequest = {
  orderId: number;
  price: string;
  losscutPrice?: string;
};

/**
 * Request of CancelOrder.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/#cancel-order | Order}
 */
export type CancelOrderRequest = {
  orderId: number;
};

/**
 * Request of CancelOrders.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/#cancel-orders | Order}
 */
export type CancelOrdersRequest = {
  orderIds: number[];
};

/**
 * Response of CancelOrders.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/#cancel-orders | Order}
 */
export type CancelOrdersResponse = {
  failed?: {
    message_code: string;
    message_string: string;
    orderId: number;
  }[];
  success?: number[];
};

/**
 * Request of CancelBulkOrder.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/#cancel-bulk-order | Order}
 */
export type CancelBulkOrderRequest = {
  symbol: Symbol;
  side?: OrderSide;
  settleType?: SettleType;
  desc?: boolean;
};

/**
 * Response of Order.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#order | Order}
 */
export type OrderResponse = string;

/**
 * Request of Close Order.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#close-order | Close Order}
 */
export type CloseOrderRequest = {
  symbol: Symbol;
  side: OrderSide;
  executionType: ExecutionType;
  timeInForce?: TimeInForce;
  price?: string;
  settlePosition: {
    positionId: number;
    size: string;
  }[];
  cancelBefore?: boolean;
};

/**
 * Response of Close Order.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#close-order | Close Order}
 */
export type CloseOrderResponse = string;

/**
 * Request of Close Bulk Order.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#close-bulk-order | Close Bulk Order}
 */
export type CloseBulkOrderRequest = {
  symbol: Symbol;
  side: OrderSide;
  executionType: ExecutionType;
  price?: string;
};

/**
 * Response of Close Bulk Order.
 *
 * @remarks
 * API Docs: {@link https://api.coin.z.com/docs/en/#close-bulk-order | Close Bulk Order}
 */
export type CloseBulkOrderResponse = string;
