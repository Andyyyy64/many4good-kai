import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

interface State {
    bottom: boolean;
}

export const Profile = () => {
    const [open, setopen] = useState<State>({ bottom: false });

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setopen({ bottom: open });
        };

    const list = (_anchor: string) => (
        <Box role="presentation" sx={{ height: 500 }}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "black", fontFamily: "sans-serif", fontWeight: "bold", marginTop: 3 }}>プロフィール</Typography>
            <Typography variant="h4" sx={{ textAlign: "center", color: "black", fontFamily: "sans-serif", fontWeight: "bold", marginTop: 3 }}>email: {localStorage.getItem("email")}</Typography>
            <Typography variant="h4" sx={{ textAlign: "center", color: "black", fontFamily: "sans-serif", fontWeight: "bold", marginTop: 3 }}>user1: {localStorage.getItem("username")}</Typography>
        </Box>
    );

    return (
        <Box sx={{ textAlign: "center" }}>
            {localStorage.getItem("userId") ? (
                <React.Fragment>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        disabled={localStorage.getItem("userId") ? false : true}
                        color="inherit"
                    >
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                    <Drawer
                        anchor="bottom"
                        open={open["bottom"]}
                        onClose={toggleDrawer(false)}
                    >
                        {list("bottom")}
                    </Drawer>
                </React.Fragment>
            ) : (
                <></>
            )}
        </Box>
    );
}