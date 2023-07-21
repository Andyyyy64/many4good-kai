import React, { useState } from "react";
import { addExpenses } from "../../../api/expenses";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton, TextField, Checkbox } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const AddExpense = () => {
    const [open, setOpen] = useState({ bottom: false });
    const [name, setName] = useState<string>();
    const [cost, setCost] = useState<number>();
    const [isFood, setIsFood] = useState<boolean>();

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
    
    const addExpense =async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const expense = await addExpenses(Number(localStorage.getItem('userId')), name, cost, isFood);
            console.log(expense);
            setOpen({ bottom: false });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
        
    const list = (_anchor: string) => (
        <Box role="presentation" sx={{ height: 250 }}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "708090" }}># add expense</Typography>
            <Box sx={{display: "block", textAlign: "center"}}>
                <form onSubmit={addExpense}>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Cost"
                        variant="outlined"
                        onChange={e => setCost(Number(e.target.value))}
                    />
                    <Tooltip title="isfood?">
                        <Checkbox
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                            value={isFood}
                            onChange={e => setIsFood(e.target.checked)}
                        />
                    </Tooltip>
                    <button type="submit">Add</button>
                </form>
            </Box>
        </Box>
    )

    return (
        <div>
            <React.Fragment>
                <Tooltip title="add expense from modal">
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