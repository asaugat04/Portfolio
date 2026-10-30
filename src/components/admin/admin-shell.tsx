"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Mail,
  Menu,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { sections, sectionKeys } from "@/constants/content";
import { routes } from "@/constants/routes";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const links = [
    { href: routes.admin, label: "Overview", Icon: LayoutDashboard },
    ...sectionKeys.map((key) => ({
      href: routes.section(key),
      label: sections[key].title,
      Icon: null,
    })),
    { href: routes.section("messages"), label: "Messages", Icon: Mail },
  ];
  async function logout() {
    setPending(true);
    setError("");
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Unable to sign out");
      router.replace(routes.login);
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-r bg-white md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="flex items-center justify-between p-6">
          <Link
            href={routes.admin}
            className="text-lg font-semibold tracking-tight"
          >
            Portfolio<span className="text-amber-500">.</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle admin navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </Button>
        </div>
        <nav
          aria-label="Admin navigation"
          className={cn("px-3 pb-6 md:block", !open && "hidden")}
        >
          {links.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100",
                pathname === href &&
                  "bg-neutral-100 font-medium text-neutral-950",
              )}
            >
              {Icon ? (
                <Icon className="size-4" />
              ) : (
                <span className="mx-[5px] size-1.5 rounded-full bg-neutral-300" />
              )}
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-6 py-4">
          <span className="text-sm text-neutral-500">{email}</span>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={routes.home} target="_blank">
                View website
                <ExternalLink />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={pending}
              onClick={logout}
            >
              <LogOut />
              Sign out
            </Button>
          </div>
          {error && (
            <p role="alert" className="w-full text-sm text-red-600">
              {error}
            </p>
          )}
        </header>
        <main className="mx-auto max-w-6xl p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
