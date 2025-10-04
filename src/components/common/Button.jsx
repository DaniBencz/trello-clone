const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
  title,
  ...props
}) => {
  const baseClasses =
    "text-white font-medium rounded cursor-pointer transition-colors";

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-700",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className,
  ]
    .filter(Boolean) // Remove any empty strings
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
