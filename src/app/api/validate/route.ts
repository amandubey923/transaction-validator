import { NextResponse } from "next/server";
import { validateTransactions } from "@/lib/validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const records = body.records || [];

    const result =
      validateTransactions(records);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Validation process failed",
      },
      {
        status: 500,
      }
    );
  }
}