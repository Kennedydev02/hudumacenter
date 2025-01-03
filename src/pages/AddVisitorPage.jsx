import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import BreadcrumbNav from '../components/common/BreadcrumbNav';

// Dummy data to simulate database
const existingVisitors = [
  {
    phoneNumber: '0712345678',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    previousVisits: [
      { date: '2023-12-01', purpose: 'ID Application' },
      { date: '2023-11-15', purpose: 'Passport Application' }
    ]
  }
];

function AddVisitorPage() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    purpose: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [isExistingVisitor, setIsExistingVisitor] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);

  // Handle phone number check
  const handlePhoneCheck = async (phoneNumber) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const existingVisitor = existingVisitors.find(v => v.phoneNumber === phoneNumber);
      if (existingVisitor) {
        setFormData({
          ...formData,
          ...existingVisitor,
          purpose: '' // Reset purpose for new visit
        });
        setIsExistingVisitor(true);
      } else {
        setShowFullForm(true);
      }
      setLoading(false);
    }, 1000);
  };

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setFormData(prev => ({ ...prev, phoneNumber }));
    
    // Check for existing visitor when phone number is complete
    if (phoneNumber.length === 10) {
      handlePhoneCheck(phoneNumber);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  return (
    <Box>
      <BreadcrumbNav currentPage="Add Visitor" />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Add New Visitor
        </Typography>

        <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Phone Number Field - Always visible */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                  placeholder="Enter 10 digit phone number"
                  helperText="Enter phone number to check visitor status"
                />
              </Grid>

              {loading && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                </Grid>
              )}

              {isExistingVisitor && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    Welcome back! We found your details in our system.
                  </Alert>
                </Grid>
              )}

              {(showFullForm || isExistingVisitor) && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                      disabled={isExistingVisitor}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                      disabled={isExistingVisitor}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      disabled={isExistingVisitor}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Purpose of Visit"
                      name="purpose"
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                </>
              )}

              {(showFullForm || isExistingVisitor) && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      onClick={() => {
                        setFormData({ phoneNumber: '', firstName: '', lastName: '', email: '', purpose: '' });
                        setShowFullForm(false);
                        setIsExistingVisitor(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default AddVisitorPage;