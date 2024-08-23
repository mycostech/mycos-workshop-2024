import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import useSignalR, { IScoreList } from '../hooks/useSignalR';

// Define the shape of the context value
interface MainContextType {
  user: string | null;
  setUser: (user: string | null) => void;

  channel: string | null,
  setChannel: (channel: string | null) => void;
  joinGame: (roomId: string) => void
  getLatestScoreFromServer: () => void
  updateScoreToServer: (score: number) => void
  scoreList: IScoreList,
}

// Create the context with a default value
const MainContext = createContext<MainContextType | undefined>(undefined);

// Create a provider component
export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [channel, setChannel] = useState<string | null>(null)

  const { joinGame, updateScore, scoreList, getUpdatedScore } = useSignalR("http://localhost:5163/scoreHub")

  const updateScoreToServer = useCallback((score: number) => {
    if(channel && user){
      updateScore(channel, user, score)
    }
  }, [channel, user, updateScore])

  const getLatestScoreFromServer = () => {
    console.log('channel: ', channel)
    if(channel){
      getUpdatedScore(channel)
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
