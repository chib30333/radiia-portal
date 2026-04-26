"use client";

import { useState } from "react";

import { AdminContentArea, AdminPageHeaderMenu } from "../components/AdminContentArea";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  RequestItemStatusBadge,
  RequestStatusBadge
} from "../components/AdminPrimitives";
import {
  getMockCompanyById,
  getMockRequestById
} from "../lib/mock-admin-data";
import { formatDate, formatTime, formatUsd, formatUsdPerCt } from "../lib/format";
import type {
  AdminRequest,
  AdminRequestItem,
  RequestItemStatus
} from "../lib/types";

export function RequestDetailView({ requestId }: { requestId: string }) {
  const request = getMockRequestById(requestId);

  if (!request) {
    return (
      <>
        <AdminPageHeaderMenu
          title="Request not found"
          back={{ href: "/admin/requests", label: "Back to Requests" }}
        />
        <AdminContentArea>
          <div className="rounded-lg border border-dashed border-[#e5e2dc] bg-white px-6 py-12 text-center text-[13px] text-[#aaa]">
            No request exists with id <span className="font-bold">{requestId}</span>.
          </div>
        </AdminContentArea>
      </>
    );
  }

  return <RequestDetailContent request={request} />;
}

function RequestDetailContent({ request }: { request: AdminRequest }) {
  const company = getMockCompanyById(request.companyId);
  const isMemo = request.type === "MEMO";
  const [items, setItems] = useState<AdminRequestItem[]>(request.items);

  const setItemStatus = (itemId: string, status: RequestItemStatus) =>
    setItems((prev) => prev.map((it) => (it.id === itemId ? { ...it, status } : it)));

  const totals = {
    count: items.length,
    approved: items.filter((it) => it.status === "APPROVED"),
    undecided: items.filter((it) => it.status === "UNDECIDED"),
    rejected: items.filter((it) => it.status === "REJECTED")
  };
  const sumOf = (xs: AdminRequestItem[]) => xs.reduce((s, x) => s + x.totalPrice, 0);

  return (
    <>
      <AdminPageHeaderMenu
        title={request.reference}
        subtitle={`${company?.name} · Submitted ${formatDate(request.submittedAt)} at ${formatTime(request.submittedAt)}`}
        back={{ href: "/admin/requests", label: "Back to Requests" }}
        badges={
          <>
            <AdminBadge tone={isMemo ? "memo" : "invoice"} size="lg">
              {isMemo ? "Memo request" : "Invoice request"}
            </AdminBadge>
            <RequestStatusBadge status={request.status} size="lg" />
          </>
        }
      />
      <AdminContentArea>
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div>
            {request.noteFromClient ? (
              <div className="mb-4 flex items-start gap-3 rounded-lg border border-[#e5e2dc] bg-white px-4 py-3.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="7" cy="7" r="6" stroke="#aaa" strokeWidth="1.2" />
                  <line x1="7" y1="6" x2="7" y2="10" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="4.5" r="0.7" fill="#aaa" />
                </svg>
                <div>
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
                    Note from client
                  </div>
                  <div className="text-[13px] text-[#050a30]">&ldquo;{request.noteFromClient}&rdquo;</div>
                </div>
              </div>
            ) : null}

            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#050a30]">
              Line items — approve or reject each individually
            </div>

            {items.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#e5e2dc] bg-white px-6 py-12 text-center text-[13px] text-[#aaa]">
                No line items recorded for this request yet.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <LineItemCard
                    key={item.id}
                    item={item}
                    onApprove={() => setItemStatus(item.id, "APPROVED")}
                    onReject={() => setItemStatus(item.id, "REJECTED")}
                    onUndo={() => setItemStatus(item.id, "UNDECIDED")}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3.5 lg:sticky lg:top-5">
            <SummaryCard
              isMemo={isMemo}
              count={totals.count}
              approvedCount={totals.approved.length}
              approvedSum={sumOf(totals.approved)}
              undecidedCount={totals.undecided.length}
              undecidedSum={sumOf(totals.undecided)}
              rejectedCount={totals.rejected.length}
              rejectedSum={sumOf(totals.rejected)}
            />
            <HowItWorksCard isMemo={isMemo} />
            {!isMemo ? <BillToCard address={company?.shippingAddress ?? ""} /> : null}
            <InternalNoteCard initialValue={request.internalNote} />
          </div>
        </div>
      </AdminContentArea>
    </>
  );
}

function LineItemCard({
  item,
  onApprove,
  onReject,
  onUndo
}: {
  item: AdminRequestItem;
  onApprove: () => void;
  onReject: () => void;
  onUndo: () => void;
}) {
  const isApproved = item.status === "APPROVED";
  const isRejected = item.status === "REJECTED";

  const headerBorder = isApproved
    ? "border-[#2a9d5c] border-l-[3px]"
    : isRejected
      ? "border-[#e0c0c0] border-l-[3px] opacity-70"
      : "border-[#e5e2dc]";
  const detailBg = isApproved
    ? "bg-[#f4fbf7] border-t border-[#d4edd8]"
    : isRejected
      ? "bg-[#fdf4f4] border-t border-[#f0d4d4]"
      : "bg-[#fafaf8] border-t border-[#f0ede7]";

  const skuTone = isRejected ? "text-[#aaa]" : "text-[#050a30]";
  const priceTone = isRejected ? "text-[#aaa]" : "text-[#050a30]";

  const specs: { label: string; value: string }[] = [
    { label: "Type", value: item.variety }
  ];
  if (item.certNumber) specs.push({ label: "Cert #", value: item.certNumber });
  specs.push({ label: "Carat", value: String(item.carat) });
  specs.push({ label: "Shape", value: item.shape });
  specs.push({ label: "Color", value: item.color });
  if (item.clarity) specs.push({ label: "Clarity", value: item.clarity });
  specs.push({ label: "Vendor", value: item.vendor });

  return (
    <div className={`overflow-hidden rounded-lg border bg-white ${headerBorder}`}>
      <div className="flex items-center gap-4 border-b border-[#f0ede7] px-4 py-3.5">
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <span className={`text-[13px] font-bold ${skuTone}`}>{item.sku}</span>
            <RequestItemStatusBadge status={item.status} />
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className={`text-[16px] font-bold ${priceTone}`}>{formatUsd(item.totalPrice)}</div>
          <div className="text-[10px] font-light text-[#aaa]">{formatUsdPerCt(item.pricePerCarat)}</div>
        </div>
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-2.5 ${detailBg}`}>
        <div className="flex flex-wrap items-stretch gap-1.5">
          {specs.map((s, i) => (
            <div key={s.label} className="flex items-stretch">
              <div className="min-w-[64px]">
                <div
                  className={`mb-0.5 text-[9px] font-bold uppercase tracking-[0.08em] ${
                    isRejected ? "text-[#ccc]" : "text-[#aaa]"
                  }`}
                >
                  {s.label}
                </div>
                <div className={`text-[12px] ${isRejected ? "text-[#aaa]" : "text-[#050a30]"}`}>
                  {s.value}
                </div>
              </div>
              {i < specs.length - 1 ? <div className="mx-1 w-px bg-[#e5e2dc]" /> : null}
            </div>
          ))}
        </div>
        <div className="ml-4 flex shrink-0 gap-2">
          {isApproved ? (
            <>
              <span className="whitespace-nowrap text-[11px] font-bold text-[#2a9d5c]">
                ✓ Approved
              </span>
              <AdminButton variant="reject" size="sm" onClick={onUndo}>
                Undo
              </AdminButton>
            </>
          ) : isRejected ? (
            <AdminButton variant="approve" size="sm" onClick={onUndo}>
              Undo
            </AdminButton>
          ) : (
            <>
              <AdminButton variant="approve" size="sm" onClick={onApprove}>
                ✓ Approve
              </AdminButton>
              <AdminButton variant="reject" size="sm" onClick={onReject}>
                ✕ Not fulfilled
              </AdminButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  isMemo,
  count,
  approvedCount,
  approvedSum,
  undecidedCount,
  undecidedSum,
  rejectedCount,
  rejectedSum
}: {
  isMemo: boolean;
  count: number;
  approvedCount: number;
  approvedSum: number;
  undecidedCount: number;
  undecidedSum: number;
  rejectedCount: number;
  rejectedSum: number;
}) {
  return (
    <AdminCard>
      <div className="border-b border-[#f0ede7] bg-[#fafaf8] px-4 py-3.5">
        <div className="text-[12px] font-bold text-[#050a30]">Request summary</div>
        <div className="mt-0.5 text-[11px] font-light text-[#aaa]">
          Updates as you approve / reject each line
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="mb-3.5 flex flex-col gap-2">
          <SummaryRow label="Total items" valueClass="text-[#050a30]">{count}</SummaryRow>
          {!isMemo ? (
            <SummaryRow label="Type" valueClass="text-[#050a30]">Invoice</SummaryRow>
          ) : null}
          {isMemo ? (
            <SummaryRow label="Approved — reserved" valueClass="text-[#2a9d5c]">
              {approvedCount} · {formatUsd(approvedSum)}
            </SummaryRow>
          ) : null}
          <SummaryRow label="Undecided" valueClass="text-[#e07000]">
            {undecidedCount} · {formatUsd(undecidedSum)}
          </SummaryRow>
          {isMemo ? (
            <SummaryRow label="Not fulfilled — on record" valueClass="text-[#c03030]">
              {rejectedCount} · {formatUsd(rejectedSum)}
            </SummaryRow>
          ) : null}
        </div>
        <div className="mb-3 h-px bg-[#f0ede7]" />
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#050a30]">
            {isMemo ? "Confirmed on memo" : "Confirmed sold"}
          </span>
          <span
            className={
              "text-[18px] font-bold " +
              (isMemo
                ? "text-[#050a30]"
                : approvedSum > 0
                  ? "text-[#050a30]"
                  : "text-[#aaa]")
            }
          >
            {isMemo ? formatUsd(approvedSum) : approvedSum > 0 ? formatUsd(approvedSum) : "$—"}
          </span>
        </div>
      </div>
    </AdminCard>
  );
}

function SummaryRow({
  label,
  valueClass,
  children
}: {
  label: string;
  valueClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-light text-[#888]">{label}</span>
      <span className={`text-[12px] font-bold ${valueClass}`}>{children}</span>
    </div>
  );
}

function HowItWorksCard({ isMemo }: { isMemo: boolean }) {
  return (
    <div className="rounded-md border border-[#e5e2dc] bg-[#fafaf8] px-4 py-3.5">
      <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
        How approvals work
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Pill tone="approve">✓</Pill>
          <div className="text-[11px] font-light leading-[1.5] text-[#888]">
            <strong className="font-bold text-[#050a30]">Approve</strong> —{" "}
            {isMemo
              ? "item is confirmed and reserved on memo immediately"
              : "item is confirmed, reserved, and marked sold"}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Pill tone="reject">✕</Pill>
          <div className="text-[11px] font-light leading-[1.5] text-[#888]">
            <strong className="font-bold text-[#050a30]">Not fulfilled</strong> —{" "}
            {isMemo
              ? "item stays on the request as a record, but is not reserved. Inventory unchanged."
              : "stays on the request as a record, item returns to inventory"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ tone, children }: { tone: "approve" | "reject"; children: React.ReactNode }) {
  return (
    <div
      className={
        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white " +
        (tone === "approve" ? "bg-[#2a9d5c]" : "bg-[#c03030]")
      }
    >
      {children}
    </div>
  );
}

function BillToCard({ address }: { address: string }) {
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white px-4 py-3.5">
      <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
        Bill to
      </div>
      <div className="whitespace-pre-line text-[12px] leading-[1.7] text-[#050a30]">{address}</div>
    </div>
  );
}

function InternalNoteCard({ initialValue }: { initialValue: string }) {
  return (
    <AdminCard>
      <div className="border-b border-[#f0ede7] px-4 py-3">
        <div className="text-[11px] font-bold text-[#050a30]">Internal note</div>
      </div>
      <div className="p-4">
        <textarea
          defaultValue={initialValue}
          placeholder="Note for internal records only…"
          className="h-[72px] w-full resize-none rounded border border-[#e0ddd8] bg-white p-3 text-[11px] leading-[1.6] text-[#050a30] outline-none focus:border-[#233dff]"
        />
        <div className="mt-2">
          <AdminButton variant="primary" size="sm" className="w-full justify-center">
            Save note
          </AdminButton>
        </div>
      </div>
    </AdminCard>
  );
}

