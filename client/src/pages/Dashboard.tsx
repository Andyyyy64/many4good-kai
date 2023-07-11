import { LoginButton } from '../components/Button/loginButton';
import { LogoutButton } from '../components/Button/logoutButton';
import { MyIncome } from '../components/Income/myIncome';
import { MyExpenses } from '../components/Expense/myExpenses';
import { Grid } from '@mui/material';


export const Dashboard = () => {
    // use flex and grid to display the income and expense lists side by side
    return (
        <div>
            {
                localStorage.getItem('userId') ? (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <MyIncome />
                        </Grid>
                        <Grid item xs={6}>
                            <MyExpenses />
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

