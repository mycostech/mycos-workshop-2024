import React, { createContext, useContext, useState, ReactNode } from 'react';
import useSignalR, { IScoreList } from '../hooks/useSignalR';

const wsUrl = import.meta.env.VITE_WS_URL
// Define the shape of the context value
interface MainContextType {
  user: string | null;
  setUser: (user: string | null) => void;

  channel: string | null,
  setChannel: (channel: string | null) => void;
  joinGame: (roomId: string) => void
  scoreList: IScoreList,
  connection: signalR.HubConnection | null
  isConnect: boolean
  appList: string[]
  connectionCount : number
}

// Create the context with a default value
const MainContext = createContext<MainContextType | undefined>(undefined);

// Create a provider component
export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [channel, setChannel] = useState<string | null>(null)

  const {
    joinGame,
    scoreList,
    connection,
    isConnect,
    appList,
    connectionCount
  } = useSignalR(wsUrl)

  return (
    <MainContext.Provider value={{
      user,
      setUser,
      channel,
      setChannel,
      joinGame,
      scoreList,
      connection,
      isConnect,
      appList,
      connectionCount
    }}>
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
