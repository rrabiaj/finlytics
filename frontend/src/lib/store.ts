import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    organizationId: string;
    role: string;
  } | null;
  organization: {
    id: string;
    name: string;
    slug: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  setOrganization: (org: UserState['organization']) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      setUser: (user) => set({ user }),
      setOrganization: (organization) => set({ organization }),
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token');
        }
        set({ user: null, organization: null });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
