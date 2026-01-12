'use server';

import { HumanMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";
import { compiledGraph } from "../../../lib/graph/agents";

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

    const result = await compiledGraph.invoke({ messages: [new HumanMessage(message)] });

    return NextResponse.json({ reply: result.messages[result.messages.length - 1].content }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}


