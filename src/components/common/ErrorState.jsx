import Button from "./Button";

const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
  retryLabel = "Retry",
}) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center">
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="rounded-md">
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
