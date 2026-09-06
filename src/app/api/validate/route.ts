import { NextResponse } from "next/server";
import { validateTransactions } from "@/lib/validator";
import { cleanTransactionData } from "@/lib/dataCleaner";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawRecords = body.records || [];

    const shouldClean = body.clean !== false;
    const { cleanedData, cleaningStats } = shouldClean
      ? cleanTransactionData(rawRecords)
      : { cleanedData: rawRecords, cleaningStats: null };

    const result = validateTransactions(cleanedData);

    return NextResponse.json({
      success: true,
      result,
      cleaningStats,
    });
  } catch (error) {
    console.error("API Validation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Validation process failed",
      },
      {
        status: 500,
      }
    );
  }
}