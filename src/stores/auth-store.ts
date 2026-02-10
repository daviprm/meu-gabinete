import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hydrate: () => void;
}

const VALID_EMAIL = "user@test.com";
const VALID_PASSWORD = "123456";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const user = { name: "User Test", email: VALID_EMAIL };
      localStorage.setItem("auth", JSON.stringify(user));
      set({ isAuthenticated: true, user });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({ isAuthenticated: false, user: null });
  },

  hydrate: () => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const user = JSON.parse(stored);
      set({ isAuthenticated: true, user });
    }
  },
}));
