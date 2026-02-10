import { Header } from "@/components/dashboard/header";
import { NavTabs } from "@/components/dashboard/nav-tabs";
import { NotificationToast } from "@/components/dashboard/notification-toast";
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
        <NotificationToast />
        <main className="mx-auto max-w-[85rem] px-3 py-4 sm:px-6 sm:py-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
