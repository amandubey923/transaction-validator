import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = body.data || [];

    const csv = Papa.unparse(data);

    return new NextResponse(csv, {
      headers: {
        "Content-Type":
          "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="clean_transactions.csv"',
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "CSV generation failed",
      },
      {
        status: 500,
      }
    );
  }
}