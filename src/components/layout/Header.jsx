import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed"
      sx={{
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1 }}
        >
          Huduma Center
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/add-visitor')}
          >
            Add Visitor
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/view-records')}
          >
            View Records
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;