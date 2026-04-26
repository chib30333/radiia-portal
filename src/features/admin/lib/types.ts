// Admin domain types for Phase A-UI.
//
// These mirror the planned Prisma schema shapes so the A-DATA pass becomes a
// mechanical swap from `mock-admin-data.ts` to real `prisma.*.findMany(...)`
// queries. Until Prisma is installed (Phase I), these inline types stand in for
// `import type { Company, User, Request } from "@prisma/client"`.

export type AccountStatus = "PENDING" | "ACTIVE" | "DEACTIVATED" | "DECLINED";

export type RequestType = "MEMO" | "INVOICE";

export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "PARTIAL"
  | "REJECTED";

export type RequestItemStatus = "UNDECIDED" | "APPROVED" | "REJECTED";

export type ItemCategory = "gemstone" | "natural-diamond" | "lab-diamond";

export type AdminCompany = {
  id: string;
  name: string;
  shippingAddress: string;
  gemstoneMarkupPct: number | null;
  naturalDiamondMarkupPct: number | null;
  labDiamondMarkupPct: number | null;
  internalNotes: string;
};

export type AdminAccount = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  referredBy: string | null;
  status: AccountStatus;
  signedUpAt: string;
  activeSince: string | null;
  companyId: string;
};

export type AdminRequestItem = {
  id: string;
  sku: string;
  category: ItemCategory;
  variety: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string | null;
  certNumber: string | null;
  vendor: string;
  pricePerCarat: number;
  totalPrice: number;
  status: RequestItemStatus;
};

export type AdminRequest = {
  id: string;
  reference: string;
  type: RequestType;
  status: RequestStatus;
  companyId: string;
  submittedByAccountId: string;
  submittedAt: string;
  noteFromClient: string | null;
  internalNote: string;
  items: AdminRequestItem[];
};
