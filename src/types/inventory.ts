// Canonical domain types for stock records returned by the inventory service.
//
// These are the clean shapes the UI consumes. The Fantasy API's raw response
// lives in src/services/api/stock.types.ts and is mapped to these types at
// the service boundary (see GUIDELINES.md §3 and §8).
//
// Note: src/types/catalog.ts already exports a lightweight `InventoryItem`
// used for preview cards by the mock catalog service. The richer full-record
// union here is named `InventoryRecord` to avoid collision.

export type InventoryCategoryKey = "gemstone" | "natural-diamond" | "lab-diamond";

export type DiamondShape =
  | "asscher"
  | "cushion"
  | "emerald"
  | "heart"
  | "marquise"
  | "moval"
  | "old-euro"
  | "old-mine"
  | "oval"
  | "pear"
  | "radiant"
  | "round"
  | "princess"
  | "other";

export type GemstoneShape =
  | "asscher"
  | "baguette"
  | "cabochon"
  | "cushion"
  | "heart"
  | "marquise"
  | "octagon"
  | "oval"
  | "pear"
  | "radiant"
  | "round"
  | "square"
  | "trillion"
  | "other";

export type GradeLabel =
  | "ideal"
  | "excellent"
  | "very-good"
  | "good"
  | "fair"
  | "poor"
  | "none";

export type DiamondClarity =
  | "FL"
  | "IF"
  | "VVS1"
  | "VVS2"
  | "VS1"
  | "VS2"
  | "SI1"
  | "SI2"
  | "I1"
  | "I2"
  | "I3";

export type DiamondWhiteColor =
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type FancyColorHue =
  | "yellow"
  | "pink"
  | "blue"
  | "green"
  | "other";

export type GemstoneColor =
  | "black"
  | "blue"
  | "brown"
  | "green"
  | "grey"
  | "orange"
  | "peach"
  | "pink"
  | "purple"
  | "red"
  | "yellow"
  | "other";

export type GemstoneVariety =
  | "emerald"
  | "ruby"
  | "sapphire"
  | "spinel"
  | "other";

export type CertificationLab = "GIA" | "IGI" | "GCAL" | "Other";

export type LabDiamondGrowthMethod = "CVD" | "HPHT" | "other";

export type Measurements = {
  length: number | null;
  width: number | null;
  depth: number | null;
  raw: string | null;
};

export type Certification = {
  lab: CertificationLab | null;
  certNumber: string | null;
  certificateUrl: string | null;
};

export type Media = {
  images: string[];
  video: string | null;
  hasMedia: boolean;
};

export type InventoryItemBase = {
  id: string;
  sku: string;
  weight: number;
  measurements: Measurements;
  ratio: number | null;
  pricePerCarat: number | null;
  totalPrice: number | null;
  certification: Certification;
  media: Media;
  status: string | null;
  origin: string | null;
};

export type DiamondShared = {
  clarity: DiamondClarity | null;
  cut: GradeLabel | null;
  polish: GradeLabel | null;
  symmetry: GradeLabel | null;
  fluorescence: string | null;
  depthPct: number | null;
  tablePct: number | null;
  girdle: string | null;
  culet: string | null;
  treatment: string | null;
  color: DiamondWhiteColor | null;
  fancyColor: {
    hue: FancyColorHue;
    intensity: string | null;
    overtone: string | null;
  } | null;
};

export type NaturalDiamond = InventoryItemBase & DiamondShared & {
  category: "natural-diamond";
  shape: DiamondShape;
};

export type LabDiamond = InventoryItemBase & DiamondShared & {
  category: "lab-diamond";
  shape: DiamondShape;
  growthMethod: LabDiamondGrowthMethod | null;
};

export type Gemstone = InventoryItemBase & {
  category: "gemstone";
  shape: GemstoneShape;
  variety: GemstoneVariety;
  color: GemstoneColor;
  certified: boolean;
  treatment: string | null;
};

export type InventoryRecord = Gemstone | NaturalDiamond | LabDiamond;
