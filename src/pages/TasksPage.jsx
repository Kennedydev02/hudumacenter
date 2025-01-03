import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';

// Mock data for initial tasks
const initialTasks = [
  {
    id: 1,
    clientName: 'John Doe',
    phone: '+254 712 345 678',
    taskTitle: 'HCA Application Review',
    status: 'pending',
    paymentStatus: 'paid',
    dueDate: '2024-02-20',
    description: 'Review and process HCA application documents',
  },
  // Add more mock tasks as needed
];

function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Task Statistics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const paidTasks = tasks.filter(task => task.paymentStatus === 'paid').length;

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

  const handleSaveTask = (taskData) => {
    if (selectedTask) {
      // Edit existing task
      setTasks(tasks.map(task =>
        task.id === selectedTask.id ? { ...taskData, id: task.id } : task
      ));
    } else {
      // Add new task
      setTasks([...tasks, { ...taskData, id: tasks.length + 1 }]);
    }
    setModalOpen(false);
  };

  const filteredTasks = tasks.filter(task =>
    task.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.phone.includes(searchQuery)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tasks Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h4">{totalTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Tasks
              </Typography>
              <Typography variant="h4" color="error">
                {pendingTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Tasks
              </Typography>
              <Typography variant="h4" color="success.main">
                {completedTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Paid Tasks
              </Typography>
              <Typography variant="h4" color="primary">
                {paidTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Add Task */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddTask}
            >
              Add New Task
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tasks Table */}
      <TaskTable
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
      />

      {/* Task Modal */}
      <TaskModal
        open={modalOpen}
        task={selectedTask}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
      />
    </Box>
  );
}

export default TasksPage;