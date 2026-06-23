"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-body font-semibold rounded-full transition-all duration-200 cursor-pointer",
        {
          "bg-rose text-white hover:bg-rose-hover shadow-md hover:shadow-lg hover:-translate-y-0.5":
            variant === "primary",
          "border-2 border-rose text-rose hover:bg-rose hover:text-white":
            variant === "outline",
          "text-brown-dark hover:text-rose": variant === "ghost",
        },
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
