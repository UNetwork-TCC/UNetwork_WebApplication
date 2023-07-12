import { Box } from "@mui/material";
import { themeContext } from "../contexts";
import { useContext } from "react";

export default function CustomDivider() {
    const { theme } = useContext(themeContext)

    const borderTheme = () => {
        if (theme.palette.mode === 'light')
            return `${theme.palette.primary.main}99, ${theme.palette.secondary.main}99`
        else 
            return `${theme.palette.primary.main}, ${theme.palette.secondary.main}`
    }

    return (
        <Box height={10} sx={{ borderRadius: '20px', background: `linear-gradient(40deg, ${borderTheme()});` }} m='10px 60px'></Box>
    )
}