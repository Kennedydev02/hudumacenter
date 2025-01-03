import { Grid, Paper, Typography, Box } from '@mui/material';
import { useVisitor } from '../../context/VisitorContext';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  borderRadius: '50%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: 'white',
}));

function DashboardSummary() {
  const { state } = useVisitor();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <StyledPaper elevation={3}>
          <IconWrapper>
            <PeopleAltIcon fontSize="large" />
          </IconWrapper>
          <Typography variant="h6" gutterBottom>
            Visitors Today
          </Typography>
          <Typography variant="h3" color="primary">
            {state.todayVisitors}
          </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StyledPaper elevation={3}>
          <IconWrapper>
            <CheckCircleIcon fontSize="large" />
          </IconWrapper>
          <Typography variant="h6" gutterBottom>
            Currently Checked In
          </Typography>
          <Typography variant="h3" color="primary">
            {state.checkedIn}
          </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StyledPaper elevation={3}>
          <IconWrapper>
            <PendingIcon fontSize="large" />
          </IconWrapper>
          <Typography variant="h6" gutterBottom>
            Pending Checkouts
          </Typography>
          <Typography variant="h3" color="primary">
            {state.pendingCheckouts}
          </Typography>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}

export default DashboardSummary;