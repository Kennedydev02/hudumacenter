import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input, UploadBox, PreviewContainer } from './styles';

function FileUpload({
  accept = "application/pdf,image/*",
  id,
  onChange,
  value,
  label = "Click to upload or drag and drop",
  error,
  helperText,
  maxSize = 5 * 1024 * 1024 // 5MB default
}) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.size > maxSize) {
      onChange({ 
        target: { 
          value: null, 
          error: true, 
          helperText: `File size should be less than ${maxSize / (1024 * 1024)}MB` 
        } 
      });
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    onChange({ target: { files: [file] } });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onChange({ target: { files: null } });
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Input
        accept={accept}
        id={id}
        type="file"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <label htmlFor={id}>
        <UploadBox
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`${dragActive ? 'drag-active' : ''} ${error ? 'has-error' : ''}`}
        >
          {!value ? (
            <>
              <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" gutterBottom>
                {label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Maximum file size: {maxSize / (1024 * 1024)}MB
              </Typography>
            </>
          ) : (
            <PreviewContainer>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <InsertDriveFileIcon color="primary" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" noWrap>
                    {value.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatFileSize(value.size)}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  color="error"
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </Box>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <Box sx={{ width: '100%', mt: 1 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                </Box>
              )}
            </PreviewContainer>
          )}
        </UploadBox>
      </label>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

export default FileUpload;