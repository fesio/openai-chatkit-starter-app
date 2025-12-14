"use client";

import { ChatPanel } from "@/components/ChatPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme } = useColorScheme();

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatPanel theme={scheme} />
      </div>
    </main>
  );
}
