const CustomButton = ({
  label,
  variant,
  className = "",
  isLoading = false,
  children,
  type = "button",
  onClick,
  disabled = false,
  ...props
}) => {
  let baseClasses = "";

  let variantClasses = " ";

  if (variant === "dontApplyDefault") {
    variantClasses = "";
  } else if (variant === "secondary") {
    variantClasses = "";
  } else {
    // default = "primary"
    variantClasses =
      "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-2.5 text-xs";
  }

  const handleClick = (e) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      {...props}
      type={type}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses} ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={disabled}
    >
      {label}
      {children}
      {isLoading && <IconLoader2 className="animate-spin text-[20px]" />}
    </button>
  );
};

export default CustomButton;
