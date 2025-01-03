import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

function TaskModal({ task, open, onClose, onSave }) {
  const [taskType, setTaskType] = useState('HCA_REGISTRATION');
  const [formData, setFormData] = useState({
    // Common fields
    taskType: 'HCA_REGISTRATION',
    status: 'pending',
    paymentStatus: 'not_paid',
    
    // HCA Registration specific fields
    fullName: '',
    dateOfBirth: '',
    email: '',
    contactNumber: '',
    mailingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    hasSSN: 'no',
    ssn: '',
    certificateFile: null,
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
      setTaskType(task.taskType);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Clear SSN if hasSSN is set to 'no'
      ...(name === 'hasSSN' && value === 'no' && { ssn: '' }),
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      certificateFile: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 3,
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">HCA Registration for State Exam</Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Task Type Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Task Type</InputLabel>
                <Select
                  name="taskType"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  label="Task Type"
                >
                  <MenuItem value="HCA_REGISTRATION">HCA Registration</MenuItem>
                  <MenuItem value="NAR_REGISTRATION">NAR Registration</MenuItem>
                  <MenuItem value="CNA_REGISTRATION">CNA Registration</MenuItem>
                  <MenuItem value="LICENSE_RENEWAL">License Renewal</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* HCA Registration Form Fields */}
            {taskType === 'HCA_REGISTRATION' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Student's Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Mailing Address"
                    name="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Do you have SSN?
                  </Typography>
                  <RadioGroup
                    row
                    name="hasSSN"
                    value={formData.hasSSN}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formData.hasSSN === 'yes' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Social Security Number"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      type="password"
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Upload 75hrs Certificate
                    </Typography>
                    <label htmlFor="certificate-file">
                      <Input
                        accept="application/pdf,image/*"
                        id="certificate-file"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <Button variant="outlined" component="span">
                        Upload Certificate
                      </Button>
                    </label>
                    {formData.certificateFile && (
                      <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                        File selected: {formData.certificateFile.name}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{
              bgcolor: '#0B6623',
              '&:hover': {
                bgcolor: '#094d1b',
              }
            }}
          >
            Save Registration
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TaskModal;