import type { InputHTMLAttributes, ReactNode } from 'react';

export function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="field__label" htmlFor={htmlFor}>
      {children}
      {required ? <span className="field__required"> (required)</span> : null}
    </label>
  );
}

export function FieldMessage({
  id,
  kind = 'hint',
  children,
}: {
  id: string;
  kind?: 'hint' | 'error';
  children: ReactNode;
}) {
  return (
    <p className={`field__message field__message--${kind}`} id={id} role={kind === 'error' ? 'alert' : undefined}>
      {children}
    </p>
  );
}

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'aria-describedby'> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...inputProps
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="field">
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <input
        className={['field__control', error ? 'field__control--invalid' : '', className].filter(Boolean).join(' ')}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {hint ? <FieldMessage id={hintId!}>{hint}</FieldMessage> : null}
      {error ? <FieldMessage id={errorId!} kind="error">{error}</FieldMessage> : null}
    </div>
  );
}
