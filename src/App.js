import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import theme from './theme';

// Import pages
import HomePage from './pages/HomePage';
import AddVisitorPage from './pages/AddVisitorPage';
import ViewVisitorRecords from './pages/ViewVisitorRecords';
import VisitorRecordsPage from './pages/VisitorRecordsPage';

function App() {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Add Visitor', path: '/add-visitor' },
    { label: 'View Records', path: '/view-records' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Sticky Header */}
        <AppBar 
          position="sticky" // Changed from "static" to "sticky"
          elevation={2} // Added slight elevation for better visibility
          sx={{ 
            background: 'linear-gradient(90deg, #0B6623 0%, #1e4d8a 100%)',
            zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures navbar stays above other content
          }}
        >
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            px: { xs: 2, sm: 4 },
            py: 1,
            transition: 'all 0.3s ease', // Smooth transition for any changes
            backdropFilter: 'blur(8px)', // Adds a blur effect when scrolling
          }}>
            {/* Logo/Title */}
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontWeight: 600,
                letterSpacing: 0.5,
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)'
                }
              }}
            >
              Huduma Center
            </Typography>

            {/* Navigation Links */}
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 },
              alignItems: 'center'
            }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: 'white',
                    opacity: location.pathname === item.path ? 1 : 0.8,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'white',
                      transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.3s ease'
                    },
                    '&:hover': {
                      opacity: 1,
                      '&:after': {
                        transform: 'scaleX(1)'
                      }
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content - Added padding-top to prevent content from going under navbar */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            bgcolor: 'background.default',
            minHeight: '100vh',
            p: { xs: 2, sm: 3 },
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-visitor" element={<AddVisitorPage />} />
            <Route path="/view-records" element={<ViewVisitorRecords />} />
            <Route path="/visitor-records" element={<VisitorRecordsPage />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Box 
          component="footer" 
          sx={{ 
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Huduma Center. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;