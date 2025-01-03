import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  Typography,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

function ViewVisitorRecords() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [bulkActionAnchorEl, setBulkActionAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sample data
  const visitors = [
    {
      id: 1,
      date: '2023-12-20',
      time: '09:00 AM',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '0712345678',
      purpose: 'ID Application',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2023-12-20',
      time: '10:30 AM',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '0723456789',
      purpose: 'Passport Application',
      status: 'In Progress'
    },
    {
      id: 3,
      date: '2023-12-20',
      time: '11:45 AM',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '0734567890',
      purpose: 'Business Registration',
      status: 'Waiting'
    }
  ];

  // Handlers
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(visitors.map(visitor => visitor.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleBulkActionClick = (event) => {
    setBulkActionAnchorEl(event.currentTarget);
  };

  const handleBulkActionClose = () => {
    setBulkActionAnchorEl(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Waiting':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Action Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Search visitors..."
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Button
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            variant="outlined"
          >
            Filter
          </Button>

          {selected.length > 0 && (
            <Button
              startIcon={<MoreVertIcon />}
              onClick={handleBulkActionClick}
              variant="contained"
            >
              Bulk Actions ({selected.length})
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Visitors Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === visitors.length}
                  indeterminate={selected.length > 0 && selected.length < visitors.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
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
              <TableRow
                key={visitor.id}
                selected={selected.includes(visitor.id)}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(visitor.id)}
                    onChange={() => handleSelect(visitor.id)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{visitor.date}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {visitor.time}
                  </Typography>
                </TableCell>
                <TableCell>{visitor.name}</TableCell>
                <TableCell>{visitor.email}</TableCell>
                <TableCell>{visitor.phone}</TableCell>
                <TableCell>{visitor.purpose}</TableCell>
                <TableCell>
                  <Chip
                    label={visitor.status}
                    color={getStatusColor(visitor.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem>Status</MenuItem>
        <MenuItem>Date Range</MenuItem>
        <MenuItem>Purpose</MenuItem>
      </Menu>

      {/* Bulk Actions Menu */}
      <Menu
        anchorEl={bulkActionAnchorEl}
        open={Boolean(bulkActionAnchorEl)}
        onClose={handleBulkActionClose}
      >
        <MenuItem>Mark as Completed</MenuItem>
        <MenuItem>Delete Selected</MenuItem>
        <MenuItem>Export Selected</MenuItem>
      </Menu>
    </Box>
  );
}

export default ViewVisitorRecords;