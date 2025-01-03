import React from 'react';
import { Grid, TextField, Typography, Box } from '@mui/material';
import FileUpload from '../FileUpload';

function CNAFields({ formData, handleChange, handleFileChange }) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="School Attended"
          name="schoolAttended"
          value={formData.schoolAttended}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label="Date Attended From"
          name="dateAttendedFrom"
          type="date"
          value={formData.dateAttendedFrom}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label="Date Attended To"
          name="dateAttendedTo"
          type="date"
          value={formData.dateAttendedTo}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          required
          label="Date of Completion"
          name="dateOfCompletion"
          type="date"
          value={formData.dateOfCompletion}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          required
          label="Knowledge Exam Date"
          name="knowledgeExamDate"
          type="date"
          value={formData.knowledgeExamDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          required
          label="Skill Exam Date"
          name="skillExamDate"
          type="date"
          value={formData.skillExamDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Certificate of Completion
          </Typography>
          <FileUpload
            accept="application/pdf,image/*"
            id="cna-certificate"
            onChange={(e) => handleFileChange(e, 'completionCertificate')}
            value={formData.completionCertificate}
            label="Upload Certificate"
          />
        </Box>
      </Grid>
    </>
  );
}

export default CNAFields;