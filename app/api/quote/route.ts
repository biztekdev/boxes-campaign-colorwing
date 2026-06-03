import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Campaign quote form submitted:", body);
    return NextResponse.json({ success: true, message: "Quote request received." });
  } catch (error) {
    console.error("Quote API error", error);
    return NextResponse.json({ success: false, message: "Failed to submit quote." }, { status: 500 });
  }
}
