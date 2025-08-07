 const CustomInput = ({
  value,
  onChange,
  onPaste,
  type = "text",
  id,
  label,
  placeholder,
  className = "",
  disabled = false,
  error,
  name,
  minLength,
  required,
  maxLength,
  variant = 'default',
  ...rest
}) => {
  
  // ✅ FIXED SECTION
  let baseClass = "px-3 py-[7px] border rounded focus:outline-none w-full bg-light_gray no-spinners";
  
  if (variant === 'search') {
    console.log("Reached")
    baseClass += " w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"; // example class for search variant
  }

  return (
    <div className="mb-1 relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-[16px] font-normal mb-1 relative"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1 absolute top-0">*</span>
          )}
        </label>
      )}
      <input
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        id={id}
        disabled={disabled}
        onPaste={onPaste}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClass} ${error ? "border-red-500 focus:ring-red-500" : "border-gray-400"} ${disabled ? "cursor-not-allowed bg-gray-200/80" : ""} ${className}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};


export default CustomInput
