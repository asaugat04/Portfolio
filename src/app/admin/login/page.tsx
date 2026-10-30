import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin";
import { routes } from "@/constants/routes";
import { LoginForm } from "./partials/login-form";
export default async function LoginPage() {
  if (await getAdmin()) redirect(routes.admin);
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <LoginForm />
    </main>
  );
}
