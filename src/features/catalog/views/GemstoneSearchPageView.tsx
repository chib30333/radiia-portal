"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ShapeIcon } from "@/features/catalog/components/ShapeIcon";
import {
  gemstoneColorOptions,
  gemstoneShapes,
  gemstoneTypes
} from "@/lib/constants/ui-data";
import { cn } from "@/lib/utils";
import { MoveLeft, SlidersHorizontal, X } from "lucide-react";
import { FilterLabel, SmallInput, RangeSeparator, FilterTag, RangeFilter } from "@/features/storefront/components/primitives";

function GemClusterPlaceholder() {
  return (
    <div className="mb-5 flex justify-center gap-3 sm:gap-4">
      <div className="h-6 w-6 rounded-full bg-[#233dff] opacity-50 sm:h-8 sm:w-8" />
      <div className="h-6 w-6 rounded-full bg-[#ff6c92] opacity-50 sm:h-8 sm:w-8" />
      <div className="h-6 w-6 rounded-full bg-[#1a8a3a] opacity-50 sm:h-8 sm:w-8" />
    </div>
  );
}

const initialRanges = {
  caratMin: "",
  caratMax: "",
  ratioMin: "",
  ratioMax: "",
  lengthMin: "",
  lengthMax: "",
  widthMin: "",
  widthMax: "",
  totalPriceMin: "",
  totalPriceMax: ""
};

