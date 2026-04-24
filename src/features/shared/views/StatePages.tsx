import Link from "next/link";

import { Button } from "@/components/ui/button";
import { StateCard } from "@/features/shared/components/StateCard";
import { AlertTriangle, LoaderCircle, SearchX, ShoppingBag, Sparkles, StarOff } from "lucide-react";

export function NoResultsPageView() {
  return (
    <StateCard
      eyebrow="Catalog"
      title="No results found"
      description="We couldn't find any stones that match the current filter combination. Try widening the range or clearing a few filters."
      icon={<SearchX className="h-6 w-6" />}
      actions={
        <>
          <Button>Modify search</Button>
          <Link href="/gemstones"><Button className="border border-[#e0ddd8] bg-white text-[#888]">Back to search</Button></Link>
        </>
      }
    />
  );
}

export function EmptyCartPageView() {
  return (
    <StateCard
      eyebrow="Quotation"
      title="Your cart is empty"
      description="Add stones to start a memo or invoice request. Your selected items and notes will appear here."
      icon={<ShoppingBag className="h-6 w-6" />}
      actions={<Link href="/gemstones"><Button>Browse inventory</Button></Link>}
    />
  );
}

export function LoadingStateView() {
  return (
    <StateCard
      eyebrow="Loading"
      title="Preparing your workspace"
      description="Fetching inventory, account preferences, and saved selections. This mock state can be swapped for live loaders later."
      icon={<LoaderCircle className="h-6 w-6 animate-spin" />}
      className="animate-pulse"
    />
  );
}

export function ErrorStateView() {
  return (
    <StateCard
      eyebrow="Error"
      title="Something went wrong"
      description="We couldn't load this screen right now. Please try again or contact RADIIA support if the issue continues."
      icon={<AlertTriangle className="h-6 w-6" />}
      actions={<Button>Try again</Button>}
    />
  );
}

export function NoFavoritesPageView() {
  return (
    <StateCard
      eyebrow="Buyer tools"
      title="No favorites yet"
      description="Favorite stones from search results or product detail pages to build a shortlist for your client conversations."
      icon={<StarOff className="h-6 w-6" />}
      actions={<Link href="/natural-diamonds/results"><Button>Explore stones</Button></Link>}
    />
  );
}
