import { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ClockWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(45deg, #0B6623 30%, #1976d2 90%)',
  color: 'white',
  textAlign: 'center',
  borderRadius: '15px',
  marginBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    zIndex: 1,
  }
}));

const TimeText = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: '700',
  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  fontFamily: "'Digital-7', monospace",
  letterSpacing: '2px',
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  opacity: 0.9,
  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  marginTop: theme.spacing(1),
}));

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ClockWrapper elevation={4}>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <TimeText variant="h1">
          {formatTime(time)}
        </TimeText>
        <DateText variant="h4">
          {formatDate(time)}
        </DateText>
      </Box>
    </ClockWrapper>
  );
}

export default Clock;