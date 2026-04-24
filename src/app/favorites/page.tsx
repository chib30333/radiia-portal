import { FavoriteHeader } from "@/components/marketing/FavoriteHeader";
import { FavoritesEmptyState } from "@/features/favorites/components/FavoritesEmptyState";
import { routeMeta } from "@/lib/route-meta";

export default function FavoritesPage() {
  const meta = routeMeta.favorites;

  return (
    <div className="space-y-6">
      {/* <PageHeader
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={meta.description}
      /> */}
      <FavoritesEmptyState />
    </div>
  );
}
