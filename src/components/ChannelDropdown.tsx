import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export const FIRST_OPTION_VALUE_DROPDOWN = "0000-0000-0000-0000"

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
                <MenuItem value={FIRST_OPTION_VALUE_DROPDOWN}>Select...</MenuItem>
                {
                    appNameLists.map((m: string, i: number) => {
                        return <MenuItem key={i+1} value={m}>{m}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}