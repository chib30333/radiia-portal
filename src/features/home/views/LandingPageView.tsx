import LandingCard from "../components/LandingCard";
import { landingCards } from "@/lib/constants/ui-data";
import { Input } from "@/components/ui/input";

export function LandingPageView() {
  return (
    <div className="flex min-h-full w-full flex-1 items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-10 text-center sm:px-6 md:py-24 lg:px-12">
        <div className="mx-auto mb-12 flex max-w-2xl rounded-none overflow-hidden border border-[#e0ddd8] bg-[#fafaf8] shadow-[0_14px_30px_rgba(5,10,48,0.05)] sm:mb-16">
          <Input
            placeholder="Search by cert # or SKU..."
            className="w-full flex-1 bg-transparent px-4 py-4 rounded-none text-base text-[#050a30] outline-none placeholder:text-[#888] sm:px-5 sm:text-xl"
          />
          <div className="flex cursor-pointer items-center border border-[#050a30] bg-[#050a30] px-5 sm:px-8">
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" stroke="#ffc897" strokeWidth="1.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="#ffc897" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="mx-auto grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {landingCards.map((card) => (
            <LandingCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
