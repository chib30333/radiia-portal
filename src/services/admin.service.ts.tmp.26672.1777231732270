// Admin domain service — Phase A-UI mock implementation.
//
// Per guideline 03, every read goes through a function in
// `src/services/<domain>.service.ts` that returns a domain type from
// `src/types/`. The async getters here mirror the shape Phase A-DATA will use
// once Prisma is wired in (Phase I); the swap is then a mechanical change of
// the in-memory lookups to `prisma.*` calls.
//
// Sync helpers (`findCompanyById`, `findAccountById`, `findRequestById`) are
// retained alongside the async surface because Phase A-UI client components
// dereference relations during render. Phase A-DATA will replace those
// helpers with batched joins on the server.

import type {
  AdminAccount,
  AdminCompany,
  AdminRequest
} from "@/types/admin";

const adminCompanies: AdminCompany[] = [
  {
    id: "co-morrison",
    name: "Morrison Fine Jewelry",
    shippingAddress:
      "Morrison Fine Jewelry\n24 West 57th Street, Suite 602\nNew York, NY 10019\nUnited States",
    gemstoneMarkupPct: null,
    naturalDiamondMarkupPct: null,
    labDiamondMarkupPct: null,
    internalNotes:
      "Referred by Jennifer Goggin — confirmed she knows Kate personally. Well-established boutique in midtown."
  },
  {
    id: "co-lin",
    name: "Lin & Associates",
    shippingAddress:
      "Lin & Associates\n1100 Wilshire Blvd, Suite 2400\nLos Angeles, CA 90017\nUnited States",
    gemstoneMarkupPct: null,
    naturalDiamondMarkupPct: null,
    labDiamondMarkupPct: null,
    internalNotes: ""
  },
  {
    id: "co-park",
    name: "Park Atelier",
    shippingAddress:
      "Park Atelier\n200 N. Michigan Ave, Suite 1810\nChicago, IL 60601\nUnited States",
    gemstoneMarkupPct: null,
    naturalDiamondMarkupPct: null,
    labDiamondMarkupPct: null,
    internalNotes: ""
  },
  {
    id: "co-goggin",
    name: "Goggin Fine Jewelry",
    shippingAddress:
      "Goggin Fine Jewelry\n48 West 48th Street, Suite 1101\nNew York, NY 10036\nUnited States",
    gemstoneMarkupPct: 12,
    naturalDiamondMarkupPct: 8,
    labDiamondMarkupPct: 10,
    internalNotes:
      "Long-standing client. Prefers sapphires and natural rounds. Often calls before placing large orders."
  },
  {
    id: "co-bell",
    name: "Bell & Co.",
    shippingAddress:
      "Bell & Co.\n101 Lincoln Rd, Suite 5\nMiami, FL 33139\nUnited States",
    gemstoneMarkupPct: 15,
    naturalDiamondMarkupPct: 12,
    labDiamondMarkupPct: 12,
    internalNotes: ""
  },
  {
    id: "co-lee",
    name: "Lee Gems",
    shippingAddress:
      "Lee Gems\n450 Sutter St, Suite 2200\nSan Francisco, CA 94108\nUnited States",
    gemstoneMarkupPct: 10,
    naturalDiamondMarkupPct: 8,
    labDiamondMarkupPct: 8,
    internalNotes: ""
  }
];

