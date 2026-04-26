import { AdminContentArea, AdminPageHeaderMenu } from "@/features/admin/components/AdminContentArea";

export default function AdminInventoryPage() {
  return (
    <>
      <AdminPageHeaderMenu title="Inventory" subtitle="Read-only catalog view" />
      <AdminContentArea>
        <div className="rounded-lg border border-dashed border-[#e5e2dc] bg-white px-6 py-16 text-center text-[13px] text-[#aaa]">
          Inventory management UI is planned for a later phase. The catalog can
          currently be browsed from the buyer-side gemstones, natural-diamonds,
          and lab-diamonds routes.
        </div>
      </AdminContentArea>
    </>
  );
}
