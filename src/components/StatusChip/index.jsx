import React from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 500,
  '& .MuiChip-icon': {
    marginLeft: theme.spacing(0.5),
  },
  ...(status === 'completed' && {
    backgroundColor: 'rgba(11, 102, 35, 0.1)',
    color: '#0B6623',
    '& .MuiChip-icon': {
      color: '#0B6623',
    },
  }),
  ...(status === 'in-progress' && {
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    color: '#FFA500',
    '& .MuiChip-icon': {
      color: '#FFA500',
    },
  }),
  ...(status === 'pending' && {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    color: '#D32F2F',
    '& .MuiChip-icon': {
      color: '#D32F2F',
    },
  }),
}));

const StatusChip = ({ status }) => {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon fontSize="small" />;
      case 'in-progress':
        return <AutorenewIcon fontSize="small" />;
      case 'pending':
        return <PendingIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <StyledChip
      label={getLabel()}
      status={status}
      icon={getIcon()}
      size="small"
    />
  );
};

export default StatusChip;