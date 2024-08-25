import { useState, useEffect } from 'react';

const useTimer = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timerInterval: any;;

        if (isActive) {
            const start = Date.now() - time;
            timerInterval = setInterval(() => {
                setTime(Date.now() - start);
            }, 1);
        } else if (!isActive && time !== 0) {
            clearInterval(timerInterval);
        }

        return () => clearInterval(timerInterval);
    }, [isActive, time]);

    const start = () => {
        setIsActive(true);
    };

    const stop = () => {
        setIsActive(false);
    };

    const reset = () => {
        setIsActive(false);
        setTime(0);
    };

    const getMinutes = (time: number) => Math.floor(time / 60000);
    const getSeconds = (time: number) => Math.floor((time % 60000) / 1000);
    const getMilliseconds = (time: number) => Math.floor(time % 1000 / 10);



    return {
        time,
        start,
        stop,
        reset,
        isActive,
        getMinutes,
        getSeconds,
        getMilliseconds
    };
};

export default useTimer;
