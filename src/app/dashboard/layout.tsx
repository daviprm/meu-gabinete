import { Header } from "@/components/dashboard/header";
import { NavTabs } from "@/components/dashboard/nav-tabs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavTabs />
      <main className="mx-auto max-w-[85rem] px-6 py-6">{children}</main>
    </div>
  );
}
