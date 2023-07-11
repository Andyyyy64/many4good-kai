import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteExpenses } from '../../api/expenses';

type Props = {
    id: number
}

export const DeleteExpense = (props: Props) => {

    const deleteExpense = async () => {
        try {
            await deleteExpenses(props.id);
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