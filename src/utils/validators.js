export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePhone = (phone) => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
  };
  
  export const validateSSN = (ssn) => {
    const re = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
    return re.test(ssn);
  };
  
  export const validateZipCode = (zipCode) => {
    const re = /^\d{5}(-\d{4})?$/;
    return re.test(zipCode);
  };