const adminAccounts: AdminAccount[] = [
  {
    id: "acc-morrison",
    firstName: "Kate",
    lastName: "Morrison",
    email: "kate@morrisonfj.com",
    phone: "+1 (212) 555-0188",
    location: "New York, NY",
    referredBy: "Jennifer Goggin",
    status: "PENDING",
    signedUpAt: "2026-04-23T10:42:00.000Z",
    activeSince: null,
    companyId: "co-morrison"
  },
  {
    id: "acc-lin",
    firstName: "David",
    lastName: "Lin",
    email: "d.lin@linassoc.com",
    phone: "+1 (213) 555-0102",
    location: "Los Angeles, CA",
    referredBy: null,
    status: "PENDING",
    signedUpAt: "2026-04-22T16:00:00.000Z",
    activeSince: null,
    companyId: "co-lin"
  },
  {
    id: "acc-park",
    firstName: "Sarah",
    lastName: "Park",
    email: "sarah@parkatelier.com",
    phone: "+1 (312) 555-0144",
    location: "Chicago, IL",
    referredBy: null,
    status: "PENDING",
    signedUpAt: "2026-04-21T14:00:00.000Z",
    activeSince: null,
    companyId: "co-park"
  },
  {
    id: "acc-goggin",
    firstName: "Jennifer",
    lastName: "Goggin",
    email: "jennifer@gogginfinejewelry.com",
    phone: "+1 (212) 555-0144",
    location: "New York, NY",
    referredBy: "Industry event",
    status: "ACTIVE",
    signedUpAt: "2026-03-15T10:00:00.000Z",
    activeSince: "2026-03-15T10:00:00.000Z",
    companyId: "co-goggin"
  },
  {
    id: "acc-bell",
    firstName: "Marcus",
    lastName: "Bell",
    email: "m.bell@bellandco.com",
    phone: "+1 (305) 555-0167",
    location: "Miami, FL",
    referredBy: null,
    status: "ACTIVE",
    signedUpAt: "2026-02-28T10:00:00.000Z",
    activeSince: "2026-02-28T10:00:00.000Z",
    companyId: "co-bell"
  },
  {
    id: "acc-lee",
    firstName: "Anna",
    lastName: "Lee",
    email: "anna@leegems.co",
    phone: "+1 (415) 555-0190",
    location: "San Francisco, CA",
    referredBy: null,
    status: "ACTIVE",
    signedUpAt: "2026-01-10T10:00:00.000Z",
    activeSince: "2026-01-10T10:00:00.000Z",
    companyId: "co-lee"
  }
];

const adminRequests: AdminRequest[] = [
  {
    id: "req-0041",
    reference: "REQ-0041",
    type: "MEMO",
    status: "PENDING",
    companyId: "co-goggin",
    submittedByAccountId: "acc-goggin",
    submittedAt: "2026-04-23T09:18:00.000Z",
    noteFromClient: "For client Margot — need by Friday if possible",
    internalNote: "",
    items: [
      {
        id: "req-0041-item-1",
        sku: "S15382-3",
        category: "gemstone",
        variety: "Sapphire",
        shape: "Cushion",
        carat: 3.54,
        color: "Blue",
        clarity: null,
        certNumber: null,
        vendor: "SL Feed",
        pricePerCarat: 2250,
        totalPrice: 7965,
        status: "UNDECIDED"
      },
      {
        id: "req-0041-item-2",
        sku: "S15380-06",
        category: "gemstone",
        variety: "Sapphire",
        shape: "Cushion",
        carat: 3.11,
        color: "Blue",
        clarity: null,
        certNumber: null,
        vendor: "Internal",
        pricePerCarat: 3050,
        totalPrice: 9486,
        status: "APPROVED"
      },
      {
        id: "req-0041-item-3",
        sku: "S15571C-03",
        category: "gemstone",
        variety: "Sapphire",
        shape: "Cushion",
        carat: 3.25,
        color: "Blue",
        clarity: null,
        certNumber: null,
        vendor: "DIS Feed",
        pricePerCarat: 1450,
        totalPrice: 4713,
        status: "REJECTED"
      }
    ]
  },
  {
    id: "req-0040",
    reference: "REQ-0040",
    type: "INVOICE",
    status: "PENDING",
    companyId: "co-morrison",
    submittedByAccountId: "acc-morrison",
    submittedAt: "2026-04-23T07:45:00.000Z",
    noteFromClient: null,
    internalNote: "",
    items: [
      {
        id: "req-0040-item-1",
        sku: "BR026301",
        category: "natural-diamond",
        variety: "Natural",
        shape: "Round",
        carat: 1.01,
        color: "F",
        clarity: "I1",
        certNumber: "185503",
        vendor: "DIS Feed",
        pricePerCarat: 1447,
        totalPrice: 1462,
        status: "UNDECIDED"
      }
    ]
  },
  {
    id: "req-0039",
    reference: "REQ-0039",
    type: "MEMO",
    status: "PENDING",
    companyId: "co-lin",
    submittedByAccountId: "acc-lin",
    submittedAt: "2026-04-22T14:30:00.000Z",
    noteFromClient: "Sending to trunk show next week",
    internalNote: "",
    items: [
      {
        id: "req-0039-item-1",
        sku: "S20410-1",
        category: "gemstone",
        variety: "Emerald",
        shape: "Oval",
        carat: 4.2,
        color: "Green",
        clarity: null,
        certNumber: null,
        vendor: "SL Feed",
        pricePerCarat: 7480,
        totalPrice: 31416,
        status: "UNDECIDED"
      }
    ]
  },
  {
    id: "req-0038",
    reference: "REQ-0038",
    type: "MEMO",
    status: "PARTIAL",
    companyId: "co-goggin",
    submittedByAccountId: "acc-goggin",
    submittedAt: "2026-04-22T11:00:00.000Z",
    noteFromClient: null,
    internalNote: "",
    items: []
  },
  {
    id: "req-0037",
    reference: "REQ-0037",
    type: "INVOICE",
    status: "APPROVED",
    companyId: "co-bell",
    submittedByAccountId: "acc-bell",
    submittedAt: "2026-04-21T11:00:00.000Z",
    noteFromClient: null,
    internalNote: "",
    items: []
  },
  {
    id: "req-0036",
    reference: "REQ-0036",
    type: "INVOICE",
    status: "APPROVED",
    companyId: "co-goggin",
    submittedByAccountId: "acc-goggin",
    submittedAt: "2026-04-18T11:00:00.000Z",
    noteFromClient: null,
    internalNote: "",
    items: []
  },
  {
    id: "req-0031",
    reference: "REQ-0031",
    type: "MEMO",
    status: "PARTIAL",
    companyId: "co-goggin",
    submittedByAccountId: "acc-goggin",
    submittedAt: "2026-04-12T11:00:00.000Z",
    noteFromClient: null,
    internalNote: "",
    items: []
  }
];

