"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";

import { AdminContentArea, AdminPageHeaderMenu } from "../components/AdminContentArea";
import {
  AccountStatusBadge,
  AdminButton,
  FilterTab,
  SearchInput
} from "../components/AdminPrimitives";
import { adminAccountsList, findCompanyById } from "@/services/admin.service";
import { formatDate } from "@/lib/format";
import type { AccountStatus, AdminAccount } from "@/types/admin";

import { BulkActionBar } from "../components/BulkActionBar";

type Filter = "all" | "pending" | "active" | "deactivated";

const filterMatches: Record<Filter, (s: AccountStatus) => boolean> = {
  all: () => true,
  pending: (s) => s === "PENDING",
  active: (s) => s === "ACTIVE",
  deactivated: (s) => s === "DEACTIVATED"
};

type SortKey = "user" | "company" | "email" | "location" | "status" | "signed-up";
type SortDirection = "asc" | "desc";

const sortLabels: Record<SortKey, string> = {
  user: "User",
  company: "Company",
  email: "Email",
  location: "Location",
  status: "Status",
  "signed-up": "Signed up"
};

function getSortValue(acc: AdminAccount, key: SortKey): string {
  const company = findCompanyById(acc.companyId);
  switch (key) {
    case "user":
      return `${acc.firstName} ${acc.lastName}`.toLowerCase();
    case "company":
      return (company?.name ?? "").toLowerCase();
    case "email":
      return acc.email.toLowerCase();
    case "location":
      return acc.location.toLowerCase();
    case "status":
      return acc.status;
    case "signed-up":
      return acc.signedUpAt;
  }
}

function MarkupValue({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="font-light italic text-[#aaa]">Not set</span>;
  }
  return <span className="font-bold text-[#050a30]">{value}%</span>;
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

export function AccountsListView() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("signed-up");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const counts = useMemo(() => ({
    all: adminAccountsList.length,
    pending: adminAccountsList.filter((a) => a.status === "PENDING").length,
    active: adminAccountsList.filter((a) => a.status === "ACTIVE").length,
    deactivated: adminAccountsList.filter((a) => a.status === "DEACTIVATED").length
  }), []);

  const filteredRows = useMemo(
    () => adminAccountsList.filter((a) => filterMatches[filter](a.status)),
    [filter]
  );

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const left = getSortValue(a, sortKey);
      const right = getSortValue(b, sortKey);
      const cmp = left.localeCompare(right, undefined, { numeric: true });
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
    setSortDirection(key === "signed-up" ? "desc" : "asc");
  };

  const sortLabel = `${sortLabels[sortKey]} ${sortDirection.toUpperCase()}`;

  const columns: DataTableColumn<AdminAccount>[] = [
    {
      key: "user",
      label: (
        <SortableHeader
          label="User"
          active={sortKey === "user"}
          direction={sortDirection}
          onClick={() => toggleSort("user")}
        />
      ),
      render: (acc) => (
        <span className="font-bold text-[#050a30]">
          {acc.firstName} {acc.lastName}
        </span>
      )
    },
    {
      key: "company",
      label: (
        <SortableHeader
          label="Company"
          active={sortKey === "company"}
          direction={sortDirection}
          onClick={() => toggleSort("company")}
        />
      ),
      render: (acc) => <span className="text-[#555]">{findCompanyById(acc.companyId)?.name}</span>
    },
    {
      key: "email",
      label: (
        <SortableHeader
          label="Email"
          active={sortKey === "email"}
          direction={sortDirection}
          onClick={() => toggleSort("email")}
        />
      ),
      render: (acc) => <span className="font-light text-[#888]">{acc.email}</span>
    },
    {
      key: "location",
      label: (
        <SortableHeader
          label="Location"
          active={sortKey === "location"}
          direction={sortDirection}
          onClick={() => toggleSort("location")}
        />
      ),
      render: (acc) => <span className="font-light text-[#888]">{acc.location}</span>
    },
    {
      key: "markup-gem",
      label: <span>Markup — Gemstones</span>,
      render: (acc) => <MarkupValue value={findCompanyById(acc.companyId)?.gemstoneMarkupPct ?? null} />
    },
    {
      key: "markup-natural",
      label: <span>Markup — Nat. Diamonds</span>,
      render: (acc) => <MarkupValue value={findCompanyById(acc.companyId)?.naturalDiamondMarkupPct ?? null} />
    },
    {
      key: "markup-lab",
      label: <span>Markup — Lab Diamonds</span>,
      render: (acc) => <MarkupValue value={findCompanyById(acc.companyId)?.labDiamondMarkupPct ?? null} />
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
      render: (acc) => <AccountStatusBadge status={acc.status} />
    },
    {
      key: "signed-up",
      label: (
        <SortableHeader
          label="Signed up"
          active={sortKey === "signed-up"}
          direction={sortDirection}
          onClick={() => toggleSort("signed-up")}
        />
      ),
      render: (acc) => <span className="font-light text-[#888]">{formatDate(acc.signedUpAt)}</span>
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (acc) => {
        const pending = acc.status === "PENDING";
        return (
          <Link href={`/admin/accounts/${acc.id}` as never}>
            <AdminButton variant={pending ? "primary" : "outline"} size="sm">
              {pending ? "Review →" : "View →"}
            </AdminButton>
          </Link>
        );
      }
    }
  ];

  return (
    <>
      <AdminPageHeaderMenu
        title="Accounts"
        subtitle={`${counts.all} total · ${counts.pending} pending · ${counts.active} active`}
      />
      <AdminContentArea>
        <div className="flex flex-wrap items-center gap-3 px-6 pt-12">
          <FilterTab active={filter === "all"} count={counts.all} onClick={() => setFilter("all")}>
            All
          </FilterTab>
          <FilterTab
            active={filter === "pending"}
            toneAccent={filter !== "pending"}
            count={counts.pending}
            countTone="pending"
            onClick={() => setFilter("pending")}
          >
            Pending
          </FilterTab>
          <FilterTab
            active={filter === "active"}
            count={counts.active}
            onClick={() => setFilter("active")}
          >
            Active
          </FilterTab>
          <FilterTab
            active={filter === "deactivated"}
            count={counts.deactivated}
            onClick={() => setFilter("deactivated")}
          >
            Deactivated
          </FilterTab>
          <span className="rounded-md border border-[#233dff]/40 bg-[#eef1ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#233dff]">
            {selectedRowIds.length} selected
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-3 px-6">
          <SearchInput placeholder="Search by name, company, email…" />
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
          <DataTable<AdminAccount>
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
                {(safePage - 1) * pageSize + paginatedRows.length} of {sortedRows.length} accounts
              </>
            }
            onPreviousPage={() => setPage((p) => Math.max(1, p - 1))}
            onNextPage={() => setPage((p) => Math.min(pageCount, p + 1))}
            rowClassName={(acc, _i, selected) =>
              cn(acc.status === "PENDING" && !selected && "bg-[#fffbf2]", selected && "bg-[#f8f9ff]")
            }
            emptyState="No accounts match the current filter."
          />

          <BulkActionBar selectedCount={selectedRowIds.length} kind="accounts" />
        </div>
      </AdminContentArea>
    </>
  );
}

