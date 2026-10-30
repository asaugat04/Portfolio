"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { site } from "@/constants/site";
import { routes } from "@/constants/routes";

export function Analytics() {
  const pathname = usePathname();
  if (pathname.startsWith(routes.admin)) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(site.analyticsId)});`}</Script>
      <VercelAnalytics />
    </>
  );
}
