import { 
    Box, 
    Breadcrumbs, 
    Link, 
    Typography, 
    Paper,
    Container,
    IconButton
  } from '@mui/material';
  import { Link as RouterLink } from 'react-router-dom';
  import { styled } from '@mui/material/styles';
  import HomeIcon from '@mui/icons-material/Home';
  import NavigateNextIcon from '@mui/icons-material/NavigateNext';
  
  // Styled components definitions
  const BreadcrumbWrapper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(0.5),
    background: 'rgba(255, 255, 255, 0.98)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    borderRadius: 0,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '10px',
  }));
  
  const StyledBreadcrumb = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  }));
  
  const StyledHomeButton = styled(IconButton)(({ theme }) => ({
    background: '#0B6623',
    color: 'white',
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    height: '30px',
    width: '30px',
    minWidth: '30px',
    '&:hover': {
      background: '#0B6623',
      opacity: 0.9,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    }
  }));
  
  const CurrentPageText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: '0.9rem',
    lineHeight: 1,
  }));
  
  function BreadcrumbNav({ currentPage }) {
    return (
      <BreadcrumbWrapper elevation={0}>
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <StyledBreadcrumb>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <StyledHomeButton>
                <HomeIcon fontSize="small" />
              </StyledHomeButton>
            </RouterLink>
  
            <Breadcrumbs 
              separator={
                <NavigateNextIcon 
                  sx={{ 
                    color: '#0B6623',
                    fontSize: 16,
                  }} 
                />
              }
              sx={{ 
                '& .MuiBreadcrumbs-ol': { 
                  alignItems: 'center',
                },
                '& .MuiBreadcrumbs-li': {
                  display: 'flex',
                  alignItems: 'center',
                }
              }}
            >
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: '#0B6623',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  lineHeight: 1,
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Dashboard
              </Link>
              <CurrentPageText>
                {currentPage}
              </CurrentPageText>
            </Breadcrumbs>
          </StyledBreadcrumb>
        </Container>
      </BreadcrumbWrapper>
    );
  }
  
  export default BreadcrumbNav;