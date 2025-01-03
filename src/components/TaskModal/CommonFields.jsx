import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

function CommonFields({ formData, handleChange }) {
  return (
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
    </>
  );
}

export default CommonFields;