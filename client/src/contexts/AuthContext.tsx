import React, { createContext, useState, useEffect } from 'react';

type User = {
  id: number;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthProviderProps = {
    children: React.ReactNode;
  };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Add any side effects here. For example, you might want to fetch the user's info
  // from local storage and set the user state.

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
