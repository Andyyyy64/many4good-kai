import { Button } from "@mui/material";
import '../../styles/Button.css';

export const LogoutButton = () => {

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.reload();
    }

    return (
        <div className="logoutButton">
            <Button variant="text" href="/" onClick={() => logout()}>Logout</Button>
        </div>
    )
}