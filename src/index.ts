/**
 * @firela/api-types
 * TypeScript types and SDK client generated from IGN OpenAPI specification
 */

// Auto-generated types
export * from './generated/types.gen';

// SDK client
export { client } from './generated/core/client';

// Re-export commonly used types for convenience
export type {
  // Enums
  AccountType,
  AccountStatus,
  BookingMethod,
  TxnStatus,
  TransactionFlag;
  
  // Transaction types
  Transaction,
  TransactionDetail,
  TransactionResponse,
  TransactionListResponse,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  Posting,
  CreatePostingRequest;
  
  // Account types
  Account,
  AccountResponse,
  AccountListResponse,
  CreateAccountRequest,
  UpdateAccountRequest,
  PlatformInfo;
  
  // Commodity types
  CommodityResponse,
  CommodityListResponse,
  CreateCommodityRequest,
  UpdateCommodityRequest,
  EnsureCommodityRequest;
  
  // Price types
  PriceResponse,
  PriceListResponse,
  CreatePriceRequest,
  UpdatePriceRequest;
  
  // Balance types
  BalanceResponse,
  MultiCurrencyBalanceResponse;
} from './generated/types.gen';
