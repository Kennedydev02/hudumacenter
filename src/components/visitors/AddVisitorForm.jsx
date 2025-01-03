import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  purpose: '',
  idNumber: ''
};

const PURPOSE_OPTIONS = [
  'ID Application',
  'Passport Application',
  'Business Registration',
  'General Inquiry'
];

function AddVisitorForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [waitTime, setWaitTime] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Validate Phone
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }

    // Validate Purpose
    if (!formData.purpose) {
      newErrors.purpose = 'Purpose is required';
    }

    // Validate ID Number
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields correctly',
        severity: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate wait time calculation (15 mins per person in queue)
      const queueSize = Math.floor(Math.random() * 10); // Random queue size for demo
      const estimatedWaitTime = queueSize * 15;
      setWaitTime(estimatedWaitTime);

      // Show confirmation modal
      setConfirmationOpen(true);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Visitor added successfully!',
        severity: 'success'
      });

    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add visitor. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddAnother = () => {
    setFormData(INITIAL_FORM_STATE);
    setConfirmationOpen(false);
    setWaitTime(null);
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            error={!!errors.purpose}
            helperText={errors.purpose}
            disabled={isSubmitting}
          >
            {PURPOSE_OPTIONS.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            error={!!errors.idNumber}
            helperText={errors.idNumber}
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{
              py: 2,
              background: 'linear-gradient(45deg, #0B6623 30%, #1976d2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0B6623 20%, #1976d2 100%)',
              }
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Submit'
            )}
          </Button>
        </Grid>
      </Grid>

      {/* Confirmation Modal */}
      <Dialog 
        open={confirmationOpen} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(45deg, #0B6623 30%, #1976d2 90%)',
            color: 'white'
          }
        }}
      >
        <DialogTitle>Appointment Confirmed!</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thank you, {formData.firstName}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your appointment has been scheduled successfully.
          </Typography>
          {waitTime && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Estimated wait time: {waitTime} minutes
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleAddAnother}
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Add Another Visitor
          </Button>
          <Button 
            onClick={handleGoToDashboard}
            variant="contained"
            sx={{ bgcolor: 'white', color: '#1976d2' }}
          >
            Go to Dashboard
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddVisitorForm;