/**
 * Form field validator helpers
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email address is required';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateName = (name) => {
  if (!name || !name.trim()) return 'Full name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return 'Phone number is required';
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  if (cleanPhone.length < 10) return 'Please enter a valid phone number (10+ digits)';
  return null;
};

export const validateZipCode = (zip) => {
  if (!zip || !zip.trim()) return 'Postal / Zip code is required';
  if (zip.trim().length < 4) return 'Please enter a valid postal code';
  return null;
};

export const validateCardNumber = (cardNumber) => {
  if (!cardNumber) return 'Card number is required';
  const clean = cardNumber.replace(/\s+/g, '');
  if (clean.length < 15 || clean.length > 19) return 'Card number must be 15-16 digits';
  return null;
};

export const validateCardExpiry = (expiry) => {
  if (!expiry) return 'Expiry date is required';
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(expiry)) return 'Format must be MM/YY';
  return null;
};

export const validateCardCVV = (cvv) => {
  if (!cvv) return 'CVV is required';
  if (cvv.length < 3 || cvv.length > 4) return 'CVV must be 3 or 4 digits';
  return null;
};
