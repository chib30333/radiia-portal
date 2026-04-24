"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { ResultsToolbar } from "@/features/catalog/components/ResultsToolbar";
import { BulkActionBar } from "@/features/storefront/components/primitives";
import { resultFilterChips, resultRows } from "@/lib/constants/ui-data";
import { cn } from "@/lib/utils";
import { ArrowDownUp, Heart, Search } from "lucide-react";

type ResultRow = (typeof resultRows)[number];

type SortKey =
  | "id"
  | "type"
  | "shape"
  | "carat"
  | "color"
  | "clarity"
  | "ratio"
  | "ppc"
  | "total"
  | "lab"
  | "cert";

type SortDirection = "asc" | "desc";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function compareRows(a: ResultRow, b: ResultRow, key: SortKey, direction: SortDirection) {
  const left = a[key];
  const right = b[key];

  if (typeof left === "number" && typeof right === "number") {
    return direction === "asc" ? left - right : right - left;
  }

  return direction === "asc"
    ? String(left).localeCompare(String(right), undefined, { numeric: true })
    : String(right).localeCompare(String(left), undefined, { numeric: true });
}

function buildColumns(
  sortKey: SortKey,
  sortDirection: SortDirection,
  onSort: (key: SortKey) => void,
  favoriteIds: string[],
  onToggleFavorite: (rowId: string) => void
): DataTableColumn<ResultRow>[] {
  const sortableColumns: Array<{
    key: SortKey;
    label: string;
    align?: "left" | "right";
    sortable?: boolean;
  }> = [
    { key: "id", label: "SKU #" },
    { key: "type", label: "Type" },
    { key: "shape", label: "Shape" },
    { key: "carat", label: "Carat" },
    { key: "color", label: "Color" },
    { key: "clarity", label: "Clarity" },
    { key: "ratio", label: "Ratio" },
    { key: "ppc", label: "PPC", align: "right" },
    { key: "total", label: "Total", align: "right" },
    { key: "lab", label: "Lab" },
    { key: "cert", label: "Cert #", sortable: false }
  ];

  return [
    {
      key: "fav",
      label: <span>Fav</span>,
      align: "center",
      headerClassName: "w-12",
      cellClassName: "px-3",
      render: (row) => {
        const favored = favoriteIds.includes(row.id);

        return (
          <button type="button" onClick={() => onToggleFavorite(row.id)} className="inline-flex">
            <Heart
              className={cn(
                "h-5 w-5 mt-2 transition-colors",
                favored ? "fill-[#ff6c92] text-[#ff6c92]" : "fill-transparent text-[#ff6c92]"
              )}
            />
          </button>
        );
      }
    },
    {
      key: "vid",
      label: <span>Media</span>,
      align: "center",
      headerClassName: "w-12",
      cellClassName: "px-3",
      render: (row) => (
        <span
          className={cn(
            "inline-flex h-3.5 w-3.5 rounded-full",
            row.video ? "bg-[#233dff]" : "bg-[#d8d4cd]"
          )}
        />
      )
    },
    ...sortableColumns.map((column) => ({
      key: column.key,
      align: column.align,
      label:
        column.sortable === false ? (
          <span className={cn(column.align === "right" && "ml-auto inline-flex")}>{column.label}</span>
        ) : (
          <button
            type="button"
            onClick={() => onSort(column.key)}
            className={cn(
              "inline-flex items-center gap-2 transition-colors hover:text-[#050a30]",
              column.align === "right" && "ml-auto"
            )}
          >
            <span>{column.label}</span>
            <ArrowDownUp className={cn("h-4 w-4", sortKey === column.key && "text-[#233dff]")} />
            {sortKey === column.key ? (
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#233dff]">
                {sortDirection}
              </span>
            ) : null}
          </button>
        ),
      render: (row: ResultRow) => {
        if (column.key === "id") {
          return <span className="font-semibold text-[#233dff]">{row.id}</span>;
        }

        if (column.key === "type" || column.key === "shape" || column.key === "lab") {
          return <span className="text-[#888]">{row[column.key]}</span>;
        }

        if (column.key === "carat" || column.key === "color" || column.key === "clarity") {
          return <span className="font-semibold">{String(row[column.key])}</span>;
        }

        if (column.key === "ratio") {
          return <span className="text-[#888]">{row.ratio.toFixed(2)}</span>;
        }

        if (column.key === "ppc") {
          return <span className="text-[#888]">{formatCurrency(row.ppc)}</span>;
        }

        if (column.key === "total") {
          return <span className="font-semibold">{formatCurrency(row.total)}</span>;
        }

        if (column.key === "cert") {
          return row.cert === "-" ? (
            <span className="text-[#aaa]">-</span>
          ) : (
            <button type="button" className="font-semibold text-[#233dff] transition-colors hover:text-[#050a30]">
              {row.cert}
            </button>
          );
        }

        return <span>{String(row[column.key])}</span>;
      }
    }))
  ];
}

