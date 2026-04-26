import Link from "next/link";

import { AdminContentArea, AdminPageHeaderMenu } from "../components/AdminContentArea";
import { AdminButton, AdminCard, RequestTypeBadge } from "../components/AdminPrimitives";
import {
  adminAccountsList,
  adminRequestsList,
  getRequestItemCount,
  getRequestTotalValue,
  findCompanyById
} from "@/services/admin.service";
import { formatRelative, formatUsd } from "@/lib/format";

export function DashboardView() {
  const today = new Date("2026-04-23T12:00:00.000Z");
  const formattedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const pending = adminAccountsList.filter((a) => a.status === "PENDING");
  const openRequests = adminRequestsList.filter((r) => r.status === "PENDING");

  return (
    <>
      <AdminPageHeaderMenu title="Dashboard" subtitle={formattedToday} />
      <AdminContentArea>
        <div className="grid gap-6 lg:gap-10 md:grid-cols-2 p-6">
          <DashboardSection title="Pending accounts" count={pending.length} viewAllHref="/admin/accounts">
            <AdminCard>
              {pending.map((acc, i) => {
                const company = findCompanyById(acc.companyId);
                return (
                  <div
                    key={acc.id}
                    className={
                      "flex cursor-pointer items-center px-6 py-3" +
                      (i < pending.length - 1 ? " border-b border-[#f0ede7]" : "")
                    }
                  >
                    <div className="flex-1">
                      <div className="text-xl font-bold text-[#050a30]">
                        {acc.firstName} {acc.lastName}
                      </div>
                      <div className="text-base font-light text-[#aaa]">
                        {company?.name} · {acc.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-light text-[#aaa]">
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
                const company = findCompanyById(req.companyId);
                const total = getRequestTotalValue(req);
                const itemCount = getRequestItemCount(req);
                return (
                  <div
                    key={req.id}
                    className={
                      "flex cursor-pointer items-center px-6 py-3" +
                      (i < openRequests.slice(0, 3).length - 1 ? " border-b border-[#f0ede7]" : "")
                    }
                  >
                    <div className="flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="text-xl font-bold text-[#050a30]">{req.reference}</span>
                        <RequestTypeBadge type={req.type} />
                      </div>
                      <div className="text-base font-light text-[#aaa]">
                        {company?.name} · {itemCount} {itemCount === 1 ? "item" : "items"} · {formatUsd(total)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-light text-[#aaa]">
                        {formatRelative(req.submittedAt, today)}
                      </div>
                      <Link href={`/admin/requests/${req.id}` as never}>
                        <AdminButton variant="primary" size="sm">Review</AdminButton>
                      </Link>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-[#f0ede7] py-3 text-center text-base font-light text-[#aaa]">
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
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xl font-bold uppercase tracking-[0.06em] text-[#050a30]">
          {title}
          <span className="ml-2 inline-flex rounded-[10px] bg-[#fff3e0] px-2 py-px text-sm text-[#c07000]">
            {count}
          </span>
        </div>
        <Link href={viewAllHref as never} className="text-xl text-[#233dff] hover:underline">
          View all →
        </Link>
      </div>
      {children}
    </div>
  );
}
