import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const rows = body.rows;

    const csv =
      Papa.unparse(rows);

    return new NextResponse(
      csv,
      {
        status: 200,

        headers: {
          "Content-Type":
            "text/csv",

          "Content-Disposition":
            'attachment; filename="clean-data.csv"',
        },
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate CSV",
      },
      {
        status: 500,
      }
    );
  }
}