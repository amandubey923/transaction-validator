export interface TransactionRecord {
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  payment_mode: string;
  customer_name: string;
  phone: string;
  country: string;
  transaction_date: string;
  transaction_time: string;
  currency: string;

  [key: string]: any;
}

export interface ValidationError {
  row: number;
  order_id: string;
  field: string;
  message: string;
}

export interface ValidationResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  countriesDetected: number;
  successRate: number;
  validData: TransactionRecord[];
  invalidData: TransactionRecord[];
  errors: ValidationError[];
}

export interface CleaningStats {
  recordsCleaned: number;
  phoneFixed: number;
  countryFixed: number;
  dateFixed: number;
  timeFixed: number;
  trimmedFields: number;
}

export interface FileInfo {
  fileName: string;
  fileSize: string;
  totalRows: number;
  totalColumns: number;
  uploadedAt: string;
}

export interface UploadHistory {
  fileName: string;
  uploadedAt: string;
}

export interface CountryChartData {
  country: string;
  count: number;
}

export interface PaymentChartData {
  paymentMode: string;
  count: number;
}