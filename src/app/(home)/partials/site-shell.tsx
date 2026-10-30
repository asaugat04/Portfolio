"use client";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { homeNavigation, routes } from "@/constants/routes";
import { useTheme } from "next-themes";
import { Moon, Sun, UserRound } from "lucide-react";
import { mavenPro } from "@/constants/fonts";

export function SiteShell({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: readonly (typeof homeNavigation)[number][];
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [expanded, setExpanded] = useState(false);
  const [scroll, setScroll] = useState({ hidden: false, scrolled: false });
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let previous = window.scrollY;
    function onScroll() {
      const current = window.scrollY;
      if (Math.abs(current - previous) < 5) return;
      setScroll({
        hidden: current > previous && current > 70,
        scrolled: current > 0,
      });
      previous = current;
    }
    function onClick(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setExpanded(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);
  function navigate(event: ReactMouseEvent<HTMLDivElement>) {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    const target = anchor && document.getElementById(anchor.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    const top = window.scrollY + target.getBoundingClientRect().top - 49;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, top);
      return;
    }
    const start = window.scrollY;
    const started = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - started) / 1000, 1);
      window.scrollTo(
        0,
        start + (top - start) * (0.5 - Math.cos(progress * Math.PI) / 2),
      );
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
  return (
    <div
      className={cn(
        "portfolio [&_a:hover]:text-(--portfolio-accent-text)",
        mavenPro.variable,
      )}
      onClick={navigate}
    >
      <nav
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-4 py-2 transition-transform duration-200 ease-linear will-change-transform",
          scroll.hidden && !expanded && "-translate-y-[150%]",
          scroll.scrolled &&
            "border-b border-[#f0f0f0] bg-white py-0 portfolio-dark:border-[#1f1f1f] portfolio-dark:bg-[#0c0c0d]",
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-[15px] min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px]">
          <a
            href={routes.home}
            className="mr-4 inline-block py-[5px] text-[20px] leading-[inherit] font-bold whitespace-nowrap text-[rgba(0,0,0,0.9)] portfolio-dark:text-white"
          >
            <UserRound
              className="inline-block h-[60px] w-14 px-2 py-[10px] align-middle"
              aria-hidden="true"
            />{" "}
            Saugat
          </a>
          <button
            type="button"
            className="group/toggle mr-[10px] size-8 border-0 border-current p-0 leading-8 max-[581px]:bg-white min-[576px]:hidden portfolio-dark:bg-[#0c0c0d] [&_span]:relative [&_span]:my-[5px] [&_span]:block [&_span]:h-[2px] [&_span]:w-full [&_span]:bg-[#212121] [&_span]:transition-all [&_span]:duration-400 [&_span]:ease-[ease] portfolio-dark:[&_span]:bg-[rgba(255,255,255,0.8)] [&[aria-expanded=true]_span:first-child]:top-[6px] [&[aria-expanded=true]_span:first-child]:rotate-45 [&[aria-expanded=true]_span:last-child]:bottom-px [&[aria-expanded=true]_span:last-child]:-rotate-45 [&[aria-expanded=true]_span:nth-child(2)]:hidden"
            aria-controls="site-menu"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
            onClick={() => setExpanded(!expanded)}
          >
            <span />
            <span />
            <span />
          </button>
          <div
            id="site-menu"
            className={`w-full max-[768px]:bg-white max-[768px]:pb-5 max-[768px]:text-center min-[576px]:flex min-[576px]:w-auto min-[576px]:grow min-[576px]:items-center portfolio-dark:bg-[#0c0c0d] ${expanded ? "block" : "hidden"}`}
          >
            <ul className="mx-auto min-[576px]:flex">
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    className="group/nav block overflow-hidden px-5 py-0 text-[16px] font-bold text-[rgba(0,0,0,0.6)] max-[768px]:py-[3px] portfolio-dark:text-[rgba(255,255,255,0.8)]"
                    onClick={() => setExpanded(false)}
                  >
                    <span
                      className="relative inline-block transition-transform duration-300 ease-[ease] group-hover/nav:-translate-y-full group-focus/nav:-translate-y-full before:absolute before:top-full before:transform-[translateZ(0)] before:content-[attr(data-hover)]"
                      data-hover={label}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="min-[992px]:ml-auto">
              <div className="min-[992px]:ml-6">
                <button
                  type="button"
                  className="mx-auto cursor-pointer items-center justify-center font-bold min-[992px]:flex portfolio-dark:text-white"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  aria-label="Toggle color mode"
                  aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
                >
                  <span
                    className="relative right-[6px] inline-flex h-[45px] w-[30px] items-center align-middle [&_svg]:size-[30px]"
                    aria-hidden="true"
                  >
                    <Moon className="portfolio-dark:hidden" />
                    <Sun className="hidden portfolio-dark:block" />
                  </span>
                  <span className="max-[992px]:hidden max-[581px]:block">
                    Color mode
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
