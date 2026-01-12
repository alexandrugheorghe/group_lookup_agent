"use client";

import { useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: newId(),
      role: "assistant",
      content:
        "Hey 👋 I’m Neya. Tell me what groups you're interested in, and I'll try and find a match for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setIsSending(true);
    setInput("");

    const userMsg: ChatMessage = { id: newId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data: { reply?: string; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const reply = data.reply?.trim();
      if (!reply) throw new Error("Empty reply from server");

      const assistantMsg: ChatMessage = { id: newId(), role: "assistant", content: reply };
      setMessages((prev) => [...prev, assistantMsg]);
      queueMicrotask(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          content:
            "Sorry — I hit an error while trying to respond. If you’re running this locally, double-check your `.env.local` API key.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        ref={listRef}
        className="h-[60vh] w-full overflow-auto rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/15 dark:bg-black"
      >
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={[
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                m.role === "user"
                  ? "ml-auto bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                  : "mr-auto bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50",
              ].join(" ")}
            >
              {m.content}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            className="min-h-[48px] w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-black/20 dark:border-white/15 dark:bg-black dark:focus:border-white/25"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={!canSend}
            className="h-12 shrink-0 rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {isSending ? "Sending…" : "Send"}
          </button>
        </div>

        {error ? (
          <div className="text-xs text-red-600 dark:text-red-400">{error}</div>
        ) : null}

        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Tip: press Enter to send, Shift+Enter for a new line.
        </div>
      </div>
    </div>
  );
}