export function ResultsListPageView() {
  const pathname = usePathname();
  const gridHref = pathname.replace(/\/list$/, "") || pathname;
  const modifySearchHref = pathname.replace(/\/results(?:\/list)?$/, "") || "/";
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    resultRows.filter((row) => row.favored).map((row) => row.id)
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredRows = resultRows.filter((row) => {
    if (!normalizedQuery) {
      return true;
    }

    return [row.id, row.type, row.shape, row.color, row.clarity, row.lab, row.cert].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => compareRows(a, b, sortKey, sortDirection));
  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const paginatedRows = sortedRows.slice((safePage - 1) * pageSize, safePage * pageSize);
  const selectedOnPage = paginatedRows.filter((row) => selectedIds.includes(row.id)).length;
  const allOnPageSelected = paginatedRows.length > 0 && selectedOnPage === paginatedRows.length;
  const sortLabels: Record<SortKey, string> = {
    id: "SKU #",
    type: "Type",
    shape: "Shape",
    carat: "Carat",
    color: "Color",
    clarity: "Clarity",
    ratio: "Ratio",
    ppc: "PPC",
    total: "Total",
    lab: "Lab",
    cert: "Cert #"
  };
  const sortLabel = `${sortLabels[sortKey]} ${sortDirection.toUpperCase()}`;

  const toggleSort = (key: SortKey) => {
    setPage(1);
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection(key === "id" || key === "cert" ? "asc" : "desc");
  };

  const toggleRowSelection = (rowId: string) => {
    setSelectedIds((current) =>
      current.includes(rowId) ? current.filter((id) => id !== rowId) : [...current, rowId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((current) => {
      if (allOnPageSelected) {
        return current.filter((id) => !paginatedRows.some((row) => row.id === id));
      }

      const merged = new Set(current);
      paginatedRows.forEach((row) => merged.add(row.id));
      return [...merged];
    });
  };

  const toggleFavorite = (rowId: string) => {
    setFavoriteIds((current) =>
      current.includes(rowId) ? current.filter((id) => id !== rowId) : [...current, rowId]
    );
  };

  const columns = buildColumns(sortKey, sortDirection, toggleSort, favoriteIds, toggleFavorite);

  return (
    <div>
      <ResultsToolbar
        filterItems={resultFilterChips}
        totalCount={filteredRows.length}
        activeView="list"
        selectedCount={selectedIds.length}
        gridHref={gridHref}
        modifySearchHref={modifySearchHref}
        bottomControls={
          <div className="flex flex-col items-start justify-end gap-3 lg:flex-row">
            <label className="flex w-full items-center gap-3 rounded-md border border-[#e0ddd8] bg-white px-4 py-[9px] text-[#888] sm:max-w-sm">
              <Search className="h-4 w-4" />
              <input
                value={query}
                onChange={(event) => {
                  setPage(1);
                  setQuery(event.target.value);
                }}
                placeholder="Search SKU, cert, color..."
                className="min-w-0 flex-1 bg-transparent py-0 text-base text-[#050a30] outline-none placeholder:text-[#aaa] sm:text-[18px]"
              />
            </label>
            <div className="custom-select w-full sm:w-auto">
              <select
                value={pageSize}
                onChange={(event) => {
                  setPage(1);
                  setPageSize(Number(event.target.value));
                }}
                className="w-full rounded-md border border-[#e0ddd8] bg-white text-base text-[#050a30] outline-none sm:text-xl"
              >
                <option value="5">5 rows</option>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="50">50 rows</option>
              </select>
            </div>
            <div className="rounded-md border border-[#e0ddd8] bg-white px-4 py-[11px] text-sm text-[#050a30] sm:text-[18px]">
              Sort: {sortLabel}
            </div>
          </div>
        }
      />
      <div className="flex flex-col gap-4 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <DataTable
          columns={columns}
          rows={paginatedRows}
          getRowId={(row) => row.id}
          selectedRowIds={selectedIds}
          onToggleRowSelection={toggleRowSelection}
          onToggleSelectAll={toggleSelectAll}
          allRowsSelected={allOnPageSelected}
          page={safePage}
          pageCount={pageCount}
          summary={
            <>
              Showing {(safePage - 1) * pageSize + (paginatedRows.length ? 1 : 0)}-
              {(safePage - 1) * pageSize + paginatedRows.length} of {sortedRows.length}
            </>
          }
          onPreviousPage={() => setPage((current) => Math.max(1, current - 1))}
          onNextPage={() => setPage((current) => Math.min(pageCount, current + 1))}
          rowClassName={(_, index, selected) =>
            cn(selected && "bg-[#f8f9ff]", index % 2 === 1 && !selected && "bg-[#fcfbf8]")
          }
          emptyState="No diamonds match the current filters."
          mobileCardRender={(row, selected) => (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Checkbox checked={selected} onChange={() => toggleRowSelection(row.id)} className="mt-1" />
                  <div>
                    <div className="text-sm text-[#888]">{row.type} � {row.shape}</div>
                    <div className="text-xl font-semibold text-[#233dff]">{row.id}</div>
                  </div>
                </div>
                <button type="button" onClick={() => toggleFavorite(row.id)} className="text-[#ff6c92]">
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      favoriteIds.includes(row.id) ? "fill-[#ff6c92] text-[#ff6c92]" : "fill-transparent text-[#ff6c92]"
                    )}
                  />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <div className="text-[#aaa]">Carat</div>
                  <div className="font-semibold text-[#050a30]">{row.carat.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[#aaa]">Color / Clarity</div>
                  <div className="font-semibold text-[#050a30]">{row.color} � {row.clarity}</div>
                </div>
                <div>
                  <div className="text-[#aaa]">Lab</div>
                  <div className="text-[#050a30]">{row.lab}</div>
                </div>
                <div>
                  <div className="text-[#aaa]">Cert #</div>
                  <div className={cn(row.cert === "-" ? "text-[#aaa]" : "font-semibold text-[#233dff]")}>{row.cert}</div>
                </div>
                <div>
                  <div className="text-[#aaa]">PPC</div>
                  <div className="text-[#050a30]">{formatCurrency(row.ppc)}</div>
                </div>
                <div>
                  <div className="text-[#aaa]">Total</div>
                  <div className="font-semibold text-[#050a30]">{formatCurrency(row.total)}</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[#f0ede7] pt-3 text-sm">
                <div className="flex items-center gap-2 text-[#888]">
                  <span className={cn("inline-flex h-2.5 w-2.5 rounded-full", row.video ? "bg-[#233dff]" : "bg-[#d8d4cd]")} />
                  <span>{row.video ? "Video available" : "No video"}</span>
                </div>
                <span className={cn("font-medium", row.available ? "text-[#2a9d5c]" : "text-[#aaa]")}>{row.available ? "On hand" : "Unavailable"}</span>
              </div>
            </div>
          )}
        />
        <BulkActionBar compact />
      </div>
    </div>
  );
}
