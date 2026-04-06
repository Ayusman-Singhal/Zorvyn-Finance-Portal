import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import type { Role } from '../../types';

export const RoleSelector: React.FC = () => {
  const { currentRole, setRole } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="role-select" className="text-sm font-medium text-gray-700">
        Role:
      </label>
      <select
        id="role-select"
        value={currentRole}
        onChange={handleChange}
        className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        currentRole === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {currentRole === 'admin' ? 'Can edit' : 'View only'}
      </span>
    </div>
  );
};
