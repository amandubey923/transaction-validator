import { NextResponse } from "next/server";

import { validateTransactions } from "@/lib/validator";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const rows = body.rows;

    const result =
      validateTransactions(rows);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Validation failed",
      },
      {
        status: 500,
      }
    );
  }
}