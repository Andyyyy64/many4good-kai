import { useEffect, useState } from "react";
import { getExpenses } from "../../api/expenses";
import { AddExpense } from "../Expense/addExpense";
import { DeleteExpense } from "../Expense/deleteExpense";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

type ExpenseType = {
    id: number;
    userId: number;
    name: string;
    cost: number;
    is_food: boolean;
    date: Date;
}

export const MyExpenses = () => {
    const [expenses, setExpenses] = useState<Array<ExpenseType>>([]);
    const userId: number = Number(localStorage.getItem('userId'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const expensess = await getExpenses(userId);
                setExpenses(expensess);
            } catch (error) {
                console.error(error);
                setExpenses([]);
            }
        }
        fetchData();
    }, [userId]);
    console.log(expenses);
    return (
        <TableContainer component={Paper}>
            <h1>支出</h1>
            <AddExpense />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">isfood?</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow
                            key={expense.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {expense.name}
                            </TableCell>
                            <TableCell align="right">{expense.cost}</TableCell>
                            <TableCell align="right">{expense.is_food ? "食" : ""}</TableCell>
                            <TableCell align="right"><DeleteExpense id={expense.id} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

