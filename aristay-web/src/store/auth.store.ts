import { create } from 'zustand';
import type { User, AuthResponse } from '../types/auth';
import { authService } from '../services/auth.service';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, full_name: string, phone: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  loadUserFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: AuthResponse = await authService.login({ email, password });
      authService.setTokens(response.access_token, response.refresh_token);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error: any) {
      set({ error: error.message || 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, full_name: string, phone: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: AuthResponse = await authService.register({
        email,
        password,
        full_name,
        phone,
      });
      authService.setTokens(response.access_token, response.refresh_token);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error: any) {
      set({ error: error.message || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  loadUserFromStorage: () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        set({ user: JSON.parse(stored), isAuthenticated: true });
      } catch {
        localStorage.removeItem('user');
      }
    }
  },
}));
