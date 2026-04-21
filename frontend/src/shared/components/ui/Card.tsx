import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = true }: CardProps) {
  return (
    <div
      className={[
        "bg-white rounded-2xl border border-gray-100 shadow-card p-5",
        hoverable
          ? "hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
