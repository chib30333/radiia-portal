"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ShapeIcon } from "@/features/catalog/components/ShapeIcon";
import {
  FilterLabel,
  FilterTag,
  RangeFilter,
  RangeSeparator,
  SmallInput
} from "@/features/storefront/components/primitives";
import { naturalShapes } from "@/lib/constants/ui-data";
import { cn } from "@/lib/utils";
import { Minus, MoveLeft, SlidersHorizontal, X } from "lucide-react";

type DiamondSearchPageViewProps = {
  variant: "natural" | "lab";
};

const initialRanges = {
  caratMin: "1.00",
  caratMax: "2.00",
  ratioMin: "",
  ratioMax: "",
  lengthMin: "",
  lengthMax: "",
  widthMin: "",
  widthMax: "",
  totalPriceMin: "",
  totalPriceMax: ""
};

const whiteColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] as const;
const fancyColors = ["Yellow", "Pink", "Blue", "Green", "Other"] as const;
const clarityOptions = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1-I3"] as const;
const cutOptions = ["Ideal", "Excellent", "V. Good", "Good"] as const;
const labOptions = ["GIA", "IGI", "GCAL", "Other"] as const;

export function DiamondSearchPageView({ variant }: DiamondSearchPageViewProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const title = variant === "lab" ? "Lab Diamonds" : "Natural Diamonds";
  const [selectedShape, setSelectedShape] = useState<string>("");
  const [selectedWhiteColors, setSelectedWhiteColors] = useState<string[]>([]);
  const [selectedFancyColors, setSelectedFancyColors] = useState<string[]>([]);
  const [selectedClarities, setSelectedClarities] = useState<string[]>([]);
  const [selectedCut, setSelectedCut] = useState<string>("");
  const [selectedPolish, setSelectedPolish] = useState<string>("");
  const [selectedSymmetry, setSelectedSymmetry] = useState<string>("");
  const [selectedLab, setSelectedLab] = useState<string>("");
  const [ranges, setRanges] = useState(initialRanges);
  const [hasSearched, setHasSearched] = useState(false);

  const setRangeValue = (key: keyof typeof initialRanges, value: string) => {
    setRanges((current) => ({ ...current, [key]: value }));
  };

  const toggleMultiSelect = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const resetFilters = () => {
    setSelectedShape("");
    setSelectedWhiteColors([]);
    setSelectedFancyColors([]);
    setSelectedClarities([]);
    setSelectedCut("");
    setSelectedPolish("");
    setSelectedSymmetry("");
    setSelectedLab("");
    setRanges(initialRanges);
    setHasSearched(false);
  };

  const activeFilterSummary = useMemo(() => {
    const sections = [
      selectedShape || null,
      selectedWhiteColors.length ? `White: ${selectedWhiteColors.join(", ")}` : null,
      selectedFancyColors.length ? `Fancy: ${selectedFancyColors.join(", ")}` : null,
      selectedClarities.length ? selectedClarities.join(", ") : null,
      selectedCut ? `Cut: ${selectedCut}` : null,
      selectedPolish ? `Polish: ${selectedPolish}` : null,
      selectedSymmetry ? `Symmetry: ${selectedSymmetry}` : null,
      selectedLab ? `Lab: ${selectedLab}` : null,
      ranges.caratMin || ranges.caratMax ? `Carat ${ranges.caratMin || "Min"}-${ranges.caratMax || "Max"}` : null,
      ranges.ratioMin || ranges.ratioMax ? "Ratio" : null,
      ranges.lengthMin || ranges.lengthMax ? "Length" : null,
      ranges.widthMin || ranges.widthMax ? "Width" : null,
      ranges.totalPriceMin || ranges.totalPriceMax ? "Total Price" : null
    ].filter(Boolean);

    return sections.join(" | ");
  }, [
    ranges,
    selectedClarities,
    selectedCut,
    selectedFancyColors,
    selectedLab,
    selectedPolish,
    selectedShape,
    selectedSymmetry,
    selectedWhiteColors
  ]);

  const handleSearch = () => {
    setHasSearched(true);
    setFiltersOpen(false);
  };

  const filterPanel = (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-3">
        <FilterLabel>Shape</FilterLabel>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {naturalShapes.map((shape) => (
            <button
              key={shape.label}
              type="button"
              onClick={() => setSelectedShape(shape.label)}
              className={cn(
                "flex min-h-[96px] flex-col items-center justify-center rounded-xl border bg-white px-3 py-3 text-center",
                selectedShape === shape.label ? "border-2 border-[#233dff] bg-[#f0f2ff]" : "border-[#e0ddd8]"
              )}
            >
              <div className="flex justify-center">
                <ShapeIcon label={shape.label} selected={selectedShape === shape.label} />
              </div>
              <span className={cn("mt-1 text-sm sm:text-base", selectedShape === shape.label ? "font-bold text-[#233dff]" : "text-[#888]")}>{shape.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>Carat</FilterLabel>
        <div className="flex items-center gap-3 sm:gap-4">
          <SmallInput value={ranges.caratMin} onChange={(event) => setRangeValue("caratMin", event.target.value)} />
          <RangeSeparator />
          <SmallInput value={ranges.caratMax} onChange={(event) => setRangeValue("caratMax", event.target.value)} />
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>
          <div className="flex items-center gap-1">
            Color <Minus className="h-4 w-4" /> White
          </div>
        </FilterLabel>
        <div className="mb-1 flex flex-wrap gap-3">
          {whiteColors.map((item) => (
            <button key={item} type="button" onClick={() => toggleMultiSelect(item, setSelectedWhiteColors)}>
              <FilterTag selected={selectedWhiteColors.includes(item)}>{item}</FilterTag>
            </button>
          ))}
        </div>
        <FilterLabel>Fancy</FilterLabel>
        <div className="flex flex-wrap gap-2.5">
          {fancyColors.map((item) => (
            <button key={item} type="button" onClick={() => toggleMultiSelect(item, setSelectedFancyColors)}>
              <FilterTag tiny selected={selectedFancyColors.includes(item)}>{item}</FilterTag>
            </button>
          ))}
        </div>
      </div>
      <div className="h-[2px] bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>Clarity</FilterLabel>
        <div className="flex flex-wrap gap-2.5">
          {clarityOptions.map((item) => (
            <button key={item} type="button" onClick={() => toggleMultiSelect(item, setSelectedClarities)}>
              <FilterTag tiny selected={selectedClarities.includes(item)}>{item}</FilterTag>
            </button>
          ))}
        </div>
      </div>
      <div className="h-[2px] bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <div>
          <FilterLabel>Cut</FilterLabel>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {cutOptions.map((item) => (
              <button key={item} type="button" onClick={() => setSelectedCut(item)}>
                <FilterTag tiny selected={selectedCut === item}>{item}</FilterTag>
              </button>
            ))}
          </div>
        </div>
        <div>
          <FilterLabel>Polish</FilterLabel>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {cutOptions.map((item) => (
              <button key={item} type="button" onClick={() => setSelectedPolish(item)}>
                <FilterTag tiny selected={selectedPolish === item}>{item}</FilterTag>
              </button>
            ))}
          </div>
        </div>
        <div>
          <FilterLabel>Symmetry</FilterLabel>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {cutOptions.map((item) => (
              <button key={item} type="button" onClick={() => setSelectedSymmetry(item)}>
                <FilterTag tiny selected={selectedSymmetry === item}>{item}</FilterTag>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px bg-[#e5e2dc]" />
      <div className="flex flex-col gap-3">
        <FilterLabel>Lab</FilterLabel>
        <div className="flex flex-wrap gap-2.5">
          {labOptions.map((item) => (
            <button key={item} type="button" onClick={() => setSelectedLab(item)}>
              <FilterTag lab selected={selectedLab === item}>{item}</FilterTag>
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
      <Button className="mt-2 w-full bg-[#050a30] py-3.5 text-base font-semibold uppercase tracking-[0.08em] text-white sm:text-lg" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );

  return (
    <div>
      <div className="border-b border-[#f0ede7] py-6 md:pt-16 xl:pt-12">
        <div className="mx-auto flex flex-col gap-8 px-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <div className="flex items-center gap-2 text-[#aaa]">
              <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <Link href="/" className="cursor-pointer text-sm uppercase tracking-[0.14em] sm:text-base">Home</Link>
            </div>
            <h3 className="font-display mt-3 font-normal tracking-[0.03em] text-[#050a30] sm:text-4xl lg:text-5xl">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="noEffect" className="rounded-xl border border-[#e0ddd8] bg-white px-5 py-3 text-base text-[#050a30] sm:text-lg">
              Save search
            </Button>
            <Button variant="noEffect" className="rounded-xl border border-[#e0ddd8] bg-white px-5 py-3 text-base text-[#888] sm:text-lg" onClick={resetFilters}>
              Reset all
            </Button>
            <Button variant="noEffect" className="rounded-xl border border-[#e0ddd8] bg-white px-5 py-3 text-base text-[#050a30] lg:hidden" onClick={() => setFiltersOpen(true)}>
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
            <div className="mb-4 flex justify-center text-[#e5e2dc] sm:mb-5">
              <svg width="42" height="42" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 2 L16 9 L9 16 L2 9 Z" stroke="#d7d2ca" strokeWidth="1.6" />
              </svg>
            </div>
            <div className="text-lg font-light text-[#bbb] sm:text-2xl">{hasSearched ? "Search applied" : "Select filters and press Search"}</div>
            <div className="mt-2 text-sm text-[#d0ccc5] sm:text-base">{hasSearched ? `Active filters: ${activeFilterSummary}` : "Matching diamonds will populate here after your search runs."}</div>
          </div>
        </div>
      </div>
      {filtersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#050a30]/30" onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-[#fafaf8] shadow-[-16px_0_40px_rgba(5,10,48,0.14)]">
            <div className="flex items-center justify-between border-b border-[#e5e2dc] px-4 py-4 sm:px-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aaa]">Refine</div>
                <div className="text-2xl font-semibold text-[#050a30]">{title} filters</div>
              </div>
              <Button variant="noEffect" className="h-11 w-11 rounded-full border border-[#e0ddd8] p-0" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="wireframe-scrollbar flex-1 overflow-y-auto px-4 py-5 sm:px-6">{filterPanel}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
