import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const FormSection = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));