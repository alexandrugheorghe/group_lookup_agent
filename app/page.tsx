import { Chat } from "../components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-2">
          <div className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            Neya take-home
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Chat with Neya</h1>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            This UI is intentionally minimal. The core of the exercise lives in{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-xs dark:bg-white/10">
              lib/agent.ts
            </code>
            .
          </p>
        </header>
        <Chat />
      </main>
    </div>
  );
}
