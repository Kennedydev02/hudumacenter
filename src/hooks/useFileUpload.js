import { useState, useCallback } from 'react';

export function useFileUpload() {
  const [files, setFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});

  const handleFileChange = useCallback((event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File size should be less than 5MB',
        }));
        return;
      }

      setFiles(prev => ({
        ...prev,
        [fieldName]: file,
      }));
      setErrors(prev => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  }, []);

  const uploadFile = useCallback(async (fieldName) => {
    const file = files[fieldName];
    if (!file) return null;

    try {
      // Simulate file upload progress
      setUploadProgress(prev => ({
        ...prev,
        [fieldName]: 0,
      }));

      // TODO: Implement actual file upload logic here
      // For now, we'll just simulate the upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUploadProgress(prev => ({
        ...prev,
        [fieldName]: 100,
      }));

      return {
        url: URL.createObjectURL(file),
        filename: file.name,
      };
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Failed to upload file',
      }));
      return null;
    }
  }, [files]);

  return {
    files,
    uploadProgress,
    errors,
    handleFileChange,
    uploadFile,
  };
}