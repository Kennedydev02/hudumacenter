export const allowedFileTypes = {
    images: ['image/jpeg', 'image/png', 'image/gif'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  };
  
  export const validateFile = (file, options = {}) => {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = [...allowedFileTypes.images, ...allowedFileTypes.documents],
    } = options;
  
    if (!file) return { valid: false, error: 'No file provided' };
  
    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds limit' };
    }
  
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported' };
    }
  
    return { valid: true, error: null };
  };
  
  export const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };