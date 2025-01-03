import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: 500,
  ...(status === 'completed' && {
    backgroundColor: 'rgba(11, 102, 35, 0.1)',
    color: '#0B6623',
  }),
  ...(status === 'in-progress' && {
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    color: '#FFA500',
  }),
  ...(status === 'pending' && {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    color: '#D32F2F',
  }),
}));

function TaskTable({ tasks, onEdit, onDelete, onComplete }) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Client Name</StyledTableCell>
            <StyledTableCell>Phone Number</StyledTableCell>
            <StyledTableCell>Task Title</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Payment</StyledTableCell>
            <StyledTableCell>Due Date</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              sx={{
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                transition: 'background-color 0.2s ease',
              }}
            >
              <TableCell>{task.clientName}</TableCell>
              <TableCell>{task.phone}</TableCell>
              <TableCell>{task.taskTitle}</TableCell>
              <TableCell>
                <StatusChip
                  label={task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  status={task.status}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={task.paymentStatus}
                  color={task.paymentStatus === 'paid' ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => onComplete(task.id)}
                  sx={{ color: '#0B6623' }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onEdit(task)}
                  sx={{ color: '#1e4d8a' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(task.id)}
                  sx={{ color: '#d32f2f' }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;