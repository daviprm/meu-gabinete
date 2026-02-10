import { Header } from "@/components/dashboard/header";
import { NavTabs } from "@/components/dashboard/nav-tabs";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <NavTabs />
        <main className="mx-auto max-w-[85rem] px-6 py-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
