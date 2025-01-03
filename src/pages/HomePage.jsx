import { Box, Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useEffect } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Title and Clock Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome to Huduma Center
        </Typography>
        <Typography variant="h5" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
          {time.toLocaleTimeString()}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate('/add-visitor')}
            sx={{
              p: 3,
              bgcolor: '#0B6623',
              color: 'white',
              '&:hover': { bgcolor: '#094d1b' }
            }}
          >
            ADD NEW VISITOR
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ListAltIcon />}
            onClick={() => navigate('/view-records')}
            sx={{
              p: 3,
              borderColor: '#0B6623',
              color: '#0B6623',
              '&:hover': {
                borderColor: '#094d1b',
                bgcolor: 'rgba(11, 102, 35, 0.04)'
              }
            }}
          >
            VIEW VISITOR RECORDS
          </Button>
        </Grid>
      </Grid>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon sx={{ color: '#0B6623', mr: 1 }} />
              <Typography variant="h6">Total Visitors Today</Typography>
            </Box>
            <Typography variant="h3" sx={{ mb: 1 }}>50</Typography>
            <Typography variant="body2" sx={{ color: '#0B6623' }}>
              +12% from yesterday
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PendingIcon sx={{ color: '#FFA500', mr: 1 }} />
              <Typography variant="h6">Pending Appointments</Typography>
            </Box>
            <Typography variant="h3" sx={{ mb: 1 }}>8</Typography>
            <Typography variant="body2" sx={{ color: '#FF0000' }}>
              -5% from yesterday
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircleIcon sx={{ color: '#0B6623', mr: 1 }} />
              <Typography variant="h6">Completed Visits</Typography>
            </Box>
            <Typography variant="h3" sx={{ mb: 1 }}>42</Typography>
            <Typography variant="body2" sx={{ color: '#0B6623' }}>
              +8% from yesterday
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Recent Activity</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { name: 'John Doe', action: 'checked in', time: '10:45 AM', icon: <GroupIcon sx={{ color: '#0B6623' }} /> },
            { name: 'Jane Smith', action: 'completed visit', time: '10:30 AM', icon: <CheckCircleIcon sx={{ color: '#0B6623' }} /> },
            { name: 'Mike Johnson', action: 'scheduled appointment', time: '10:15 AM', icon: <AccessTimeIcon sx={{ color: '#FFA500' }} /> }
          ].map((activity, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: index !== 2 ? '1px solid #eee' : 'none',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.02)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {activity.icon}
                <Box>
                  <Typography variant="subtitle1">{activity.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.action}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {activity.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default HomePage;