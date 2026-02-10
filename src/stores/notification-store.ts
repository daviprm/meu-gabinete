import { create } from "zustand";

export type NotificationType = "eleitor" | "demanda" | "relatorio" | "equipe" | "pesquisa";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: Date;
  read: boolean;
}

const notificationPool: Omit<Notification, "id" | "time" | "read">[] = [
  { type: "eleitor", title: "Novo eleitor cadastrado", description: "Maria Silva foi adicionada à base de eleitores." },
  { type: "eleitor", title: "Novo eleitor cadastrado", description: "João Pereira se registrou pela Zona Norte." },
  { type: "eleitor", title: "Atualização de eleitor", description: "Carlos Souza atualizou seus dados de contato." },
  { type: "demanda", title: "Nova demanda aberta", description: "Iluminação pública na Rua das Flores — prioridade alta." },
  { type: "demanda", title: "Demanda concluída", description: "Reparo de calçada no Centro foi finalizado." },
  { type: "demanda", title: "Demanda em andamento", description: "Solicitação de poda de árvore mudou para 'em progresso'." },
  { type: "relatorio", title: "Novo relatório disponível", description: "Relatório mensal de eleitores está pronto para download." },
  { type: "relatorio", title: "Relatório exportado", description: "Relatório de demandas foi exportado em PDF." },
  { type: "equipe", title: "Membro ativo", description: "Ana Costa completou 5 pesquisas esta semana." },
  { type: "equipe", title: "Novo membro na equipe", description: "Pedro Lima foi adicionado como Assessor." },
  { type: "pesquisa", title: "Pesquisa finalizada", description: "Pesquisa de satisfação Zona Sul — 142 respostas coletadas." },
  { type: "pesquisa", title: "Nova pesquisa criada", description: "Pesquisa de intenção de voto foi publicada." },
];

let counter = 0;

interface NotificationState {
  notifications: Notification[];
  toast: Notification | null;
  addRandom: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissToast: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  toast: null,

  addRandom: () => {
    const pool = notificationPool;
    const item = pool[Math.floor(Math.random() * pool.length)];
    const notification: Notification = {
      ...item,
      id: `notif-${++counter}`,
      time: new Date(),
      read: false,
    };
    set((s) => ({
      notifications: [notification, ...s.notifications].slice(0, 50),
      toast: notification,
    }));
    // auto-dismiss toast after 5s
    setTimeout(() => {
      set((s) => (s.toast?.id === notification.id ? { toast: null } : {}));
    }, 5000);
  },

  markAsRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),

  dismissToast: () => set({ toast: null }),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
