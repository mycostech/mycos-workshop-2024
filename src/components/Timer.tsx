import { CircularProgress } from "@mui/material";
import { useMemo } from "react";

const Timer: React.FC<{time: number}> = ({ time }) => {
    const progress = useMemo(() => {
        const seconds = Math.floor((time % 60000) / 1000);
        return (seconds % 60) * (100 / 60);
    },[time])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <div style={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={4}
                    style={{ color: '#f0f0f0' }}
                />
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={100}
                    thickness={4}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />

                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {formatTime(time)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;