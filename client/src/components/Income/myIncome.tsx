import { useEffect, useState } from 'react';
import { getIncome } from '../../api/income';
import { DeleteIncome } from './incomeButton/deleteIncome';
import { AddIncome } from './incomeButton/addIncome';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
    totalAmount: number;
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    selectedMonth: number;
    selectedYear: number;
}

type IncomeType = {
    id: number;
    userId: number;
    name: string;
    amount: number;
    date: Date;
}

export const MyIncome = (props: Props) => {
    const [incomes, setIncomes] = useState<Array<IncomeType>>([]);
    const [filteredIncomes, setFilteredIncomes] = useState<Array<IncomeType>>([]);
    const [filteredTotal, setFilteredTotal] = useState<number>(0);
    const [fetchFlag, setFetchFlag] = useState<boolean>();

    const userId: number = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchData = async () => {
            setFetchFlag(false);
            try {
                const incomes = await getIncome(userId);
                const filteredIncomes = incomes.filter((income: IncomeType) => {
                    const date = new Date(income.date);
                    return date.getFullYear() === props.selectedYear && (date.getMonth() + 1) === props.selectedMonth;
                })
                setIncomes(incomes);
                setFilteredIncomes(filteredIncomes);
                setFetchFlag(true);
            } catch (error) {
                console.error(error);
                setIncomes([]);
            }
        }
        fetchData();
    }, [userId, props.selectedMonth, props.selectedYear]);

    useEffect(() => {
        const total = incomes.reduce((total, income) => total + income.amount, 0);
        const filteredTotal = filteredIncomes.reduce((total, income) => total + income.amount, 0);
        props.setTotalAmount(total);
        setFilteredTotal(filteredTotal);
    }, [incomes, filteredIncomes])

    return (
        <TableContainer component={Paper} sx={{ background: "linear-gradient(0deg, #fff, lightgray)" }}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "708090", fontWeight: "bold", fontFamily: "cursive" }}>
                収入{filteredTotal}円
            </Typography>
            <AddIncome />
            {
                fetchFlag ? (
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontFamily: "cursive", fontWeight: "bold" }}>Name</TableCell>
                                <TableCell sx={{ fontFamily: "cursive", fontWeight: "bold" }} align="right">Amount</TableCell>
                                <TableCell sx={{ fontFamily: "cursive", fontWeight: "bold" }} align="right">Date</TableCell>
                                <TableCell sx={{ fontFamily: "cursive", fontWeight: "bold" }} align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredIncomes.map((income) => (
                                <TableRow
                                    key={income.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                                        {income.name}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>{income.amount}</TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>{new Date(income.date).getMonth() + 1 + "月" + new Date(income.date).getDate() + "日"}</TableCell>
                                    <TableCell align="right"><DeleteIncome id={income.id} /></TableCell>
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
    );
};
