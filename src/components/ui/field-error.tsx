import { cn } from "@/lib/utils";

export type FieldErrorVariant = "field" | "submit";

type FieldErrorProps = {
  message?: string | null;
  variant?: FieldErrorVariant;
  className?: string;
};

export function FieldError({ message, variant = "field", className }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={cn(
        variant === "field" ? "mt-1 text-xs text-red-600" : "mt-3 text-sm text-red-600",
        className
      )}
    >
      {message}
    </p>
  );
}
