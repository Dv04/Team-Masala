import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cyan-400/90 text-zinc-950 hover:bg-cyan-300",
  secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${variantStyles[variant]} disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
