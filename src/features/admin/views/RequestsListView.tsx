"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";

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
import type { AdminRequest, RequestStatus, RequestType } from "../lib/types";

type StatusFilter = "all" | RequestStatus;
type TypeFilter = "all" | RequestType;

type SortKey = "reference" | "type" | "client" | "items" | "total" | "status" | "submitted";
type SortDirection = "asc" | "desc";

const sortLabels: Record<SortKey, string> = {
  reference: "Request #",
  type: "Type",
  client: "Client",
  items: "Items",
  total: "Total value",
  status: "Status",
  submitted: "Submitted"
};

function getSortValue(req: AdminRequest, key: SortKey): string | number {
  switch (key) {
    case "reference":
      return req.reference;
    case "type":
      return req.type;
    case "client":
      return (getMockCompanyById(req.companyId)?.name ?? "").toLowerCase();
    case "items":
      return mockTotalRequestItemCount(req);
    case "total":
      return mockTotalRequestValue(req);
    case "status":
      return req.status;
    case "submitted":
      return req.submittedAt;
  }
}

function SortableHeader({
  label,
  active,
  direction,
  onClick,
  align
}: {
  label: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
  align?: "left" | "right" | "center";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 transition-colors hover:text-[#050a30]",
        align === "right" && "ml-auto"
      )}
    >
      <span>{label}</span>
      <ArrowDownUp className={cn("h-4 w-4", active && "text-[#233dff]")} />
      {active ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#233dff]">
          {direction}
        </span>
      ) : null}
    </button>
  );
}

