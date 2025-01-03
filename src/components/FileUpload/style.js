import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Input = styled('input')({
  display: 'none',
});

export const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },

  '&.drag-active': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },

  '&.has-error': {
    borderColor: theme.palette.error.main,
  }
}));

export const PreviewContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));