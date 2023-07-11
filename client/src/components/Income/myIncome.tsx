import React, { useEffect, useState } from 'react';
import { getIncome } from '../../api/income';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

type IncomeType = {
    id: number;
    userId: number;
    name: string;
    amount: number;
    date: Date;
}

export const MyIncome = () => {
    const [incomes, setIncomes] = useState<Array<IncomeType>>([]);
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

    console.log(incomes);
    return (
        <TableContainer component={Paper}>
            <h1>収入</h1>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Amount</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
