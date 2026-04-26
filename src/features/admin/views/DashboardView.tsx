import Link from "next/link";

import { AdminContentArea, AdminPageHeader } from "../components/AdminShell";
import { AdminButton, AdminCard, RequestTypeBadge } from "../components/AdminPrimitives";
import {
  mockAccounts,
  mockRequests,
  mockTotalRequestItemCount,
  mockTotalRequestValue,
  getMockCompanyById
} from "../lib/mock-admin-data";
import { formatRelative, formatUsd } from "../lib/format";

export function DashboardView() {
  const today = new Date("2026-04-23T12:00:00.000Z");
  const formattedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const pending = mockAccounts.filter((a) => a.status === "PENDING");
  const openRequests = mockRequests.filter((r) => r.status === "PENDING");

  return (
    <>
      <AdminPageHeader title="Dashboard" subtitle={formattedToday} />
      <AdminContentArea>
        <div className="grid gap-4 md:grid-cols-2">
          <DashboardSection title="Pending accounts" count={pending.length} viewAllHref="/admin/accounts">
            <AdminCard>
              {pending.map((acc, i) => {
                const company = getMockCompanyById(acc.companyId);
                return (
                  <div
                    key={acc.id}
                    className={
                      "flex cursor-pointer items-center px-4 py-3" +
                      (i < pending.length - 1 ? " border-b border-[#f0ede7]" : "")
                    }
                  >
                    <div className="flex-1">
                      <div className="text-[12px] font-bold text-[#050a30]">
                        {acc.firstName} {acc.lastName}
                      </div>
                      <div className="text-[11px] font-light text-[#aaa]">
                        {company?.name} · {acc.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-light text-[#aaa]">
                        {formatRelative(acc.signedUpAt, today)}
                      </div>
                      <Link href={`/admin/accounts/${acc.id}` as never}>
                        <AdminButton variant="primary" size="sm">Review</AdminButton>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </AdminCard>
          </DashboardSection>

          <DashboardSection title="Open requests" count={openRequests.length + 4} viewAllHref="/admin/requests">
            <AdminCard>
              {openRequests.slice(0, 3).map((req, i) => {
                const company = getMockCompanyById(req.companyId);
                const total = mockTotalRequestValue(req);
                const itemCount = mockTotalRequestItemCount(req);
                return (
                  <div
                    key={req.id}
                    className={
                      "flex cursor-pointer items-center px-4 py-3" +
                      (i < openRequests.slice(0, 3).length - 1 ? " border-b border-[#f0ede7]" : "")
                    }
                  >
                    <div className="flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="text-[12px] font-bold text-[#050a30]">{req.reference}</span>
                        <RequestTypeBadge type={req.type} />
                      </div>
                      <div className="text-[11px] font-light text-[#aaa]">
                        {company?.name} · {itemCount} {itemCount === 1 ? "item" : "items"} · {formatUsd(total)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-light text-[#aaa]">
                        {formatRelative(req.submittedAt, today)}
                      </div>
                      <Link href={`/admin/requests/${req.id}` as never}>
                        <AdminButton variant="primary" size="sm">Review</AdminButton>
                      </Link>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-[#f0ede7] py-2.5 text-center text-[11px] font-light text-[#aaa]">
                + 4 more open requests
              </div>
            </AdminCard>
          </DashboardSection>
        </div>
      </AdminContentArea>
    </>
  );
}

function DashboardSection({
  title,
  count,
  viewAllHref,
  children
}: {
  title: string;
  count: number;
  viewAllHref: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#050a30]">
          {title}
          <span className="ml-1.5 inline-flex rounded-[10px] bg-[#fff3e0] px-2 py-px text-[10px] text-[#c07000]">
            {count}
          </span>
        </div>
        <Link href={viewAllHref as never} className="text-[11px] text-[#233dff] hover:underline">
          View all →
        </Link>
      </div>
      {children}
    </div>
  );
}
