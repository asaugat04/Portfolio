"use client";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { homeNavigation, routes } from "@/constants/routes";
import { themeStorageKey, themeMediaQuery } from "@/constants/theme";

function applyPreferredTheme() {
  let saved;
  try {
    saved = localStorage.getItem(themeStorageKey);
  } catch {}
  document.documentElement.dataset.portfolioTheme =
    saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia(themeMediaQuery).matches
        ? "dark"
        : "light";
}
function subscribeTheme(callback: () => void) {
  const query = window.matchMedia(themeMediaQuery);
  function update() {
    applyPreferredTheme();
    callback();
  }
  query.addEventListener("change", update);
  window.addEventListener("storage", update);
  window.addEventListener(themeStorageKey, callback);
  return () => {
    query.removeEventListener("change", update);
    window.removeEventListener("storage", update);
    window.removeEventListener(themeStorageKey, callback);
  };
}
function toggleTheme() {
  const next =
    document.documentElement.dataset.portfolioTheme === "dark"
      ? "light"
      : "dark";
  try {
    localStorage.setItem(themeStorageKey, next);
  } catch {}
  document.documentElement.dataset.portfolioTheme = next;
  window.dispatchEvent(new Event(themeStorageKey));
}
export function SiteShell({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: readonly (typeof homeNavigation)[number][];
}) {
  useLayoutEffect(applyPreferredTheme, []);
  const dark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.portfolioTheme === "dark",
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
    <div className="portfolio" onClick={navigate}>
      <nav
        ref={navRef}
        className={cn(
          "site-nav",
          scroll.hidden && !expanded && "hidden-nav",
          scroll.scrolled && "scrolled",
        )}
        aria-label="Main navigation"
      >
        <div className="portfolio-container flex flex-wrap items-center justify-between">
          <a href={routes.home} className="site-brand">
            <i className="uil uil-user" aria-hidden="true" /> Saugat
          </a>
          <button
            type="button"
            className="nav-toggle min-[576px]:hidden"
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
            className={`site-menu w-full min-[576px]:flex min-[576px]:w-auto min-[576px]:grow min-[576px]:items-center ${expanded ? "block" : "hidden"}`}
          >
            <ul className="mx-auto min-[576px]:flex">
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    className="nav-link"
                    onClick={() => setExpanded(false)}
                  >
                    <span data-hover={label}>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="min-[992px]:ml-auto">
              <div className="min-[992px]:ml-6">
                <button
                  type="button"
                  className="color-mode mx-auto items-center justify-center min-[992px]:flex"
                  onClick={toggleTheme}
                  aria-label="Toggle color mode"
                  aria-pressed={dark}
                >
                  <i className="color-mode-icon" aria-hidden="true" />
                  <span className="color-mode-text">Color mode</span>
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
