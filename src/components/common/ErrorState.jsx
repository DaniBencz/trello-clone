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
          <button
            onClick={onRetry}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
