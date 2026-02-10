"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Settings,
  User,
  UserPlus,
  FileText,
  ClipboardList,
  Users,
  BarChart3,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useNotificationStore, type NotificationType } from "@/stores/notification-store";

const iconMap: Record<NotificationType, typeof UserPlus> = {
  eleitor: UserPlus,
  demanda: ClipboardList,
  relatorio: FileText,
  equipe: Users,
  pesquisa: BarChart3,
};

const colorMap: Record<NotificationType, string> = {
  eleitor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  demanda: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  relatorio: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  equipe: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  pesquisa: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "agora";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const { logout } = useAuthStore();
  const { notifications, markAsRead, markAllAsRead, unreadCount } =
    useNotificationStore();
  const count = unreadCount();

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-14 max-w-[85rem] items-center justify-between px-3 sm:px-6">
        {/* Left: Logo + Organization */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 rounded-full px-3 text-sm font-medium shadow-sm dark:border dark:border-border dark:shadow-none"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-xs font-bold text-white">
                G
              </div>
              <span className="text-foreground">Org Test</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500 text-[10px] font-bold text-white">
                G
              </div>
              <span>Org Test</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="h-4 w-4" />
              <span>Gerenciar organizações</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-1">
          {/* Notification Bell + Panel */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold text-white tabular-nums"
                    >
                      {count > 9 ? "9+" : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-80 sm:w-96 p-0 rounded-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">Notificações</h3>
                  {count > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500/10 px-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                      {count}
                    </span>
                  )}
                </div>
                {count > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Check className="h-3 w-3" />
                    Marcar todas como lidas
                  </button>
                )}
              </div>

              <Separator />

              {/* Notification list */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                    <Bell className="h-8 w-8 mb-2 opacity-30" />
                    <p className="text-xs">Nenhuma notificação ainda</p>
                  </div>
                ) : (
                  <div>
                    {notifications.map((n, i) => {
                      const Icon = iconMap[n.type];
                      return (
                        <motion.div
                          key={n.id}
                          initial={i < 3 ? { opacity: 0, x: -5 } : false}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          onClick={() => markAsRead(n.id)}
                          className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                            !n.read ? "bg-blue-500/[0.03]" : ""
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p
                                className={`text-sm leading-tight ${
                                  !n.read ? "font-medium" : "text-muted-foreground"
                                }`}
                              >
                                {n.title}
                              </p>
                              {!n.read && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                              {n.description}
                            </p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1 tabular-nums">
                              {timeAgo(n.time)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 rounded-full px-3 shadow-sm dark:border dark:border-border dark:shadow-none"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-muted text-[10px] leading-none text-muted-foreground">
                    UT
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium text-foreground sm:inline">
                  User Test
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">
                  User Test
                </p>
                <p className="text-xs text-muted-foreground">user@test.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4" />
                <span>Meu perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span>
                  {resolvedTheme === "dark" ? "Modo claro" : "Modo escuro"}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
