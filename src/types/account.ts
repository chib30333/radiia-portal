export type CustomerAccount = {
  companyName: string;
  buyerName: string;
  tier: "standard" | "preferred" | "strategic";
  currency: string;
};
