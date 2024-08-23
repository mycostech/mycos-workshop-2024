import { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export interface IScoreList{[key: string]: number}

const useSignalR = (hubUrl: string) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    // const [messages, setMessages] = useState<string[]>([]);
    const [scoreList, setScoreList] = useState<IScoreList>({})
    const [appList, setAppList] = useState<string[]>([])
    const [isConnect, setIsConnect] = useState<boolean>(false)

    useEffect(() => {
        const connect = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [hubUrl]);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log("Connected to SignalR");
                    setIsConnect(true)

                    connection.on("ReceiveScores", (scores) => {
                        setScoreList(scores)
                    });

                    connection.on("ReceiveAppNames", (appNames) => {
                        setAppList(appNames)
                    })
                })
                .catch((err) => {
                    console.error("SignalR Connection Error: ", err)
                    setIsConnect(false)
                });
        }
    }, [connection]);

    const joinGame = useCallback((roomId: string) => {
        console.log("start to join game")
        if(connection){
            connection?.invoke("JoinApp", roomId).then(() => {
                console.log("Joined Game")
            }).catch(err => console.error(err.toString()));
        }
    }, [connection])

    const updateScore = useCallback((roomId: string, playerName: string, score: number) => {
        if(connection){
            connection.invoke('UpdateScore', roomId, playerName, score).then(() => {
                console.log("Update Score Complete.")
            }).catch(err => console.error(err.toString()));
        }
    }, [connection])

    const getUpdatedScore = useCallback((roomId: string) => {
        if(connection){
            connection?.invoke("GetScores", roomId).then(() => {
                console.log("Get Updated Score Complete")
            }).catch(err => console.error(err.toString()));
        }
    }, [connection])

    const getAllAppsName = useCallback(() => {
        if(isConnect){
            connection?.invoke("GetAllAppNames").then(() => {
                console.log("Get All App Name Complete")
            }).catch(err => console.error(err.toString()));
        }
    }, [isConnect, connection])




    return {
        // messages,
        connection,
        joinGame,
        updateScore,
        scoreList,
        getUpdatedScore,
        getAllAppsName,
        isConnect,
        appList
    };
};

export default useSignalR;
