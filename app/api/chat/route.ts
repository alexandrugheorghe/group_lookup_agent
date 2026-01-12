import { NextResponse } from "next/server";
import { runAgent } from "../../../lib/agent";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json().catch(() => ({}));
    const message =
      typeof (body as { message?: unknown })?.message === "string"
        ? ((body as { message: string }).message ?? "").trim()
        : "";

    if (!message) {
      return NextResponse.json(
        { error: "Missing `message` (string) in request body." },
        { status: 400 },
      );
    }

    const result = await runAgent({ message });

    return NextResponse.json({ reply: result.reply }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}


