import Link from "next/link";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Button asChild>
        <Link href={routes.home}>Return to portfolio</Link>
      </Button>
    </main>
  );
}