// Synthesized totals for archive rows that the wireframe shows but doesn't
// model item-by-item. Phase A-DATA replaces these with `_sum` aggregates on
// the request-items relation.
const archiveTotals: Record<string, { items: number; total: number }> = {
  "req-0038": { items: 3, total: 18600 },
  "req-0037": { items: 2, total: 11200 },
  "req-0036": { items: 2, total: 9840 },
  "req-0031": { items: 4, total: 22100 }
};

export async function listAccounts(): Promise<AdminAccount[]> {
  return adminAccounts;
}

export async function getAccountById(id: string): Promise<AdminAccount | null> {
  return adminAccounts.find((a) => a.id === id) ?? null;
}

export async function listCompanies(): Promise<AdminCompany[]> {
  return adminCompanies;
}

export async function getCompanyById(id: string): Promise<AdminCompany | null> {
  return adminCompanies.find((c) => c.id === id) ?? null;
}

export async function listRequests(): Promise<AdminRequest[]> {
  return adminRequests;
}

export async function getRequestById(id: string): Promise<AdminRequest | null> {
  return adminRequests.find((r) => r.id === id) ?? null;
}

// Sync, in-memory accessors for Phase A-UI client components. Replace with
// server-side joins in Phase A-DATA — see file header.
export function findCompanyById(id: string): AdminCompany | undefined {
  return adminCompanies.find((c) => c.id === id);
}

export function findAccountById(id: string): AdminAccount | undefined {
  return adminAccounts.find((a) => a.id === id);
}

export function findRequestById(id: string): AdminRequest | undefined {
  return adminRequests.find((r) => r.id === id);
}

export function getRequestItemCount(req: AdminRequest): number {
  if (req.items.length > 0) return req.items.length;
  return archiveTotals[req.id]?.items ?? 0;
}

export function getRequestTotalValue(req: AdminRequest): number {
  if (req.items.length > 0) {
    return req.items.reduce((sum, it) => sum + it.totalPrice, 0);
  }
  return archiveTotals[req.id]?.total ?? 0;
}

export const adminAccountsList: ReadonlyArray<AdminAccount> = adminAccounts;
export const adminCompaniesList: ReadonlyArray<AdminCompany> = adminCompanies;
export const adminRequestsList: ReadonlyArray<AdminRequest> = adminRequests;
