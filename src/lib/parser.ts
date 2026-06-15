import Papa from "papaparse";

function normalizeRow(
  row: Record<string, string>
): Record<string, string> {
  return {
    orderId:
      row["orderId"] ||
      row["Order ID"] ||
      row["order_id"] ||
      "",

    phone:
      row["phone"] ||
      row["Phone"] ||
      row["Phone Number"] ||
      row["phone_number"] ||
      "",

    country:
      row["country"] ||
      row["Country"] ||
      row["Country Code"] ||
      row["country_code"] ||
      "",

    orderDate:
      row["orderDate"] ||
      row["Order Date"] ||
      row["date"] ||
      "",

    paymentMode:
      row["paymentMode"] ||
      row["Payment Mode"] ||
      row["payment_mode"] ||
      "",

    productName:
      row["productName"] ||
      row["Product Name"] ||
      row["product_name"] ||
      "",
  };
}

export function parseCSV(
  file: File
): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const normalizedRows =
          results.data.map(normalizeRow);

        resolve(normalizedRows);
      },

      error: (error) => {
        reject(error);
      },
    });
  });
}