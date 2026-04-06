import { useAuthStore } from '../store/authStore';
import type { Role } from '../types';

export const useAuth = () => {
  const { currentRole, setRole, hasPermission } = useAuthStore();

  return {
    currentRole,
    setRole,
    canAdd: hasPermission('add'),
    canEdit: hasPermission('edit'),
    canDelete: hasPermission('delete'),
    isAdmin: currentRole === 'admin',
    isViewer: currentRole === 'viewer',
  };
};
