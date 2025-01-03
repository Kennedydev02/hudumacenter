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
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

function VisitorRecordsTable({ visitors, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date & Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>
                {visitor.date} {visitor.time}
              </TableCell>
              <TableCell>{visitor.name}</TableCell>
              <TableCell>{visitor.email}</TableCell>
              <TableCell>{visitor.phone}</TableCell>
              <TableCell>{visitor.purpose}</TableCell>
              <TableCell>
                <Chip 
                  label={visitor.status}
                  color={
                    visitor.status === 'Completed' ? 'success' :
                    visitor.status === 'In Progress' ? 'warning' : 'error'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={() => onEdit(visitor)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" onClick={() => onDelete(visitor)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VisitorRecordsTable;