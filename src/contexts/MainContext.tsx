import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import useSignalR, { IScoreList } from '../hooks/useSignalR';

const wsUrl = import.meta.env.VITE_WS_URL
// Define the shape of the context value
interface MainContextType {
  user: string | null;
  setUser: (user: string | null) => void;

  channel: string | null,
  setChannel: (channel: string | null) => void;
  joinGame: (roomId: string) => void
  getLatestScoreFromServer: (channelId: string) => void
  updateScoreToServer: (score: number) => void
  scoreList: IScoreList,
  getAllAppsName: () => void
  connection: signalR.HubConnection | null
  isConnect: boolean
  appList: string[]
}

// Create the context with a default value
const MainContext = createContext<MainContextType | undefined>(undefined);

// Create a provider component
export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [channel, setChannel] = useState<string | null>(null)

  const {
    joinGame,
    updateScore,
    scoreList,
    getUpdatedScore,
    getAllAppsName,
    connection,
    isConnect,
    appList
  } = useSignalR(wsUrl)

  const updateScoreToServer = useCallback((score: number) => {
    if(channel && user){
      updateScore(channel, user, score)
    }
  }, [channel, user, updateScore])

  const getLatestScoreFromServer = (channelId: string) => {
    if(isConnect){
      getUpdatedScore(channelId)
    }
  }

  return (
    <MainContext.Provider value={{
      user,
      setUser,
      channel,
      setChannel,
      joinGame,
      updateScoreToServer,
      scoreList,
      getLatestScoreFromServer,
      getAllAppsName,
      connection,
      isConnect,
      appList
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
