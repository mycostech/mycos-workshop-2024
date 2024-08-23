import { Button } from "@mui/material";


export default function ScoreboardButton({
    onScoreboardClick
}: {
    onScoreboardClick: () => void
}){
    return(
        <Button variant="contained" onClick={onScoreboardClick}>
            Scoreboard
        </Button>
    )
}