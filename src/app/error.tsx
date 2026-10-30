"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Unable to load this page</h1>
      <p className="text-neutral-500">Please try again in a moment.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
