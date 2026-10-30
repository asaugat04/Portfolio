import localFont from "next/font/local";

export const mavenPro = localFont({
  src: [
    {
      path: "../../public/font/maven-pro-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/maven-pro-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-maven-pro",
  display: "swap",
});

export const unicons = localFont({
  src: "../../public/font/unicons.woff2",
  variable: "--font-unicons",
  display: "block",
  preload: false,
  adjustFontFallback: false,
});
