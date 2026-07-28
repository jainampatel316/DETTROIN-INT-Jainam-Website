/* Validation rules shared by the enquiry forms. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/* Today's date as YYYY-MM-DD, for capping date-of-birth inputs. */
export const TODAY = new Date().toISOString().slice(0, 10);

/* Indian mobile numbers get written every which way: "9876543210",
   "98765 43210", "+91 98765 43210", "091-9876543210". Rather than trying
   to match every grouping, strip the formatting and check the digits. */
export function validatePhone(value) {
  const digits = String(value ?? '').replace(/[\s()\-.]/g, '');
  return /^(?:\+?91|0)?[6-9]\d{9}$/.test(digits) || 'Enter a valid 10-digit mobile number.';
}
