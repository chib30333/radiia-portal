import type { ReactNode } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Checkbox } from "./checkbox";

export type DataTableColumn<T> = {
  key: string;
  label: ReactNode;
  align?: "left" | "right" | "center";
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  selectedRowIds: string[];
  onToggleRowSelection: (rowId: string) => void;
  onToggleSelectAll: () => void;
  allRowsSelected: boolean;
  page: number;
  pageCount: number;
  summary: ReactNode;
  onPreviousPage: () => void;
  onNextPage: () => void;
  rowClassName?: (row: T, index: number, selected: boolean) => string;
  emptyState?: ReactNode;
  mobileCardRender?: (row: T, selected: boolean) => ReactNode;
};

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  selectedRowIds,
  onToggleRowSelection,
  onToggleSelectAll,
  allRowsSelected,
  page,
  pageCount,
  summary,
  onPreviousPage,
  onNextPage,
  rowClassName,
  emptyState,
  mobileCardRender
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#e5e2dc] bg-white shadow-[0_16px_40px_rgba(5,10,48,0.04)]">
      {mobileCardRender ? (
        <div className="space-y-3 border-b border-[#e5e2dc] bg-[#fcfbf8] p-3 lg:hidden">
          {rows.length > 0 ? (
            rows.map((row, index) => {
              const rowId = getRowId(row);
              const selected = selectedRowIds.includes(rowId);

              return (
                <div
                  key={rowId}
                  className={cn(
                    "rounded-2xl border border-[#e5e2dc] bg-white p-4 shadow-[0_12px_30px_rgba(5,10,48,0.04)]",
                    rowClassName?.(row, index, selected)
                  )}
                >
                  {mobileCardRender(row, selected)}
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-[#e5e2dc] bg-white px-6 py-12 text-center text-[16px] text-[#aaa]">
              {emptyState ?? "No results found."}
            </div>
          )}
        </div>
      ) : null}
      <div className="wireframe-scrollbar hidden overflow-x-auto lg:block">
        <table className="min-w-[1320px] w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[#fafaf8]">
            <tr className="border-b border-[#e5e2dc] text-left text-[18px] font-semibold uppercase text-[#888]">
              <th className="px-4 py-3">
                <Checkbox checked={allRowsSelected} onChange={onToggleSelectAll} />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-4",
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center",
                    column.headerClassName
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => {
                const rowId = getRowId(row);
                const selected = selectedRowIds.includes(rowId);

                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "border-b border-[#f0ede7] text-xl text-[#050a30] transition-colors hover:bg-[#fafaf8]",
                      rowClassName?.(row, index, selected)
                    )}
                  >
                    <td className="px-4 py-4 align-middle">
                      <Checkbox checked={selected} onChange={() => onToggleRowSelection(rowId)} />
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-4 align-middle",
                          column.align === "right" && "text-right",
                          column.align === "center" && "text-center",
                          column.cellClassName
                        )}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-16 text-center text-xl text-[#aaa]">
                  {emptyState ?? "No results found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 bg-[#fafaf8] px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-[#888] sm:text-base">{summary}</div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="noEffect"
            type="button"
            onClick={onPreviousPage}
            disabled={page === 1}
            className="rounded-xl border border-[#e0ddd8] bg-white px-4 py-2 text-sm text-[#050a30] disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="text-sm font-semibold text-[#050a30] sm:text-base">
            Page {page} / {pageCount}
          </span>
          <Button
            variant="noEffect"
            type="button"
            onClick={onNextPage}
            disabled={page === pageCount}
            className="rounded-xl border border-[#e0ddd8] bg-white px-4 py-2 text-sm text-[#050a30] disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
