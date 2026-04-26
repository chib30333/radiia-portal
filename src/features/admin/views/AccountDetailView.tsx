"use client";

import Link from "next/link";

import { AdminContentArea, AdminPageHeaderMenu } from "../components/AdminContentArea";
import {
  AccountStatusBadge,
  AdminButton,
  AdminCard,
  AdminCardHeader,
  FieldLabel,
  InfoCell,
  MarkupInput,
  RequestStatusBadge
} from "../components/AdminPrimitives";
import {
  getMockAccountById,
  getMockCompanyById,
  mockRequests,
  mockTotalRequestItemCount,
  mockTotalRequestValue
} from "../lib/mock-admin-data";
import { formatDate, formatTime, formatUsd } from "../lib/format";

export function AccountDetailView({ accountId }: { accountId: string }) {
  const account = getMockAccountById(accountId);

  if (!account) {
    return (
      <>
        <AdminPageHeaderMenu title="Account not found" back={{ href: "/admin/accounts", label: "Back to Accounts" }} />
        <AdminContentArea>
          <div className="rounded-lg border border-dashed border-[#e5e2dc] bg-white px-6 py-12 text-center text-[13px] text-[#aaa]">
            No account exists with id <span className="font-bold">{accountId}</span>.
          </div>
        </AdminContentArea>
      </>
    );
  }

  const company = getMockCompanyById(account.companyId);
  const isPending = account.status === "PENDING";
  const fullName = `${account.firstName} ${account.lastName}`;

  const subtitle = isPending
    ? `${company?.name} · Signed up ${formatDate(account.signedUpAt)} at ${formatTime(account.signedUpAt)}`
    : `${company?.name} · Active since ${formatDate(account.activeSince ?? account.signedUpAt)}`;

  const recentRequests = mockRequests
    .filter((r) => r.companyId === account.companyId)
    .slice(0, 3);

  return (
    <>
      <AdminPageHeaderMenu
        title={fullName}
        subtitle={subtitle}
        back={{ href: "/admin/accounts", label: "Back to Accounts" }}
        badges={<AccountStatusBadge status={account.status} size="lg" />}
        actions={
          isPending ? null : (
            <>
              <AdminButton variant="reject">Deactivate account</AdminButton>
              <AdminButton variant="primary">Save changes</AdminButton>
            </>
          )
        }
      />
      <AdminContentArea>
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-4">
            <CompanyInfoCard
              firstName={account.firstName}
              lastName={account.lastName}
              companyName={company?.name ?? ""}
              email={account.email}
              phone={account.phone}
              referredBy={account.referredBy}
              shippingAddress={company?.shippingAddress ?? ""}
            />
            <MarkupCard
              isPending={isPending}
              gem={company?.gemstoneMarkupPct ?? null}
              nat={company?.naturalDiamondMarkupPct ?? null}
              lab={company?.labDiamondMarkupPct ?? null}
            />
            <InternalNotesCard initialValue={company?.internalNotes ?? ""} />
          </div>
          <div className="lg:sticky lg:top-5">
            {isPending ? (
              <ApprovalPanel
                gem={company?.gemstoneMarkupPct ?? null}
                nat={company?.naturalDiamondMarkupPct ?? null}
                lab={company?.labDiamondMarkupPct ?? null}
              />
            ) : (
              <RecentRequestsPanel
                rows={recentRequests.map((req) => ({
                  reference: req.reference,
                  status: req.status,
                  type: req.type,
                  itemCount: mockTotalRequestItemCount(req),
                  total: mockTotalRequestValue(req),
                  href: `/admin/requests/${req.id}`
                }))}
              />
            )}
          </div>
        </div>
      </AdminContentArea>
    </>
  );
}

function CompanyInfoCard({
  firstName,
  lastName,
  companyName,
  email,
  phone,
  referredBy,
  shippingAddress
}: {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  referredBy: string | null;
  shippingAddress: string;
}) {
  return (
    <AdminCard>
      <AdminCardHeader title="Company information" />
      <div className="p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCell label="First name">{firstName}</InfoCell>
          <InfoCell label="Last name">{lastName}</InfoCell>
          <InfoCell label="Company">{companyName}</InfoCell>
          <InfoCell label="Email">
            <span className="text-[#233dff]">{email}</span>
          </InfoCell>
          <InfoCell label="Phone">{phone}</InfoCell>
          {referredBy ? <InfoCell label="Referred by">{referredBy}</InfoCell> : null}
        </div>
        <div className="my-5 h-px bg-[#e5e2dc]" />
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#aaa]">
          Shipping address
        </div>
        <div className="whitespace-pre-line text-[13px] text-[#050a30]">{shippingAddress}</div>
      </div>
    </AdminCard>
  );
}

