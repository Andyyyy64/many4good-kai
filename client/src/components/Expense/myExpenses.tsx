import { useEffect, useState } from "react";
import { getExpenses } from "../../api/expenses";
import { AddExpense } from "./expenseButton/addExpense";
import { DeleteExpense } from "./expenseButton/deleteExpense";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
    totalCost: number;
    setTotalCost: React.Dispatch<React.SetStateAction<number>>;
    selectedMonth: number;
    selectedYear: number;
}

type ExpenseType = {
    id: number;
    userId: number;
    name: string;
    cost: number;
    is_food: boolean;
    date: Date;
}

export const MyExpenses = (props: Props) => {
    const [expenses, setExpenses] = useState<Array<ExpenseType>>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<Array<ExpenseType>>([]);
    const [filteredTotal, setFilteredTotal] = useState<number>(0);
    const [totalFoodCost, setTotalFoodCost] = useState<number | undefined>(0);
    const [fetchFlag, setFetchFlag] = useState<boolean>();

    const userId: number = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchData = async () => {
            setFetchFlag(false);
            try {
                const expensess = await getExpenses(userId);
                const filteredExpenses = expensess.filter((expense: ExpenseType) => {
                    const date = new Date(expense.date);
                    return date.getFullYear() === props.selectedYear && (date.getMonth() + 1) === props.selectedMonth;
                })
                setExpenses(expensess);
                setFilteredExpenses(filteredExpenses);
                setFetchFlag(true);
            } catch (error) {
                console.error(error);
                setExpenses([]);
            }
        }
        fetchData();
    }, [userId, props.selectedMonth, props.selectedYear]);

    useEffect(() => {
        const total = expenses.reduce((total, expense) => total + expense.cost, 0);
        const foodTotal = filteredExpenses.reduce((total, expense) => expense.is_food ? total + expense.cost : total, 0);
        const filteredTotal = filteredExpenses.reduce((total, expense) => total + expense.cost, 0);
        props.setTotalCost(total);
        setFilteredTotal(filteredTotal);
        setTotalFoodCost(foodTotal ? foodTotal : 0);
    }, [expenses])

    return (
        <TableContainer component={Paper} sx={{ background: "linear-gradient(0deg, #fff, lightgray)" }}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "708090", fontWeight: "bold" }}>
                支出{filteredTotal}円 食費{totalFoodCost}円
            </Typography>
            <AddExpense />
            {
                fetchFlag ? (
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontFamily: "cursive", fontWeight: "bold" }}>Name</TableCell>
                                <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>Cost</TableCell>
                                <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>isfood?</TableCell>
                                <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>Date</TableCell>
                                <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredExpenses.map((expense) => (
                                <TableRow
                                    key={expense.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                                        {expense.name}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>{expense.cost}</TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}>{expense.is_food ? "食" : ""}</TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>{new Date(expense.date).getMonth() + 1 + "月" + new Date(expense.date).getDate() + "日"}</TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}><DeleteExpense id={expense.id} /></TableCell>
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

