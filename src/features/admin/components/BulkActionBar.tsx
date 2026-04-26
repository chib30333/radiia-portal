"use client";

import { cn } from "@/lib/utils";

type BulkActionKind = "accounts" | "requests";

const ACTION_LABELS: Record<BulkActionKind, string[]> = {
  accounts: ["Approve", "Decline", "Deactivate", "Export CSV"],
  requests: ["Mark approved", "Mark rejected", "Export CSV"]
};

export function BulkActionBar({
  selectedCount,
  kind
}: {
  selectedCount: number;
  kind: BulkActionKind;
}) {
  const disabled = selectedCount === 0;
  const actions = ACTION_LABELS[kind];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e2dc] bg-[#fafaf8] px-4 py-3 text-base">
      <span className="text-[#888]">With selected:</span>
      {actions.map((label, i) => (
        <button
          key={label}
          type="button"
          disabled={disabled}
          className={cn(
            "rounded-sm px-4 py-2 font-bold uppercase tracking-[0.06em] transition-colors",
            i === 0
              ? "bg-[#050a30] text-white hover:bg-[#050a30]/90"
              : "border border-[#e0ddd8] bg-white text-[#050a30] hover:bg-[#fafaf8]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
