import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "medium", children, style, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-cafe24 font-medium transition-opacity focus:outline-none disabled:opacity-50 disabled:pointer-events-none hover:opacity-90";

    const sizes = {
      small: { height: "30px", padding: "0 12px", fontSize: "12px" },
      medium: { height: "36px", padding: "0 16px", fontSize: "14px" },
      large: { height: "46px", padding: "0 20px", fontSize: "16px" },
    };

    const variantStyles = {
      primary: {
        background: "linear-gradient(135deg, #4280FF, #3D24FF)",
        boxShadow: "inset 0 0 0 1px #3252EB",
        color: "white",
      },
      secondary: {
        background: "white",
        boxShadow: "inset 0 0 0 1px #E4E4E7",
        color: "#3F3F46",
      },
      ghost: {
        background: "transparent",
        color: "#71717A",
      },
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${className}`}
        style={{
          borderRadius: "12px",
          ...sizes[size],
          ...variantStyles[variant],
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
