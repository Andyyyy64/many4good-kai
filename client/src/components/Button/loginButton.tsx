import { Button } from "@mui/material";
import '../../styles/Button.css';

export const LoginButton = () => {
    return (
        <div className="loginButton">
            <Button variant="contained" href="/login" sx={{ color: "black", fontWeight: "bold", fontFamily: "cursive" }}>Login</Button>
        </div>
    )
}