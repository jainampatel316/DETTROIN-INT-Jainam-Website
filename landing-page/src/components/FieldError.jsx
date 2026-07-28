import { AlertCircle } from 'lucide-react';

/* Inline validation message shown beneath a field. Announced politely so
   screen readers pick it up without interrupting typing. */
export default function FieldError({ message }) {
  if (!message) return null;
  return (
    <span className="f-error" role="alert">
      <AlertCircle size={13} strokeWidth={2.2} />
      {message}
    </span>
  );
}