function MarkupCard({
  isPending,
  gem,
  nat,
  lab
}: {
  isPending: boolean;
  gem: number | null;
  nat: number | null;
  lab: number | null;
}) {
  return (
    <AdminCard>
      <AdminCardHeader
        title={isPending ? "Price markup assignment" : "Price markup"}
        subtitle={
          isPending
            ? "Set before approving — client will see prices with these markups applied"
            : "Changes take effect immediately on the client's next page load"
        }
      />
      <div className="p-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <FieldLabel>{isPending ? "Gemstones markup" : "Gemstones"}</FieldLabel>
            <MarkupInput defaultValue={gem} ariaLabel="Gemstones markup percent" />
          </div>
          <div>
            <FieldLabel>{isPending ? "Natural diamonds markup" : "Natural diamonds"}</FieldLabel>
            <MarkupInput defaultValue={nat} ariaLabel="Natural diamonds markup percent" />
          </div>
          <div>
            <FieldLabel>{isPending ? "Lab diamonds markup" : "Lab diamonds"}</FieldLabel>
            <MarkupInput defaultValue={lab} ariaLabel="Lab diamonds markup percent" />
          </div>
        </div>
      </div>
    </AdminCard>
  );
}

function InternalNotesCard({ initialValue }: { initialValue: string }) {
  return (
    <AdminCard>
      <AdminCardHeader title="Internal notes" />
      <div className="p-5">
        <textarea
          defaultValue={initialValue}
          placeholder="Add any internal notes about this client (not visible to the client)…"
          className="h-20 w-full resize-none rounded border border-[#e0ddd8] bg-white p-3 text-[13px] leading-[1.6] text-[#050a30] outline-none focus:border-[#233dff]"
        />
      </div>
    </AdminCard>
  );
}

function ApprovalPanel({
  gem,
  nat,
  lab
}: {
  gem: number | null;
  nat: number | null;
  lab: number | null;
}) {
  const renderRow = (label: string, value: number | null) => (
    <div className="mb-1.5 flex items-center justify-between last:mb-0">
      <span className="text-[12px] font-light text-[#888]">{label}</span>
      <span className="text-[12px] font-bold text-[#050a30]">
        {value === null ? "Not set" : `${value}%`}
      </span>
    </div>
  );

  return (
    <AdminCard>
      <div className="border-b border-[#f0ede7] bg-[#fafaf8] px-5 py-4">
        <div className="text-[12px] font-bold text-[#050a30]">Review decision</div>
        <div className="mt-0.5 text-[11px] font-light text-[#aaa]">
          This will send an email to the client
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="rounded-md border border-[#e5e2dc] bg-[#fafaf8] p-3.5">
          <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
            Markup summary
          </div>
          {renderRow("Gemstones", gem)}
          {renderRow("Natural diamonds", nat)}
          {renderRow("Lab diamonds", lab)}
        </div>
        <AdminButton variant="approve" className="w-full justify-center py-3">
          ✓ Approve account
        </AdminButton>
        <div className="h-px bg-[#f0ede7]" />
        <AdminButton variant="reject" className="w-full justify-center py-2.5">
          Decline request
        </AdminButton>
      </div>
    </AdminCard>
  );
}

function RecentRequestsPanel({
  rows
}: {
  rows: {
    reference: string;
    status: "PENDING" | "APPROVED" | "PARTIAL" | "REJECTED";
    type: "MEMO" | "INVOICE";
    itemCount: number;
    total: number;
    href: string;
  }[];
}) {
  return (
    <AdminCard>
      <div className="flex items-center justify-between border-b border-[#f0ede7] px-4 py-3.5">
        <div className="text-[12px] font-bold text-[#050a30]">Recent requests</div>
        <Link href="/admin/requests" className="text-[11px] text-[#233dff] hover:underline">
          View all
        </Link>
      </div>
      <div>
        {rows.length === 0 ? (
          <div className="px-4 py-6 text-center text-[12px] text-[#aaa]">No requests yet.</div>
        ) : (
          rows.map((r, i) => (
            <div
              key={r.reference}
              className={
                "flex items-center justify-between px-4 py-3" +
                (i < rows.length - 1 ? " border-b border-[#f5f3ef]" : "")
              }
            >
              <div>
                <div className="mb-0.5 flex items-center gap-1.5">
                  <span
                    className={
                      "text-[11px] font-bold " +
                      (r.status === "PENDING" ? "text-[#233dff]" : "text-[#050a30]")
                    }
                  >
                    {r.reference}
                  </span>
                  <RequestStatusBadge status={r.status} size="sm" />
                </div>
                <div className="text-[10px] font-light text-[#aaa]">
                  {r.type === "MEMO" ? "Memo" : "Invoice"} · {r.itemCount}{" "}
                  {r.itemCount === 1 ? "item" : "items"} · {formatUsd(r.total)}
                </div>
              </div>
              <Link href={r.href as never}>
                <AdminButton variant={r.status === "PENDING" ? "primary" : "outline"} size="sm">
                  {r.status === "PENDING" ? "Review" : "View"}
                </AdminButton>
              </Link>
            </div>
          ))
        )}
      </div>
    </AdminCard>
  );
}
