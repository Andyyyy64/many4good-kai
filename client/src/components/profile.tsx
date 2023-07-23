import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { TextField } from "@mui/material";
import RemoveTwoToneIcon from "@mui/icons-material/RemoveTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
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
        </Box>
    );

    return (
        <Box sx={{ textAlign: "center" }}>
            {localStorage.getItem("userId") ? (
                <React.Fragment>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        disabled={localStorage.getItem("userId") ? false : true}
                    >
                        <AccountCircleTwoToneIcon fontSize="large" />
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