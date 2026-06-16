import Papa from "papaparse";
import { TransactionRecord } from "@/types/transaction";

const HEADER_MAP: Record<string, string> = {
  orderid: "order_id",
  order_id: "order_id",

  productid: "product_id",
  product_id: "product_id",

  productname: "product_name",
  product_name: "product_name",

  paymentmode: "payment_mode",
  payment_mode: "payment_mode",

  customername: "customer_name",
  customer_name: "customer_name",

  orderdate: "transaction_date",
  transactiondate: "transaction_date",
  transaction_date: "transaction_date",
  date: "transaction_date",

  ordertime: "transaction_time",
  transactiontime: "transaction_time",
  transaction_time: "transaction_time",
  time: "transaction_time",

  phone: "phone",
  country: "country",
  quantity: "quantity",
  unitprice: "unit_price",
  totalamount: "total_amount",
  currency: "currency",
};

export const parseCsvFile = (
  file: File
): Promise<TransactionRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,

      transformHeader: (header) => {
        const normalized = header
          .trim()
          .toLowerCase();

        return (
          HEADER_MAP[normalized] ||
          normalized.replace(/\s+/g, "_")
        );
      },

      complete: (results) => {
        resolve(
          results.data as TransactionRecord[]
        );
      },

      error: (error) => {
        reject(error);
      },
    });
  });
};