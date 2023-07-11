import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteExpenses } from '../../api/expenses';

export const DeleteExpense = (id: number) => {

    const deleteExpense = async () => {
        try {
            await deleteExpenses(id);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <IconButton aria-label="delete" onClick={() => deleteExpense()}>
            <DeleteIcon />
        </IconButton>
    )
}