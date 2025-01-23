'use client';

import { createContext, useContext, useState } from 'react';

const AdminLayoutContext = createContext({
  collapsed: false,
  activeCollapsed: () => {},
  deactiveCollapsed: () => {},
  toggleCollapsed: () => {},
});

export default function AdminLayoutProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [collapsed, setCollapsed] = useState(false);

  const activeCollapsed = () => setCollapsed(true);
  const deactiveCollapsed = () => setCollapsed(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <AdminLayoutContext.Provider
      value={{ collapsed, activeCollapsed, deactiveCollapsed, toggleCollapsed }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
}

export const useAdminLayout = () => useContext(AdminLayoutContext);
