import { ItemDetailPageView } from "@/features/items/views/ItemDetailPageView";

type ItemDetailPageProps = {
  params: {
    itemId: string;
  };
};

export default function ItemDetailPage({ params }: ItemDetailPageProps) {
  return (
    <ItemDetailPageView
      variant={params.itemId.toLowerCase().startsWith("s") ? "gemstone" : "diamond"}
    />
  );
}
