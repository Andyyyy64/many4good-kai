import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteIncomes } from '../../../api/income';

type Props = {
    id: number;
}

export const DeleteIncome = (props: Props) => {

    const deleteIncome = async () => {
        try {
            await deleteIncomes(props.id);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <IconButton aria-label="delete" onClick={() => deleteIncome()}>
            <DeleteIcon />
        </IconButton>
    )
}