import { Card } from "@/components/ui/card";

export function FavoritesEmptyState() {
  return (
    <Card className="flex min-h-[320px] items-center justify-center bg-[linear-gradient(180deg,#fff_0%,#fafaf8_100%)]">
      <div className="max-w-md text-center">
        <p className="text-2xl font-semibold text-foreground">Favorites will live here</p>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Use this space for shortlist workflows, buyer collaboration, and salesperson-curated collections.
        </p>
      </div>
    </Card>
  );
}
