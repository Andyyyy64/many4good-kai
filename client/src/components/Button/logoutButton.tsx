import { Button } from "@mui/material";
import { Box } from "@mui/material";

export const LogoutButton = () => {

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.reload();
    }

    return (
        <Box sx={{textAlign: "right"}}>
            <Button variant="contained" href="/" onClick={() => logout()}
                sx={{ color: "black", fontWeight: "bold", fontFamily: "cursive" }}
            >
                Logout
            </Button>
        </Box>
    )
}