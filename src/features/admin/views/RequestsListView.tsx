"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminContentArea, AdminPageHeaderMenu } from "../components/AdminContentArea";
import {
  AdminButton,
  FilterTab,
  RequestStatusBadge,
  RequestTypeBadge,
  SearchInput
} from "../components/AdminPrimitives";
import {
  mockRequests,
  getMockCompanyById,
  mockTotalRequestItemCount,
  mockTotalRequestValue
} from "../lib/mock-admin-data";
import { formatRelative, formatUsd } from "../lib/format";
import type { RequestStatus, RequestType } from "../lib/types";

type StatusFilter = "all" | RequestStatus;
type TypeFilter = "all" | RequestType;

export function RequestsListView() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const today = new Date("2026-04-23T12:00:00.000Z");

  const counts = useMemo(() => ({
    pending: mockRequests.filter((r) => r.status === "PENDING").length
  }), []);

  const rows = mockRequests.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    return true;
  });

  return (
    <>
      <AdminPageHeaderMenu
        title="Requests"
        subtitle={`${counts.pending} pending · ${mockRequests.length} total this month`}
      />
      <AdminContentArea>
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <FilterTab active={statusFilter === "all"} onClick={() => setStatusFilter("all")}>
            All
          </FilterTab>
          <FilterTab
            active={statusFilter === "PENDING"}
            toneAccent={statusFilter !== "PENDING"}
            count={counts.pending}
            countTone="pending"
            onClick={() => setStatusFilter("PENDING")}
          >
            Pending
          </FilterTab>
          <FilterTab active={statusFilter === "APPROVED"} onClick={() => setStatusFilter("APPROVED")}>
            Approved
          </FilterTab>
          <FilterTab active={statusFilter === "PARTIAL"} onClick={() => setStatusFilter("PARTIAL")}>
            Partial
          </FilterTab>
          <FilterTab active={statusFilter === "REJECTED"} onClick={() => setStatusFilter("REJECTED")}>
            Rejected
          </FilterTab>
          <div className="mx-1 h-5 w-px bg-[#e5e2dc]" />
          <FilterTab
            active={typeFilter === "MEMO"}
            onClick={() => setTypeFilter(typeFilter === "MEMO" ? "all" : "MEMO")}
          >
            Memo
          </FilterTab>
          <FilterTab
            active={typeFilter === "INVOICE"}
            onClick={() => setTypeFilter(typeFilter === "INVOICE" ? "all" : "INVOICE")}
          >
            Invoice
          </FilterTab>
          <div className="ml-auto">
            <SearchInput placeholder="Search by REQ #, client, SKU…" />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="border-b-2 border-[#e5e2dc] bg-[#fafaf8] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
                  <th className="whitespace-nowrap px-3.5 py-2.5">Request #</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Type</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Client</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Items</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Total value</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Note from client</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Status</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Submitted</th>
                  <th className="px-3.5 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((req) => {
                  const company = getMockCompanyById(req.companyId);
                  const isPending = req.status === "PENDING";
                  const itemCount = mockTotalRequestItemCount(req);
                  const total = mockTotalRequestValue(req);
                  return (
                    <tr
                      key={req.id}
                      className={
                        "border-b border-[#f0ede7] last:border-b-0 hover:bg-[#fafaf8] " +
                        (isPending ? "bg-[#fffbf2]" : "")
                      }
                    >
                      <td
                        className={
                          "px-3.5 py-3 font-bold " + (isPending ? "text-[#233dff]" : "text-[#050a30]")
                        }
                      >
                        {req.reference}
                      </td>
                      <td className="px-3.5 py-3">
                        <RequestTypeBadge type={req.type} />
                      </td>
                      <td className="px-3.5 py-3 text-[#555]">{company?.name}</td>
                      <td className="px-3.5 py-3 font-light text-[#888]">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                      </td>
                      <td className="px-3.5 py-3 font-bold text-[#050a30]">{formatUsd(total)}</td>
                      <td className="max-w-[200px] truncate px-3.5 py-3 font-light text-[#888]">
                        {req.noteFromClient ? `"${req.noteFromClient}"` : "—"}
                      </td>
                      <td className="px-3.5 py-3">
                        <RequestStatusBadge status={req.status} />
                      </td>
                      <td className="px-3.5 py-3 font-light text-[#888]">
                        {formatRelative(req.submittedAt, today)}
                      </td>
                      <td className="px-3.5 py-3">
                        <Link href={`/admin/requests/${req.id}` as never}>
                          <AdminButton variant={isPending ? "primary" : "outline"} size="sm">
                            {isPending ? "Review →" : "View →"}
                          </AdminButton>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td
                    colSpan={9}
                    className="px-3.5 py-3.5 text-center text-[11px] font-light text-[#aaa]"
                  >
                    Showing {rows.length} of {mockRequests.length} requests this month
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AdminContentArea>
    </>
  );
}
