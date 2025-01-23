'use client';

import { createContext, useContext, useState } from 'react';
import { UserProfileCompact } from '@/types/users';

interface UserContextType {
  user: UserProfileCompact | null;
  updateUser: (params: UserProfileCompact) => void;
  logout: () => void;
}

const defaultValue: UserContextType = {
  user: null,
  updateUser: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultValue);

export default function UserProvider({
  children,
  initialUser,
}: Readonly<{ children: React.ReactNode; initialUser: UserProfileCompact | null }>) {
  const [user, setUser] = useState(initialUser);
  const updateUser = (userData: UserProfileCompact) => setUser(userData);
  const logout = () => setUser(null);

  return <UserContext.Provider value={{ user, updateUser, logout}}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
