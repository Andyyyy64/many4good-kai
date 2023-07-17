import React, { useEffect, useState } from 'react';
import { getIncome } from '../../api/income';
import { DeleteIncome } from './deleteIncome';
import { AddIncome } from './addIncome';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

type IncomeType = {
    id: number;
    userId: number;
    name: string;
    amount: number;
    date: Date;
}

export const MyIncome = () => {
    const [incomes, setIncomes] = useState<Array<IncomeType>>();
    const [totalAmount, setTotalAmount] = useState<number | undefined>(0);
    const userId: number = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const incomes = await getIncome(userId);
                setIncomes(incomes);
            } catch (error) {
                console.error(error);
                setIncomes([]);
            }
        }
        fetchData();
    }, [userId]);

    useEffect(() => {
        const total = incomes?.reduce((total, income) => total + income.amount, 0);
        setTotalAmount(total ? total : 0);
    })

    return (
        <TableContainer component={Paper}>
            <h1>$収入 {totalAmount}円</h1>
            <AddIncome />
            {
                incomes ? (
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
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