export function RequestsListView() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("submitted");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const today = new Date("2026-04-23T12:00:00.000Z");

  const counts = useMemo(() => ({
    pending: mockRequests.filter((r) => r.status === "PENDING").length
  }), []);

  const filteredRows = useMemo(
    () =>
      mockRequests.filter((r) => {
        if (statusFilter !== "all" && r.status !== statusFilter) return false;
        if (typeFilter !== "all" && r.type !== typeFilter) return false;
        return true;
      }),
    [statusFilter, typeFilter]
  );

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const left = getSortValue(a, sortKey);
      const right = getSortValue(b, sortKey);
      if (typeof left === "number" && typeof right === "number") {
        return sortDirection === "asc" ? left - right : right - left;
      }
      const cmp = String(left).localeCompare(String(right), undefined, { numeric: true });
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [filteredRows, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const paginatedRows = sortedRows.slice((safePage - 1) * pageSize, safePage * pageSize);
  const allOnPageSelected =
    paginatedRows.length > 0 && paginatedRows.every((r) => selectedRowIds.includes(r.id));

  const toggleSort = (key: SortKey) => {
    setPage(1);
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection(key === "total" || key === "items" || key === "submitted" ? "desc" : "asc");
  };

  const sortLabel = `${sortLabels[sortKey]} ${sortDirection.toUpperCase()}`;

  const columns: DataTableColumn<AdminRequest>[] = [
    {
      key: "reference",
      label: (
        <SortableHeader
          label="Request #"
          active={sortKey === "reference"}
          direction={sortDirection}
          onClick={() => toggleSort("reference")}
        />
      ),
      render: (req) => (
        <span className={cn("font-bold", req.status === "PENDING" ? "text-[#233dff]" : "text-[#050a30]")}>
          {req.reference}
        </span>
      )
    },
    {
      key: "type",
      label: (
        <SortableHeader
          label="Type"
          active={sortKey === "type"}
          direction={sortDirection}
          onClick={() => toggleSort("type")}
        />
      ),
      render: (req) => <RequestTypeBadge type={req.type} />
    },
    {
      key: "client",
      label: (
        <SortableHeader
          label="Client"
          active={sortKey === "client"}
          direction={sortDirection}
          onClick={() => toggleSort("client")}
        />
      ),
      render: (req) => <span className="text-[#555]">{getMockCompanyById(req.companyId)?.name}</span>
    },
    {
      key: "items",
      label: (
        <SortableHeader
          label="Items"
          active={sortKey === "items"}
          direction={sortDirection}
          onClick={() => toggleSort("items")}
        />
      ),
      render: (req) => {
        const itemCount = mockTotalRequestItemCount(req);
        return (
          <span className="font-light text-[#888]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        );
      }
    },
    {
      key: "total",
      label: (
        <SortableHeader
          label="Total value"
          active={sortKey === "total"}
          direction={sortDirection}
          onClick={() => toggleSort("total")}
          align="right"
        />
      ),
      align: "right",
      render: (req) => <span className="font-bold text-[#050a30]">{formatUsd(mockTotalRequestValue(req))}</span>
    },
    {
      key: "note",
      label: <span>Note from client</span>,
      render: (req) => (
        <span className="block max-w-[200px] truncate font-light text-[#888]">
          {req.noteFromClient ? `"${req.noteFromClient}"` : "—"}
        </span>
      )
    },
    {
      key: "status",
      label: (
        <SortableHeader
          label="Status"
          active={sortKey === "status"}
          direction={sortDirection}
          onClick={() => toggleSort("status")}
        />
      ),
      render: (req) => <RequestStatusBadge status={req.status} />
    },
    {
      key: "submitted",
      label: (
        <SortableHeader
          label="Submitted"
          active={sortKey === "submitted"}
          direction={sortDirection}
          onClick={() => toggleSort("submitted")}
        />
      ),
      render: (req) => (
        <span className="font-light text-[#888]">{formatRelative(req.submittedAt, today)}</span>
      )
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (req) => {
        const isPending = req.status === "PENDING";
        return (
          <Link href={`/admin/requests/${req.id}` as never}>
            <AdminButton variant={isPending ? "primary" : "outline"} size="sm">
              {isPending ? "Review →" : "View →"}
            </AdminButton>
          </Link>
        );
      }
    }
  ];

  return (
    <>
      <AdminPageHeaderMenu
        title="Requests"
        subtitle={`${counts.pending} pending · ${mockRequests.length} total this month`}
      />
      <AdminContentArea>
        <div className="flex flex-wrap items-center gap-2.5 px-6 pt-12">
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
          <span className="rounded-md border border-[#233dff]/40 bg-[#eef1ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#233dff]">
            {selectedRowIds.length} selected
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-3 px-6">
          <SearchInput placeholder="Search by REQ #, client, SKU…" />
          <div className="custom-select">
            <select
              value={pageSize}
              onChange={(e) => {
                setPage(1);
                setPageSize(Number(e.target.value));
              }}
              className="rounded-md border border-[#e0ddd8] bg-white text-base text-[#050a30] outline-none"
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
            </select>
          </div>
          <div className="rounded-md border border-[#e0ddd8] bg-white px-3 py-2 text-base text-[#050a30]">
            Sort: {sortLabel}
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-4 px-6 pb-6">
          <DataTable<AdminRequest>
            columns={columns}
            rows={paginatedRows}
            getRowId={(r) => r.id}
            selectedRowIds={selectedRowIds}
            onToggleRowSelection={(id) =>
              setSelectedRowIds((current) =>
                current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
              )
            }
            onToggleSelectAll={() =>
              setSelectedRowIds((current) => {
                if (allOnPageSelected) {
                  return current.filter((id) => !paginatedRows.some((r) => r.id === id));
                }
                const merged = new Set(current);
                paginatedRows.forEach((r) => merged.add(r.id));
                return [...merged];
              })
            }
            allRowsSelected={allOnPageSelected}
            page={safePage}
            pageCount={pageCount}
            summary={
              <>
                Showing {(safePage - 1) * pageSize + (paginatedRows.length ? 1 : 0)}-
                {(safePage - 1) * pageSize + paginatedRows.length} of {sortedRows.length} requests
              </>
            }
            onPreviousPage={() => setPage((p) => Math.max(1, p - 1))}
            onNextPage={() => setPage((p) => Math.min(pageCount, p + 1))}
            rowClassName={(req, _i, selected) =>
              cn(req.status === "PENDING" && !selected && "bg-[#fffbf2]", selected && "bg-[#f8f9ff]")
            }
            emptyState="No requests match the current filters."
          />

          <BulkActionBar selectedCount={selectedRowIds.length} />
        </div>
      </AdminContentArea>
    </>
  );
}

function BulkActionBar({ selectedCount }: { selectedCount: number }) {
  const disabled = selectedCount === 0;
  const actions = ["Mark approved", "Mark rejected", "Export CSV"];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e2dc] bg-[#fafaf8] px-4 py-3 text-base">
      <span className="text-[#888]">With selected:</span>
      {actions.map((label, i) => (
        <button
          key={label}
          type="button"
          disabled={disabled}
          className={cn(
            "rounded-sm px-4 py-2 font-bold uppercase tracking-[0.06em] transition-colors",
            i === 0
              ? "bg-[#050a30] text-white hover:bg-[#050a30]/90"
              : "border border-[#e0ddd8] bg-white text-[#050a30] hover:bg-[#fafaf8]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
