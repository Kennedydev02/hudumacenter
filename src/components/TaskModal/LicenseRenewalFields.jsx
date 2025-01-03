import React from 'react';
import { Grid, Typography, Box, TextField } from '@mui/material';
import FileUpload from '../FileUpload';

function LicenseRenewalFields({ formData, handleChange, handleFileChange }) {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label="License Expiration Date"
          name="expirationDate"
          type="date"
          value={formData.expirationDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Current License
          </Typography>
          <FileUpload
            accept="application/pdf,image/*"
            id="license-file"
            onChange={(e) => handleFileChange(e, 'licenseFile')}
            value={formData.licenseFile}
            label="Upload License"
          />
        </Box>
      </Grid>
    </>
  );
}

export default LicenseRenewalFields;