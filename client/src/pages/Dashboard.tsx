import { useEffect, useState } from 'react';
import { LoginButton } from '../components/Button/loginButton';
import { LogoutButton } from '../components/Button/logoutButton';
import { SelectDate } from '../components/selectDate';
import { MyIncome } from '../components/Income/myIncome';
import { MyExpenses } from '../components/Expense/myExpenses';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';


export const Dashboard = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [balance, setBalance] = useState<number | undefined>(0);
    const [selectedMonth, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        setBalance(totalAmount - totalCost);
    }, [totalAmount, totalCost])

    return (
        <div>
            <Typography variant="h4" sx={{ textAlign: "center", color: "black", fontFamily: "sans-serif", fontWeight: "bold", marginTop: 3 }}>今月の残高 {balance}円</Typography>
            <SelectDate selectedMonth={selectedMonth} selectedYear={selectedYear} setMonth={setMonth} setYear={setYear} />
            {
                localStorage.getItem('userId') ? (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <MyIncome setTotalAmount={setTotalAmount} totalAmount={totalAmount} selectedMonth={selectedMonth} selectedYear={selectedYear} />
                        </Grid>
                        <Grid item xs={6}>
                            <MyExpenses setTotalCost={setTotalCost} totalCost={totalCost} selectedMonth={selectedMonth} selectedYear={selectedYear} />
                        </Grid>
                    </Grid>
                ) : (
                    <></>
                )
            }
            {
                localStorage.getItem('userId') ? <LogoutButton /> : <LoginButton />
            }
        </div>
    )
}

