"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { ShapeIcon } from "@/features/catalog/components/ShapeIcon";
import { ResultsToolbar } from "@/features/catalog/components/ResultsToolbar";
import { BulkActionBar } from "@/features/storefront/components/primitives";
import { resultFilterChips, resultGridCards } from "@/lib/constants/ui-data";
import { Heart } from "lucide-react";

type GridSortOption =
  | "carat-asc"
  | "carat-desc"
  | "price-asc"
  | "price-desc";

function parseCarat(title: string) {
  const match = title.match(/(\d+(?:\.\d+)?)ct/i);
  return match ? Number(match[1]) : 0;
}

function parsePrice(price: string) {
  return Number(price.replace(/[$,]/g, ""));
}

export function ResultsGridPageView() {
  const pathname = usePathname();
  const modifySearchHref = pathname.replace(/\/results(?:\/list)?$/, "") || "/";
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    resultGridCards.filter((card) => card.favored).map((card) => card.id)
  );
  const [sortOption, setSortOption] = useState<GridSortOption>("carat-asc");

  const toggleFavorite = (cardId: string) => {
    setFavoriteIds((current) =>
      current.includes(cardId) ? current.filter((id) => id !== cardId) : [...current, cardId]
    );
  };

  const sortedCards = useMemo(() => {
    const cards = [...resultGridCards];

    cards.sort((left, right) => {
      switch (sortOption) {
        case "carat-asc":
          return parseCarat(left.title) - parseCarat(right.title);
        case "carat-desc":
          return parseCarat(right.title) - parseCarat(left.title);
        case "price-asc":
          return parsePrice(left.price) - parsePrice(right.price);
        case "price-desc":
          return parsePrice(right.price) - parsePrice(left.price);
        default:
          return 0;
      }
    });

    return cards;
  }, [sortOption]);

  return (
    <div>
      <ResultsToolbar
        filterItems={[...resultFilterChips, "Excellent cut"]}
        totalCount={566}
        activeView="grid"
        modifySearchHref={modifySearchHref}
        listHref="results/list"
        topControls={
          <>
            <div className="custom-select w-full sm:w-auto">
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as GridSortOption)}
                className="w-full rounded-xl border border-[#e0ddd8] bg-white text-base text-[#050a30] outline-none sm:text-xl"
              >
                <option value="carat-asc">Carat: low to high</option>
                <option value="carat-desc">Carat: high to low</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
            <div className="hidden h-7 w-[2px] bg-[#e0ddd8] lg:block" />
          </>
        }
      />
      <div className="flex flex-col gap-4 px-6 py-6 lg:px-10 lg:py-8">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {sortedCards.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-2xl border border-[#e5e2dc] bg-white shadow-[0_16px_40px_rgba(5,10,48,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(5,10,48,0.08)]"
            >
              <div className="absolute left-4 top-4 z-10">
                <Checkbox className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(card.id)}
                aria-label={favoriteIds.includes(card.id) ? "Remove from favorites" : "Add to favorites"}
                className="absolute right-4 top-4 z-10 text-[#ff6c92]"
              >
                <Heart
                  className={`h-5 w-5 cursor-pointer transition-all duration-200 ${favoriteIds.includes(card.id) ? "fill-red-500 text-red-500" : "fill-transparent text-red-500 hover:fill-red-500"}`}
                />
              </button>
              <div className="relative flex h-52 items-center justify-center bg-[#f5f3ef] sm:h-60 lg:h-64">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" />
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-black/5 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                  <ShapeIcon label={card.shape} size={112} className="opacity-90" />
                </div>
                {card.video ? (
                  <div className="absolute bottom-3 right-3 rounded-md bg-[#ffc897] px-3 py-1 text-xs font-bold tracking-[0.08em] text-[#050a30]">
                    VIDEO
                  </div>
                ) : null}
              </div>
              <div className="space-y-2 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                <div className="text-sm font-light uppercase tracking-[0.08em] text-[#aaa] sm:text-base">
                  {card.type} &#8729; {card.shape}
                </div>
                <div className="text-2xl font-semibold leading-tight text-[#050a30] sm:text-[28px]">{card.title}</div>
                <div className="text-base font-light text-[#aaa] sm:text-xl">{card.id}</div>
                <div className="flex items-end justify-between gap-4 pt-2">
                  <div>
                    <div className="text-2xl font-semibold text-[#050a30] sm:text-[28px]">{card.price}</div>
                    <div className="mt-1 text-sm text-[#aaa] sm:text-base">{card.meta}</div>
                  </div>
                  <div className="mb-1 h-3.5 w-3.5 shrink-0 rounded-full bg-[#2a9d5c]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <BulkActionBar />
      </div>
    </div>
  );
}
