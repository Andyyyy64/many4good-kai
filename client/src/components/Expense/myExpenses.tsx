import { useEffect, useState } from "react";
import { getExpenses } from "../../api/expenses";
import { AddExpense } from "./expenseButton/addExpense";
import { DeleteExpense } from "./expenseButton/deleteExpense";
import { SelectDate } from "./expenseButton/selectDate";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

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
    const [totalCost, setTotalCost] = useState<number | undefined>(0);
    const [totalFoodCost, setTotalFoodCost] = useState<number | undefined>(0);
    const [selectedMonth, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setYear] = useState<number>(new Date().getFullYear());
    const [fetchFlag, setFetchFlag] = useState<boolean>();

    const userId: number = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchData = async () => {
            setFetchFlag(false);
            try {
                const expensess = await getExpenses(userId);
                const filteredExpenses = expensess.filter((expense: ExpenseType) => {
                    const date = new Date(expense.date);
                    return date.getFullYear() === selectedYear && (date.getMonth() + 1) === selectedMonth;
                })
                setExpenses(filteredExpenses);
                setFetchFlag(true);
            } catch (error) {
                console.error(error);
                setExpenses([]);
            }
        }
        fetchData();
    }, [userId, selectedMonth, selectedYear]);

    useEffect(() => {
        const total = expenses.reduce((total, expense) => total + expense.cost, 0);
        const foodTotal = expenses.reduce((total, expense) => expense.is_food ? total + expense.cost : total, 0);
        setTotalCost(total ? total : 0);
        setTotalFoodCost(foodTotal ? foodTotal : 0);
    }, [expenses])

    return (
        <TableContainer component={Paper}>
            <h1>$支出{totalCost}円 食費{totalFoodCost}円</h1>
            <SelectDate selectedMonth={selectedMonth} selectedYear={selectedYear} setMonth={setMonth} setYear={setYear} />
            <AddExpense />
            {
                fetchFlag ? (
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Cost</TableCell>
                                <TableCell align="right">isfood?</TableCell>
                                <TableCell align="right">Date</TableCell>
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
                                    <TableCell align="right">{new Date(expense.date).getMonth() + 1 + "月" + new Date(expense.date).getDate() + "日"}</TableCell>
                                    <TableCell align="right"><DeleteExpense id={expense.id} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Box sx={{ textAlign: "center" }}>
                        <CircularProgress />
                    </Box>
                )
            }
        </TableContainer>
    )
}

