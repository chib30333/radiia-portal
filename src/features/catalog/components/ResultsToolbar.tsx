import type { ReactNode } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FilterChip } from "@/features/storefront/components/primitives";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";

type ResultsToolbarProps = {
  filterItems: string[];
  totalCount: number;
  activeView: "grid" | "list";
  gridHref?: string;
  listHref?: string;
  modifySearchHref?: string;
  selectedCount?: number;
  topControls?: ReactNode;
  bottomControls?: ReactNode;
};

function ViewToggleOption({
  active,
  href,
  label,
  icon
}: {
  active: boolean;
  href?: string;
  label: string;
  icon: ReactNode;
}) {
  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  if (active || !href) {
    return (
      <div
        className={cn(
          "flex flex-1 items-center gap-2 px-4 py-2 text-sm font-semibold sm:px-5 sm:text-xl",
          active ? "bg-[#050a30] text-white" : "bg-white text-[#888]"
        )}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex flex-1 items-center gap-2 bg-white px-4 py-2 text-sm font-semibold text-[#888] transition-colors hover:bg-[#f7f6f3] sm:px-5 sm:text-xl"
    >
      {content}
    </Link>
  );
}

export function ResultsToolbar({
  filterItems,
  totalCount,
  activeView,
  gridHref,
  listHref,
  modifySearchHref,
  selectedCount,
  topControls,
  bottomControls
}: ResultsToolbarProps) {
  return (
    <div className="border-b border-[#e5e2dc] bg-[#fafaf8] py-6 md:pt-16 xl:pt-12">
      <div className="mx-auto px-6 sm:px-6 lg:px-12">
        <div className="mb-4 flex flex-wrap items-center gap-2.5 sm:mb-2 sm:gap-3">
          <span className="mr-1 text-sm font-bold uppercase tracking-[0.12em] text-[#aaa] sm:text-xl">
            Filters:
          </span>
          {filterItems.map((item) => (
            <FilterChip key={item}>{item}</FilterChip>
          ))}
          <Button variant="noEffect" className="px-2 text-base font-normal text-[#233dff] sm:text-xl">
            Clear all
          </Button>
        </div>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            {modifySearchHref ? (
              <Link
                href={modifySearchHref}
                className="inline-flex items-center gap-2 text-base font-semibold text-[#233dff] transition-colors hover:text-[#050a30] sm:text-xl"
              >
                <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" /> Modify search
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-base font-semibold text-[#233dff] sm:text-xl">
                <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" /> Modify search
              </span>
            )}
            <div className="hidden h-6 w-px bg-[#e0ddd8] sm:block" />
            <span className="text-xl font-semibold text-[#050a30] sm:text-[22px]">{totalCount} results</span>
            {selectedCount !== undefined ? (
              <span className="rounded-full bg-[#eef1ff] px-3 py-1 text-sm font-semibold text-[#233dff] sm:text-[16px]">
                {selectedCount} selected
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
            {topControls}
            <div className="flex overflow-hidden rounded-md border border-[#e0ddd8]">
              <ViewToggleOption
                active={activeView === "grid"}
                href={gridHref}
                label="Grid"
                icon={
                  <svg width="18" height="18" viewBox="0 0 12 12" aria-hidden="true">
                    <rect x="0" y="0" width="5" height="5" fill={activeView === "grid" ? "#fff" : "#888"} rx="1" />
                    <rect x="7" y="0" width="5" height="5" fill={activeView === "grid" ? "#fff" : "#888"} rx="1" />
                    <rect x="0" y="7" width="5" height="5" fill={activeView === "grid" ? "#fff" : "#888"} rx="1" />
                    <rect x="7" y="7" width="5" height="5" fill={activeView === "grid" ? "#fff" : "#888"} rx="1" />
                  </svg>
                }
              />
              <div className="w-px bg-[#e0ddd8]" />
              <ViewToggleOption
                active={activeView === "list"}
                href={listHref}
                label="List"
                icon={
                  <svg width="18" height="18" viewBox="0 0 12 12" aria-hidden="true">
                    <rect x="0" y="1" width="12" height="2" fill={activeView === "list" ? "#fff" : "#888"} rx="1" />
                    <rect x="0" y="5" width="12" height="2" fill={activeView === "list" ? "#fff" : "#888"} rx="1" />
                    <rect x="0" y="9" width="12" height="2" fill={activeView === "list" ? "#fff" : "#888"} rx="1" />
                  </svg>
                }
              />
            </div>
            <Button className="rounded-md border border-[#e0ddd8] bg-white px-5 py-2 text-base font-normal text-[#888] sm:text-xl">
              Save search
            </Button>
          </div>
        </div>
        {bottomControls ? <div className="mt-5">{bottomControls}</div> : null}
      </div>
    </div>
  );
}
