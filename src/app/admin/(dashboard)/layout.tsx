import { requireAdminPage } from "@/lib/admin";
import { AdminShell } from "@/components/admin/admin-shell";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminPage();
  return <AdminShell email={user.email}>{children}</AdminShell>;
}