export function GemstoneSearchPageView() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedShape, setSelectedShape] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [certification, setCertification] = useState<"" | "All" | "Certified" | "Uncertified">("");
  const [ranges, setRanges] = useState(initialRanges);
  const [hasSearched, setHasSearched] = useState(false);

  const activeFilterSummary = useMemo(() => {
    const appliedRanges = [
      ranges.caratMin || ranges.caratMax ? "Carat" : null,
      ranges.ratioMin || ranges.ratioMax ? "Ratio" : null,
      ranges.lengthMin || ranges.lengthMax ? "Length" : null,
      ranges.widthMin || ranges.widthMax ? "Width" : null,
      ranges.totalPriceMin || ranges.totalPriceMax ? "Total Price" : null
    ].filter(Boolean);

    return [selectedType || null, selectedShape || null, selectedColor || null, certification || null, ...appliedRanges]
      .filter(Boolean)
      .join(", ");
  }, [certification, ranges, selectedColor, selectedShape, selectedType]);

  const setRangeValue = (key: keyof typeof initialRanges, value: string) => {
    setRanges((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setSelectedType("");
    setSelectedShape("");
    setSelectedColor("");
    setCertification("");
    setRanges(initialRanges);
    setHasSearched(false);
  };

  const handleSearch = () => {
    setHasSearched(true);
    setFiltersOpen(false);
  };

  const filterPanel = (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-3">
        <FilterLabel>Type</FilterLabel>
        <div className="flex flex-wrap gap-2.5">
          {gemstoneTypes.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSelectedType(item.label)}
              className={cn(
                "flex min-h-[52px] items-center gap-3 rounded-md border bg-white px-4 py-2 text-left sm:px-5",
                selectedType === item.label
                  ? "border-2 border-[#233dff] bg-[#f0f2ff]"
                  : "border-[#e0ddd8]"
              )}
            >
              <span className={cn("h-5 w-5 rounded-[4px] sm:h-[18px] sm:w-[18px]", item.swatchClass)} />
              <span
                className={cn(
                  "text-base sm:text-xl",
                  selectedType === item.label ? "font-bold text-[#233dff]" : "text-[#888]"
                )}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>Shape</FilterLabel>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {gemstoneShapes.map((shape) => (
            <button
              key={shape.label}
              type="button"
              onClick={() => setSelectedShape(shape.label)}
              className={cn(
                "flex min-h-[96px] flex-col items-center justify-center rounded-xl border bg-white px-3 py-3 text-center",
                selectedShape === shape.label
                  ? "border-2 border-[#233dff] bg-[#f0f2ff]"
                  : "border-[#e0ddd8]"
              )}
            >
              <div className="flex justify-center">
                <ShapeIcon label={shape.label} selected={selectedShape === shape.label} />
              </div>
              <span
                className={cn(
                  "mt-1 text-sm sm:text-base",
                  selectedShape === shape.label ? "font-bold text-[#233dff]" : "text-[#888]"
                )}
              >
                {shape.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>Carat</FilterLabel>
        <div className="flex items-center gap-3 sm:gap-4">
          <SmallInput
            placeholder="Min"
            value={ranges.caratMin}
            onChange={(event) => setRangeValue("caratMin", event.target.value)}
          />
          <RangeSeparator />
          <SmallInput
            placeholder="Max"
            value={ranges.caratMax}
            onChange={(event) => setRangeValue("caratMax", event.target.value)}
          />
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>Color</FilterLabel>
        <div className="flex flex-wrap gap-2.5">
          {gemstoneColorOptions.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSelectedColor(item.label)}
              className={cn(
                "flex min-h-[48px] items-center gap-2 rounded-xl border bg-white px-3 py-2 sm:px-4",
                selectedColor === item.label
                  ? "border-2 border-[#233dff] bg-[#f0f2ff] font-bold text-[#233dff]"
                  : "border-[#e0ddd8] text-[#888]"
              )}
            >
              <span className={cn("h-4 w-4 rounded-full", item.swatchClass)} />
              <span className="text-base sm:text-lg">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>Certification</FilterLabel>
        <div className="flex flex-wrap gap-3">
          {(["All", "Certified", "Uncertified"] as const).map((item) => (
            <button key={item} type="button" onClick={() => setCertification(item)} className="flex-1 w-full">
              <FilterTag selected={certification === item}>{item}</FilterTag>
            </button>
          ))}
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <RangeFilter
        label="Ratio"
        minValue={ranges.ratioMin}
        maxValue={ranges.ratioMax}
        onMinChange={(event) => setRangeValue("ratioMin", event.target.value)}
        onMaxChange={(event) => setRangeValue("ratioMax", event.target.value)}
      />
      <RangeFilter
        label="Length (mm)"
        minValue={ranges.lengthMin}
        maxValue={ranges.lengthMax}
        onMinChange={(event) => setRangeValue("lengthMin", event.target.value)}
        onMaxChange={(event) => setRangeValue("lengthMax", event.target.value)}
      />
      <RangeFilter
        label="Width (mm)"
        minValue={ranges.widthMin}
        maxValue={ranges.widthMax}
        onMinChange={(event) => setRangeValue("widthMin", event.target.value)}
        onMaxChange={(event) => setRangeValue("widthMax", event.target.value)}
      />
      <RangeFilter
        label="Total Price ($)"
        minValue={ranges.totalPriceMin}
        maxValue={ranges.totalPriceMax}
        onMinChange={(event) => setRangeValue("totalPriceMin", event.target.value)}
        onMaxChange={(event) => setRangeValue("totalPriceMax", event.target.value)}
      />
      <Button
        className="mt-2 w-full bg-[#050a30] py-3.5 text-base font-semibold uppercase tracking-[0.08em] text-white sm:text-lg"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );

  return (
    <div>
      <div className="border-b border-[#f0ede7] py-6 md:pt-16 xl:pt-12">
        <div className="mx-auto flex  flex-col gap-8 px-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <div className="flex items-center gap-2 text-[#aaa]">
              <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <Link href="/" className="cursor-pointer text-sm uppercase tracking-[0.14em] sm:text-base">
                Home
              </Link>
            </div>
            <h3 className="font-display mt-3 font-normal tracking-[0.03em] text-[#050a30] sm:text-4xl lg:text-5xl">
              Gemstones
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="noEffect" className="rounded-xl border border-[#e0ddd8] bg-white px-5 py-3 text-base text-[#050a30] sm:text-lg">
              Save search
            </Button>
            <Button
              variant="noEffect"
              className="rounded-xl border border-[#e0ddd8] bg-white px-5 py-3 text-base text-[#888] sm:text-lg"
              onClick={resetFilters}
            >
              Reset all
            </Button>
            <Button
              variant="noEffect"
              className="rounded-xl border border-[#e0ddd8] bg-white px-5 py-3 text-base text-[#050a30] lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>
      <div className="flex min-h-[calc(100vh-240px)] flex-col lg:flex-row">
        <aside className="hidden shrink-0 border-r border-[#e5e2dc] bg-[#fafaf8] px-6 py-8 lg:block lg:w-[360px] lg:px-12 xl:w-[500px]">
          {filterPanel}
        </aside>
        <div className="flex flex-1 items-center justify-center bg-white px-4 py-12 text-center sm:px-6 lg:px-10 lg:py-16">
          <div className="max-w-md">
            <GemClusterPlaceholder />
            <div className="text-lg font-light text-[#bbb] sm:text-2xl">
              {hasSearched ? "Search applied" : "Select filters and press Search"}
            </div>
            <div className="mt-2 text-sm text-[#d0ccc5] sm:text-base">
              {hasSearched
                ? `Active filters: ${activeFilterSummary}`
                : "Your gemstone matches will appear here once the search is applied."}
            </div>
          </div>
        </div>
      </div>
      {filtersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#050a30]/30"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-[#fafaf8] shadow-[-16px_0_40px_rgba(5,10,48,0.14)]">
            <div className="flex items-center justify-between border-b border-[#e5e2dc] px-4 py-4 sm:px-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aaa]">Refine</div>
                <div className="text-2xl font-semibold text-[#050a30]">Gemstone filters</div>
              </div>
              <Button variant="noEffect" className="h-11 w-11 rounded-full border border-[#e0ddd8] p-0" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="wireframe-scrollbar flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              {filterPanel}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
