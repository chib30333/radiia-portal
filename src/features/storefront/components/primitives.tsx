import type { ChangeEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SectionFrame({
  id,
  label,
  children
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto mb-12 max-w-[1100px]">
      <div className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#888]">
        <span>{label}</span>
        <span className="h-px flex-1 bg-[#d4d0c8]" />
      </div>
      <div className="overflow-hidden rounded-[8px] border border-[#e5e2dc] bg-white">
        {children}
      </div>
    </section>
  );
}

export function FilterTag({
  children,
  selected = false,
  tiny = false,
  lab = false
}: {
  children: ReactNode;
  selected?: boolean;
  tiny?: boolean;
  lab?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex w-full items-center justify-center text-center cursor-pointer rounded-md border bg-white px-4 py-1 text-sm sm:text-2xl",
        selected
          ? "border-[1.5px] border-[#233dff] bg-[#f0f2ff] font-bold text-[#233dff]"
          : "border-[#e0ddd8] text-[#555]",
        tiny && "min-h-[36px] px-3 py-1.5 text-sm",
        lab && "px-5"
      )}
    >
      {children}
    </span>
  );
}

export function FilterLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 text-md font-normal uppercase tracking-[0.04em] text-[#aaa] sm:mb-0 sm:text-xl">
      {children}
    </div>
  );
}

export function SmallInput({
  value,
  placeholder,
  onChange
}: {
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="min-w-0 md:min-w-[180px] flex-1 rounded-lg border border-[#e0ddd8] bg-white px-5 py-2 text-base text-[#050a30] outline-none placeholder:text-[#aaa] sm:text-2xl"
    />
  );
}

export function RangeSeparator() {
  return <span className="h-px w-2 shrink-0 bg-[#888]" aria-hidden="true" />;
}

export function RangeFilter({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange
}: {
  label: string;
  minValue?: string;
  maxValue?: string;
  onMinChange?: ChangeEventHandler<HTMLInputElement>;
  onMaxChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <FilterLabel>{label}</FilterLabel>
      <div className="flex items-center mt-2 gap-3">
        <SmallInput placeholder="Min" value={minValue} onChange={onMinChange} />
        <RangeSeparator />
        <SmallInput placeholder="Max" value={maxValue} onChange={onMaxChange} />
      </div>
    </div>
  );
}

export function FilterChip({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center gap-2 rounded-full border border-[#e0ddd8] bg-white px-4 py-1.5 text-sm text-[#050a30] sm:text-base">
      <span>{children}</span>
      <X size={16} className="text-[#aaa]" />
    </div>
  );
}

export function BulkActionBar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#e5e2dc] bg-[#fafaf8] px-4 py-4 text-sm sm:gap-5 sm:px-6 sm:text-base",
        compact && "mt-0"
      )}
    >
      <span className="text-[#888]">With selected:</span>
      <Button className="rounded-lg bg-[#050a30] px-5 py-2.5 font-normal text-white sm:text-base">
        Add to cart
      </Button>
      {["Add to favorites", "Share (with prices)", "Share (no prices)"].map((label) => (
        <Button
          key={label}
          className="rounded-lg border border-[#e0ddd8] bg-white px-5 py-2.5 font-normal text-[#888] sm:text-base"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export function CategoryBadge({
  text,
  green
}: {
  text: string;
  green?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-block w-fit rounded-lg px-3 py-1 text-sm font-semibold uppercase sm:px-4 sm:text-xl",
        green ? "bg-[#f0f8f4] text-[#2a9d5c]" : "bg-[#eef1ff] text-[#233dff]"
      )}
    >
      {text}
    </span>
  );
}
