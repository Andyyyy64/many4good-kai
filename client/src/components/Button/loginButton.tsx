import { Button } from "@mui/material";
import { Box } from "@mui/material";

export const LoginButton = () => {
    return (
        <Box sx={{ textAlign: "center", margin: 10 }}>
            <Button variant="contained" href="/login"
                sx={{ color: "white", fontWeight: "bold", fontFamily: "cursive" }}>
                Login
            </Button>
        </Box>
    )
}