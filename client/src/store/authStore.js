import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // accessToken lives only in memory (not persisted)
      accessToken: null,
      // refreshToken persisted to localStorage
      refreshToken: null,
      user: null,

      setAuth: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      setUser: (user) => set({ user }),

      clear: () => set({ accessToken: null, refreshToken: null, user: null }),

      isAuthenticated: () => !!get().accessToken,
    }),
    {
      name: 'herstelgids-auth',
      // Only persist refreshToken and user, NOT accessToken
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
