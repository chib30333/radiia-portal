"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cartItems } from "@/lib/constants/ui-data";
import { cn } from "@/lib/utils";
import { Heart, MoveLeft, Trash } from "lucide-react";

function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4", muted && "italic opacity-50")}>
      <span className="text-base font-light text-[#888] sm:text-lg">{label}</span>
      <span className={cn("text-base font-normal sm:text-lg", muted ? "text-[#888]" : "text-[#050a30]")}>{value}</span>
    </div>
  );
}

function parseCurrency(value: string) {
  return Number(value.replace(/[$,]/g, ""));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function CartPageView() {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cartItems.filter((item) => item.selected).map((item) => item.id)
  );

  const allSelected = selectedIds.length === cartItems.length;
  const selectedCount = selectedIds.length;
  const total = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        if (!selectedIds.includes(item.id)) {
          return sum;
        }

        return sum + parseCurrency(item.total);
      }, 0),
    [selectedIds]
  );

  const toggleItem = (itemId: string) => {
    setSelectedIds((current) =>
      current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : cartItems.map((item) => item.id));
  };

  return (
    <div>
      <div className="border-b border-[#f0ede7] py-6 md:pt-16 xl:pt-12">
        <div className="mx-auto flex  flex-col gap-8 px-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div className="flex items-end gap-3 sm:gap-5">
            <h1 className="font-display text-4xl font-normal tracking-[0.04em] text-[#050a30] sm:text-5xl lg:text-6xl">Cart</h1>
            <span className="text-base  text-[#aaa] sm:text-lg">{cartItems.length} items</span>
          </div>
          <Link href="/gemstones" className="inline-flex items-center gap-2 text-base text-[#233dff] transition-colors hover:text-[#050a30] sm:text-lg">
            <MoveLeft className="h-4 w-4" /> Continue browsing
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6 lg:px-12 xl:flex-row xl:items-start xl:px-24 xl:py-8">
        <div className="flex-1 xl:mr-4">
          <label className="mb-1 flex cursor-pointer items-center gap-4 border-b border-[#f0ede7] pb-4">
            <Checkbox checked={allSelected} onChange={toggleSelectAll} className="mb-2 h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-base text-[#888] sm:text-lg">Select all</span>
          </label>
          {cartItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <div key={item.id} className="flex flex-col gap-4 border-b border-[#f0ede7] py-6 sm:gap-5 sm:py-8 md:flex-row">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="pt-1">
                    <Checkbox checked={isSelected} onChange={() => toggleItem(item.id)} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-[#e5e2dc] bg-[#f0f2f8] sm:h-32 sm:w-32">
                    <div className={cn("h-16 w-16 [border-radius:40%_40%_42%_42%/36%_36%_44%_44%] sm:h-20 sm:w-20", item.toneClass)} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-[#050a30] sm:text-[28px]">{item.id}</div>
                      <div className="text-base font-light text-[#aaa] sm:text-lg">{item.subtitle}</div>
                    </div>
                    <div className="rounded-2xl bg-[#fafaf8] px-4 py-3 text-left lg:min-w-[180px] lg:text-right">
                      <div className="mb-1 text-sm font-bold uppercase tracking-[0.12em] text-[#aaa]">Total</div>
                      <div className="text-2xl font-semibold text-[#050a30] sm:text-3xl">{item.total}</div>
                      <div className="text-base font-light text-[#aaa] sm:text-lg">{item.perCarat}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[#aaa] sm:gap-6">
                    <Button variant="noEffect" className="inline-flex items-center gap-2 px-0 text-base sm:text-lg">
                      <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Remove</span>
                    </Button>
                    <span className="hidden h-6 w-px bg-[#e5e2dc] sm:block" />
                    <Button variant="noEffect" className="inline-flex items-center gap-2 px-0 text-base sm:text-lg">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Save to favorites</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full shrink-0 xl:sticky xl:top-28 xl:w-[360px] 2xl:w-[420px]">
          <div className="flex flex-col gap-6 rounded-[24px] border border-[#e5e2dc] bg-[#fafaf8] p-5 shadow-[0_16px_40px_rgba(5,10,48,0.05)] sm:p-6 lg:p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#aaa] sm:text-base">Order summary</div>
            <div className="flex flex-col gap-2">
              {cartItems.map((item) => (
                <SummaryRow
                  key={item.id}
                  label={item.id}
                  value={selectedIds.includes(item.id) ? item.total : "not selected"}
                  muted={!selectedIds.includes(item.id)}
                />
              ))}
            </div>
            <div className="h-px bg-[#e5e2dc]" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#050a30] sm:text-base">Total</span>
                <span className="text-sm font-light text-[#aaa] sm:text-base">{selectedCount} of {cartItems.length} items selected</span>
              </div>
              <span className="text-3xl font-semibold text-[#050a30] sm:text-4xl">{formatCurrency(total)}</span>
            </div>
            <div className="h-px bg-[#e5e2dc]" />
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#aaa] sm:text-base">Note to RADIIA</div>
              <Textarea rows={4} placeholder="Add any notes for this order..." className="p-4 text-base font-light sm:text-lg" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="noEffect" className="w-full bg-[#050a30] px-4 py-4 text-center text-base font-semibold uppercase tracking-[0.08em] text-[#ffc897] sm:text-lg">
                Invoice Request
              </Button>
              <Button variant="noEffect" className="w-full bg-[#233dff] px-4 py-4 text-center text-base font-semibold uppercase tracking-[0.08em] text-white sm:text-lg">
                Memo Request
              </Button>
            </div>
            <div className="text-center text-base font-light leading-[1.6] text-[#aaa] sm:text-lg">
              Questions? <span className="text-[#233dff]">production@radiia.co</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
