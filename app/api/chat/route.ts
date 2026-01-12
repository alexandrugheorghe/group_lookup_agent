'use server';

import { HumanMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";
import { compiledGraph } from "../../../lib/graph/agents";
import { randomUUID } from "crypto";

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

    // Get threadId from request or generate a new one
    const threadId =
      typeof (body as { threadId?: unknown })?.threadId === "string"
        ? (body as { threadId: string }).threadId
        : randomUUID();

    console.log("threadId", threadId);
    
    // Invoke with the new message - LangGraph will load previous state from memory
    // and the reducer will merge the new message with existing messages
    const result = await compiledGraph.invoke(
      { messages: [new HumanMessage(message)] }, 
      { configurable: { thread_id: threadId } }
    );

    return NextResponse.json({ 
      reply: result.messages[result.messages.length - 1].content,
      threadId 
    }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}


