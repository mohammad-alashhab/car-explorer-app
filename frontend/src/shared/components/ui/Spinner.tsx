interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes: Record<string, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-[3px]",
};

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={[
        "rounded-full border-gray-200 border-t-primary animate-spin",
        sizes[size],
        className,
      ].join(" ")}
    />
  );
}
