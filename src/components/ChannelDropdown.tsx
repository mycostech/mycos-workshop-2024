import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"


export default function ChannelDropdown({
    appNameLists,
    channelName,
    onChange
} : {
    appNameLists: string[],
    channelName: string,
    onChange: (val: string) => void
}){
    return(
        <FormControl fullWidth>
            <InputLabel>Channel</InputLabel>
            <Select
                value={channelName}
                label="Channel"
                onChange={e => onChange(e.target.value)}
            >
                {
                    appNameLists.map((m: string, i: number) => {
                        return <MenuItem key={i+1} value={m}>{m}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}