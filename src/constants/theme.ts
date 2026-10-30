export const themeStorageKey = "portfolio-theme";
export const themeMediaQuery = "(prefers-color-scheme: dark)";
export const themeInitScript = `(function(){var theme;try{theme=localStorage.getItem(${JSON.stringify(themeStorageKey)})}catch{}document.documentElement.dataset.portfolioTheme=theme==="light"||theme==="dark"?theme:matchMedia(${JSON.stringify(themeMediaQuery)}).matches?"dark":"light"})()`;
