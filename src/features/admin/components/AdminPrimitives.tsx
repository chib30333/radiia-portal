import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { AccountStatus, RequestItemStatus, RequestStatus, RequestType } from "@/types/admin";

const sizeClasses = {
  sm: "px-1.5 py-1 text-xs",
  md: "px-2 py-1 text-sm",
  lg: "px-2.5 py-1 text-base"
} as const;

type Size = keyof typeof sizeClasses;

export function AdminBadge({
  tone,
  children,
  size = "md"
}: {
  tone:
    | "pending"
    | "active"
    | "suspended"
    | "approved"
    | "rejected"
    | "partial"
    | "memo"
    | "invoice";
  children: ReactNode;
  size?: Size;
}) {
  const toneClass = {
    pending: "bg-[#fff8e6] text-[#c07000]",
    active: "bg-[#f0f8f4] text-[#2a9d5c]",
    suspended: "bg-[#fef0f0] text-[#c03030]",
    approved: "bg-[#f0f8f4] text-[#2a9d5c]",
    rejected: "bg-[#fef0f0] text-[#c03030]",
    partial: "bg-[#f0f2ff] text-[#233dff]",
    memo: "bg-[#f0f2ff] text-[#233dff]",
    invoice: "bg-[#fafaf8] text-[#050a30] border border-[#e5e2dc]"
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded font-bold uppercase tracking-[0.06em]",
        sizeClasses[size],
        toneClass
      )}
    >
      {children}
    </span>
  );
}

export function AccountStatusBadge({
  status,
  size = "md"
}: {
  status: AccountStatus;
  size?: Size;
}) {
  if (status === "PENDING") return <AdminBadge tone="pending" size={size}>Pending Approval</AdminBadge>;
  if (status === "ACTIVE") return <AdminBadge tone="active" size={size}>Active</AdminBadge>;
  if (status === "DEACTIVATED") return <AdminBadge tone="suspended" size={size}>Deactivated</AdminBadge>;
  return <AdminBadge tone="suspended" size={size}>Declined</AdminBadge>;
}

export function RequestStatusBadge({
  status,
  size = "md"
}: {
  status: RequestStatus;
  size?: Size;
}) {
  if (status === "PENDING") return <AdminBadge tone="pending" size={size}>Pending</AdminBadge>;
  if (status === "APPROVED") return <AdminBadge tone="approved" size={size}>Approved</AdminBadge>;
  if (status === "PARTIAL") return <AdminBadge tone="partial" size={size}>Partial</AdminBadge>;
  return <AdminBadge tone="rejected" size={size}>Rejected</AdminBadge>;
}

export function RequestTypeBadge({
  type,
  size = "md"
}: {
  type: RequestType;
  size?: Size;
}) {
  if (type === "MEMO") return <AdminBadge tone="memo" size={size}>Memo</AdminBadge>;
  return <AdminBadge tone="invoice" size={size}>Invoice</AdminBadge>;
}

export function RequestItemStatusBadge({
  status,
  size = "sm"
}: {
  status: RequestItemStatus;
  size?: Size;
}) {
  if (status === "APPROVED") return <AdminBadge tone="approved" size={size}>Approved</AdminBadge>;
  if (status === "REJECTED") return <AdminBadge tone="rejected" size={size}>Not fulfilled</AdminBadge>;
  return null;
}

export function AdminButton({
  variant,
  size = "md",
  className,
  children,
  type = "button",
  onClick,
  disabled
}: {
  variant: "primary" | "approve" | "reject" | "outline" | "blue";
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const variants = {
    primary: "bg-[#050a30] text-white hover:bg-[#050a30]/90",
    approve: "bg-[#2a9d5c] text-white hover:bg-[#249153]",
    reject: "bg-white text-[#c03030] border-[1.5px] border-[#c03030] hover:bg-[#fef0f0]",
    outline: "bg-white text-[#050a30] border border-[#e0ddd8] hover:bg-[#fafaf8]",
    blue: "bg-[#233dff] text-white hover:bg-[#1c34d6]"
  };
  const sizes = {
    md: "px-4 py-2 text-sm",
    sm: "px-3 py-2 text-base"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded font-bold uppercase tracking-[0.06em] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}

export function AdminCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-[#e5e2dc] bg-white", className)}>
      {children}
    </div>
  );
}

export function AdminCardHeader({
  title,
  subtitle,
  right
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#f0ede7] px-8 py-6">
      <div>
        <div className="text-xl font-bold text-[#050a30]">{title}</div>
        {subtitle ? (
          <div className="mt-0.5 text-base font-light text-[#aaa]">{subtitle}</div>
        ) : null}
      </div>
      {right}
    </div>
  );
}

export function InfoCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-base font-bold uppercase tracking-[0.1em] text-[#aaa]">
        {label}
      </div>
      <div className="text-xl leading-[1.5] text-[#050a30]">{children}</div>
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-base font-bold uppercase tracking-[0.1em] text-[#aaa]">
      {children}
    </label>
  );
}

export function MarkupInput({
  defaultValue,
  ariaLabel
}: {
  defaultValue?: number | null;
  ariaLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        aria-label={ariaLabel}
        defaultValue={defaultValue ?? ""}
        placeholder="0"
        className="w-20 rounded border border-[#e0ddd8] bg-white px-3 py-2 text-center text-xl font-bold text-[#050a30] outline-none focus:border-[#233dff]"
      />
      <span className="text-xl font-bold text-[#050a30]">%</span>
    </div>
  );
}

export function FilterTab({
  active,
  children,
  toneAccent,
  count,
  countTone,
  onClick
}: {
  active?: boolean;
  children: ReactNode;
  toneAccent?: boolean;
  count?: number;
  countTone?: "pending" | "neutral";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded border px-4 py-1 text-base",
        active
          ? "border-[#050a30] bg-[#050a30] font-bold text-white"
          : toneAccent
            ? "border-[#e07000] bg-white font-normal text-[#e07000]"
            : "border-[#e0ddd8] bg-white font-normal text-[#888]"
      )}
    >
      {children}
      {count !== undefined ? (
        <span
          className={cn(
            "ml-1 rounded-full font-bold px-1.5 text-sm",
            active
              ? "bg-white/20"
              : countTone === "pending"
                ? "bg-[#fff3e0]"
                : "bg-[#f0f0f0]"
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

export function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-[220px] rounded border border-[#e0ddd8] bg-white px-3 py-2 text-base text-[#050a30] outline-none focus:border-[#233dff]"
    />
  );
}
