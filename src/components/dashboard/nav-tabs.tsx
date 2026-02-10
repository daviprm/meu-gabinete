"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  MapPin,
  Users,
  ClipboardList,
  UsersRound,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pesquisas", href: "/dashboard/pesquisas", icon: Search },
  { label: "Mapa", href: "/dashboard/mapa", icon: MapPin },
  { label: "Eleitores", href: "/dashboard/eleitores", icon: Users },
  { label: "Demandas", href: "/dashboard/demandas", icon: ClipboardList },
  { label: "Equipe", href: "/dashboard/equipe", icon: UsersRound },
  { label: "Agenda", href: "/dashboard/agenda", icon: Calendar },
  { label: "Comunicação", href: "/dashboard/comunicacao", icon: MessageSquare },
  { label: "Relatórios", href: "/dashboard/relatorios", icon: BarChart3 },
  { label: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="sticky top-14 z-40 border-b border-border bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="mx-auto flex max-w-[85rem] items-center gap-0 overflow-x-auto overflow-y-hidden px-6 scrollbar-none">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-sm transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
