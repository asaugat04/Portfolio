export const routes = {
  home: "/",
  admin: "/admin",
  login: "/admin/login",
  auth: "/api/auth",
  contact: "/api/contact",
  resumeDownload: "/api/resume",
  message: (id: string) => `/api/admin/messages/${encodeURIComponent(id)}`,
  section: (section: string) => `/admin/${section}`,
  content: (section: string) => `/api/admin/content/${section}`,
  entry: (section: string, id: string) =>
    `/api/admin/content/${section}/${encodeURIComponent(id)}`,
  retryEmail: (id: string) =>
    `/api/admin/messages/${encodeURIComponent(id)}/retry`,
} as const;

export const homeNavigation = [
  { href: "#about", label: "About" },
  { href: "#project", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
] as const;
