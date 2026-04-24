import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { landingCards } from '@/lib/constants/ui-data';
import gemstoneSearchBox from "@/assets/Gemstone search box.jpg";
import labDiamondSearchBox from "@/assets/Lab diamond search box.jpg";
import naturalDiamondSearchBox from "@/assets/Natural diamond search box.jpg";

const landingCardImages = {
  natural: naturalDiamondSearchBox,
  lab: labDiamondSearchBox,
  gemstones: gemstoneSearchBox
} as const;

function LandingCard({ title, href, kind }: (typeof landingCards)[number]) {
  return (
    <Link href={href} className="overflow-hidden border border-[#e5e2dc] bg-white shadow-[0_18px_40px_rgba(5,10,48,0.05)] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative h-[220px] border-b border-[#e5e2dc] bg-[#f8f6f1] sm:h-[260px] lg:h-[300px]">
        <Image
          src={landingCardImages[kind]}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority
        />
      </div>
      <div className="flex min-h-[120px] gap-4 items-center justify-between px-5 py-0 sm:min-h-[122px] sm:px-6">
        <div className="flex items-center font-display text-[24px] font-normal tracking-[0.03em] text-[#050a30] sm:text-[28px]">
          {title}
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#050a30] sm:text-base">
            Browse
          </span>
          <MoveRight />
        </div>
      </div>
    </Link>
  );
}

export default LandingCard
