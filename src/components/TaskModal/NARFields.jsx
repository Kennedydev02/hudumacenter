import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import FileUpload from '../FileUpload';

function NARFields({ formData, handleFileChange }) {
  return (
    <Grid item xs={12}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Upload NAR Certificate
        </Typography>
        <FileUpload
          accept="application/pdf,image/*"
          id="nar-certificate"
          onChange={(e) => handleFileChange(e, 'certificateFile')}
          value={formData.certificateFile}
          label="Upload Certificate"
        />
      </Box>
    </Grid>
  );
}

export default NARFields;