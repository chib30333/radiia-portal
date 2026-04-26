import { RequestDetailView } from "@/features/admin/views/RequestDetailView";

export default function AdminRequestDetailPage({ params }: { params: { id: string } }) {
  return <RequestDetailView requestId={params.id} />;
}
