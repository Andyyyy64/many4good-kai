import React, { useState } from "react";
import { addIncomes } from "../../../api/income";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const AddIncome = () => {
    const [open, setOpen] = useState({ bottom: false });
    const [name, setName] = useState<string>();
    const [amount, setAmount] = useState<number>();

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setOpen({ bottom: open });
        };

    const addIncome = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const income = await addIncomes(Number(localStorage.getItem('userId')), name, amount);
            console.log(income);
            setOpen({ bottom: false });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const list = (_anchor: string) => (
        <Box role="presentation" sx={{ height: 350 }}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "708090", fontFamily: "cursive", margin: 4 }}>add income</Typography>
            <Box sx={{ display: "block", textAlign: "center" }}>
                <form onSubmit={addIncome}>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Amount"
                        variant="outlined"
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                    <button type="submit" disabled={!name || !amount} style={{ backgroundColor: (!name || !amount ? "grey" : "blue") }}>Add</button>
                </form>
            </Box>
        </Box>
    )

    return (
        <div>
            <React.Fragment>
                <Tooltip title="add income from modal">
                    <IconButton
                        onClick={toggleDrawer(true)}
                        disabled={!localStorage.getItem('userId')}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <Drawer
                    anchor="bottom"
                    open={open["bottom"]}
                    onClose={toggleDrawer(false)}
                >
                    {list("bottom")}
                </Drawer>
            </React.Fragment>
        </div>
    )
}