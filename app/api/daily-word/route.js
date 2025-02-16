import { NextResponse } from "next/server";
import { getDailySolution } from "../../../lib/words";

export async function GET() {
  return NextResponse.json({ word: getDailySolution() });
}
