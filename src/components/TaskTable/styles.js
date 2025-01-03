import { styled } from '@mui/material/styles';
import { TableCell, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  padding: theme.spacing(2),
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  transition: 'background-color 0.2s ease',
}));

export const ActionButton = styled('button')(({ theme }) => ({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));