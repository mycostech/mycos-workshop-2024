import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface MainContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

// Create the context with a default value
const MainContext = createContext<MainContextType | undefined>(undefined);

// Create a provider component
export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <MainContext.Provider value={{ user, setUser }}>
      {children}
    </MainContext.Provider>
  );
};


export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
