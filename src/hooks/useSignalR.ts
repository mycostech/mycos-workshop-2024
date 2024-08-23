import { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export interface IScoreList{[key: string]: number}

const useSignalR = (hubUrl: string) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    // const [messages, setMessages] = useState<string[]>([]);
    const [scoreList, setScoreList] = useState<IScoreList>({})

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

                    connection.on("ReceiveScores", (scores) => {
                        console.log("Score: ", scores)
                        setScoreList(scores)
                    });
                })
                .catch((err) => console.error("SignalR Connection Error: ", err));
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




    return {
        // messages,
        connection,
        joinGame,
        updateScore,
        scoreList,
        getUpdatedScore
    };
};

export default useSignalR;
