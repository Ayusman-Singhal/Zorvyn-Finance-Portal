import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role } from '../types';

interface AuthState {
  currentRole: Role;
  setRole: (role: Role) => void;
  hasPermission: (action: 'add' | 'edit' | 'delete') => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentRole: 'viewer',

      setRole: (role) => {
        set({ currentRole: role });
      },

      hasPermission: (action) => {
        const { currentRole } = get();
        if (currentRole === 'admin') return true;
        if (currentRole === 'viewer') {
          return false;
        }
        return false;
      },
    }),
    {
      name: 'finance-dashboard-auth',
      partialize: (state) => ({ currentRole: state.currentRole }),
    }
  )
);
