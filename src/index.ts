/**
 * @firela/api-types
 * TypeScript types and SDK client generated from IGN OpenAPI specification
 */

// Auto-generated types
export * from './generated/types.gen';

// SDK client (fetch-based)
export { client } from './generated/sdk.gen';

// Re-export commonly used types for convenience
export type {
  // Enums
  AccountType,
  AccountStatus,
  BookingMethod,
  TxnStatus,
  TransactionFlag,
  
  // Transaction types
  Transaction,
  TransactionDetail,
  TransactionResponse,
  TransactionListResponse,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  Posting,
  CreatePostingRequest,
  
  // Account types
  Account,
  AccountResponse,
  AccountListResponse,
  CreateAccountRequest,
  UpdateAccountRequest,
  PlatformInfo,
  
  // Commodity types
  CommodityResponse,
  CommodityListResponse,
  CreateCommodityRequest,
  UpdateCommodityRequest,
  EnsureCommodityRequest,
  
  // Price types
  PriceResponse,
  PriceListResponse,
  CreatePriceRequest,
  UpdatePriceRequest,
  
  // Balance types
  BalanceResponse,
  MultiCurrencyBalanceResponse,
  
  // Health
  HealthResponse,
  
  // Error
  ApiError,
} from './generated/types.gen';
