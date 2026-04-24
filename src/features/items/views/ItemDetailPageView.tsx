import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/features/storefront/components/primitives";
import { detailRows } from "@/lib/constants/ui-data";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  FileText,
  Heart,
  MoveDiagonal,
  MoveLeft,
  MoveRight,
  MoveUpRight,
  Play
} from "lucide-react";

function DiamondHero() {
  return <div className="h-[180px] w-[180px] rounded-full border border-[#d4d0c8] bg-[radial-gradient(circle_at_38%_38%,#fff_0%,#e8e5de_40%,#c8c4bc_100%)] sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]" />;
}

function GemStoneHero() {
  return <div className="h-[180px] w-[180px] rounded-[40%] bg-[radial-gradient(circle_at_38%_35%,#6080e8_0%,#233dff_45%,#0a1880_100%)] sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]" />;
}

export function ItemDetailPageView({ variant }: { variant: "diamond" | "gemstone" }) {
  const gemstone = variant === "gemstone";

  return (
    <div>
      <div className="border-b border-[#f0ede7] py-6 md:pt-16 xl:pt-8">
        <div className="mx-auto  px-6 sm:px-6 lg:px-12 flex flex-wrap items-center gap-2 text-sm sm:text-base lg:text-lg">
          <span className="inline-flex items-center gap-1 text-[#233dff]">
            <MoveLeft className="h-4 w-4" />
            <span>Back to results</span>
          </span>
          <span className="text-[#ddd]">/</span>
          <span className="text-[#aaa]">{gemstone ? "Gemstones" : "Natural Diamonds"}</span>
          <ChevronRight className="h-4 w-4 text-[#ddd]" />
          <span className="text-[#aaa]">{gemstone ? "Sapphire" : "Round"}</span>
          <ChevronRight className="h-4 w-4 text-[#ddd]" />
          <span className="font-semibold text-[#050a30]">{gemstone ? "S15382-8" : "BR026301"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-6 lg:flex-row lg:gap-20 md:px-12 lg:px-24 lg:py-16">
        <div className="w-full shrink-0 lg:max-w-[640px]">
          <div className={cn("relative flex min-h-[280px] items-center justify-center rounded-[20px] border px-6 py-16 sm:min-h-[420px] lg:min-h-[560px]", gemstone ? "border-[#e5e2dc] bg-[#f0f2f8]" : "border-[#e5e2dc] bg-[#f5f3ef]")}>
            {gemstone ? <GemStoneHero /> : <DiamondHero />}
            <div className="absolute right-4 top-4 flex gap-2.5">
              <button className="rounded-lg border border-[#e0ddd8] bg-white px-3 py-2 text-sm font-semibold text-[#050a30] sm:text-base">
                360°
              </button>
              <button className="rounded-lg border border-[#e0ddd8] bg-white px-3 py-2 text-sm font-semibold text-[#050a30] sm:text-base">
                <MoveDiagonal className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full px-3 py-2 backdrop-blur-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-[#2a9d5c]" />
              <span className="text-base font-semibold text-[#2a9d5c] sm:text-xl">On hand</span>
            </div>
          </div>
          <div className="mt-4 flex gap-3 sm:gap-4">
            <div className={cn("flex h-24 w-24 items-center justify-center rounded-md border-2 sm:w-28 sm:h-28", gemstone ? "border-[#233dff] bg-[#f0f2f8]" : "border-[#233dff] bg-[#f5f3ef]")}>
              {gemstone ? <div className="h-12 w-12 rounded-[40%] bg-[#233dff] opacity-80" /> : <div className="h-12 w-12 rounded-full bg-[#e0ddd4]" />}
            </div>
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[#e0ddd8] bg-[#f5f3ef] opacity-70 sm:w-28 sm:h-28">
              <Play className="h-6 w-6 fill-[#b1ada7] text-[#b1ada7]" />
            </div>
            {!gemstone ? (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[#e0ddd8] bg-[#eef1ff] opacity-70 sm:w-28 sm:h-28">
                <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="16" height="13" rx="2" stroke="#888" strokeWidth="1.3" />
                  <circle cx="10" cy="10" r="3" stroke="#888" strokeWidth="1.1" />
                  <path d="M6 4L7.5 2h5L14 4" stroke="#888" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </div>
            ) : null}
          </div>
          {
            !gemstone ? null
              : (
                <button type="button" className="mt-4 flex w-full items-center gap-4 rounded-2xl border border-[#e5e2dc] bg-white px-5 py-5 text-left shadow-[0_8px_24px_rgba(5,10,48,0.04)] transition-colors hover:border-[#d9d5ce] sm:px-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef1ff] text-[#233dff] sm:h-14 sm:w-14">
                    <FileText className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-lg font-semibold text-[#233dff] sm:text-xl">
                      View GIA certificate
                      <MoveUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <span className="text-base font-light text-[#aaa] sm:text-lg">Cert # 185503</span>
                  </div>
                </button>
              )
          }
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-4">
              {gemstone ? (
                <div className="flex flex-wrap gap-3">
                  <CategoryBadge text="Sapphire" />
                  <CategoryBadge text="Certified" green />
                </div>
              ) : (
                <CategoryBadge text="Natural Diamond" />
              )}
              <h1 className="font-display text-4xl font-normal leading-tight tracking-[0.03em] text-[#050a30] sm:text-5xl lg:text-6xl">
                {gemstone ? "Cushion 2.89ct Blue" : "Round 1.01ct F I1"}
              </h1>
              <div className="text-base font-light tracking-[0.04em] text-[#aaa] sm:text-xl">Stock # {gemstone ? "S15382-8" : "BR026301"}</div>
            </div>
            <div className="flex items-center gap-3 sm:mt-1 sm:gap-4">
              <span className="text-[#ff6c92]">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8" />
              </span>
              <Button variant="noEffect" className="rounded-xl border border-[#e0ddd8] bg-[#fafaf8] px-5 py-2.5 text-base font-normal text-[#888] sm:text-lg">
                Share
              </Button>
            </div>
          </div>
          <div className="my-6 h-px bg-[#f0ede7] sm:my-8" />
          <div className="mb-8 flex flex-col gap-5 rounded-[24px] border border-[#e5e2dc] bg-[#fafaf8] p-5 sm:p-8">
            <div>
              <div className="mb-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#aaa] sm:text-base">Per carat</div>
              <div className="mb-4 text-2xl font-normal text-[#888] sm:text-3xl">{gemstone ? "$2,200" : "$1,447"}</div>
              <div className="mb-4 h-px bg-[#e5e2dc]" />
              <div className="mb-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#aaa] sm:text-base">Total price</div>
              <div className="text-4xl font-semibold tracking-[-0.01em] text-[#050a30] sm:text-5xl lg:text-6xl">{gemstone ? "$6,358" : "$1,462"}</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="noEffect" className="w-full bg-[#050a30] px-4 py-4 text-base font-semibold uppercase tracking-[0.08em] text-white sm:text-lg">
                Add to cart
              </Button>
              <Button variant="noEffect" className="w-full border-[1.5px] border-[#050a30] bg-white px-4 py-4 text-base font-semibold uppercase tracking-[0.08em] text-[#050a30] sm:text-lg">
                Request now
              </Button>
            </div>
            <Button variant="noEffect" className="flex flex-wrap items-center justify-center gap-2 text-base text-[#233dff] sm:text-lg">
              Ask a question <MoveRight className="h-4 w-4" /> production@radiia.co
            </Button>
          </div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#aaa] sm:text-xl">Product details</div>
          <div className="overflow-hidden rounded-2xl border border-[#e5e2dc] bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {detailRows[variant].map(([label, value], index) => (
                <div
                  key={`${label}-${value}`}
                  className={cn(
                    "flex items-center justify-between gap-4 px-5 py-4 text-base sm:px-6 sm:text-xl",
                    index < detailRows[variant].length - 1 && "border-b border-[#f0ede7]",
                    index % 2 === 0 && "md:border-r md:border-[#f0ede7]"
                  )}
                >
                  <span className="font-light text-[#aaa]">{label}</span>
                  <span className={cn("text-right font-semibold", label === "Cert #" ? "flex items-center gap-2 text-[#233dff]" : "text-[#050a30]")}>
                    {label === "Cert #" ? (
                      <>
                        <span>{value}</span>
                        <MoveUpRight className="h-4 w-4" />
                      </>
                    ) : (
                      value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
