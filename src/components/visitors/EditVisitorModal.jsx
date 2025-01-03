import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack,
    CircularProgress
  } from '@mui/material';
  import { useState } from 'react';
  import { styled } from '@mui/material/styles';
  
  const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  
  const purposes = [
    'Consultation',
    'Join School',
    'CPR',
    'Renewal License',
    'Renewal Work Permit',
    'Job Application',
    'Appointment',
    'Other'
  ];
  
  function EditVisitorModal({ open, onClose, visitor, onSave }) {
    const [formData, setFormData] = useState(visitor || {});
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      setLoading(false);
      onClose();
    };
  
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{
          background: 'linear-gradient(45deg, #0B6623 30%, #1976d2 90%)',
          color: 'white',
          fontWeight: 'bold'
        }}>
          Edit Visitor Details
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <StyledTextField
                required
                label="Visitor Name"
                fullWidth
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
              
              <StyledTextField
                required
                label="Email Address"
                type="email"
                fullWidth
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
  
              <StyledTextField
                required
                label="Phone Number"
                fullWidth
                type="tel"
                value={formData.phoneNumber || ''}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                disabled={loading}
              />
  
              <StyledTextField
                select
                required
                label="Purpose of Visit"
                fullWidth
                value={formData.purpose || ''}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                disabled={loading}
              >
                {purposes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </StyledTextField>
  
              {formData.purpose === 'Other' && (
                <StyledTextField
                  required
                  label="Specify Purpose"
                  fullWidth
                  value={formData.otherPurpose || ''}
                  onChange={(e) => setFormData({ ...formData, otherPurpose: e.target.value })}
                  disabled={loading}
                />
              )}
  
              <StyledTextField
                label="Additional Notes"
                fullWidth
                multiline
                rows={4}
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={loading}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: 'linear-gradient(45deg, #0B6623 30%, #1976d2 90%)',
                minWidth: 100
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
  
  export default EditVisitorModal;