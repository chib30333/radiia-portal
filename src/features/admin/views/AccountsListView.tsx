"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminContentArea, AdminPageHeaderMenu } from "../components/AdminContentArea";
import {
  AccountStatusBadge,
  AdminButton,
  FilterTab,
  SearchInput
} from "../components/AdminPrimitives";
import { mockAccounts, getMockCompanyById } from "../lib/mock-admin-data";
import { formatDate } from "../lib/format";
import type { AccountStatus } from "../lib/types";

type Filter = "all" | "pending" | "active" | "deactivated";

const filterMatches: Record<Filter, (s: AccountStatus) => boolean> = {
  all: () => true,
  pending: (s) => s === "PENDING",
  active: (s) => s === "ACTIVE",
  deactivated: (s) => s === "DEACTIVATED"
};

export function AccountsListView() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => ({
    all: mockAccounts.length,
    pending: mockAccounts.filter((a) => a.status === "PENDING").length,
    active: mockAccounts.filter((a) => a.status === "ACTIVE").length,
    deactivated: mockAccounts.filter((a) => a.status === "DEACTIVATED").length
  }), []);

  const rows = mockAccounts.filter((a) => filterMatches[filter](a.status));

  return (
    <>
      <AdminPageHeaderMenu
        title="Accounts"
        subtitle={`${counts.all} total · ${counts.pending} pending · ${counts.active} active`}
      />
      <AdminContentArea>
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
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
          <div className="ml-auto">
            <SearchInput placeholder="Search by name, company, email…" />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="border-b-2 border-[#e5e2dc] bg-[#fafaf8] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
                  <th className="whitespace-nowrap px-3.5 py-2.5">User</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Company</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Email</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Location</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Markup — Gemstones</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Markup — Nat. Diamonds</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Markup — Lab Diamonds</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Status</th>
                  <th className="whitespace-nowrap px-3.5 py-2.5">Signed up</th>
                  <th className="px-3.5 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((acc) => {
                  const company = getMockCompanyById(acc.companyId);
                  const pending = acc.status === "PENDING";
                  return (
                    <tr
                      key={acc.id}
                      className={
                        "border-b border-[#f0ede7] last:border-b-0 hover:bg-[#fafaf8] " +
                        (pending ? "bg-[#fffbf2]" : "")
                      }
                    >
                      <td className="px-3.5 py-3 font-bold text-[#050a30]">
                        {acc.firstName} {acc.lastName}
                      </td>
                      <td className="px-3.5 py-3 text-[#555]">{company?.name}</td>
                      <td className="px-3.5 py-3 font-light text-[#888]">{acc.email}</td>
                      <td className="px-3.5 py-3 font-light text-[#888]">{acc.location}</td>
                      <MarkupCell value={company?.gemstoneMarkupPct ?? null} />
                      <MarkupCell value={company?.naturalDiamondMarkupPct ?? null} />
                      <MarkupCell value={company?.labDiamondMarkupPct ?? null} />
                      <td className="px-3.5 py-3">
                        <AccountStatusBadge status={acc.status} />
                      </td>
                      <td className="px-3.5 py-3 font-light text-[#888]">
                        {formatDate(acc.signedUpAt)}
                      </td>
                      <td className="px-3.5 py-3">
                        <Link href={`/admin/accounts/${acc.id}` as never}>
                          <AdminButton variant={pending ? "primary" : "outline"} size="sm">
                            {pending ? "Review →" : "View →"}
                          </AdminButton>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td
                    colSpan={10}
                    className="px-3.5 py-3.5 text-center text-[11px] font-light text-[#aaa]"
                  >
                    Showing {rows.length} of {mockAccounts.length} accounts
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

function MarkupCell({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <td className="px-3.5 py-3 font-light italic text-[#aaa]">Not set</td>
    );
  }
  return <td className="px-3.5 py-3 font-bold text-[#050a30]">{value}%</td>;
}
