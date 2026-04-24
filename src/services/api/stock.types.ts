// Raw Fantasy API shapes for the /api/stock endpoint.
//
// These types mirror Fantasy's wire format verbatim — naming, casing, and
// nullability all follow the Postman collection examples. Do not import
// these from UI code; import from src/types/inventory.ts instead. The
// mapping from FantasyStockRow to InventoryRecord happens in the service
// layer (see GUIDELINES.md §3).

export type FantasyFilter = {
  fieldName: string;
  value: (string | number | null)[];
};

export type FantasyOrderDirection = "ascending" | "descending";

export type FantasyOrder = {
  fieldName: string;
  direction: FantasyOrderDirection;
};

export type FantasyStockRequest = {
  requestType: "GET";
  request: {
    select: string;
    filters: FantasyFilter[];
    order: FantasyOrder[];
    pageSize: number;
    pageNumber: number;
    IsLoadingAll: boolean;
  };
};

export type FantasyStockRow = {
  LotID: number;
  LotName: string | null;
  Quantity: number | null;
  Weight: number | null;
  Measurements1: number | null;
  Measurements2: number | null;
  Measurements3: number | null;
  StoneTable: number | null;
  CrownAngle: number | null;
  CrownHeight: number | null;
  PavillionAngle: number | null;
  PavillionDepth: number | null;
  Inscription: string | null;
  GirdleAvg: string | null;
  LCuletID: number | null;
  LPolishID: number | null;
  LSymmetryID: number | null;
  LFluorescenceColorID: number | null;
  LCutGradeID: number | null;
  TB100ID: number | null;
  CertificateNo: string | null;
  LabAccountName: string | null;
  HasCertificateScan: boolean | null;
  FancyColor: string | null;
  FancyIntensity: string | null;
  FancyOvertone: string | null;
  Image: string | null;
  Image2: string | null;
  Image3: string | null;
  Image4: string | null;
  Sale: number | null;
  TotalSale: number | null;
  TotalPrice6: number | null;
  Depth: number | null;
  LotStatusDB: string | null;
  LFluorescenceID: number | null;
  ItemBaseTypeID: number | null;
};

export type FantasyStockResponse = FantasyStockRow[];

export type FantasyTokenResponse = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  userID: string;
  userName: string;
  isPasswordReset: string;
  isAutoClearCache: string;
  LoginSessionID: string;
  isSuperUserPassword: string;
  isSystemAdminPassword: string;
  fantasyClient: string;
  ".issued": string;
  ".expires": string;
};
