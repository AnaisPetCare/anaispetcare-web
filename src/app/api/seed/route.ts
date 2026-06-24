import { NextRequest, NextResponse } from "next/server";
import { checkAndSeed } from "@/lib/auto-seed";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await checkAndSeed();
  return NextResponse.json({ ok: true, ...result });
}
