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

type Props = {
    totalAmount: number | undefined;
    setTotalAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
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
                setIncomes(filteredIncomes);
                setFetchFlag(true);
            } catch (error) {
                console.error(error);
                setIncomes([]);
            }
        }
        fetchData();
    }, [userId, props.selectedMonth, props.selectedYear]);

    useEffect(() => {
        const total = incomes?.reduce((total, income) => total + income.amount, 0);
        props.setTotalAmount(total ? total : 0);
    })

    return (
        <TableContainer component={Paper}>
            <h1>$収入 {props.totalAmount}円</h1>
            <AddIncome />
            {
                fetchFlag ? (
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {incomes.map((income) => (
                                <TableRow
                                    key={income.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {income.name}
                                    </TableCell>
                                    <TableCell align="right">{income.amount}</TableCell>
                                    <TableCell align="right">{new Date(income.date).getMonth() + 1 + "月" + new Date(income.date).getDate() + "日"}</TableCell>
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
