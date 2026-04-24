export async function getPriceBookForAccount(accountId: string) {
  return {
    accountId,
    currency: "USD",
    priceTier: "standard"
  };
}
