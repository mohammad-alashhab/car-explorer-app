import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children?: ReactNode;
}

const variants: Record<string, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md active:scale-[0.98]",
  secondary:
    "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]",
  ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:scale-[0.98]",
};

const sizes: Record<string, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-5 text-base gap-2 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-200 ease-out cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
