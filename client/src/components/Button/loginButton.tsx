import { Button } from "@mui/material";
import '../../styles/Button.css';

export const LoginButton = () => {
    return (
        <div className="loginButton">
            <Button variant="text" href="/login">Login</Button>
        </div>
    )
}