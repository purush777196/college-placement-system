import { format, parseISO, isValid } from 'date-fns';

/**
 * Format a numeric amount to INR / currency string
 */
export function formatCurrency(amount, currency = 'INR') {
  if (amount === null || amount === undefined) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 1,
  }).format(amount);
}

/**
 * Format LPA (Lakhs Per Annum)
 */
export function formatLPA(lpa) {
  if (!lpa && lpa !== 0) return 'N/A';
  return `₹${lpa} LPA`;
}

/**
 * Format ISO or Date strings to readable format
 */
export function formatDate(dateString, pattern = 'dd MMM yyyy') {
  if (!dateString) return 'N/A';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return isValid(date) ? format(date, pattern) : 'Invalid date';
  } catch {
    return 'Invalid date';
  }
}

/**
 * Capitalize first letter of words
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

