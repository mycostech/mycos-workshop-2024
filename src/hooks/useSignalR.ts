import { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export interface IScoreList { [key: string]: number }

const useSignalR = (hubUrl: string) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    // const [messages, setMessages] = useState<string[]>([]);
    const [scoreList, setScoreList] = useState<IScoreList>({})
    const [appList, setAppList] = useState<string[]>([])
    const [isConnect, setIsConnect] = useState<boolean>(false)
    const [connectionCount, setConnectionCount] = useState<number>(0)

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
                        console.log('ReceiveScores', scores)
                        setScoreList(scores)
                    });

                    connection.on("ReceiveAppNames", (appNames) => {
                        setAppList(appNames)
                    })

                    connection.on("UpdateConnectionCount", (connectionCount) => {
                        setConnectionCount(connectionCount)
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
        if (connection) {
            connection?.invoke("CreateApp", roomId).then(() => {
                console.log("Joined Game")
            }).catch(err => console.error(err.toString()));
        }
    }, [connection])

    return {
        // messages,
        connection,
        joinGame,
        scoreList,
        isConnect,
        appList,
        connectionCount
    };
};

export default useSignalR;
