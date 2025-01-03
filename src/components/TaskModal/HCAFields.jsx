import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUpload from '../FileUpload';

const Input = styled('input')({
  display: 'none',
});

function HCAFields({ formData, handleFileChange }) {
  return (
    <Grid item xs={12}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Upload 75hrs Certificate
        </Typography>
        <FileUpload
          accept="application/pdf,image/*"
          id="hca-certificate"
          onChange={(e) => handleFileChange(e, 'certificateFile')}
          value={formData.certificateFile}
          label="Upload Certificate"
        />
      </Box>
    </Grid>
  );
}

export default HCAFields;