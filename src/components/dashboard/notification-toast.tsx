"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, FileText, ClipboardList, Users, BarChart3 } from "lucide-react";
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

export function NotificationToast() {
  const { toast, dismissToast, addRandom } = useNotificationStore();

  // Periodically add random notifications
  useEffect(() => {
    // First notification after 20s, then every 20-40s
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timeout = setTimeout(() => {
        addRandom();
        schedule();
      }, 20000 + Math.random() * 20000);
    };

    schedule();

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto w-80 rounded-xl border border-border bg-background/95 backdrop-blur-md shadow-lg overflow-hidden"
          >
            {/* Progress bar */}
            <motion.div
              className="h-0.5 bg-foreground/15"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />

            <div className="flex items-start gap-3 p-3.5">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorMap[toast.type]}`}>
                {(() => {
                  const Icon = iconMap[toast.type];
                  return <Icon className="h-4 w-4" />;
                })()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight">{toast.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{toast.description}</p>
              </div>
              <button
                onClick={dismissToast}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
