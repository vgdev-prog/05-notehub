interface ErrorMessageProps {
  error: string | undefined;
  className?: string;
}

const ErrorMessage = ({ error, className }: ErrorMessageProps) => {
  if (!error || typeof error !== 'string') return null;
  return <span className={className}>{error}</span>;
};

export default ErrorMessage;