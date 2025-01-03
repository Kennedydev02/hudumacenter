import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Stack
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import VisitorRecordsTable from '../components/visitors/VisitorRecordsTable';

function ViewVisitorRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for demonstration
  const [visitors] = useState([
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
  ]);

  const handleEdit = (visitor) => {
    console.log('Edit visitor:', visitor);
    // Implement edit functionality
  };

  const handleDelete = (visitor) => {
    console.log('Delete visitor:', visitor);
    // Implement delete functionality
  };

  const filteredVisitors = visitors.filter(visitor =>
    Object.values(visitor)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Visitor Records
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search visitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Visitor Records Table */}
          <VisitorRecordsTable
            visitors={filteredVisitors}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Stack>
      </Paper>
    </Box>
  );
}

export default ViewVisitorRecordsPage;